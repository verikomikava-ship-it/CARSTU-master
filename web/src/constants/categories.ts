export interface CategoryDefinition {
  id: string;
  slug: string;
  nameKa: string;
  nameEn: string;
  emoji: string;
  subcategories: { slug: string; nameKa: string; nameEn: string }[];
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: '1',
    slug: 'laptops-computers',
    nameKa: 'ლეპტოპები და PC',
    nameEn: 'Laptops & PCs',
    emoji: '💻',
    subcategories: [
      { slug: 'laptops', nameKa: 'ლეპტოპები', nameEn: 'Laptops' },
      { slug: 'desktop-pcs', nameKa: 'სტაციონარული კომპიუტერები', nameEn: 'Desktop PCs' },
      { slug: 'mini-pcs', nameKa: 'Mini PC', nameEn: 'Mini PCs' },
      { slug: 'all-in-one', nameKa: 'All-in-One კომპიუტერები', nameEn: 'All-in-One PCs' },
    ],
  },
  {
    id: '2',
    slug: 'monitors',
    nameKa: 'მონიტორები',
    nameEn: 'Monitors',
    emoji: '🖥️',
    subcategories: [
      { slug: 'gaming-monitors', nameKa: 'სათამაშო მონიტორები', nameEn: 'Gaming Monitors' },
      { slug: 'office-monitors', nameKa: 'საოფისე მონიტორები', nameEn: 'Office Monitors' },
      { slug: 'portable-monitors', nameKa: 'პორტატული მონიტორები', nameEn: 'Portable Monitors' },
      { slug: 'monitor-stands', nameKa: 'მონიტორის სტენდები', nameEn: 'Monitor Stands & Arms' },
    ],
  },
  {
    id: '3',
    slug: 'keyboards-mice',
    nameKa: 'კლავიატურა და მაუსი',
    nameEn: 'Keyboards & Mice',
    emoji: '⌨️',
    subcategories: [
      { slug: 'mechanical-keyboards', nameKa: 'მექანიკური კლავიატურები', nameEn: 'Mechanical Keyboards' },
      { slug: 'wireless-keyboards', nameKa: 'უსადენო კლავიატურები', nameEn: 'Wireless Keyboards' },
      { slug: 'gaming-mice', nameKa: 'სათამაშო მაუსი', nameEn: 'Gaming Mice' },
      { slug: 'wireless-mice', nameKa: 'უსადენო მაუსი', nameEn: 'Wireless Mice' },
      { slug: 'mouse-pads', nameKa: 'მაუსპადები', nameEn: 'Mouse Pads' },
    ],
  },
  {
    id: '4',
    slug: 'audio',
    nameKa: 'აუდიო',
    nameEn: 'Audio',
    emoji: '🎧',
    subcategories: [
      { slug: 'headphones', nameKa: 'ყურსასმენები', nameEn: 'Headphones' },
      { slug: 'gaming-headsets', nameKa: 'სათამაშო ჰედსეტი', nameEn: 'Gaming Headsets' },
      { slug: 'speakers', nameKa: 'დინამიკები', nameEn: 'Speakers' },
      { slug: 'microphones', nameKa: 'მიკროფონები', nameEn: 'Microphones' },
    ],
  },
  {
    id: '5',
    slug: 'storage',
    nameKa: 'მეხსიერება',
    nameEn: 'Storage',
    emoji: '💾',
    subcategories: [
      { slug: 'ssd', nameKa: 'SSD დისკები', nameEn: 'SSD Drives' },
      { slug: 'hdd', nameKa: 'HDD დისკები', nameEn: 'HDD Drives' },
      { slug: 'usb-flash', nameKa: 'USB ფლეშ დრაივები', nameEn: 'USB Flash Drives' },
      { slug: 'memory-cards', nameKa: 'მეხსიერების ბარათები', nameEn: 'Memory Cards' },
    ],
  },
  {
    id: '6',
    slug: 'cables-hubs',
    nameKa: 'კაბელები და ადაპტერები',
    nameEn: 'Cables & Adapters',
    emoji: '🔌',
    subcategories: [
      { slug: 'usb-hubs', nameKa: 'USB Hub-ები', nameEn: 'USB Hubs' },
      { slug: 'hdmi-cables', nameKa: 'HDMI კაბელები', nameEn: 'HDMI Cables' },
      { slug: 'usb-c-adapters', nameKa: 'USB-C ადაპტერები', nameEn: 'USB-C Adapters' },
      { slug: 'docking-stations', nameKa: 'Docking Station-ები', nameEn: 'Docking Stations' },
    ],
  },
  {
    id: '7',
    slug: 'networking',
    nameKa: 'ქსელი',
    nameEn: 'Networking',
    emoji: '🌐',
    subcategories: [
      { slug: 'routers', nameKa: 'როუტერები', nameEn: 'Routers' },
      { slug: 'wifi-adapters', nameKa: 'WiFi ადაპტერები', nameEn: 'WiFi Adapters' },
      { slug: 'network-switches', nameKa: 'ქსელის სვიჩები', nameEn: 'Network Switches' },
      { slug: 'ethernet-cables', nameKa: 'Ethernet კაბელები', nameEn: 'Ethernet Cables' },
    ],
  },
  {
    id: '8',
    slug: 'components',
    nameKa: 'კომპონენტები',
    nameEn: 'PC Components',
    emoji: '🔧',
    subcategories: [
      { slug: 'ram', nameKa: 'ოპერატიული მეხსიერება (RAM)', nameEn: 'RAM Memory' },
      { slug: 'graphics-cards', nameKa: 'ვიდეო ბარათები', nameEn: 'Graphics Cards' },
      { slug: 'processors', nameKa: 'პროცესორები', nameEn: 'Processors (CPU)' },
      { slug: 'cooling', nameKa: 'გაგრილების სისტემები', nameEn: 'Cooling Systems' },
    ],
  },
];
