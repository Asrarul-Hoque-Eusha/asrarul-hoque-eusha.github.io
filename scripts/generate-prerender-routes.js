const fs = require('fs');
const path = require('path');

// Read blogs.json
const blogsPath = path.join(__dirname, '../src/assets/data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

// Generate routes
const routes = [
  '/',
  '/blog',
  ...blogs.map(blog => `/blog/${blog.slug}`)
];

// Write to prerender-routes.txt
const outputPath = path.join(__dirname, '../prerender-routes.txt');
fs.writeFileSync(outputPath, routes.join('\n'));

console.log(`Generated ${routes.length} prerender routes`);
