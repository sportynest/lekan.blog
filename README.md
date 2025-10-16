# Lekan Blog

A modern, responsive personal blog built with Next.js, TypeScript, and Tailwind CSS. This blog focuses on sharing insights about software development, technology, artificial intelligence, and philosophy.

## Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme**: Built-in theme toggle with system preference detection
- **Markdown Support**: Write blog posts in Markdown with frontmatter metadata
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and structured data
- **Fast Performance**: Static generation and optimized images
- **Accessible**: Built with accessibility best practices
- **Component Library**: Shadcn/ui components for consistent UI

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Content Processing**: Gray-matter, Remark
- **Icons**: Lucide React, Heroicons
- **Theming**: Next-themes

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Getting Started
```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the blog.

## Writing Blog Posts

Blog posts are stored as Markdown files in the `posts/` directory. Each post must have frontmatter metadata:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-01"
excerpt: "A brief description of your blog post that will appear in the post listing."
---

# Your Blog Post Content

Write your content in Markdown format...
```

### Frontmatter Fields
- `title`: The title of your blog post
- `date`: Publication date in YYYY-MM-DD format
- `excerpt`: A brief description for the post listing

### Adding a New Post
1. Create a new `.md` file in the `posts/` directory
2. Add the required frontmatter
3. Write your content in Markdown
4. The post will automatically appear on the homepage

## Project Structure

```
lekan.blog/
├── app/                    # Next.js 13+ app directory
│   ├── blog/              # Blog-related pages
│   ├── components/        # Reusable components
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Shared components
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utility functions
│   └── blog.ts          # Blog post processing
├── posts/                # Markdown blog posts
└── public/               # Static assets
```

## Customization

### Styling
The blog uses Tailwind CSS for styling. Main style files:
- `app/globals.css` - Global styles and Tailwind imports
- `app/app.css` - App-specific styles
- `app/home.css` - Homepage styles
- `app/blog-post.css` - Blog post styles

### Components
UI components are located in `components/ui/` and follow the Shadcn/ui pattern. You can customize them or add new ones as needed.

### Metadata
Update site metadata in `app/layout.tsx`:
- Site title and description
- Open Graph and Twitter Card data
- SEO settings
