const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configuration
const config = {
    contentDir: './content',
    templateDir: './src/templates',
    outputDir: './dist'
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
}

// Simple template engine
function renderTemplate(template, data) {
    let html = template;
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, value);
    }
    return html;
}

// Read template file
function readTemplate(templateName) {
    const templatePath = path.join(config.templateDir, `${templateName}.html`);
    return fs.readFileSync(templatePath, 'utf8');
}

// Write HTML file
function writeHtmlFile(filePath, content) {
    const fullPath = path.join(config.outputDir, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`Generated: ${filePath}`);
}

// Process Markdown file and extract frontmatter
function processMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Simple frontmatter parser
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    let frontmatter = {};
    let markdown = content;
    
    if (match) {
        const frontmatterText = match[1];
        markdown = match[2];
        
        // Parse frontmatter (simple key: value pairs)
        frontmatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                frontmatter[key] = value;
            }
        });
    }
    
    const html = marked(markdown);
    
    return {
        frontmatter,
        html
    };
}

// Build pages
function buildPages() {
    const pagesDir = path.join(config.contentDir, 'pages');
    
    if (!fs.existsSync(pagesDir)) {
        return;
    }
    
    const files = fs.readdirSync(pagesDir);
    const baseTemplate = readTemplate('base');
    const pageTemplate = readTemplate('page');
    
    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(pagesDir, file);
            const { frontmatter, html } = processMarkdownFile(filePath);
            
            const title = frontmatter.title || path.basename(file, '.md');
            const slug = frontmatter.slug || path.basename(file, '.md');
            
            const pageContent = renderTemplate(pageTemplate, {
                title,
                content: html
            });
            
            const fullHtml = renderTemplate(baseTemplate, {
                title,
                content: pageContent
            });
            
            const outputPath = slug === 'index' ? 'index.html' : `${slug}/index.html`;
            writeHtmlFile(outputPath, fullHtml);
        }
    });
}

// Build blog posts
function buildBlogPosts() {
    const blogDir = path.join(config.contentDir, 'blog');
    
    if (!fs.existsSync(blogDir)) {
        return [];
    }
    
    const files = fs.readdirSync(blogDir);
    const baseTemplate = readTemplate('base');
    const postTemplate = readTemplate('blog-post');
    const posts = [];
    
    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(blogDir, file);
            const { frontmatter, html } = processMarkdownFile(filePath);
            
            const title = frontmatter.title || path.basename(file, '.md');
            const slug = frontmatter.slug || path.basename(file, '.md');
            const date = frontmatter.date || new Date().toISOString();
            const excerpt = frontmatter.excerpt || '';
            
            const postContent = renderTemplate(postTemplate, {
                title,
                content: html,
                date,
                formattedDate: new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });
            
            const fullHtml = renderTemplate(baseTemplate, {
                title,
                content: postContent
            });
            
            writeHtmlFile(`blog/${slug}/index.html`, fullHtml);
            
            posts.push({
                title,
                slug,
                date,
                excerpt,
                formattedDate: new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });
        }
    });
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Build blog index
function buildBlogIndex(posts) {
    const baseTemplate = readTemplate('base');
    const blogListTemplate = readTemplate('blog-list');
    
    const blogListHtml = posts.map(post => `
        <div class="blog-item">
            <h2><a href="/blog/${post.slug}">${post.title}</a></h2>
            <div class="blog-meta">${post.formattedDate}</div>
            ${post.excerpt ? `<div class="blog-excerpt">${post.excerpt}</div>` : ''}
        </div>
    `).join('');
    
    const blogContent = renderTemplate(blogListTemplate, {
        blogPosts: blogListHtml
    });
    
    const fullHtml = renderTemplate(baseTemplate, {
        title: 'Blog',
        content: blogContent
    });
    
    writeHtmlFile('blog/index.html', fullHtml);
}

// Main build function
function build() {
    console.log('Building static site...');
    
    // Build pages
    buildPages();
    
    // Build blog posts and get list
    const posts = buildBlogPosts();
    
    // Build blog index if there are posts
    if (posts.length > 0) {
        buildBlogIndex(posts);
    }
    
    console.log('Build complete!');
}

// Run build
build();
