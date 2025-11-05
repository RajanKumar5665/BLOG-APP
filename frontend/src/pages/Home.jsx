import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { ArrowRight, Loader2, BookOpen } from 'lucide-react'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs()
      setBlogs(response.data.reverse())
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load blogs',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Amazing Blogs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover stories, insights, and knowledge from our community of writers
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
          <p className="text-gray-500">Be the first to share your story!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg group"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-indigo-500/20">
                {blog.blogImage?.url ? (
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop&crop=center`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600">
                    <BookOpen className="h-16 w-16 text-white/50" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                  {blog.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {blog.about?.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={blog.adminPhoto} alt={blog.adminName} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {blog.adminName?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{blog.adminName || 'Anonymous'}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link to={`/blog/${blog._id}`}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

