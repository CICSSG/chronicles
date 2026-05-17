"use server";

import { put } from "@vercel/blob";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type AnyRecord = Record<string, any>;

const databaseName = process.env.MONGODB_DATABASE;

if (!databaseName) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DATABASE"');
}

async function getCollection(name: string) {
  const client = await clientPromise;
  return client.db(databaseName).collection(name);
}

function parseFormValue(value: FormDataEntryValue) {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (!trimmed) return "";

  if (
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith("{") && trimmed.endsWith("}"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }

  return value;
}

function formDataToObject(formData: FormData) {
  const data: AnyRecord = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) continue;
    data[key] = parseFormValue(value);
  }

  if (data._id && !data.id) {
    data.id = String(data._id);
  }

  return data;
}

function toMongoId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id) ? new ObjectId(id) : null;
}

function idFilter(data: AnyRecord) {
  const rawId = String(data._id ?? data.id ?? "").trim();
  if (!rawId) return null;

  const mongoId = toMongoId(rawId);
  return mongoId ? { _id: mongoId } : { id: rawId };
}

async function insertDocument(collectionName: string, data: AnyRecord) {
  const collection = await getCollection(collectionName);
  const record = { ...data };

  delete record._id;

  if (!record.id) {
    record.id = new ObjectId().toHexString();
  }

  const mongoId = toMongoId(String(record.id));
  record._id = mongoId ?? new ObjectId();

  if (!mongoId) {
    record.id = record._id.toHexString();
  }

  await collection.insertOne(record);
  return { success: true, message: "", data: [record] };
}

async function updateDocument(collectionName: string, data: AnyRecord) {
  const collection = await getCollection(collectionName);
  const filter = idFilter(data);

  if (!filter) {
    return { success: false, message: "Missing id" };
  }

  const updateData = { ...data };
  delete updateData._id;
  delete updateData.id;

  await collection.updateOne(filter, { $set: updateData });
  return { success: true };
}

async function deleteDocument(collectionName: string, data: AnyRecord) {
  const collection = await getCollection(collectionName);
  const filter = idFilter(data);

  if (!filter) {
    return { success: false, message: "Missing id" };
  }

  await collection.deleteOne(filter);
  return { success: true };
}

async function findAll(collectionName: string, filter: AnyRecord = {}, sort: AnyRecord = {}): Promise<AnyRecord[]> {
  const collection = await getCollection(collectionName);
  return collection.find(filter).sort(sort).toArray();
}

async function findById(collectionName: string, id?: string): Promise<AnyRecord | null> {
  if (!id) return null;

  const collection = await getCollection(collectionName);
  const mongoId = toMongoId(id);
  return mongoId ? collection.findOne({ _id: mongoId }) : collection.findOne({ id });
}

function serializeRecord(record: AnyRecord | null) {
  if (!record) return null;

  const plain = { ...record };

  if (plain._id instanceof ObjectId) {
    plain._id = plain._id.toHexString();
  } else if (plain._id && typeof plain._id === "object" && typeof plain._id.toString === "function") {
    plain._id = plain._id.toString();
  }

  // Normalize date fields for JSON serialization and consistent client shape
  if (plain.date instanceof Date) {
    plain.date = plain.date.toISOString();
  } else if (plain.date && typeof plain.date === "object" && typeof plain.date.$date === "string") {
    try {
      plain.date = new Date(plain.date.$date).toISOString();
    } catch {}
  }

  // Normalize created_at/updated_at to ISO strings when possible
  if (plain.created_at instanceof Date) {
    plain.created_at = plain.created_at.toISOString();
  } else if (plain.created_at && typeof plain.created_at === "object" && typeof plain.created_at.$date === "string") {
    try {
      plain.created_at = new Date(plain.created_at.$date).toISOString();
    } catch {}
  }

  if (plain.updated_at instanceof Date) {
    plain.updated_at = plain.updated_at.toISOString();
  } else if (plain.updated_at && typeof plain.updated_at === "object" && typeof plain.updated_at.$date === "string") {
    try {
      plain.updated_at = new Date(plain.updated_at.$date).toISOString();
    } catch {}
  }

  return plain;
}

