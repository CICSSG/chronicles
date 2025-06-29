"use client";
import { AdminStaffDocumentData } from "@/app/(admin)/admin/admin-staff/page";
import { PublicAdminStaffData } from "@/components/public-documents-data";
import { AdminStaffSkeleton } from "@/components/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminStaff() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [documents, setDocuments] = useState<AdminStaffDocumentData | null>(
    null,
  );

  useEffect(() => {
    PublicAdminStaffData().then(({ documents }) => {
      setDocuments(documents ? documents[0] : null);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 xl:rounded-xl xl:bg-white/80 xl:p-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Admin & Staff</h1>
        {/* <p className="text-lg font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut
            distinctio assumenda neque quia, labore optio doloremque recusandae
            voluptates ipsam commodi delectus fugit porro, omnis iste nesciunt
            ab. Laudantium, libero.
          </p> */}
      </div>
      <hr />

      {isLoaded ? (
        <>
          <div className="flex flex-col justify-around gap-8 *:basis-[40%] lg:mx-0 lg:flex-row">
            {/* Dean */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Image
                  src={"/images/Frame.png"}
                  alt=""
                  width={150}
                  height={150}
                  className="absolute aspect-square rounded-xl border-2 border-black/60 object-cover shadow-lg shadow-black/30"
                />
                <Image
                  src={
                    documents && documents.dean.image !== ""
                      ? documents.dean.image
                      : "/images/NoImage.png"
                  }
                  alt=""
                  width={150}
                  height={150}
                  className="aspect-square rounded-xl object-cover p-2"
                />
              </div>

              <div className="text-center">
                <p className="text-xl font-normal">{documents?.dean.name}</p>
                <p className="text-lg font-semibold">Dean, CICS</p>
              </div>
            </div>

            {/* Associate Dean */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Image
                  src={"/images/Frame.png"}
                  alt=""
                  width={150}
                  height={150}
                  className="absolute aspect-square rounded-xl border-2 border-black/60 object-cover shadow-lg shadow-black/30"
                />
                <Image
                  src={
                    documents && documents.associate_dean.image !== ""
                      ? documents.associate_dean.image
                      : "/images/NoImage.png"
                  }
                  alt=""
                  width={150}
                  height={150}
                  className="aspect-square rounded-xl object-cover p-2"
                />
              </div>

              <div className="text-center">
                <p className="text-xl font-normal">
                  {documents?.associate_dean.name}
                </p>
                <p className="text-lg font-semibold">Associate Dean, CICS</p>
              </div>
            </div>
          </div>

          {/* Staff */}
          <div className="3xl:grid-cols-3 m-auto my-16 grid w-full grid-cols-1 items-center justify-around gap-x-4 gap-y-10 md:grid-cols-2">
            {documents?.staff.map((data, i) => (
              <div
                key={i}
                className={`flex w-full flex-col items-center gap-4`}
              >
                <div className="relative">
                  <Image
                    src={"/images/Frame.png"}
                    alt=""
                    width={150}
                    height={150}
                    className="absolute aspect-square rounded-xl border-2 border-black/60 object-cover shadow-lg shadow-black/30"
                  />
                  <Image
                    src={
                      data.image.length > 2 ? data.image : "/images/NoImage.png"
                    }
                    alt=""
                    width={150}
                    height={150}
                    className="aspect-square rounded-xl object-cover p-2"
                  />
                </div>
                <div className="grow basis-0">
                  <p className={`text-center text-xl font-normal`}>
                    {data.name}
                  </p>
                  <p className={`text-center text-lg font-semibold`}>
                    {data.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-around gap-8 *:basis-[40%] lg:mx-0 lg:flex-row">
          <AdminStaffSkeleton amount={2} />
        </div>
      )}
    </div>
  );
}
