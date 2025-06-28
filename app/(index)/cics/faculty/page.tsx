"use client";
import { PublicFacultyData } from "@/components/public-documents-data";
import { FacultySkeleton } from "@/components/skeleton";
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
  const [isLoadedCS, setIsLoadedCS] = useState(false);
  const [isLoadedIT, setIsLoadedIT] = useState(false);
  const [documentsCS, setDocumentsCS] = useState<
    AdminStaffDocumentData[] | null
  >(null);
  const [documentsIT, setDocumentsIT] = useState<
    AdminStaffDocumentData[] | null
  >(null);

  useEffect(() => {
    PublicFacultyData("CS").then(({ documents }) => {
      setDocumentsCS(documents ?? null);
      setIsLoadedCS(true);
    });
    PublicFacultyData("IT").then(({ documents }) => {
      setDocumentsIT(documents ?? null);
      setIsLoadedIT(true);
    });
    
  }, []);

  return (
    <div className="flex flex-col gap-8 xl:rounded-xl xl:bg-white/80 xl:p-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Faculty</h1>
        {/* <p className="text-lg font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut
          distinctio assumenda neque quia, labore optio doloremque recusandae
          voluptates ipsam commodi delectus fugit porro, omnis iste nesciunt ab.
          Laudantium, libero.
        </p> */}
      </div>
      <hr />

      {/* Computer Science */}
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-3xl font-bold">
          Computer Science Department
        </h1>
        <div className="3xl:grid-cols-4 grid grid-cols-1 gap-x-4 gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {isLoadedCS ? (
            documentsCS?.map((data, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <Image
                  src={
                    data.image.length > 2 ? data.image : "/images/NoImage.png"
                  }
                  alt=""
                  width={200}
                  height={200}
                  className="rounded-xl border-2 border-black/60 shadow-lg shadow-black/30 aspect-square object-cover"
                />
                <p className="mt-1.5 text-xl font-bold">{data.name}</p>
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
            ))
          ) : (
            <FacultySkeleton amount={4} />
          )}
        </div>
      </div>

      <hr className="my-8" />
      {/* Information Technology */}
      <div>
        <h1 className="text-center text-3xl font-bold">
          Information Technology Department
        </h1>
      </div>

      <div className="3xl:grid-cols-4 grid grid-cols-1 gap-x-4 gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {isLoadedIT ? (
            documentsIT?.map((data, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <Image
              src={data.image.length > 2 ? data.image : "/images/NoImage.png"}
              alt=""
              width={200}
              height={200}
              className="rounded-xl border-2 border-black/60 shadow-lg shadow-black/30 aspect-square object-cover"
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
        ))
          ) : (
            <FacultySkeleton amount={4} />
          )}
      </div>
    </div>
  );
}
