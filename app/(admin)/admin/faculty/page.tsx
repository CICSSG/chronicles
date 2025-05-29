import { InfoIcon } from 'lucide-react';
import React from 'react'

const Faculty = () => {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          Faculty
        </div>
      </div>
    </div>
  )
}

export default Faculty