function coerceNumericStudentId(data: AnyRecord) {
  const next = { ...data };
  const rawStudentId = next.student_id ?? next.student_number;

  if (rawStudentId !== undefined) {
    const numericStudentId = Number(rawStudentId);
    if (Number.isFinite(numericStudentId)) {
      next.student_id = numericStudentId;
    }
  }

  if (next.student_number !== undefined) {
    const numericStudentNumber = Number(next.student_number);
    if (Number.isFinite(numericStudentNumber)) {
      next.student_number = numericStudentNumber;
    }
  }

  return next;
}

async function uploadSignatureIfNeeded(data: AnyRecord) {
  const signature = data.signature;

  if (typeof signature !== "string" || !signature.startsWith("data:")) {
    return data;
  }

  const mimeMatch = signature.match(/^data:([^;]+);base64,/);
  const mimeType = mimeMatch?.[1] ?? "image/png";
  const base64Data = signature.replace(/^data:.+base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const extension = mimeType.split("/")[1] ?? "png";
  const file = new File([buffer], `attendance/signature.${extension}`, {
    type: mimeType,
  });
  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return {
    ...data,
    signature: blob.url,
  };
}

function officerPayload(data: AnyRecord) {
  return {
    name: data.name ?? data.id_name ?? "",
    image: data.image ?? "",
    position: data.position ?? "",
    responsibilities: data.responsibilities_data ?? data.responsibilities ?? [],
    contact_info: data.contact_data ?? data.contact_info ?? [],
  };
}

async function updateSlateSection(id: string, section: string, payload: AnyRecord, mode: "create" | "edit" | "delete") {
  const collection = await getCollection("slate");
  const filter = idFilter({ id });

  if (!filter) {
    return { success: false, message: "Missing id" };
  }

  const slate = await collection.findOne(filter);
  if (!slate) {
    return { success: false, message: "Slate not found" };
  }

  const current = Array.isArray((slate as AnyRecord)[section]) ? [...(slate as AnyRecord)[section]] : [];
  const targetName = String(payload.name ?? payload.id_name ?? "");

  if (mode === "create") {
    current.push(payload);
  } else if (mode === "edit") {
    const index = current.findIndex((item: AnyRecord) => item.name === targetName);
    if (index >= 0) current[index] = { ...current[index], ...payload };
  } else {
    const index = current.findIndex((item: AnyRecord) => item.name === targetName);
    if (index >= 0) current.splice(index, 1);
  }

  await collection.updateOne(filter, { $set: { [section]: current } });
  return { success: true };
}

function slateSeed(formData: FormData) {
  const data = formDataToObject(formData);

  return {
    academic_year: data.academic_year ?? data.year ?? data.title ?? "",
    adviser: data.adviser ?? { name: data.adviser_name ?? "", image: data.adviser_image ?? "" },
    governor: data.governor ?? {
      name: data.governor_name ?? "",
      image: data.governor_image ?? "",
      position: "Governor",
      responsibilities: data.governor_responsibilities ?? [],
    },
    vice_governor: data.vice_governor ?? {
      name: data.vice_governor_name ?? "",
      image: data.vice_governor_image ?? "",
      position: "Vice Governor",
      responsibilities: data.vice_governor_responsibilities ?? [],
    },
    directorate: data.directorate ?? [],
    legislative: data.legislative ?? [],
    junior_officers: data.junior_officers ?? [],
    committees: data.committees ?? [],
  };
}

// Documents
export async function createNewDocument(formData: FormData) {
  return insertDocument("documents", formDataToObject(formData));
}

export async function editDocumentPOST(formData: FormData) {
  return updateDocument("documents", formDataToObject(formData));
}

export async function deleteDocumentPOST(formData: FormData) {
  return deleteDocument("documents", formDataToObject(formData));
}

// Announcements
export async function createAnnouncementPOST(formData: FormData) {
  return insertDocument("announcements", formDataToObject(formData));
}

export async function editAnnouncementPOST(formData: FormData) {
  return updateDocument("announcements", formDataToObject(formData));
}

export async function deleteAnnouncementPOST(formData: FormData) {
  return deleteDocument("announcements", formDataToObject(formData));
}

// Events
export async function createEventPOST(formData: FormData) {
  return insertDocument("events", formDataToObject(formData));
}

export async function editEventPOST(formData: FormData) {
  return updateDocument("events", formDataToObject(formData));
}

export async function editEventImagePOST(formData: FormData) {
  const data = formDataToObject(formData);

  if (typeof data.images_data === "string") {
    try {
      data.images = JSON.parse(data.images_data);
    } catch {
      data.images = data.images_data;
    }
  }

  return updateDocument("events", data);
}

export async function deleteEventPOST(formData: FormData) {
  return deleteDocument("events", formDataToObject(formData));
}

// Slate
export async function editImagePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateDocument("slate", { ...data, image: data.image ?? "" });
}

