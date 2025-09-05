---
title: Deploying Your Static Site
slug: deployment-guide
date: 2024-01-05
excerpt: A comprehensive guide to deploying your static site to various hosting platforms.
---

# Deploying Your Static Site

Once you've built your static site, it's time to deploy it to the web. Here are several options for hosting your static site.

## GitHub Pages

GitHub Pages is free and integrates seamlessly with GitHub repositories.

### Setup
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at `https://username.github.io/repository-name`

### Custom Domain
You can use a custom domain by adding a `CNAME` file to your repository root.

## Netlify

Netlify offers excellent static site hosting with continuous deployment.

### Setup
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on every push

### Features
- Custom domains
- HTTPS by default
- Form handling
- Serverless functions
- CDN distribution

## Vercel

Vercel is another excellent option for static sites.

### Setup
1. Import your project from GitHub
2. Configure build settings
3. Deploy with zero configuration

## AWS S3 + CloudFront

For more control, you can use AWS services.

### Setup
1. Create an S3 bucket
2. Upload your `dist` folder contents
3. Configure bucket for static website hosting
4. Set up CloudFront for CDN distribution

## Manual Deployment

You can also deploy to any web server:

1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Configure your web server to serve the files

## Tips for Deployment

- **Test locally first** - Use `npm run dev` to preview your site
- **Check file paths** - Ensure all links work correctly
- **Optimize images** - Compress images for faster loading
- **Set up redirects** - Handle any URL changes
- **Monitor performance** - Use tools like Google PageSpeed Insights

## Continuous Deployment

Set up automatic deployments so your site updates whenever you push changes:

1. Connect your repository to your hosting service
2. Configure build settings
3. Push changes to trigger automatic builds

This workflow makes it easy to maintain and update your site regularly.
