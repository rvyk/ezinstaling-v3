import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll("files");

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Files are required." },
        { status: 400 },
      );
    }

    const uploadPromises = Array.from(files).map(async (file: any) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const params = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${crypto.randomBytes(24).toString("hex")}.png`,
        Body: buffer,
        ContentType: "image/png",
      };

      const command = new PutObjectCommand(params);
      await r2.send(command);

      return `${process.env.NEXT_PUBLIC_CDN}/${params.Key}`;
    });

    const results = await Promise.all(uploadPromises);
    return NextResponse.json({ success: true, urls: results });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