export async function editAdviserPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateDocument("slate", {
    ...data,
    adviser: {
      name: data.name ?? "",
      image: data.image ?? "",
    },
  });
}

export async function editGovernorPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateDocument("slate", {
    ...data,
    governor: {
      name: data.name ?? "",
      image: data.image ?? "",
      position: "Governor",
      responsibilities: data.responsibilities_data ?? data.responsibilities ?? [],
    },
  });
}

export async function editViceGovernorPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateDocument("slate", {
    ...data,
    vice_governor: {
      name: data.name ?? "",
      image: data.image ?? "",
      position: "Vice Governor",
      responsibilities: data.responsibilities_data ?? data.responsibilities ?? [],
      contact_info: data.contact_data ?? data.contact_info ?? [],
    },
  });
}

export async function createSlatePOST(formData: FormData) {
  return insertDocument("slate", { ...formDataToObject(formData), ...slateSeed(formData) });
}

export async function deleteSlatePOST(formData: FormData) {
  return deleteDocument("slate", formDataToObject(formData));
}

export async function createOfficerPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "directorate", officerPayload(data), "create");
}

export async function editOfficerPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "directorate", officerPayload(data), "edit");
}

export async function deleteOfficerPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "directorate", officerPayload(data), "delete");
}

export async function createLegislativePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "legislative", officerPayload(data), "create");
}

export async function editLegislativePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "legislative", officerPayload(data), "edit");
}

export async function deleteLegislativePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "legislative", officerPayload(data), "delete");
}

export async function createJuniorOfficerPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "junior_officers", officerPayload(data), "create");
}

export async function editJuniorOfficerPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "junior_officers", officerPayload(data), "edit");
}

export async function deleteJuniorOfficerPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "junior_officers", officerPayload(data), "delete");
}

export async function createCommitteePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "committees", officerPayload(data), "create");
}

export async function editCommitteePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "committees", officerPayload(data), "edit");
}

export async function deleteCommitteePOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateSlateSection(String(data.id), "committees", officerPayload(data), "delete");
}

// Faculty and staff
export async function createFacultyPOST(formData: FormData) {
  return insertDocument("faculty", formDataToObject(formData));
}

export async function editFacultyPOST(formData: FormData) {
  return updateDocument("faculty", formDataToObject(formData));
}

export async function deleteFacultyPOST(formData: FormData) {
  return deleteDocument("faculty", formDataToObject(formData));
}

export async function editAdminStaffPOST(formData: FormData) {
  const data = formDataToObject(formData);
  return updateDocument("admin_staff", {
    ...data,
    dean: data.dean ?? { name: data.dean_name ?? "", image: data.dean_image ?? "" },
    associate_dean: data.associate_dean ?? {
      name: data.assoc_dean_name ?? "",
      image: data.assoc_dean_image ?? "",
    },
    staff: data.staff ?? [],
  });
}

// Alerts / campus / schedule
export async function createQuickAnnouncementPOST(formData: FormData) {
  const data = formDataToObject(formData);

  const normalized: AnyRecord = { ...data };

  if (data.timer_visible !== undefined) {
    normalized.time_visibility =
      data.timer_visible === "on" || data.timer_visible === true || data.timer_visible === "true";
    delete normalized.timer_visible;
  }

  if (data.button_visible !== undefined) {
    normalized.button_visibility =
      data.button_visible === "on" || data.button_visible === true || data.button_visible === "true";
    delete normalized.button_visible;
  }

  if (data.button_new_tab !== undefined && typeof data.button_new_tab !== "boolean") {
    normalized.button_new_tab = data.button_new_tab === "on" || data.button_new_tab === "true" || data.button_new_tab === true;
  }

  return insertDocument("urgent_announcement", normalized);
}

