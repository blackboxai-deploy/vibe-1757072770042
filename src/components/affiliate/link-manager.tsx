"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AffiliateLink {
  id: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  category: string;
  description?: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  isActive: boolean;
}

interface LinkStats {
  totalLinks: number;
  activeLinks: number;
  clicks: number;
  conversions: number;
  revenue: number;
  conversionRate: string;
}

export default function LinkManager() {
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [stats, setStats] = useState<LinkStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state for new link
  const [formData, setFormData] = useState({
    title: '',
    originalUrl: '',
    category: '',
    description: ''
  });

  const categories = [
    'Technology', 'Fashion', 'Travel', 'Health', 'Home', 'Finance', 'Food', 'Sports', 'Beauty', 'Books'
  ];

  // Fetch affiliate links
  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/affiliate-links?category=${selectedCategory}&limit=20`);
      const result = await response.json();
      
      if (result.success) {
        setLinks(result.data.links);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [selectedCategory]);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await fetch('/api/affiliate-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setLinks(prev => [result.data, ...prev]);
        setFormData({ title: '', originalUrl: '', category: '', description: '' });
        setIsDialogOpen(false);
        // Update stats
        await fetchLinks();
      } else {
        alert(result.error || 'Failed to create link');
      }
    } catch (error) {
      console.error('Error creating link:', error);
      alert('Failed to create link');
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
    alert('Copied to clipboard!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 5) return 'text-green-600';
    if (rate >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Links</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLinks}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🔗</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.clicks.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">👆</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.conversions}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">✨</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Affiliate Link Management</CardTitle>
              <CardDescription>
                Create, manage, and track your affiliate links
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>+ Create Link</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateLink}>
                  <DialogHeader>
                    <DialogTitle>Create New Affiliate Link</DialogTitle>
                    <DialogDescription>
                      Add a new affiliate link to track and manage
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Link Title</Label>
                      <Input
                        id="title"
                        placeholder="iPhone 15 Pro Max"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="originalUrl">Original URL</Label>
                      <Input
                        id="originalUrl"
                        type="url"
                        placeholder="https://amazon.com/dp/..."
                        value={formData.originalUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, originalUrl: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the product or offer..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreating}>
                      {isCreating ? 'Creating...' : 'Create Link'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="technology">Tech</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-6">
              {links.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No affiliate links yet</h3>
                  <p className="text-gray-600 mb-4">Create your first affiliate link to start tracking performance</p>
                  <Button onClick={() => setIsDialogOpen(true)}>Create Link</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {links.map((link) => {
                    const conversionRate = link.clicks > 0 ? (link.conversions / link.clicks * 100) : 0;
                    
                    return (
                      <Card key={link.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-start space-x-3">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="font-semibold text-gray-900">{link.title}</h3>
                                    <Badge variant="secondary">{link.category}</Badge>
                                    {link.isActive ? (
                                      <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                                    ) : (
                                      <Badge variant="secondary">Inactive</Badge>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2 mb-4">
                                    <div>
                                      <Label className="text-xs text-gray-500">Short URL</Label>
                                      <div className="flex items-center space-x-2">
                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                          {link.shortUrl}
                                        </code>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => copyToClipboard(link.shortUrl)}
                                        >
                                          Copy
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <Label className="text-xs text-gray-500">Original URL</Label>
                                      <p className="text-sm text-gray-600 truncate max-w-md">
                                        {link.originalUrl}
                                      </p>
                                    </div>
                                    
                                    {link.description && (
                                      <div>
                                        <Label className="text-xs text-gray-500">Description</Label>
                                        <p className="text-sm text-gray-600">{link.description}</p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="text-xs text-gray-500">
                                    Created {formatDate(link.createdAt)}
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="grid grid-cols-4 gap-4 mb-4">
                                    <div className="text-center">
                                      <p className="text-lg font-semibold text-blue-600">{link.clicks}</p>
                                      <p className="text-xs text-gray-500">Clicks</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-lg font-semibold text-green-600">{link.conversions}</p>
                                      <p className="text-xs text-gray-500">Conversions</p>
                                    </div>
                                    <div className="text-center">
                                      <p className={`text-lg font-semibold ${getPerformanceColor(conversionRate)}`}>
                                        {conversionRate.toFixed(1)}%
                                      </p>
                                      <p className="text-xs text-gray-500">CVR</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-lg font-semibold text-orange-600">
                                        ${link.revenue.toFixed(2)}
                                      </p>
                                      <p className="text-xs text-gray-500">Revenue</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">Edit</Button>
                                    <Button size="sm" variant="ghost">Analytics</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}