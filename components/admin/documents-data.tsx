import { createClient } from "@supabase/supabase-js";
import { getPagination } from "../pagination";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ITEMS_PER_PAGE = 9;

export default async function DocumentData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*")
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function DocumentSearch(
  title?: string,
  documentType?: string,
  page?: number,
) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");
  documentType == "" || documentType == null
    ? (documentType = undefined)
    : null;

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined && documentType != undefined) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .eq("document_type", documentType)
      .ilike("title", title)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("title", title)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  if (documentType != undefined) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .eq("document_type", documentType)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function AnnouncementData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("announcements")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("announcements")
      .select("*")
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function AnnouncementSearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("announcements")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("title", title)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("announcements")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function EventsData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("events")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("events")
      .select("*")
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function EventsSearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("events")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("title", title)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("events")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function SlatesData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("slate")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("slate")
      .select("*")
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function SlatesSearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("slate")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("title", title)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("slate")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function AdminStaffData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("admin_staff")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("admin_staff")
      .select("*")
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function AdminStaffSearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("admin_staff")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("title", title)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("admin_staff")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function FacultyData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("faculty")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("department", { ascending: true })
      .order("work_type", {ascending: true})
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("faculty")
      .select("*")
      .order("department", { ascending: false })
      .order("work_type", {ascending: true})
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function FacultySearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("faculty")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("name", title)
      .order("department", { ascending: true })
      .order("work_type", {ascending: true})
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("faculty")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("department", { ascending: true })
    .order("work_type", {ascending: true})
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function UrgentAnnouncementData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("urgent_announcement")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("id", { ascending: false });

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("urgent_announcement")
      .select("*")
      .order("id", { ascending: false })

    let pagination =
      count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function UrgentAnnouncementDataSingle() {
  let { data: documents } = await supabase
    .from("urgent_announcement")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  return { documents };
}
