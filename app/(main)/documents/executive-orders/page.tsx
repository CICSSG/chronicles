import NavDocuments from "@/components/nav-documents";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import React from "react";
import DocumentCard from "@/components/documentcard";

const ExecutiveOrders = () => {
  return (
    <div className="flex w-full flex-row gap-4 *:rounded-2xl">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-neutral-700 *:rounded-2xl *:bg-gray-200 *:px-6 *:py-8 *:shadow-xl">
        <div className="">
          <h2 className="text-2xl font-bold">
            Documents <br /> Archive
          </h2>
        </div>
        <div className="flex flex-col gap-2 *:font-bold">
          <NavDocuments />
        </div>
      </div>
      <div className="grid grow-3 basis-0 grid-cols-3 gap-4 bg-gray-200 p-6 *:rounded-xl *:bg-white *:p-4">
        {/* Card */}
        <DocumentCard
          Title="Executive"
          Date="123"
          URL="123"
          Description="123"
        />
        
      </div>
    </div>
  );
};

export default ExecutiveOrders;
