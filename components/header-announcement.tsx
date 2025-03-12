import React from 'react'

const Announcement = () => {
    const counter = "2"
    const announcementText = ""

    return (
        announcementText ? <div className="bg-base-300 text-base-content font-bold w-full flex items-center justify-center gap-2 py-2">
        <div className='flex justify-center items-center w-3/5 text-center'>
            <span>{announcementText}</span>
        </div>

        {/* <span className="countdown font-mono text-xl bg-white p-2 rounded-box">
            Time Left:
            <span style={{ "--value": 10 }  as React.CSSProperties } aria-live="polite" aria-label={counter}>10</span>:
            <span style={{ "--value": 24 }  as React.CSSProperties } aria-live="polite" aria-label={counter}>24</span>:
            <span style={{ "--value": 53 }  as React.CSSProperties } aria-live="polite" aria-label={counter}>59</span>
        </span> */}
    </div> : <></>
    )
}

export default Announcement