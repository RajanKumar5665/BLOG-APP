import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogAPI } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Loader2, Upload, Image as ImageIcon } from 'lucide-react'

const categories = [
  'Technology',
  'Travel',
  'Food',
  'Health',
  'Fashion',
  'Lifestyle',
  'Education',
  'Business',
  'Sports',
  'Entertainment',
]

function CreateBlogContent() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    about: '',
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      toast({
        title: 'Error',
        description: 'Please upload a blog image',
        variant: 'destructive',
      })
      return
    }

    if (formData.about.length < 200) {
      toast({
        title: 'Error',
        description: 'Blog content must be at least 200 characters',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const submitData = new FormData()
      submitData.append('blogImage', image)
      submitData.append('title', formData.title)
      submitData.append('category', formData.category)
      submitData.append('about', formData.about)

      const response = await blogAPI.createBlog(submitData)
      toast({
        title: 'Success!',
        description: 'Blog created successfully',
      })
      navigate(`/blog/${response.data.blog._id}`)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create blog',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-3xl">Create New Blog</CardTitle>
          <CardDescription>
            Share your thoughts and stories with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Blog Image *</Label>
              <div className="space-y-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-gray-500">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-700">
                            Click to upload an image
                          </p>
                          <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Content *</Label>
              <Textarea
                id="about"
                name="about"
                placeholder="Write your blog content here (minimum 200 characters)..."
                value={formData.about}
                onChange={handleChange}
                rows={12}
                required
                minLength={200}
              />
              <p className="text-sm text-gray-500">
                {formData.about.length} / 200 characters minimum
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Blog'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CreateBlog() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <CreateBlogContent />
    </ProtectedRoute>
  )
}

