import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ruthvekkannan.com';

  // Read themes directory to get all available themes dynamically
  const themesDir = path.join(process.cwd(), 'src/themes');
  let themeNames: string[] = [];
  
  if (fs.existsSync(themesDir)) {
    themeNames = fs.readdirSync(themesDir).filter(file => {
      const stat = fs.statSync(path.join(themesDir, file));
      return stat.isDirectory() && fs.existsSync(path.join(themesDir, file, 'Adapter.tsx'));
    });
  }

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    }
  ];

  // Dynamic theme routes
  const themeRoutes: MetadataRoute.Sitemap = themeNames.map((theme) => ({
    url: `${baseUrl}/themes/${theme}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...routes, ...themeRoutes];
}
