import { useEffect, useState } from 'react';
import { useItems } from '../Map/hooks/useItems';

export const Sitemap = ({url}:{url:string}) => {
  const [sitemap, setSitemap] = useState('');

  const items = useItems();

  useEffect(() => {
    if (items.length) {
      const generateSitemap = () => {
        let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemapXML += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        items.forEach(item => {
          sitemapXML += `  <url>\n`;
          sitemapXML += `    <loc>${url}/${item.slug}</loc>\n`;
          sitemapXML += `  </url>\n`;
        });

        sitemapXML += `</urlset>`;
        return sitemapXML;
      };

      setSitemap(generateSitemap());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div>
      <h1>Sitemap</h1>
      <textarea value={sitemap} readOnly rows={items.length + 4} cols={80} />
    </div>
  );
};

