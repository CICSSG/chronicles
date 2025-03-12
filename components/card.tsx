import React from 'react'

interface TestComponentProps {
    Name: string;
    Position: string;
 }
 function Card({Name, Position}: TestComponentProps) {
    return (
        <div className="card bg-base-100 flex-grow-1 basis-1/5 flex-shrink-0">
            <figure>
                <img
                    src="https://placehold.co/400"
                    alt={Position}
                    className="rounded-sm aspect-square object-cover w-48" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{Position}</h2>
                <p>{Name}</p>
            </div>
        </div>
    )
}

export default Card