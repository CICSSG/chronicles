import { createClient } from '@/utils/supabase/server'
import { off } from 'process';
import React from 'react'

interface Slate {
    Name: string; 
    Position: string;
}

interface Officer {
    id: number;
    YearFrom: string;
    YearTo: string;
    Slate: any[];
}

const Officers = async () => {

    const supabase = await createClient()

    const { data: slate } = await supabase
        .from('officers')
        .select('*')
        .order('id', { ascending: false })

    return (
        <>
            <div className="flex flex-col gap-4 w-full">{slate?.map((data: Officer, i) =>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 max-w-full" key={data.id}>
                    {i == 0 ? 
                    <input type="radio" name="my-accordion-2" defaultChecked/>:
                    <input type="radio" name="my-accordion-2"/>
                    }
                    <div className="collapse-title font-semibold">{data.YearFrom} - {data.YearTo} {i == 0 ? "(Current)" : null}</div>
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.Slate.map((officer: Slate) => 
                                <tr key={officer.Name}>
                                    <td className="w-1/2">{officer.Name}</td>
                                    <td className="w-1/2">{officer.Position}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}</div>
        </>
    )
}

export default Officers