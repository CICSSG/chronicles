import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fileValue = formData.get("file");
  const base64Value = formData.get("imageBase64");

  let uploadFile: File | null = null;

  if (fileValue instanceof File) {
    uploadFile = fileValue;
  } else if (typeof base64Value === "string") {
    const mimeMatch = base64Value.match(/^data:([^;]+);base64,/);
    const mimeType = mimeMatch?.[1] ?? "image/jpeg";
    const base64Data = base64Value.replace(/^data:.+base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const extension = mimeType.split("/")[1] ?? "jpg";
    uploadFile = new File([buffer], `upload.${extension}`, { type: mimeType });
  }

  if (!uploadFile) {
    return NextResponse.json(
      { message: { success: false, data: { link: "" } } },
      { status: 400 },
    );
  }

  try {
    const blob = await put(uploadFile.name, uploadFile, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      message: {
        success: true,
        data: {
          link: blob.url,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: { success: false, data: { link: "" } } },
      { status: 500 },
    );
  }
}
