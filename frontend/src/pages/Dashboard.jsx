import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { PlusCircle, Edit, Trash2, Loader2, BookOpen, ArrowRight } from 'lucide-react'

function DashboardContent() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchMyBlogs()
  }, [])

  const fetchMyBlogs = async () => {
    try {
      const response = await blogAPI.getMyBlogs()
      setBlogs(response.data.reverse())
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load your blogs',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return
    }

    setDeleting(id)
    try {
      await blogAPI.deleteBlog(id)
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      })
      fetchMyBlogs()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete blog',
        variant: 'destructive',
      })
    } finally {
      setDeleting(null)
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your blogs and content</p>
        </div>
        <Link to="/create-blog">
          <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Blog
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <Card className="text-center py-20 border-0 shadow-lg">
          <CardContent>
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
            <p className="text-gray-500 mb-6">Start creating your first blog post!</p>
            <Link to="/create-blog">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-indigo-500/20">
                {blog.blogImage?.url ? (
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
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
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {blog.about?.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between space-x-2">
                  <Link to={`/blog/${blog._id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/edit-blog/${blog._id}`}>
                    <Button variant="secondary" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(blog._id)}
                    disabled={deleting === blog._id}
                  >
                    {deleting === blog._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <DashboardContent />
    </ProtectedRoute>
  )
}

