const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://asrarul-hoque-eusha.github.io';
const blogsPath = path.join(__dirname, '../src/assets/data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

const urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/blog', priority: '0.9' },
  ...blogs.map(blog => ({
    loc: `/blog/${blog.slug}`,
    priority: '0.8',
    lastmod: blog.date
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = path.join(__dirname, '../src/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('Sitemap generated');
