import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { image } = await request.json();
    const fd = new FormData(); 
    fd.append('image', image)
    fd.append('type', 'base64')
    const response = await fetch('https://api.imgur.com/3/image', {
        method: "POST",
        headers: {
            Authorization: "Client-ID 26d5c715e812de2",
        },
        body: fd,
        redirect: 'follow',
    })
    const data = await response.json();

    if(data.status == 200) {
        return NextResponse.json({ message: data });
    } else {
        const response = await fetch('https://api.imgur.com/3/image', {
            method: "POST",
            headers: {
                Authorization: "Client-ID 7324c50a109680f",
            },
            body: fd,
            redirect: 'follow',
        })
        const data = await response.json();
        return NextResponse.json({ message: data });
    }
}