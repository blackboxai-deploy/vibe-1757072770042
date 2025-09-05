"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function BuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'template' | 'customize' | 'content'>('template');
  const [siteData, setSiteData] = useState({
    siteName: '',
    description: '',
    niche: '',
    primaryColor: '#3b82f6'
  });

  const templates = [
    {
      id: 'tech-reviews',
      name: 'Tech Reviews Pro',
      description: 'Perfect for gadget and software reviews with comparison tables',
      category: 'Technology',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c55da1c7-5b7a-4da4-8e31-d622097be3a5.png',
      features: ['Product Comparison Tables', 'Review Ratings', 'Affiliate Links', 'SEO Optimized']
    },
    {
      id: 'fashion-lifestyle',
      name: 'Fashion Elite',
      description: 'Elegant design perfect for fashion and lifestyle affiliates',
      category: 'Fashion',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e4b35e65-7422-4ae7-b17d-7b120cddb146.png',
      features: ['Product Galleries', 'Style Guides', 'Trend Analytics', 'Social Integration']
    },
    {
      id: 'travel-deals',
      name: 'Travel Explorer',
      description: 'Showcase destinations and travel deals beautifully',
      category: 'Travel',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d35d753a-c3de-4caa-bc23-4720c0ec841c.png',
      features: ['Destination Guides', 'Booking Widgets', 'Deal Alerts', 'Travel Tools']
    },
    {
      id: 'health-fitness',
      name: 'Health & Wellness',
      description: 'Clean, trustworthy design for health and fitness products',
      category: 'Health',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/152ce170-2b11-401c-9648-36660fe3bdc0.png',
      features: ['Product Reviews', 'Health Tools', 'Progress Tracking', 'Expert Content']
    },
    {
      id: 'home-garden',
      name: 'Home & Garden',
      description: 'Perfect for home improvement and garden affiliates',
      category: 'Home',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/57f5ff66-74b8-4420-99b7-dea09fa627b0.png',
      features: ['DIY Guides', 'Product Catalogs', 'Room Planners', 'Seasonal Content']
    },
    {
      id: 'finance-crypto',
      name: 'Finance Pro',
      description: 'Professional look for financial products and crypto',
      category: 'Finance',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f5c848c1-fa47-45bd-8463-3ce82488bbed.png',
      features: ['Market Data', 'Calculator Tools', 'Investment Guides', 'Security Features']
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep('customize');
  };

  const handleNext = () => {
    if (currentStep === 'customize') {
      setCurrentStep('content');
    } else if (currentStep === 'content') {
      // Navigate to the actual builder interface
      console.log('Creating site with:', { selectedTemplate, siteData });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AffiliateForge
              </span>
            </Link>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep === 'template' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 'template' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                  1
                </div>
                <span>Choose Template</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`flex items-center space-x-2 ${currentStep === 'customize' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 'customize' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                  2
                </div>
                <span>Customize</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`flex items-center space-x-2 ${currentStep === 'content' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === 'content' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                  3
                </div>
                <span>Add Content</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost">
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'template' && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Perfect Template
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select from our professionally designed templates optimized for affiliate marketing success.
              </p>
            </div>

            {/* Template Categories */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full grid-cols-7 max-w-4xl mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="technology">Tech</TabsTrigger>
                <TabsTrigger value="fashion">Fashion</TabsTrigger>
                <TabsTrigger value="travel">Travel</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {templates.map((template) => (
                    <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
                          onClick={() => handleTemplateSelect(template.id)}>
                      <div className="aspect-video bg-gray-100">
                        <img 
                          src={template.image} 
                          alt={template.description}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                          <div className="flex flex-wrap gap-1">
                            {template.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          Use This Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {currentStep === 'customize' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Customize Your Site
              </h1>
              <p className="text-xl text-gray-600">
                Set up your site details and brand colors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      placeholder="My Affiliate Site"
                      value={siteData.siteName}
                      onChange={(e) => setSiteData(prev => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your affiliate site..."
                      value={siteData.description}
                      onChange={(e) => setSiteData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niche">Niche/Category</Label>
                    <Select value={siteData.niche} onValueChange={(value) => setSiteData(prev => ({ ...prev, niche: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your niche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="fashion">Fashion & Lifestyle</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="health">Health & Fitness</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="finance">Finance & Investing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Brand Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={siteData.primaryColor}
                        onChange={(e) => setSiteData(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={siteData.primaryColor}
                        onChange={(e) => setSiteData(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button variant="outline" onClick={() => setCurrentStep('template')}>
                      ← Back
                    </Button>
                    <Button onClick={handleNext}>
                      Next Step →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {siteData.siteName || 'Your Site Name'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {siteData.description || 'Your site description will appear here...'}
                      </p>
                      <div 
                        className="w-full h-2 rounded mt-4"
                        style={{ backgroundColor: siteData.primaryColor }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 'content' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Add Your Content
              </h1>
              <p className="text-xl text-gray-600">
                Let AI help you create compelling content for your affiliate site.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI Content Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">🤖 AI-Powered Content</h3>
                  <p className="text-blue-800">
                    Our AI will analyze your niche and generate high-converting content including:
                  </p>
                  <ul className="list-disc list-inside text-blue-800 mt-2 space-y-1">
                    <li>Product reviews and comparisons</li>
                    <li>SEO-optimized blog posts</li>
                    <li>Call-to-action buttons</li>
                    <li>Meta descriptions and titles</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Content Preferences</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Product review pages</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Comparison tables</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Blog articles</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">About page</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tone & Style</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="tone" value="professional" defaultChecked className="rounded" />
                        <span className="text-sm">Professional & Trustworthy</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="tone" value="casual" className="rounded" />
                        <span className="text-sm">Casual & Friendly</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="tone" value="expert" className="rounded" />
                        <span className="text-sm">Expert & Technical</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="tone" value="enthusiast" className="rounded" />
                        <span className="text-sm">Enthusiast & Passionate</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setCurrentStep('customize')}>
                    ← Back
                  </Button>
                  <Button onClick={handleNext} size="lg">
                    Create My Site! 🚀
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}