export async function editQuickAnnouncementPOST(formData: FormData) {
  const data = formDataToObject(formData);

  const normalized: AnyRecord = { ...data };

  if (data.timer_visible !== undefined) {
    normalized.time_visibility =
      data.timer_visible === "on" || data.timer_visible === true || data.timer_visible === "true";
    delete normalized.timer_visible;
  }

  if (data.button_visible !== undefined) {
    normalized.button_visibility =
      data.button_visible === "on" || data.button_visible === true || data.button_visible === "true";
    delete normalized.button_visible;
  }

  if (data.button_new_tab !== undefined && typeof data.button_new_tab !== "boolean") {
    normalized.button_new_tab = data.button_new_tab === "on" || data.button_new_tab === "true" || data.button_new_tab === true;
  }

  return updateDocument("urgent_announcement", normalized);
}

export async function endQuickAnnouncementPOST(formData: FormData) {
  const data = formDataToObject(formData);
  const collection = await getCollection("urgent_announcement");

  const filter = idFilter(data);

  if (filter) {
    await collection.updateOne(filter, { $set: { visibility: false } });
    return { success: true };
  }

  await collection.updateMany({ visibility: true }, { $set: { visibility: false } });
  return { success: true };
}

export async function createEastCampusPOST(formData: FormData) {
  return insertDocument("east_campus", formDataToObject(formData));
}

export async function editEastCampusPOST(formData: FormData) {
  return updateDocument("east_campus", formDataToObject(formData));
}

export async function deleteEastCampusPOST(formData: FormData) {
  return deleteDocument("east_campus", formDataToObject(formData));
}

export async function createWestCampusPOST(formData: FormData) {
  return insertDocument("west_campus", formDataToObject(formData));
}

export async function editWestCampusPOST(formData: FormData) {
  return updateDocument("west_campus", formDataToObject(formData));
}

export async function deleteWestCampusPOST(formData: FormData) {
  return deleteDocument("west_campus", formDataToObject(formData));
}

export async function createPanimolaSchedulePOST(formData: FormData) {
  return insertDocument("panimola_timeline", formDataToObject(formData));
}

export async function editPanimolaSchedulePOST(formData: FormData) {
  return updateDocument("panimola_timeline", formDataToObject(formData));
}

export async function deletePanimolaSchedulePOST(formData: FormData) {
  return deleteDocument("panimola_timeline", formDataToObject(formData));
}

// FetchDesk
export async function createFetchDeskPOST(formData: FormData) {
  return insertDocument("fetchdesk", formDataToObject(formData));
}

export async function editFetchDeskPOST(formData: FormData) {
  return updateDocument("fetchdesk", formDataToObject(formData));
}

export async function deleteFetchDeskPOST(formData: FormData) {
  return deleteDocument("fetchdesk", formDataToObject(formData));
}

export async function getFetchDeskOrders() {
  return { documents: await findAll("fetchdesk", {}, { date: -1 }) };
}

export async function checkFreeBwPages(studentNumber: string) {
  const orders = await findAll(
    "fetchdesk",
    { student_number: studentNumber, print_type: { $in: ["blackAndWhite", "mixed"] } },
    { date: -1 },
  );

  const usedBwPages = orders.reduce((total: number, order: AnyRecord) => {
    return total + Number(order.bw_page_count ?? order.page_count ?? 0);
  }, 0);

  const freePagesPerWeek = 5;
  return { success: true, usedBwPages, remainingFree: Math.max(0, freePagesPerWeek - usedBwPages) };
}

export async function getUser(studentNumber: string) {
  const data = await findAll("attendance_users", { student_number: studentNumber }, { created_at: 1 });
  return { success: true, count: data.length, data };
}

