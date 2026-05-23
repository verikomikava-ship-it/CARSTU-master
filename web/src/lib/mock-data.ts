import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { CATEGORIES } from '@/constants/categories';

const now = new Date().toISOString();

export const mockCategories: Category[] = CATEGORIES.map((cat, i) => ({
  id: cat.id,
  slug: cat.slug,
  name_ka: cat.nameKa,
  name_en: cat.nameEn,
  description_ka: null,
  description_en: null,
  icon: cat.emoji,
  image_url: null,
  parent_id: null,
  sort_order: i,
  is_active: true,
  created_at: now,
}));

// Category colors for placeholder images
// cat 1=Laptops(indigo), 2=Monitors(blue), 3=KB&Mice(violet), 4=Audio(orange),
// cat 5=Storage(emerald), 6=Cables(cyan), 7=Networking(teal), 8=Components(rose)
const CAT_COLORS: Record<string, { bg: string; fg: string; label: string }> = {
  '1': { bg: '6366f1', fg: 'ffffff', label: 'Laptop' },
  '2': { bg: '3b82f6', fg: 'ffffff', label: 'Monitor' },
  '3': { bg: '7c3aed', fg: 'ffffff', label: 'KB+Mouse' },
  '4': { bg: 'f97316', fg: 'ffffff', label: 'Audio' },
  '5': { bg: '10b981', fg: 'ffffff', label: 'Storage' },
  '6': { bg: '06b6d4', fg: 'ffffff', label: 'Cable' },
  '7': { bg: '0d9488', fg: 'ffffff', label: 'Network' },
  '8': { bg: 'ef4444', fg: 'ffffff', label: 'Component' },
};

function img(cat: string, label: string) {
  const c = CAT_COLORS[cat] ?? { bg: '64748b', fg: 'ffffff', label };
  const text = encodeURIComponent(label.length > 12 ? label.slice(0, 12) : label);
  return `https://placehold.co/400x400/${c.bg}/${c.fg}?text=${text}&font=sans`;
}

