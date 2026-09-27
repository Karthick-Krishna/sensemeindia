import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://sensemeindia.com';
const IMAGES_DIR = path.join(process.cwd(), 'public', 'products', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const CATEGORY_URLS = [
  // Essential Oils
  { url: 'https://sensemeindia.com/Essential-Oils/Pure-Essential-Oils/1/20/', catId: 'essential-oils', catName: 'Essential Oils', subCat: 'Pure Essential Oils' },
  { url: 'https://sensemeindia.com/Essential-Oils/Essential-Oils-for-Soap-Making/1/23/', catId: 'essential-oils', catName: 'Essential Oils', subCat: 'Essential Oils for Soap Making' },
  // Diffuser Oils
  { url: 'https://sensemeindia.com/Diffuser-Oil/Customised-Diffuser-Oil/2/1/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Customised Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Aromatherapy-Diffuser-Oil/2/2/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Aromatherapy Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Relaxation-Stress-Relief-Diffuser-Oil/2/3/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Relaxation & Stress Relief' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Sleep-Diffuser-Oil/2/4/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Sleep Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Spa-Diffuser-Oil/2/6/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Spa Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Spiritual-Diffuser-Oil/2/7/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Spiritual Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Hotel-Fragrance-Diffuser-Oil/2/8/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Hotel Fragrance Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Home-Office-Diffuser-Oil/2/10/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Home & Office Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Car-Diffuser-Oil/2/12/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Car Diffuser Oil' },
  { url: 'https://sensemeindia.com/Diffuser-Oil/Welcome/2/13/', catId: 'diffuser-blends', catName: 'Diffuser Blends', subCat: 'Welcome Diffuser Blends' },
  // Fragrance Oils
  { url: 'https://sensemeindia.com/Fragrance-Oils/Fragrance-Oils-for-Soap-Making/3/14/', catId: 'fragrance-oils', catName: 'Fragrance Oils', subCat: 'Fragrance Oils for Soap Making' },
  { url: 'https://sensemeindia.com/Fragrance-Oils/Fragrance-Oils-for-Agarbatti-Making/3/15/', catId: 'fragrance-oils', catName: 'Fragrance Oils', subCat: 'Fragrance Oils for Agarbatti' },
  { url: 'https://sensemeindia.com/Fragrance-Oils/Fragrance-Oils-for-Candle-Making/3/16/', catId: 'candle-making', catName: 'Candle Making Fragrances', subCat: 'Fragrance Oils for Candle Making' },
  // Natural Perfumes
  { url: 'https://sensemeindia.com/Natural-Perfumes/Men/4/17/', catId: 'natural-perfumes', catName: 'Natural Perfumes', subCat: 'Men' },
  { url: 'https://sensemeindia.com/Natural-Perfumes/Women/4/18/', catId: 'natural-perfumes', catName: 'Natural Perfumes', subCat: 'Women' },
  { url: 'https://sensemeindia.com/Natural-Perfumes/Unisex/4/22/', catId: 'natural-perfumes', catName: 'Natural Perfumes', subCat: 'Unisex' },
  // Diffuser Machines
  { url: 'https://sensemeindia.com/Diffuser-Machines/Ultrasonic-Diffuser-Machines/5/21/', catId: 'diffuser-machines', catName: 'Diffuser Machines', subCat: 'Ultrasonic Diffuser Machines' }
];

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    return null;
  }
}

async function downloadImage(imageUrl, destFilename) {
  try {
    if (!imageUrl || imageUrl.includes('placeholder') || imageUrl.includes('banner')) return null;
    let fullUrl = imageUrl.trim();
    if (fullUrl.startsWith('//')) fullUrl = 'https:' + fullUrl;
    else if (fullUrl.startsWith('/')) fullUrl = BASE_URL + fullUrl;
    else if (!fullUrl.startsWith('http')) fullUrl = BASE_URL + '/' + fullUrl;

    const destPath = path.join(IMAGES_DIR, destFilename);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return `/products/images/${destFilename}`;
    }

    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Referer': BASE_URL
      }
    });

    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 500) return null; // Avoid empty/error images
    fs.writeFileSync(destPath, buffer);
    return `/products/images/${destFilename}`;
  } catch (err) {
    return null;
  }
}

