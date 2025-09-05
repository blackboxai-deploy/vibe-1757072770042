import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, contentType, niche, tone } = await request.json();

    // Validate required parameters
    if (!prompt || !contentType) {
      return NextResponse.json(
        { error: 'Missing required parameters: prompt and contentType' },
        { status: 400 }
      );
    }

    // Construct system prompt based on request parameters
    const systemPrompt = `You are an expert affiliate marketing content writer. Create high-converting, SEO-optimized content for affiliate websites.

Content Type: ${contentType}
Niche: ${niche || 'general'}
Tone: ${tone || 'professional'}

Guidelines:
- Write compelling, trustworthy content that builds authority
- Include natural calls-to-action without being overly salesy
- Optimize for search engines with relevant keywords
- Focus on providing value to readers
- Use the specified tone consistently
- Format content appropriately (HTML for web content, plain text for meta descriptions, etc.)

Generate content that helps affiliate marketers convert visitors into customers while maintaining credibility and trust.`;

    // Make request to AI service
    const response = await fetch('https://oi-server.onrender.com/chat/completions', {
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error('AI API Error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to generate content. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid AI API response:', data);
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      );
    }

    const generatedContent = data.choices[0].message.content;

    return NextResponse.json({
      success: true,
      content: generatedContent,
      metadata: {
        contentType,
        niche,
        tone,
        wordCount: generatedContent.split(' ').length
      }
    });

  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}