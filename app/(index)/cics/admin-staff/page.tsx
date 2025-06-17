"use client";
import { AdminStaffDocumentData } from "@/app/(admin)/admin/admin-staff/page";
import { PublicAdminStaffData } from "@/components/public-documents-data";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function AdminStaff() {
  const [documents, setDocuments] = useState<AdminStaffDocumentData | null>(
    null,
  );

  useEffect(() => {
    PublicAdminStaffData().then(({ documents }) => {
      setDocuments(documents ? documents[0] : null);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white/80 p-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl">Admin & Staff</h1>
          <p className="text-lg font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut
            distinctio assumenda neque quia, labore optio doloremque recusandae
            voluptates ipsam commodi delectus fugit porro, omnis iste nesciunt
            ab. Laudantium, libero.
          </p>
        </div>
        <hr />

        <div className="flex flex-col *:basis-[40%] lg:mx-0 lg:flex-row justify-around gap-8">
          {/* Dean */}
          <div className="flex items-center gap-4">
            <Image
              src={
                documents && documents.dean.image !== ""
                  ? documents.dean.image
                  : "/images/NoImage.png"
              }
              alt=""
              width={150}
              height={150}
              className="rounded-xl border-2 border-black/60 shadow-lg shadow-blue-300"
            />
            <div className="text-center">
              <p className="text-xl font-normal">{documents?.dean.name}</p>
              <p className="text-lg font-semibold">Dean, CICS</p>
            </div>
          </div>

          {/* Associate Dean */}
          <div className="flex flex-row items-center gap-4">
            <Image
              src={
                documents && documents.associate_dean.image !== ""
                  ? documents.associate_dean.image
                  : "/images/NoImage.png"
              }
              alt=""
              width={150}
              height={150}
              className="rounded-xl border-2 border-black/60 shadow-lg shadow-blue-300"
            />
            <div className="text-center">
              <p className="text-xl font-normal">
                {documents?.associate_dean.name}
              </p>
              <p className="text-lg font-semibold">Associate Dean, CICS</p>
            </div>
          </div>
        </div>

        {/* Staff */}
        <div className="m-auto my-16 flex flex-row flex-wrap *:basis-[40%] justify-around items-center gap-x-4 gap-y-10 w-full">
          {documents?.staff.map((data, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 w-full`}
            >
              <Image
                src={data.image !== "" ? data.image : "/images/NoImage.png"}
                alt=""
                width={150}
                height={150}
                className="grow-0 basis-0 rounded-xl border-2 border-black/60 shadow-lg shadow-blue-300"
              />
              <div className="grow basis-0">
                <p className={`text-xl font-normal`}>{data.name}</p>
                <p className={`text-lg font-semibold`}>{data.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
