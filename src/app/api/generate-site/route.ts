import { NextRequest, NextResponse } from 'next/server';

// Mock site data storage
let sites: any[] = [
  {
    id: 'tech-reviews-site',
    name: 'Tech Reviews Pro',
    template: 'tech-reviews',
    domain: 'techreviews.affiliateforge.site',
    settings: {
      siteName: 'Tech Reviews Pro',
      description: 'Your trusted source for in-depth technology reviews and comparisons',
      niche: 'technology',
      primaryColor: '#3b82f6',
      theme: {
        primaryColor: '#3b82f6',
        font: 'Inter',
        layout: 'tech-reviews'
      }
    },
    pages: [
      {
        id: 'home',
        title: 'Home',
        slug: '/',
        content: { hero: { headline: 'Tech Reviews Pro', description: 'Your trusted source for in-depth technology reviews and comparisons' } },
        seoTitle: 'Tech Reviews Pro - Product Reviews & Recommendations',
        seoDescription: 'Your trusted source for in-depth technology reviews and comparisons',
        isPublished: true
      }
    ],
    navigation: [{ title: 'Home', url: '/' }, { title: 'Reviews', url: '/reviews' }],
    footer: { copyright: '© 2024 Tech Reviews Pro. All rights reserved.', links: [] },
    status: 'published',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
    analytics: { views: 0, clicks: 0, conversions: 0, revenue: 0 }
  }
];

