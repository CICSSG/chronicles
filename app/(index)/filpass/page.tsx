import React from "react";

const FilPassVerification = () => {
  return (
    <div className="flex flex-col gap-4 *:rounded-2xl">
      <div className="flex grow-1 basis-0 flex-col gap-4 text-black/90 *:rounded-2xl *:bg-neutral-300 *:px-8 *:py-8 *:shadow-xl">
        <div className="rounded-2xl bg-neutral-300 bg-[url(/images/noise.png)] px-6 py-8">
          <h2 className="text-3xl font-bold">FilPass Verification</h2>
        </div>
      </div>
      <div className="flex h-screen w-full flex-col overflow-y-hidden bg-white">
        <iframe
          src="/FilPass.html"
          frameBorder="0"
          title="FilPass"
          className="h-full w-full overflow-y-hidden"
        />
      </div>
    </div>
  );
};

export default FilPassVerification;
