import NavDocuments from "@/components/nav-documents";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import React from "react";
import DocumentCard from "@/components/documentcard";

const ExecutiveOrders = () => {
  return (
    <div className="flex w-full flex-col md:flex-row gap-4 *:rounded-2xl">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-300 *:px-6 *:py-8 *:shadow-xl ">
        <div className="bg-[url(/images/noise.png)]">
          <h2 className="text-3xl font-bold">
            Documents <br /> Archive
          </h2>
        </div>
        <div className="flex flex-col gap-2 *:font-bold bg-[url(/images/noise.png)] text-lg">
          <NavDocuments />
        </div>
      </div>
      <div className="grid grow-3 basis-0 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 bg-neutral-300 p-6 *:rounded-xl *:bg-white/80 *:p-4 text-black/80 bg-[url(/images/noise.png)]">
        {/* Card */}
        <DocumentCard
          Title="Executive Order No. 001"
          Date="August 1, 2025"
          URL="123"
          Description="An Executive Order Declaring the Creation of the Director of Audit, Director of Internal Affairs, Director of Data and Information, and the Associate Director of Creatives as the Directorates of the Governor of the CICS Student Government."
          Author="Governor Jake Ryan P. Olase"
        />

        <DocumentCard
          Title="Executive Order No. 001"
          Date="August 1, 2025"
          URL="123"
          Description="An Executive Order Declaring the Creation of the Director of Audit, Director of Internal Affairs, Director of Data and Information, and the Associate Director of Creatives as the Directorates of the Governor of the CICS Student Government."
          Author="Governor Jake Ryan P. Olase"
        />
        <DocumentCard
          Title="Executive Order No. 001"
          Date="August 1, 2025"
          URL="123"
          Description="An Executive Order Declaring the Creation of the Director of Audit, Director of Internal Affairs, Director of Data and Information, and the Associate Director of Creatives as the Directorates of the Governor of the CICS Student Government."
          Author="Governor Jake Ryan P. Olase"
        />
        <DocumentCard
          Title="Executive Order No. 001"
          Date="August 1, 2025"
          URL="123"
          Description="An Executive Order Declaring the Creation of the Director of Audit, Director of Internal Affairs, Director of Data and Information, and the Associate Director of Creatives as the Directorates of the Governor of the CICS Student Government."
          Author="Governor Jake Ryan P. Olase"
        />
        <DocumentCard
          Title="Executive Order No. 001"
          Date="August 1, 2025"
          URL="123"
          Description="An Executive Order Declaring the Creation of the Director of Audit, Director of Internal Affairs, Director of Data and Information, and the Associate Director of Creatives as the Directorates of the Governor of the CICS Student Government."
          Author="Governor Jake Ryan P. Olase"
        />
      </div>
    </div>
  );
};

export default ExecutiveOrders;
