import { NextResponse } from 'next/server';
import { INITIAL_GALLERY_PHOTOS } from '@/data/hotelData';
import { GalleryPhoto } from '@/types/hotel';

// In-memory store for server lifetime
let photosStore: GalleryPhoto[] = [...INITIAL_GALLERY_PHOTOS];

export async function GET() {
  return NextResponse.json({
    success: true,
    photos: photosStore,
  });
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

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url,
      title,
      caption: caption || title,
      tag,
      date: 'Just now',
      uploadedByStaff: true,
    };

    // Prepend so latest staff upload appears first
    photosStore = [newPhoto, ...photosStore];

    return NextResponse.json({
      success: true,
      message: 'Photo published to Goa Moments gallery!',
      photo: newPhoto,
      photos: photosStore,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to upload photo', error: String(error) },
      { status: 500 }
    );
  }
}

