import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import Layout from '@/components/Layout'
import { Toaster } from '@/components/ui/toaster'

// Pages
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import BlogDetail from '@/pages/BlogDetail'
import Profile from '@/pages/Profile'
import Dashboard from '@/pages/Dashboard'
import CreateBlog from '@/pages/CreateBlog'
import EditBlog from '@/pages/EditBlog'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
          </Routes>
        </Layout>
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App