function cleanSlug(name, id) {
  const base = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return base || `product-${id}`;
}

// Concurrency pool helper
async function mapConcurrent(items, concurrency, fn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      try {
        const res = await fn(items[i], i);
        if (res) results.push(res);
      } catch (err) {
        console.error(`Error processing item ${i}:`, err.message);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function run() {
  console.log('🚀 Starting SenseMe India Concurrent Crawler...');
  const discoveredLinks = new Map(); // url -> metadata

  // Step 1: Discover all product URLs from categories
  for (const cat of CATEGORY_URLS) {
    console.log(`🔍 Reading category: ${cat.catName} - ${cat.subCat}`);
    const html = await fetchHtml(cat.url);
    if (!html) continue;

    const $ = cheerio.load(html);

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;

      let fullHref = href.trim();
      if (fullHref.startsWith('/')) fullHref = BASE_URL + fullHref;

      // Filter out category URLs like /Category/Subcategory/1/20/
      const isCatUrl = /\/\d+\/\d+\/?$/.test(fullHref);
      if (isCatUrl) return;

      if (
        (fullHref.includes('/Essential-Oils/') ||
         fullHref.includes('/Diffuser-Oil/') ||
         fullHref.includes('/Fragrance-Oils/') ||
         fullHref.includes('/Natural-Perfumes/') ||
         fullHref.includes('/Diffuser-Machines/')) &&
        /\/\d+\/?$/.test(fullHref)
      ) {
        if (!discoveredLinks.has(fullHref)) {
          discoveredLinks.set(fullHref, {
            sourceUrl: fullHref,
            catId: cat.catId,
            catName: cat.catName,
            subCat: cat.subCat,
          });
        }
      }
    });
  }

  const linkArray = Array.from(discoveredLinks.entries());
  console.log(`📦 Discovered ${linkArray.length} genuine product pages! Starting concurrent extraction (concurrency: 12)...`);

  let completedCount = 0;

  const products = await mapConcurrent(linkArray, 12, async ([productUrl, meta], idx) => {
    const html = await fetchHtml(productUrl);
    if (!html) return null;

    const $ = cheerio.load(html);

    let title = $('.product-title-main').text().trim();
    if (!title) title = $('h1').first().text().trim();
    if (!title) {
      const parts = productUrl.split('/').filter(Boolean);
      title = parts[parts.length - 2]?.replace(/-/g, ' ') || 'Botanical Formulation';
    }

    // Clean title
    title = title.replace(/\s+/g, ' ').replace(/\(\s*\d+\s*ml\s*\)/i, '').trim();

    const parts = productUrl.split('/').filter(Boolean);
    const sourceId = parts[parts.length - 1] || `${idx + 1}`;
    const slug = cleanSlug(title, sourceId);

    // Extract source price (for internal admin reference only, not public display)
    let sourcePrice = $('.pd-main-price').text().trim() || $('.new-price').first().text().trim();
    sourcePrice = sourcePrice.replace(/[^\d]/g, '');

    // Extract images
    const rawImageUrls = [];
    $('.product-large-image-list img, .product-small-image-list img, .single-product-img img, .product-image img, .single-product-item img').each((_, img) => {
      const src = $(img).attr('src');
      if (src && !rawImageUrls.includes(src) && !src.includes('title.png') && !src.includes('logo')) {
        rawImageUrls.push(src);
      }
    });

    // Download images
    const downloadedImages = [];
    for (let i = 0; i < rawImageUrls.length; i++) {
      const rawUrl = rawImageUrls[i];
      const ext = path.extname(rawUrl.split('?')[0]) || '.jpg';
      const destFilename = `${slug}-${sourceId}-${i + 1}${ext}`;
      const localPath = await downloadImage(rawUrl, destFilename);
      if (localPath) {
        downloadedImages.push(localPath);
      }
    }

    // Extract description
    let description = $('.description-text').text().trim();
    if (!description) description = $('.description-wrapper').text().trim();
    if (!description) description = $('.product-details-text p').text().trim();

    description = description
      .replace(/\s+/g, ' ')
      .replace(/Images for reference only.*$/i, '')
      .replace(/Buy@\s*Rs\..*$/i, '')
      .trim();

    if (!description || description.length < 20) {
      description = `SenseMe ${title} is a pure, high-potency aromatic extract distilled and packaged by Mylal Exports in Coimbatore, Tamil Nadu. Ideal for aromatherapy, ambient diffusion, candle making, and artisanal cosmetics.`;
    }

    let shortDescription = description.split('.')[0] + '.';
    if (shortDescription.length > 200 || shortDescription.length < 20) {
      shortDescription = `${title} — Pure botanical formulation distilled by SenseMe India in Coimbatore for diffusion, soap crafting, and fine perfumery.`;
    }

    // Technical fields
    let botanicalName = '';
    let extractionMethod = 'Steam Distillation';
    let plantPart = 'Botanical Plant Material';
    let odourNotes = 'Rich, authentic natural aroma';

    if (description.includes('Botanical Name')) {
      const m = description.match(/Botanical Name\s*:\s*([^–\.\n\r]+)/i);
      if (m) botanicalName = m[1].trim();
    }
    if (description.includes('Extraction Method')) {
      const m = description.match(/Extraction Method\s*:\s*([^–\.\n\r]+)/i);
      if (m) extractionMethod = m[1].trim();
    }
    if (description.includes('Plant Part Used')) {
      const m = description.match(/Plant Part Used\s*:\s*([^–\.\n\r]+)/i);
      if (m) plantPart = m[1].trim();
    }
    if (description.includes('Odour')) {
      const m = description.match(/Odour\s*:\s*([^–\.\n\r]+)/i);
      if (m) odourNotes = m[1].trim();
    }

    const sizes = ['15ml', '100ml', '500ml', '1000ml', '5kg Bulk Drum'];
    const variants = sizes.map(s => ({
      name: s,
      available: true
    }));

    completedCount++;
    if (completedCount % 20 === 0 || completedCount === linkArray.length) {
      console.log(`⚡ Progress: [${completedCount}/${linkArray.length}] products imported...`);
    }

    return {
      id: `sm-${sourceId}`,
      name: title,
      slug: slug,
      sku: `SMI-${sourceId.padStart(4, '0')}`,
      categoryId: meta.catId,
      categoryName: meta.catName,
      subcategory: meta.subCat,
      shortDescription,
      description,
      images: downloadedImages.length > 0 ? downloadedImages : [`/products/images/${slug}-default.jpg`],
      variants,
      availableSizes: sizes,
      botanicalName: botanicalName || undefined,
      extractionMethod,
      plantPart,
      odourNotes,
      sourcePrice: sourcePrice ? parseInt(sourcePrice, 10) : undefined, // Admin reference only
      sourceUrl: productUrl,
      featured: completedCount <= 12,
      inStock: true,
      tags: [meta.catName.toLowerCase(), meta.subCat.toLowerCase(), title.toLowerCase().split(' ')[0]],
      application: 'Suitable for ultrasonic diffuser units, oil burners, soap making, candle making, and bespoke fragrance formulation.',
      safetyInformation: 'For external and ambient use only. Keep out of reach of children and pets. Do not apply undiluted directly to bare skin. Store in a cool place away from sunlight.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  // Filter out any nulls and duplicates by ID or slug
  const uniqueMap = new Map();
  for (const p of products) {
    if (p && !uniqueMap.has(p.id) && !uniqueMap.has(p.slug)) {
      uniqueMap.set(p.id, p);
      uniqueMap.set(p.slug, p);
    }
  }

  const finalProducts = Array.from(new Set(uniqueMap.values()));

  const outputPath = path.join(process.cwd(), 'src', 'lib', 'imported-products.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalProducts, null, 2));

  console.log(`\n🎉 SUCCESS! Complete imported catalogue: ${finalProducts.length} unique products.`);
  console.log(`🖼️  Downloaded images stored in: public/products/images/`);
  console.log(`💾 Saved product catalogue JSON to: ${outputPath}\n`);
}

run().catch(console.error);
