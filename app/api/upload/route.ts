import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { image } = await request.json();
  const fd = new FormData();
  fd.append("image", image);
  fd.append("type", "base64");
  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID " + process.env.IMGUR_ID1,
      },
      body: fd,
      redirect: "follow",
    });
    const data = await response.json();
    if (data.status == 200) {
      return NextResponse.json({ message: data });
    }
  } catch (error) {
    console.log(error)
    throw(error)
  }

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID " + process.env.IMGUR_ID2,
      },
      body: fd,
      redirect: "follow",
    });
    const data = await response.json();
    if (data.status == 200) {
      return NextResponse.json({ message: data });
    }
  } catch (error) {
    console.log(error)
    throw(error)
  }
}
