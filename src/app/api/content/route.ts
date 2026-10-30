import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

const DEFAULT_CONTENT = {
  homepage: {
    announcementText: '⚡ Direct Booking Desk: Best Rates Guaranteed · Save 15% · 100% Couple Friendly Stay',
    heroTitle: 'Designed for Comfort, Rest & Romance in North Goa',
    heroSubtitle: 'Escape to a serene boutique sanctuary just 450 meters from Calangute Beach. Enjoy authentic Bengali cuisine, romantic honeymoon bed setups, and heartfelt coastal hospitality.',
    beachDistance: '450 meters (5 mins walk to Calangute Beach)',
    phoneDisplay: '+91 90640 22151',
    whatsappResponseTime: 'Replies in < 2 minutes',
  },
  about_us: {
    storyTitle: "Where Bengal's Soulful Hospitality Meets Goa's Golden Shores",
    storyContent:
      'Hotel Sonar Bangla was envisioned as an intimate coastal sanctuary for discerning travelers, newlyweds, and families who appreciate heartfelt hospitality and culinary comfort. Situated just 450 meters from the golden sands of Calangute Beach, we blend serene coastal leisure with the warmth of Bengali culture.',
    cuisineHighlight:
      'From morning Koraishutir Kochuri to fresh coastal Bhetki Paturi, jumbo Chingri Malai Curry, and slow-simmered Kosha Mangsho, our kitchen prepares pure, homestyle food using authentic stone-ground spices.',
    locationHighlight:
      'Tucked away in a tranquil, tree-lined lane only a 5-minute stroll from Calangute Beach, yet moments away from vibrant beach shacks, scooter rentals, and North Goa nightlife.',
  },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'homepage' | 'about_us' | null

    const db = await getDatabase();
    const collection = db.collection('site_content');

    if (type) {
      const doc = await collection.findOne({ type });
      if (doc) {
        return NextResponse.json({ success: true, data: doc.data });
      }
      return NextResponse.json({
        success: true,
        data: DEFAULT_CONTENT[type as keyof typeof DEFAULT_CONTENT] || {},
      });
    }

    const allDocs = await collection.find({}).toArray();
    const contentMap: Record<string, any> = { ...DEFAULT_CONTENT };

    for (const doc of allDocs) {
      if (doc.type && doc.data) {
        contentMap[doc.type] = { ...contentMap[doc.type], ...doc.data };
      }
    }

    return NextResponse.json({ success: true, content: contentMap });
  } catch (error: any) {
    console.error('Error fetching site content from MongoDB:', error);
    return NextResponse.json({ success: true, content: DEFAULT_CONTENT, isFallback: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Type and data are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection('site_content').updateOne(
      { type },
      {
        $set: {
          type,
          data,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: `${type} content successfully saved to MongoDB!`,
    });
  } catch (error: any) {
    console.error('Error saving site content to MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