const productData: {
  name_ka: string; name_en: string; price: number; sale_price: number | null;
  cat: string; brand: string; label: string; featured: boolean;
  desc_en: string; desc_ka: string;
}[] = [
  // --- Laptops & PCs (cat 1) ---
  { name_ka: 'Lenovo IdeaPad 3 ლეპტოპი',   name_en: 'Lenovo IdeaPad 3',      price: 1499, sale_price: 1299, cat: '1', brand: 'Lenovo',  label: 'Lenovo',    featured: true,  desc_en: '15.6" FHD, Ryzen 5, 8GB, 512GB SSD',     desc_ka: '15.6" FHD, Ryzen 5, 8GB, 512GB SSD' },
  { name_ka: 'ASUS VivoBook 15 ლეპტოპი',    name_en: 'ASUS VivoBook 15',      price: 1799, sale_price: null, cat: '1', brand: 'ASUS',    label: 'ASUS',      featured: true,  desc_en: '15.6" FHD IPS, i5, 16GB, 512GB SSD',     desc_ka: '15.6" FHD IPS, i5, 16GB, 512GB SSD' },
  { name_ka: 'HP Pavilion Gaming ლეპტოპი',  name_en: 'HP Pavilion Gaming',    price: 2299, sale_price: 1999, cat: '1', brand: 'HP',      label: 'HP Gaming', featured: true,  desc_en: '144Hz, Ryzen 7, RTX 3050, 16GB',          desc_ka: '144Hz, Ryzen 7, RTX 3050, 16GB' },
  { name_ka: 'Dell Inspiron 15 ლეპტოპი',    name_en: 'Dell Inspiron 15',      price: 1650, sale_price: null, cat: '1', brand: 'Dell',    label: 'Dell',      featured: false, desc_en: '15.6" FHD, i5-1235U, 8GB, 256GB SSD',    desc_ka: '15.6" FHD, i5-1235U, 8GB, 256GB SSD' },
  { name_ka: 'Mini PC Intel NUC',            name_en: 'Intel NUC Mini PC',     price: 899,  sale_price: 749,  cat: '1', brand: 'Intel',   label: 'Mini PC',   featured: false, desc_en: 'Core i5, 8GB, 256GB SSD, compact',        desc_ka: 'Core i5, 8GB, 256GB SSD, კომპაქტური' },
  { name_ka: 'Acer Aspire 5 ლეპტოპი',       name_en: 'Acer Aspire 5',         price: 1350, sale_price: 1199, cat: '1', brand: 'Acer',    label: 'Acer',      featured: true,  desc_en: '15.6" FHD, Ryzen 5 5500U, 8GB, 512GB',   desc_ka: '15.6" FHD, Ryzen 5 5500U, 8GB, 512GB' },

  // --- Monitors (cat 2) ---
  { name_ka: 'LG 27" IPS 4K მონიტორი',      name_en: 'LG 27" 4K IPS',         price: 649,  sale_price: 549,  cat: '2', brand: 'LG',      label: 'LG 27"',    featured: true,  desc_en: '27" 4K UHD, 60Hz, HDMI, USB-C, HDR10',   desc_ka: '27" 4K UHD, 60Hz, HDMI, USB-C, HDR10' },
  { name_ka: 'Samsung 24" FHD მონიტორი',     name_en: 'Samsung 24" FHD',       price: 299,  sale_price: null, cat: '2', brand: 'Samsung', label: 'Samsung',   featured: true,  desc_en: '24" FHD, 75Hz, FreeSync, Eye Saver',      desc_ka: '24" FHD, 75Hz, FreeSync, Eye Saver' },
  { name_ka: 'ASUS TUF Gaming 27" 165Hz',    name_en: 'ASUS TUF 27" 165Hz',    price: 799,  sale_price: 699,  cat: '2', brand: 'ASUS',    label: 'ASUS 165Hz',featured: true,  desc_en: '27" QHD, 165Hz, 1ms, G-Sync Compatible',  desc_ka: '27" QHD, 165Hz, 1ms, G-Sync Compatible' },
  { name_ka: 'Dell 24" USB-C მონიტორი',      name_en: 'Dell 24" USB-C',        price: 499,  sale_price: null, cat: '2', brand: 'Dell',    label: 'Dell USB-C',featured: false, desc_en: '24" FHD IPS, USB-C 65W, HDMI, DP',        desc_ka: '24" FHD IPS, USB-C 65W, HDMI, DP' },
  { name_ka: 'AOC 32" Curved Gaming',        name_en: 'AOC 32" Curved',        price: 699,  sale_price: 599,  cat: '2', brand: 'AOC',     label: 'AOC 32"',   featured: false, desc_en: '32" QHD Curved, 144Hz, 1ms, FreeSync',    desc_ka: '32" QHD Curved, 144Hz, 1ms, FreeSync' },

  // --- Keyboards & Mice (cat 3) ---
  { name_ka: 'Logitech MX Keys კლავიატურა',  name_en: 'Logitech MX Keys',      price: 259,  sale_price: 219,  cat: '3', brand: 'Logitech',label: 'MX Keys',   featured: true,  desc_en: 'Wireless, backlit, multi-device',          desc_ka: 'უსადენო, განათება, მრავალ მოწყობილობა' },
  { name_ka: 'Keychron K2 მექანიკური',       name_en: 'Keychron K2 Mech',      price: 189,  sale_price: null, cat: '3', brand: 'Keychron',label: 'K2 Mech',   featured: true,  desc_en: '75% layout, Gateron Brown, BT+USB',        desc_ka: '75% layout, Gateron Brown, BT+USB' },
  { name_ka: 'Logitech MX Master 3 მაუსი',   name_en: 'Logitech MX Master 3',  price: 179,  sale_price: 149,  cat: '3', brand: 'Logitech',label: 'MX Master', featured: true,  desc_en: 'Wireless, 4000 DPI, MagSpeed scroll',      desc_ka: 'უსადენო, 4000 DPI, MagSpeed სქროლი' },
  { name_ka: 'Razer DeathAdder V2 Gaming',   name_en: 'Razer DeathAdder V2',   price: 139,  sale_price: 109,  cat: '3', brand: 'Razer',   label: 'DeathAdder',featured: false, desc_en: '20000 DPI, 8 programmable buttons',        desc_ka: '20000 DPI ოპტიკური სენსორი, 8 ღილაკი' },
  { name_ka: 'Gaming Mouse Pad XL',          name_en: 'Gaming Mouse Pad XL',   price: 49,   sale_price: 39,   cat: '3', brand: 'SteelSeries',label: 'Mousepad', featured: false, desc_en: '900x400mm, RGB edge, anti-slip base',      desc_ka: '900x400მმ, RGB განათება, ანტი-სლიპ' },
  { name_ka: 'HP Wireless Keyboard+Mouse',   name_en: 'HP Wireless Combo',     price: 89,   sale_price: 69,   cat: '3', brand: 'HP',      label: 'HP Combo',  featured: false, desc_en: 'Wireless 2.4GHz set, quiet keys',          desc_ka: 'უსადენო 2.4GHz ნაკრები, ჩუმი კლავიშები' },

  // --- Audio (cat 4) ---
  { name_ka: 'Sony WH-1000XM5 ყურსასმენი',   name_en: 'Sony WH-1000XM5',       price: 799,  sale_price: 649,  cat: '4', brand: 'Sony',    label: 'Sony XM5',  featured: true,  desc_en: 'ANC, 30hr battery, multipoint connect',    desc_ka: 'ANC, 30 სთ ბატარეა, multipoint' },
  { name_ka: 'SteelSeries Arctis 7 Headset', name_en: 'SteelSeries Arctis 7',  price: 349,  sale_price: 299,  cat: '4', brand: 'SteelSeries',label: 'Arctis 7', featured: true,  desc_en: '2.4GHz wireless, 7.1 surround, 24hr',      desc_ka: '2.4GHz, 7.1 surround, 24 სთ' },
  { name_ka: 'Logitech G560 Gaming Speaker',  name_en: 'Logitech G560',         price: 399,  sale_price: null, cat: '4', brand: 'Logitech',label: 'G560',      featured: true,  desc_en: '2.1 system, 240W peak, LIGHTSYNC RGB',     desc_ka: '2.1 სისტემა, 240W, LIGHTSYNC RGB' },
  { name_ka: 'Blue Yeti USB მიკროფონი',       name_en: 'Blue Yeti USB Mic',     price: 279,  sale_price: 239,  cat: '4', brand: 'Blue',    label: 'Blue Yeti', featured: true,  desc_en: 'Condenser, 3 pickup patterns, plug&play',  desc_ka: 'კონდენსატორი, 3 პიკაპ, plug & play' },
  { name_ka: 'JBL Quantum 100 Headset',       name_en: 'JBL Quantum 100',       price: 99,   sale_price: 79,   cat: '4', brand: 'JBL',     label: 'JBL Q100',  featured: false, desc_en: 'Wired, QuantumSOUND, detachable mic',      desc_ka: 'სადენიანი, QuantumSOUND, ჩამოხსნადი მიკ' },

  // --- Storage (cat 5) ---
  { name_ka: 'Samsung 970 EVO 1TB NVMe SSD', name_en: 'Samsung 970 EVO 1TB',   price: 299,  sale_price: 249,  cat: '5', brand: 'Samsung', label: 'NVMe SSD',  featured: true,  desc_en: 'NVMe M.2, 3500MB/s read, 5yr warranty',   desc_ka: 'NVMe M.2, 3500MB/წმ, 5 წ. გარანტია' },
  { name_ka: 'WD Blue 2TB SATA HDD',         name_en: 'WD Blue 2TB HDD',       price: 149,  sale_price: null, cat: '5', brand: 'WD',      label: 'WD 2TB',    featured: false, desc_en: '2TB, 7200RPM, 256MB cache, SATA 6Gb/s',   desc_ka: '2TB, 7200RPM, 256MB ქეში' },
  { name_ka: 'Samsung T7 Portable SSD 1TB',  name_en: 'Samsung T7 SSD 1TB',    price: 219,  sale_price: 179,  cat: '5', brand: 'Samsung', label: 'T7 SSD',    featured: true,  desc_en: 'USB 3.2, 1050MB/s, shock-resistant',       desc_ka: 'USB 3.2, 1050MB/წმ, დარტყმა-გამძლე' },
  { name_ka: 'Kingston 128GB USB 3.2',       name_en: 'Kingston 128GB USB',    price: 39,   sale_price: 29,   cat: '5', brand: 'Kingston',label: 'USB 128GB', featured: false, desc_en: '128GB, USB 3.2, 200MB/s, retractable',    desc_ka: '128GB, USB 3.2, 200MB/წმ, სახვევი' },
  { name_ka: 'SanDisk 256GB microSDXC',      name_en: 'SanDisk 256GB microSD', price: 59,   sale_price: 45,   cat: '5', brand: 'SanDisk', label: 'microSD',   featured: false, desc_en: 'UHS-I A2, 190MB/s, for phone & camera',   desc_ka: 'UHS-I A2, 190MB/წმ, ტელეფონი, კამერა' },
  { name_ka: 'Crucial MX500 500GB SSD',      name_en: 'Crucial MX500 500GB',   price: 129,  sale_price: 99,   cat: '5', brand: 'Crucial', label: 'MX500',     featured: true,  desc_en: '2.5" SATA, 560MB/s read, 5yr warranty',   desc_ka: '2.5" SATA, 560MB/წმ, 5 წ. გარანტია' },

  // --- Cables & Adapters (cat 6) ---
  { name_ka: 'Anker USB-C Hub 7-in-1',       name_en: 'Anker 7-in-1 USB-C Hub',price: 89,   sale_price: 69,   cat: '6', brand: 'Anker',   label: 'USB-C Hub', featured: true,  desc_en: '4K HDMI, 100W PD, 3xUSB-A, SD reader',   desc_ka: '4K HDMI, 100W PD, 3xUSB-A, SD reader' },
  { name_ka: 'Belkin HDMI 2.1 კაბელი 2მ',    name_en: 'Belkin HDMI 2.1 2m',    price: 45,   sale_price: null, cat: '6', brand: 'Belkin',  label: 'HDMI 2.1',  featured: false, desc_en: '8K@60Hz, 4K@120Hz, 48Gbps',               desc_ka: '8K@60Hz, 4K@120Hz, 48Gbps' },
  { name_ka: 'Ugreen USB-C Docking Station', name_en: 'Ugreen Docking Station', price: 159,  sale_price: 129,  cat: '6', brand: 'Ugreen',  label: 'Dock',      featured: true,  desc_en: 'Triple display, 100W PD, HDMI, DP, LAN',  desc_ka: 'Triple display, 100W PD, HDMI, DP, LAN' },
  { name_ka: 'Anker USB-C → USB-A (3ც)',     name_en: 'Anker USB-C Adapter 3pk',price: 25,  sale_price: 19,   cat: '6', brand: 'Anker',   label: 'Adapter x3',featured: false, desc_en: 'USB 3.1, compact, plug&play, 3-pack',      desc_ka: 'USB 3.1, კომპაქტური, plug&play, 3 ც.' },
  { name_ka: 'DisplayPort 1.4 კაბელი 1.8მ',  name_en: 'DisplayPort 1.4 1.8m',  price: 35,   sale_price: null, cat: '6', brand: 'Cable Matters',label: 'DP 1.4', featured: false, desc_en: '8K@60Hz, 4K@144Hz, HDR, 32.4Gbps',        desc_ka: '8K@60Hz, 4K@144Hz, HDR, 32.4Gbps' },

  // --- Networking (cat 7) ---
  { name_ka: 'TP-Link Archer AX73 WiFi 6',   name_en: 'TP-Link AX73 WiFi 6',   price: 299,  sale_price: 249,  cat: '7', brand: 'TP-Link', label: 'WiFi 6',    featured: true,  desc_en: 'AX5400, WiFi 6, 6 antennas, OneMesh',     desc_ka: 'AX5400, WiFi 6, 6 ანტენა, OneMesh' },
  { name_ka: 'ASUS RT-AX88U WiFi 6 Router',  name_en: 'ASUS RT-AX88U',         price: 549,  sale_price: 479,  cat: '7', brand: 'ASUS',    label: 'AX6000',    featured: true,  desc_en: 'AX6000, AiMesh, 8-port Gigabit LAN',      desc_ka: 'AX6000, AiMesh, 8x Gigabit LAN' },
  { name_ka: 'TP-Link USB WiFi Adapter',     name_en: 'TP-Link AC1300 WiFi',   price: 49,   sale_price: 39,   cat: '7', brand: 'TP-Link', label: 'WiFi USB',  featured: false, desc_en: 'Dual-band, MU-MIMO, USB 3.0',              desc_ka: 'Dual-band, MU-MIMO, USB 3.0' },
  { name_ka: 'Netgear 8-Port Gigabit Switch', name_en: 'Netgear GS308 Switch',  price: 69,   sale_price: null, cat: '7', brand: 'Netgear', label: 'Switch 8P', featured: false, desc_en: '8-port, plug&play, fanless, metal case',   desc_ka: '8 პორტი, plug&play, ლითონის კეისი' },
  { name_ka: 'Cat 8 Ethernet კაბელი 3მ',     name_en: 'Cat 8 Ethernet 3m',     price: 25,   sale_price: 19,   cat: '7', brand: 'Ugreen',  label: 'Cat8 LAN',  featured: false, desc_en: '40Gbps, 2000MHz, gold-plated RJ45',        desc_ka: '40Gbps, 2000MHz, ოქროს RJ45' },

  // --- PC Components (cat 8) ---
  { name_ka: 'Corsair 16GB DDR4 3200MHz',    name_en: 'Corsair 16GB DDR4',     price: 129,  sale_price: 99,   cat: '8', brand: 'Corsair', label: 'DDR4 16GB', featured: true,  desc_en: '2x8GB, DDR4-3200, XMP 2.0',               desc_ka: '2x8GB, DDR4-3200, XMP 2.0' },
  { name_ka: 'NVIDIA RTX 4060 8GB GPU',      name_en: 'RTX 4060 8GB',          price: 1299, sale_price: 1149, cat: '8', brand: 'NVIDIA',  label: 'RTX 4060',  featured: true,  desc_en: '8GB GDDR6, DLSS 3, ray tracing',          desc_ka: '8GB GDDR6, DLSS 3, ray tracing' },
  { name_ka: 'AMD Ryzen 5 7600X CPU',        name_en: 'AMD Ryzen 5 7600X',     price: 699,  sale_price: 599,  cat: '8', brand: 'AMD',     label: 'Ryzen 5',   featured: true,  desc_en: '6-core, 4.7/5.3GHz boost, AM5 socket',    desc_ka: '6-ბირთვი, 4.7/5.3GHz boost, AM5' },
  { name_ka: 'Noctua NH-D15 CPU Cooler',     name_en: 'Noctua NH-D15',         price: 189,  sale_price: null, cat: '8', brand: 'Noctua',  label: 'NH-D15',    featured: false, desc_en: 'Dual tower, 2x140mm, TDP 250W+, quiet',   desc_ka: 'Dual tower, 2x140mm, TDP 250W+, ჩუმი' },
  { name_ka: 'Crucial 32GB DDR5 5200MHz',    name_en: 'Crucial 32GB DDR5',     price: 229,  sale_price: 189,  cat: '8', brand: 'Crucial', label: 'DDR5 32GB', featured: false, desc_en: '2x16GB, DDR5-5200, on-die ECC, XMP 3.0',  desc_ka: '2x16GB, DDR5-5200, on-die ECC, XMP 3.0' },
];

export const mockProducts: Product[] = productData.map((p, i) => ({
  id: `prod-${i + 1}`,
  sku: `SKU-${2000 + i}`,
  name_ka: p.name_ka,
  name_en: p.name_en,
  description_ka: p.desc_ka,
  description_en: p.desc_en,
  price: p.price,
  sale_price: p.sale_price,
  currency: 'GEL',
  category_id: p.cat,
  brand: p.brand,
  stock_quantity: Math.floor(Math.random() * 30) + 5,
  is_active: true,
  is_featured: p.featured,
  specifications: {},
  images: [
    {
      id: `img-${i + 1}`,
      product_id: `prod-${i + 1}`,
      url: img(p.cat, p.label),
      alt_text: p.name_en,
      sort_order: 0,
      is_primary: true,
    },
  ],
  created_at: new Date(Date.now() - i * 3600000 * 6).toISOString(),
  updated_at: now,
}));
