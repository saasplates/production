import { boilerplates } from '$lib/stores/boilerplates';
import { starters } from '$lib/stores/starters';

export const prerender = true;

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function GET() {
  const website = 'https://saasplates.com';
  const currentDate = new Date().toISOString();

  // Generate sitemap entries for boilerplates
  const boilerplateUrls = boilerplates.map(boilerplate => ({
    loc: `${website}/boilerplates/${encodeURIComponent(boilerplate.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: boilerplate.featured ? '0.9' : '0.8'
  }));

  // Generate sitemap entries for starters
  const starterUrls = starters?.map(starter => ({
    loc: `${website}/starters/${encodeURIComponent(starter.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: starter.featured ? '0.9' : '0.8'
  })) || [];

  // Combine all URLs
  const urls = [
    {
      loc: website,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${website}/boilerplates`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      loc: `${website}/starters`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    ...boilerplateUrls,
    ...starterUrls
  ];

  // Generate XML with proper escaping
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${escapeXml(url.lastmod)}</lastmod>
    <changefreq>${escapeXml(url.changefreq)}</changefreq>
    <priority>${escapeXml(url.priority)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
} 