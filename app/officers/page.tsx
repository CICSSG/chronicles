import { createClient } from '@/utils/supabase/server'
import React from 'react'

interface Officer {
    id: number;
    YearFrom: string;
    YearTo: string;
    Slate: JSON;
}

const Officers = async () => {
    
    const supabase = await createClient()

    const { data: officers } = await supabase
    .from('officers')
    .select('')
            
    return (
        <>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300 max-w-full">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">2024 - 2025</div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Jake Ryan P. Olase</td>
                                <td>Governor</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <td>Giannina R. Ruidera</td>
                                <td>Vice Governor</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <td>Ivan Yke R. Cadag</td>
                                <td>Chief of Staff</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
            </div>
        </>
    )
}

export default Officers