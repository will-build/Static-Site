# Simple Static Site Generator

A minimal static site generator that converts Markdown files to HTML with a simple Node.js build process.

## Features

- ✅ Markdown-based content
- ✅ Simple build process
- ✅ Clean, responsive design
- ✅ Blog functionality
- ✅ Fast loading times
- ✅ No complex frameworks

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the site:**
   ```bash
   npm run build
   ```

3. **Preview locally:**
   ```bash
   npm run dev
   ```
   Then open http://localhost:8000 in your browser.

## Project Structure

```
├── content/
│   ├── pages/          # Static pages (About, FAQ, etc.)
│   └── blog/           # Blog posts
├── src/
│   └── templates/      # HTML templates
├── dist/               # Generated HTML files
├── build.js            # Build script
└── package.json
```

## Adding Content

### Pages
Create Markdown files in `content/pages/` with frontmatter:

```markdown
---
title: Page Title
slug: page-slug
---

# Your content here
```

### Blog Posts
Create Markdown files in `content/blog/` with frontmatter:

```markdown
---
title: Post Title
slug: post-slug
date: 2024-01-15
excerpt: Brief description
---

# Your blog post content
```

## Deployment

The `dist/` folder contains all the generated HTML files. You can deploy this to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Customization

- **Styling**: Edit `dist/css/style.css`
- **Templates**: Modify files in `src/templates/`
- **Build process**: Customize `build.js`

## Next Steps

- Add a contact form
- Integrate with ConvertKit
- Add search functionality
- Set up analytics