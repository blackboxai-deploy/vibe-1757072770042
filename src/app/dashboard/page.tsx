"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardPage() {
  const [selectedSite, setSelectedSite] = useState('tech-reviews-site');

  // Mock data - in a real app, this would come from an API
  const userSites = [
    {
      id: 'tech-reviews-site',
      name: 'Tech Reviews Pro',
      domain: 'techreviews.affiliateforge.site',
      template: 'tech-reviews',
      status: 'published',
      views: 12450,
      clicks: 892,
      conversions: 47,
      revenue: 1234.56,
      lastUpdated: '2 days ago'
    },
    {
      id: 'fitness-guide',
      name: 'Fitness Authority',
      domain: 'fitnessauth.affiliateforge.site',
      template: 'health-fitness',
      status: 'draft',
      views: 3200,
      clicks: 156,
      conversions: 8,
      revenue: 342.18,
      lastUpdated: '1 week ago'
    }
  ];

  const currentSite = userSites.find(site => site.id === selectedSite);

  const conversionRate = currentSite ? ((currentSite.conversions / currentSite.clicks) * 100) : 0;
  const ctr = currentSite ? ((currentSite.clicks / currentSite.views) * 100) : 0;

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
            
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/builder">+ New Site</Link>
              </Button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your affiliate sites today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sites</p>
                  <p className="text-2xl font-bold text-gray-900">{userSites.length}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🌐</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userSites.reduce((sum, site) => sum + site.views, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">👁️</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userSites.reduce((sum, site) => sum + site.clicks, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">🖱️</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${userSites.reduce((sum, site) => sum + site.revenue, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Site Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Sites */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Affiliate Sites</CardTitle>
                  <Button size="sm" asChild>
                    <Link href="/builder">+ Create New</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userSites.map((site) => (
                    <div key={site.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{site.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{site.name}</h3>
                          <p className="text-sm text-gray-600">{site.domain}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={site.status === 'published' ? 'default' : 'secondary'}>
                              {site.status}
                            </Badge>
                            <span className="text-xs text-gray-500">Updated {site.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost">
                          Stats
                        </Button>
                        {site.status === 'published' && (
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Site Performance</CardTitle>
                <CardDescription>
                  Detailed analytics for your selected site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedSite} onValueChange={setSelectedSite} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    {userSites.map((site) => (
                      <TabsTrigger key={site.id} value={site.id} className="text-xs">
                        {site.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {userSites.map((site) => (
                    <TabsContent key={site.id} value={site.id} className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{site.views.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{site.clicks.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Clicks</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{site.conversions}</p>
                          <p className="text-sm text-gray-600">Conversions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">${site.revenue.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Click-through Rate</span>
                            <span>{ctr.toFixed(2)}%</span>
                          </div>
                          <Progress value={ctr} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Conversion Rate</span>
                            <span>{conversionRate.toFixed(2)}%</span>
                          </div>
                          <Progress value={conversionRate} className="h-2" />
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/builder">🚀 Create New Site</Link>
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  🔗 Manage Links
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  📊 View All Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  🤖 AI Content Writer
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New conversion on Tech Reviews Pro</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Page view milestone reached</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Site published successfully</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips & Resources */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Optimize Your CTR</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Use compelling call-to-action buttons to increase click-through rates.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Content is King</p>
                    <p className="text-xs text-green-700 mt-1">
                      Regular, high-quality content drives more organic traffic.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}