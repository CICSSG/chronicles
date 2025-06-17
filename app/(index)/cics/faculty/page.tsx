"use client";
import { PublicFacultyData } from "@/components/public-documents-data";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AdminStaffDocumentData {
  department: string;
  name: string;
  work_type: string;
  specialization: string[];
  image: string;
}

export default function Faculty() {
  const [documentsCS, setDocumentsCS] = useState<AdminStaffDocumentData[] | null>(
    null,
  );
  const [documentsIT, setDocumentsIT] = useState<AdminStaffDocumentData[] | null>(
    null,
  );

  useEffect(() => {
    PublicFacultyData("CS").then(({ documents }) => {
      setDocumentsCS(documents ?? null);
    });
    PublicFacultyData("IT").then(({ documents }) => {
      setDocumentsIT(documents ?? null);
    });
  }, []);


  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white/80 p-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Faculty</h1>
        <p className="text-lg font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut
          distinctio assumenda neque quia, labore optio doloremque recusandae
          voluptates ipsam commodi delectus fugit porro, omnis iste nesciunt ab.
          Laudantium, libero.
        </p>
      </div>
      <hr />

      {/* Computer Science */}
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-3xl font-bold">
          Computer Science Department
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-x-4 gap-y-16">
          {documentsCS?.map((data, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-center">
              <Image
                src={"/images/NoImage.png"}
                alt=""
                width={200}
                height={200}
                className="rounded-xl border-2 border-black/60 shadow-lg shadow-blue-300"
              />
              <p className="text-xl font-bold">{data.name}</p>
              <p className="text-lg font-normal">{data.work_type}</p>
              <p className="text-base font-semibold">Specializations:</p>
              <p className="text-base font-normal">
                {data.specialization.map((specializationData, i) => (
                  <span key={i}>
                    {specializationData}
                    {i < data.specialization.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8" />
      {/* Information Technology */}
      <div>
        <h1 className="text-center text-3xl font-bold">
          Information Technology Department
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-x-4 gap-y-16">
          {documentsIT?.map((data, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-center">
              <Image
                src={"/images/NoImage.png"}
                alt=""
                width={200}
                height={200}
                className="rounded-xl border-2 border-black/60 shadow-lg shadow-blue-300"
              />
              <p className="text-xl font-bold">{data.name}</p>
              <p className="text-lg font-normal">{data.work_type}</p>
              <p className="text-base font-semibold">Specializations:</p>
              <p className="text-base font-normal">
                {data.specialization.map((specializationData, i) => (
                  <span key={i}>
                    {specializationData}
                    {i < data.specialization.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
    </div>
  );
}
