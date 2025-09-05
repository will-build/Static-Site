---
title: Frequently Asked Questions
slug: faq
---

# Frequently Asked Questions

Here are some common questions about this static site and how it works.

## How does this site work?

This site uses a simple static site generator built with Node.js. Markdown files are converted to HTML during the build process, creating a fast, static website.

## Why not use a framework like Next.js or Gatsby?

While those frameworks are powerful, they add complexity that isn't always necessary. This approach keeps things simple and fast, with minimal dependencies and a straightforward build process.

## How do I add new content?

1. Create a new Markdown file in the `content/pages` or `content/blog` directory
2. Add frontmatter at the top with title, slug, and other metadata
3. Run `npm run build` to generate the HTML
4. The new page will be available on your site

## Can I customize the design?

Absolutely! The CSS is in `dist/css/style.css` and can be modified to match your preferences. The HTML templates are in `src/templates/` and can be customized as needed.

## How do I deploy this site?

Since this generates static HTML files, you can deploy to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Is this suitable for large sites?

This approach works well for small to medium-sized sites. For very large sites with hundreds of pages, you might want to consider more sophisticated static site generators, but for most use cases, this simple approach is perfect.

## Can I add features like search or comments?

Yes! You can add client-side JavaScript for features like search, or integrate with third-party services for comments (like Disqus) or analytics.
