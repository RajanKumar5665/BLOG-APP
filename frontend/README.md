# Blog App Frontend

A modern, beautiful blog application built with React, Vite, and shadcn UI.

## Features

- 🎨 Beautiful, modern UI with shadcn UI components
- 🔐 User authentication (Login/Register)
- 📝 Blog creation, editing, and deletion (Admin only)
- 📖 Blog listing and detailed view
- 👤 User profile management
- 🖼️ Image upload and display
- 📱 Responsive design
- 🎯 Protected routes for authenticated users

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **shadcn UI** - UI component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── ui/          # shadcn UI components
│   │   ├── Layout.jsx   # Main layout component
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React contexts
│   │   └── AuthContext.jsx
│   ├── hooks/           # Custom hooks
│   │   └── use-toast.js
│   ├── lib/             # Utilities and API
│   │   ├── api.js       # API service layer
│   │   └── utils.js     # Utility functions
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreateBlog.jsx
│   │   └── EditBlog.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Backend API

Make sure your backend server is running on `http://localhost:3000` (or update the API URL in `.env`).

## Features Overview

### Authentication
- **Login**: Users can login with email, password, and role (user/admin)
- **Register**: New users can create an account with profile picture
- **Protected Routes**: Only authenticated users can access certain pages
- **Admin Routes**: Only admin users can access dashboard and blog management

### Blog Management (Admin Only)
- **Create Blog**: Create new blog posts with title, category, content, and image
- **Edit Blog**: Update existing blog posts
- **Delete Blog**: Remove blog posts
- **Dashboard**: View and manage all your blogs

### Blog Viewing (All Users)
- **Home Page**: Browse all published blogs
- **Blog Detail**: View full blog post with beautiful layout
- **Categories**: Blogs organized by categories
- **Responsive Cards**: Beautiful card layout with images

### Profile
- **User Profile**: View your profile information
- **Avatar Display**: Profile pictures displayed throughout the app

## Notes

- Images are uploaded via the backend API (Cloudinary)
- The app uses JWT tokens stored in localStorage for authentication
- All API calls include authentication tokens automatically
- Images that fail to load will show a fallback from Unsplash