export async function POST(request: NextRequest) {
  try {
    const { template, settings } = await request.json();

    // Validate required parameters
    if (!template || !settings?.siteName) {
      return NextResponse.json(
        { error: 'Missing required parameters: template and siteName' },
        { status: 400 }
      );
    }

    // Generate site ID and domain
    const siteId = `${settings.siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    const domain = `${siteId.substring(0, 20)}.affiliateforge.site`;

    // Generate AI content for the site
    const aiContentPrompt = `Create a complete affiliate website content structure for:
    
Site Name: ${settings.siteName}
Description: ${settings.description || 'Affiliate marketing website'}
Niche: ${settings.niche || 'general'}
Template: ${template}

Generate the following content:
1. Homepage hero section with compelling headline and description
2. About page content
3. 3-5 product review articles (titles and brief outlines)
4. SEO meta titles and descriptions
5. Navigation menu structure
6. Footer content

Format the response as a JSON object with clear sections for each content type.`;

    let generatedContent = null;
    try {
      const aiResponse = await fetch('https://oi-server.onrender.com/chat/completions', {
        method: 'POST',
        headers: {
          'customerId': 'rudrani319@gmail.com',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xxx'
        },
        body: JSON.stringify({
          model: 'openrouter/anthropic/claude-3-5-sonnet-20241022',
          messages: [
            {
              role: 'system',
              content: 'You are an expert affiliate marketing content strategist. Create comprehensive, SEO-optimized content that converts visitors into customers. Always respond with valid JSON format.'
            },
            {
              role: 'user',
              content: aiContentPrompt
            }
          ],
          max_tokens: 3000,
          temperature: 0.7
        })
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        if (aiData.choices?.[0]?.message?.content) {
          try {
            generatedContent = JSON.parse(aiData.choices[0].message.content);
          } catch {
            // If JSON parsing fails, use the raw content
            generatedContent = { content: aiData.choices[0].message.content };
          }
        }
      }
    } catch (error) {
      console.warn('AI content generation failed, using fallback:', error);
    }

    // Create default pages structure
    const defaultPages = [
      {
        id: 'home',
        title: 'Home',
        slug: '/',
        content: generatedContent?.homepage || {
          hero: {
            headline: `Welcome to ${settings.siteName}`,
            description: settings.description || 'Your trusted source for product recommendations and reviews',
            cta: 'Explore Our Reviews'
          },
          features: [
            'Expert Reviews',
            'Detailed Comparisons',
            'Best Deals',
            'Trusted Recommendations'
          ]
        },
        seoTitle: generatedContent?.seo?.homeTitle || `${settings.siteName} - Product Reviews & Recommendations`,
        seoDescription: generatedContent?.seo?.homeDescription || settings.description || 'Find the best products with our expert reviews and comparisons',
        isPublished: true
      },
      {
        id: 'about',
        title: 'About',
        slug: '/about',
        content: generatedContent?.about || {
          intro: `Welcome to ${settings.siteName}! We're dedicated to helping you make informed purchasing decisions through honest, detailed product reviews.`,
          mission: 'Our mission is to provide unbiased, comprehensive reviews that help you find the perfect products for your needs.',
          team: 'Our team consists of experienced reviewers and industry experts who test products thoroughly before making recommendations.'
        },
        seoTitle: `About ${settings.siteName} - Our Story & Mission`,
        seoDescription: `Learn about ${settings.siteName} and our commitment to providing honest, helpful product reviews and recommendations.`,
        isPublished: true
      }
    ];

    // Add product review pages if AI generated them
    if (generatedContent?.reviews && Array.isArray(generatedContent.reviews)) {
      generatedContent.reviews.forEach((review: any, index: number) => {
        defaultPages.push({
          id: `review-${index + 1}`,
          title: review.title || `Product Review ${index + 1}`,
          slug: `/reviews/${(review.title || `product-${index + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          content: {
            title: review.title,
            outline: review.outline || review.content,
            rating: review.rating || '4.5/5',
            pros: review.pros || [],
            cons: review.cons || [],
            bottomLine: review.bottomLine || review.conclusion
          },
          seoTitle: review.seoTitle || review.title,
          seoDescription: review.seoDescription || `Read our detailed review of ${review.title}`,
          isPublished: true
        });
      });
    }

    // Create the new site
    const newSite = {
      id: siteId,
      name: settings.siteName,
      template,
      domain,
      settings: {
        ...settings,
        theme: {
          primaryColor: settings.primaryColor || '#3b82f6',
          font: 'Inter',
          layout: template
        }
      },
      pages: defaultPages,
      navigation: generatedContent?.navigation || [
        { title: 'Home', url: '/' },
        { title: 'Reviews', url: '/reviews' },
        { title: 'About', url: '/about' },
        { title: 'Contact', url: '/contact' }
      ],
      footer: generatedContent?.footer || {
        copyright: `© 2024 ${settings.siteName}. All rights reserved.`,
        links: [
          { title: 'Privacy Policy', url: '/privacy' },
          { title: 'Terms of Service', url: '/terms' }
        ]
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      analytics: {
        views: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0
      }
    };

    // Add to sites array
    sites.unshift(newSite);

    return NextResponse.json({
      success: true,
      data: {
        site: newSite,
        previewUrl: `https://preview.affiliateforge.com/${siteId}`,
        editUrl: `https://affiliateforge.com/builder/${siteId}`
      },
      message: 'Site generated successfully with AI content'
    }, { status: 201 });

  } catch (error) {
    console.error('Site generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const siteId = url.searchParams.get('id');

    if (siteId) {
      // Get specific site
      const site = sites.find(s => s.id === siteId);
      if (!site) {
        return NextResponse.json(
          { error: 'Site not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: site });
    } else {
      // Get all sites
      return NextResponse.json({ 
        success: true, 
        data: sites.map(site => ({
          id: site.id,
          name: site.name,
          template: site.template,
          domain: site.domain,
          status: site.status,
          createdAt: site.createdAt,
          updatedAt: site.updatedAt,
          analytics: site.analytics || { views: 0, clicks: 0, conversions: 0, revenue: 0 }
        }))
      });
    }
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { siteId, settings, pages, status } = await request.json();

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID is required' },
        { status: 400 }
      );
    }

    const siteIndex = sites.findIndex(site => site.id === siteId);
    if (siteIndex === -1) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      );
    }

    // Update the site
    const updatedSite = {
      ...sites[siteIndex],
      ...(settings && { settings: { ...sites[siteIndex].settings, ...settings } }),
      ...(pages && { pages }),
      ...(status && { status }),
      updatedAt: new Date().toISOString()
    };

    sites[siteIndex] = updatedSite;

    return NextResponse.json({
      success: true,
      data: updatedSite,
      message: 'Site updated successfully'
    });

  } catch (error) {
    console.error('Error updating site:', error);
    return NextResponse.json(
      { error: 'Failed to update site' },
      { status: 500 }
    );
  }
}