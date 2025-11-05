import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogAPI } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'
import { ArrowLeft, Loader2, Trash2, Edit } from 'lucide-react'
import { format } from 'date-fns'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getSingleBlog(id)
      setBlog(response.data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load blog',
        variant: 'destructive',
      })
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return
    }

    setDeleting(true)
    try {
      await blogAPI.deleteBlog(id)
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      })
      navigate('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete blog',
        variant: 'destructive',
      })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Blog not found</h2>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
      </Link>

      <Card className="overflow-hidden shadow-xl border-0">
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-primary/20 to-indigo-500/20">
          {blog.blogImage?.url ? (
            <img
              src={blog.blogImage.url}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop&crop=center`
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600">
              <span className="text-6xl text-white/50">📝</span>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              {blog.category}
            </span>
          </div>
          {isAdmin && user?._id === blog.createdBy && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/edit-blog/${blog._id}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center space-x-4 mb-8 pb-6 border-b">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blog.adminPhoto} alt={blog.adminName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {blog.adminName?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{blog.adminName || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">
                {blog.createdAt ? format(new Date(blog.createdAt), 'MMMM dd, yyyy') : 'Recently'}
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {blog.about}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

