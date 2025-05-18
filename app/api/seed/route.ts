import dummyBooks from "../../../dummyBooks.json";
import ImageKit from "imagekit";
import { books } from "@/database/schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextResponse } from "next/server";

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
});

const db = drizzle(client);

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

export async function GET() {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
    return NextResponse.json({ success: true, message: "Data seeded successfully!" });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { success: false, message: "Error seeding data", error },
      { status: 500 }
    );
  } finally {
    // Close the client connection when done
    await client.end();
  }
}