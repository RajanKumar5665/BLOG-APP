import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { userAPI } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Loader2, User, Mail, Phone, GraduationCap, Shield } from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function ProfileContent() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getMyProfile()
      setProfile(response.data.user)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load profile',
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

  const getUserInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <Card className="shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={profile?.photo?.url} alt={profile?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                {getUserInitials(profile?.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl mb-2">{profile?.name || 'User'}</CardTitle>
          <div className="flex items-center justify-center space-x-2">
            {profile?.role === 'admin' && (
              <>
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Admin</span>
              </>
            )}
            {profile?.role === 'user' && (
              <span className="text-gray-600">User</span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-900">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">{profile?.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="rounded-full bg-primary/10 p-3">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <p className="font-semibold text-gray-900">{profile?.education || 'Not provided'}</p>
              </div>
            </div>

            {profile?.createdAt && (
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                <div className="rounded-full bg-primary/10 p-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}