// Attendance
export async function createAttendanceUserPOST(formData: FormData) {
  const data = coerceNumericStudentId(formDataToObject(formData));
  const now = new Date().toISOString();
  data.created_at = data.created_at ?? now;
  data.updated_at = data.updated_at ?? now;
  return insertDocument("attendance_users", data);
}

export async function createAttendancePOST(formData: FormData) {
  const data = await uploadSignatureIfNeeded(
    coerceNumericStudentId(formDataToObject(formData)),
  );
  if (!data.date) {
    data.date = new Date().toISOString().split("T")[0];
  }

  const now = new Date().toISOString();
  data.created_at = data.created_at ?? now;
  data.updated_at = data.updated_at ?? now;

  return insertDocument("attendance", data);
}

export async function updateAttendancePOST(formData: FormData) {
  const data = coerceNumericStudentId(formDataToObject(formData));
  if (!data.id && data.document_id) {
    data.id = String(data.document_id);
  }
  data.updated_at = new Date().toISOString();
  return updateDocument("attendance", data);
}

export async function createAttendanceAdminPOST(formData: FormData) {
  return createAttendancePOST(formData);
}

export async function updateAttendanceAdminPOST(formData: FormData) {
  return updateAttendancePOST(formData);
}

export async function lookupAttendanceUserPOST(studentIdOrFormData: string | FormData) {
  const studentId =
    typeof studentIdOrFormData === "string"
      ? studentIdOrFormData
      : String(studentIdOrFormData.get("student_id") ?? "");

  return getAttendance(studentId);
}

export async function getAttendance(
  studentId: string | number,
): Promise<{
  success: true;
  message: string;
  type: "userAccount";
  count: number;
  userData: { student_id: number; student_name?: string } & AnyRecord;
  data: AnyRecord[];
}> {
  const collection = await getCollection("attendance_users");
  const rawId = typeof studentId === "number" ? studentId : String(studentId ?? "").trim();
  const numericId = typeof rawId === "number" ? rawId : /^[0-9]+$/.test(rawId) ? Number(rawId) : null;

  const userData = (numericId !== null ? await collection.findOne({ student_id: numericId }) : null) ?? (await findById("attendance_users", String(studentId)));
  const today = new Date().toISOString().split("T")[0];
  const dateObj = new Date(today);

  // Match date stored as a plain string ("YYYY-MM-DD"), a JS Date object, or an imported/exported $date wrapper
  const dateMatchers = [today, dateObj, dateObj.toISOString()];

  const activeAttendanceFilter = {
    $and: [
      { $or: [{ date: { $in: dateMatchers } }, { "date.$date": dateObj.toISOString() }] },
      numericId === null
        ? {}
        : { $or: [{ student_id: numericId }, { student_id: String(numericId) }] },
      {
        time_in: { $exists: true, $nin: [null, ""] },
        $or: [{ time_out: { $exists: false } }, { time_out: null }, { time_out: "" }],
      },
    ],
  };
  const data = await findAll("attendance", activeAttendanceFilter, { time_in: -1 });

  // console.log(data)

  // console.log("Lookup attendance for student_id:", studentId, "Found user:", userData, "Today's attendance records:", data);
  if (!userData) {
    return {
      success: true,
      message: "",
      type: "userAccount",
      count: 0,
      userData: { student_id: numericId ?? (typeof studentId === "number" ? studentId : Number(String(studentId))), student_name: "" },
      data: [],
    };
  }

  const plainUserData = serializeRecord(userData) as { student_id: number; student_name?: string } & AnyRecord;
  const plainData = data.map((record) => serializeRecord(record) ?? record);

  return {
    success: true,
    message: "",
    type: "userAccount",
    count: userData ? 1 : 0,
    userData: ((): { student_id: number; student_name?: string } & AnyRecord => {
      const existing = plainUserData as AnyRecord;
      const resolved = existing.student_id ?? existing.student_number ?? existing.id ?? numericId ?? "";
      const student_id = Number(resolved);
      return {
        ...existing,
        student_id: Number.isFinite(student_id) ? student_id : NaN,
        student_name: existing.student_name ?? existing.name ?? "",
      } as { student_id: number; student_name?: string } & AnyRecord;
    })(),
    data: plainData,
  };
}
