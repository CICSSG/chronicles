export default function AnnouncementSkeleton({ amount }: { amount: number }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="skeleton aspect-square w-full"></div>
          <div className="skeleton h-6 w-28"></div>
          <div className="skeleton h-2 w-full"></div>
          <div className="flex flex-row items-center justify-between">
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-10 w-30"></div>
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </>
  );
}

export function SlateSkeleton({ amount }: { amount: number }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="flex flex-col items-center gap-4" key={index}>
          <div className="skeleton aspect-square w-full"></div>
          <div className="skeleton h-6 w-40"></div>
          <div className="skeleton h-6 w-28"></div>
          <div className="skeleton h-2 w-full"></div>
          <div className="skeleton h-10 w-full"></div>
        </div>
      ))}
    </>
  );
}

export function EventSkeleton({ amount }: { amount: number }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="skeleton aspect-square w-full"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-2 w-full"></div>
          <div className="skeleton h-5 w-40"></div>
          <div className="skeleton h-3 w-30"></div>
          <div className="skeleton h-2 w-48"></div>
          <div className="skeleton h-10 w-full"></div>
        </div>
      ))}
    </>
  );
}

export function DocumentSkeleton({ amount }: { amount: number }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-2 w-full"></div>
          <div className="flex flex-row items-center justify-between">
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-10 w-30"></div>
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-3 w-1/2"></div>
        </div>
      ))}
    </>
  );
}

export function AdminStaffSkeleton({ amount }: { amount: number }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="flex flex-row gap-4" key={index}>
          <div className="skeleton h-38 aspect-square"></div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-4 w-30"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export function FacultySkeleton({ amount }: { amount: number }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="flex flex-col gap-4 px-6 items-center" key={index}>
          <div className="skeleton w-full aspect-square"></div>
          <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-35"></div>
            <div className="skeleton h-4 w-30"></div>
            <div className="skeleton h-4 w-40"></div>
        </div>
      ))}
    </>
  );
}