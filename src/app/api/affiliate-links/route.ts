import { NextRequest, NextResponse } from 'next/server';

// Mock database - in a real app, this would be a proper database
let affiliateLinks = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    originalUrl: 'https://amazon.com/dp/B0CHX1W1XY',
    shortUrl: 'https://affiliateforge.site/go/iphone15',
    category: 'Technology',
    clicks: 145,
    conversions: 8,
    revenue: 234.67,
    createdAt: new Date('2024-01-15').toISOString(),
    isActive: true
  },
  {
    id: '2',
    title: 'MacBook Air M3',
    originalUrl: 'https://amazon.com/dp/B0CX23V2ZK',
    shortUrl: 'https://affiliateforge.site/go/macbook-air',
    category: 'Technology',
    clicks: 89,
    conversions: 3,
    revenue: 156.33,
    createdAt: new Date('2024-01-10').toISOString(),
    isActive: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');

    let filteredLinks = [...affiliateLinks];

    // Filter by category if specified
    if (category && category !== 'all') {
      filteredLinks = filteredLinks.filter(link => 
        link.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLinks = filteredLinks.slice(startIndex, endIndex);

    // Calculate total stats
    const totalStats = affiliateLinks.reduce((acc, link) => ({
      clicks: acc.clicks + link.clicks,
      conversions: acc.conversions + link.conversions,
      revenue: acc.revenue + link.revenue
    }), { clicks: 0, conversions: 0, revenue: 0 });

    return NextResponse.json({
      success: true,
      data: {
        links: paginatedLinks,
        pagination: {
          current: page,
          total: Math.ceil(filteredLinks.length / limit),
          hasNext: endIndex < filteredLinks.length,
          hasPrev: page > 1
        },
        stats: {
          totalLinks: affiliateLinks.length,
          activeLinks: affiliateLinks.filter(link => link.isActive).length,
          ...totalStats,
          conversionRate: totalStats.clicks > 0 ? 
            (totalStats.conversions / totalStats.clicks * 100).toFixed(2) : '0.00'
        }
      }
    });
  } catch (error) {
    console.error('Error fetching affiliate links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch affiliate links' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, originalUrl, category, description } = await request.json();

    // Validate required fields
    if (!title || !originalUrl || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, originalUrl, and category' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Generate short URL slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);

    // Create new affiliate link
    const newLink = {
      id: Date.now().toString(),
      title,
      originalUrl,
      shortUrl: `https://affiliateforge.site/go/${slug}`,
      category,
      description: description || '',
      clicks: 0,
      conversions: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    affiliateLinks.unshift(newLink);

    return NextResponse.json({
      success: true,
      data: newLink,
      message: 'Affiliate link created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating affiliate link:', error);
    return NextResponse.json(
      { error: 'Failed to create affiliate link' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, originalUrl, category, description, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Link ID is required' },
        { status: 400 }
      );
    }

    const linkIndex = affiliateLinks.findIndex(link => link.id === id);
    
    if (linkIndex === -1) {
      return NextResponse.json(
        { error: 'Affiliate link not found' },
        { status: 404 }
      );
    }

    // Update the link
    const updatedLink = {
      ...affiliateLinks[linkIndex],
      ...(title && { title }),
      ...(originalUrl && { originalUrl }),
      ...(category && { category }),
      ...(description !== undefined && { description }),
      ...(isActive !== undefined && { isActive })
    };

    affiliateLinks[linkIndex] = updatedLink;

    return NextResponse.json({
      success: true,
      data: updatedLink,
      message: 'Affiliate link updated successfully'
    });

  } catch (error) {
    console.error('Error updating affiliate link:', error);
    return NextResponse.json(
      { error: 'Failed to update affiliate link' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Link ID is required' },
        { status: 400 }
      );
    }

    const linkIndex = affiliateLinks.findIndex(link => link.id === id);
    
    if (linkIndex === -1) {
      return NextResponse.json(
        { error: 'Affiliate link not found' },
        { status: 404 }
      );
    }

    affiliateLinks.splice(linkIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Affiliate link deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting affiliate link:', error);
    return NextResponse.json(
      { error: 'Failed to delete affiliate link' },
      { status: 500 }
    );
  }
}