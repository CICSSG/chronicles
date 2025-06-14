import Card from '@/components/card';
import { createClient } from '@/utils/supabase/server'
import React from 'react'

interface Officer {
    Name: string;
    Position: string;
}

interface Officers {
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

    const PositionLimit = 2
    return (
        <div className="flex flex-col w-10/12 lg:w-8/12 my-10 gap-8">
            <div className="flex flex-col gap-4 w-full">{slate?.map((data: Officers, i: number) =>
                i == 0 ?
                    //Current Slate
                    <div className='w-full flex flex-col gap-4'>
                        <h1 className='font-bold text-4xl text-center'>Current Officers & Committees</h1>
                        <br />
                        {data.Slate.map((slate: any[], i) =>
                            i == 0 ?
                                <>
                                    <h1 className='font-bold text-2xl text-center'>Executive Board</h1>
                                    <div className='flex flex-row flex-wrap w-3/4 justify-center m-auto gap-3'>
                                        {slate.map((officer: Officer, j) =>
                                            j <= PositionLimit ?
                                                <>
                                                    <Card 
                                                        Position={officer.Position}
                                                        Name={officer.Name} />
                                                </> : null
                                        )}
                                    </div>
                                    <div className='flex flex-row flex-wrap justify-center m-auto gap-3'>
                                        {slate.map((officer: Officer, j) =>
                                            j > PositionLimit ?
                                                <>
                                                    <Card 
                                                        Position={officer.Position}
                                                        Name={officer.Name} />
                                                </> : null
                                        )}
                                    </div>
                                </>

                                :
                                i == 1 ?
                                    <>
                                        <h1 className='font-bold text-2xl text-center'>Legislative Council</h1>
                                        <div className='flex flex-row flex-wrap justify-center m-auto gap-3'>
                                            {slate.map((officer: Officer) =>
                                                    <>
                                                        <Card 
                                                        Position={officer.Position}
                                                        Name={officer.Name} />
                                                    </>
                                            )}
                                        </div>
                                    </>
                                    : null,

                        )}

                        <h1 className='font-bold text-2xl text-center'>Committees</h1>

                        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title font-semibold">
                                <span>Data Committee</span>
                                <br />
                                <span className='font-light'>Handling of Data</span>
                            </div>
                            <div className="collapse-content text-sm">

                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title font-semibold">
                                <span>Technical Committee</span>
                                <br />
                                <span className='font-light'>Handling of Tech</span>
                            </div>
                            <div className="collapse-content text-sm">

                            </div>
                        </div>
                    </div>

                    :
                    // Previous Slates
                    null
                // <div className="collapse collapse-arrow bg-base-100 border border-base-300 max-w-full" key={data.id}>
                //     {i == 0 ?
                //         <input type="radio" name="my-accordion-2" defaultChecked /> :
                //         <input type="radio" name="my-accordion-2" />
                //     }
                //     <div className="collapse-title font-semibold">{data.YearFrom} - {data.YearTo}</div>
                //     <div className="overflow-x-auto overflow-y-hidden">
                //         <table className="table table-zebra">
                //             {/* head */}
                //             <thead>
                //                 <tr>
                //                     <th>Officer</th>
                //                     <th>Position</th>
                //                 </tr>
                //             </thead>
                //             <tbody>
                //                 {data.Slate.map((officer: Slate) =>
                //                     <tr key={officer.Name}>
                //                         <td>
                //                             <div className="flex items-center gap-3">
                //                                 <div className="avatar">
                //                                     <div className="mask mask-squircle h-12 w-12">
                //                                         <img
                //                                             src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                //                                             alt="Avatar Tailwind CSS Component" />
                //                                     </div>
                //                                 </div>
                //                                 <div>
                //                                     <div className="font-bold">{officer.Name}</div>
                //                                 </div>
                //                             </div>
                //                         </td>
                //                         <td className="w-1/2">{officer.Position}</td>
                //                     </tr>
                //                 )}
                //             </tbody>
                //         </table>
                //     </div>
                // </div>
            )}</div>
        </div>
    )
}

export default Officers