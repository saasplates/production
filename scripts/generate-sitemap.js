import fs from 'fs';
import path from 'path';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>https://saasplates.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://saasplates.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/advertise</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://saasplates.com/submit</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Author Pages -->
  <url>
    <loc>https://saasplates.com/authors/arjun</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://saasplates.com/authors/kritika</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Boilerplate Pages -->
  <url>
    <loc>https://saasplates.com/boilerplates/next-saas-starter</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/boilerplates/nuxt-ui-pro-saas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/boilerplates/remix-saas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/boilerplates/larafast</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/boilerplates/nextjs-saas-boilerplate</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/boilerplates/nextjs-ultimate-saas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://saasplates.com/boilerplates/saasfly</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

// Ensure the static directory exists
const staticDir = path.join(process.cwd(), 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Write the sitemap file
fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully!'); 