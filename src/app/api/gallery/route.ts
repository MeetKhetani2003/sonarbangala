import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/mongodb';
import { INITIAL_GALLERY_PHOTOS } from '@/data/hotelData';
import { GalleryPhoto } from '@/types/hotel';

export async function GET() {
  try {
    const db = await getDatabase();
    const count = await db.collection('gallery').countDocuments();

    // Auto-seed initial photos if empty
    if (count === 0) {
      const seeded = INITIAL_GALLERY_PHOTOS.map((p, idx) => ({
        ...p,
        order: idx,
        createdAt: new Date(Date.now() - idx * 86400000),
      }));
      await db.collection('gallery').insertMany(seeded);
    }

    const docs = await db
      .collection('gallery')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const photos: GalleryPhoto[] = docs.map((doc) => ({
      id: doc._id.toString(),
      url: doc.url,
      title: doc.title,
      caption: doc.caption || doc.title,
      tag: doc.tag || 'general',
      date: doc.date || 'Recent',
      uploadedByStaff: Boolean(doc.uploadedByStaff),
    }));

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error: any) {
    console.error('Error in gallery GET:', error);
    // Fallback to static data on DB connection issue
    return NextResponse.json({
      success: true,
      photos: INITIAL_GALLERY_PHOTOS,
      isFallback: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, title, caption, tag } = body;

    if (!url || !title || !tag) {
      return NextResponse.json(
        { success: false, message: 'URL, title, and tag are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const newDoc = {
      url,
      title,
      caption: caption || title,
      tag,
      date: 'Just now',
      uploadedByStaff: true,
      createdAt: new Date(),
    };

    const result = await db.collection('gallery').insertOne(newDoc);

    const newPhoto: GalleryPhoto = {
      id: result.insertedId.toString(),
      url,
      title,
      caption: caption || title,
      tag,
      date: 'Just now',
      uploadedByStaff: true,
    };

    return NextResponse.json({
      success: true,
      message: 'Photo saved to MongoDB & published to Goa Moments gallery!',
      photo: newPhoto,
    });
  } catch (error: any) {
    console.error('Error in gallery POST:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload photo', error: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Photo id is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    let query: Record<string, any>;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { id };
    }

    const result = await db.collection('gallery').deleteOne(query);

    if (result.deletedCount === 0) {
      // Also try matching string id
      await db.collection('gallery').deleteOne({ id });
    }

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully from MongoDB',
    });
  } catch (error: any) {
    console.error('Error in gallery DELETE:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete photo', error: error?.message },
      { status: 500 }
    );
  }
}
