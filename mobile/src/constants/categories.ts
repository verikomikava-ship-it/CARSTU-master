export interface CategoryDefinition {
  id: string;
  slug: string;
  nameKa: string;
  nameEn: string;
  icon: string;
  subcategories: { slug: string; nameKa: string; nameEn: string }[];
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: '1',
    slug: 'interior',
    nameKa: 'სალონის აქსესუარები',
    nameEn: 'Interior Accessories',
    icon: 'car-seat',
    subcategories: [
      { slug: 'seat-covers', nameKa: 'სავარძლის გადასაფარებლები', nameEn: 'Seat Covers' },
      { slug: 'floor-mats', nameKa: 'იატაკის საფენები', nameEn: 'Floor Mats' },
      { slug: 'steering-covers', nameKa: 'საჭის გადასაფარებლები', nameEn: 'Steering Wheel Covers' },
      { slug: 'sun-shades', nameKa: 'მზისგან დამცავი', nameEn: 'Sun Shades' },
      { slug: 'organizers', nameKa: 'ორგანაიზერები', nameEn: 'Organizers' },
    ],
  },
  {
    id: '2',
    slug: 'exterior',
    nameKa: 'გარე აქსესუარები',
    nameEn: 'Exterior Accessories',
    icon: 'car-side',
    subcategories: [
      { slug: 'body-kits', nameKa: 'ბოდი კიტები', nameEn: 'Body Kits' },
      { slug: 'spoilers', nameKa: 'სპოილერები', nameEn: 'Spoilers' },
      { slug: 'mirror-covers', nameKa: 'სარკის გადასაფარებლები', nameEn: 'Mirror Covers' },
      { slug: 'door-guards', nameKa: 'კარის დამცავები', nameEn: 'Door Guards' },
      { slug: 'mud-flaps', nameKa: 'ბრიზგვალები', nameEn: 'Mud Flaps' },
    ],
  },
  {
    id: '3',
    slug: 'tires-wheels',
    nameKa: 'საბურავები და დისკები',
    nameEn: 'Tires & Wheels',
    icon: 'tire',
    subcategories: [
      { slug: 'summer-tires', nameKa: 'საზაფხულო საბურავები', nameEn: 'Summer Tires' },
      { slug: 'winter-tires', nameKa: 'ზამთრის საბურავები', nameEn: 'Winter Tires' },
      { slug: 'allseason-tires', nameKa: 'ოთხსეზონიანი', nameEn: 'All-Season Tires' },
      { slug: 'alloy-wheels', nameKa: 'დისკები', nameEn: 'Alloy Wheels' },
      { slug: 'wheel-caps', nameKa: 'დისკის თავსახურები', nameEn: 'Wheel Caps' },
    ],
  },
  {
    id: '4',
    slug: 'electronics',
    nameKa: 'ელექტრონიკა',
    nameEn: 'Electronics',
    icon: 'chip',
    subcategories: [
      { slug: 'dash-cameras', nameKa: 'ვიდეო რეგისტრატორები', nameEn: 'Dash Cameras' },
      { slug: 'gps', nameKa: 'GPS ნავიგატორები', nameEn: 'GPS Navigators' },
      { slug: 'phone-holders', nameKa: 'ტელეფონის სამაგრები', nameEn: 'Phone Holders' },
      { slug: 'usb-chargers', nameKa: 'USB დამტენები', nameEn: 'USB Chargers' },
      { slug: 'obd-scanners', nameKa: 'OBD სკანერები', nameEn: 'OBD Scanners' },
    ],
  },
  {
    id: '5',
    slug: 'lighting',
    nameKa: 'განათება',
    nameEn: 'Lighting',
    icon: 'lightbulb-on',
    subcategories: [
      { slug: 'led-headlights', nameKa: 'LED ფარები', nameEn: 'LED Headlights' },
      { slug: 'fog-lights', nameKa: 'ნისლის ფარები', nameEn: 'Fog Lights' },
      { slug: 'interior-led', nameKa: 'სალონის LED', nameEn: 'Interior LED' },
      { slug: 'turn-signals', nameKa: 'მოსახვევის ფარები', nameEn: 'Turn Signals' },
      { slug: 'tail-lights', nameKa: 'უკანა ფარები', nameEn: 'Tail Lights' },
    ],
  },
  {
    id: '6',
    slug: 'engine-parts',
    nameKa: 'ძრავის ნაწილები',
    nameEn: 'Engine Parts',
    icon: 'engine',
    subcategories: [
      { slug: 'spark-plugs', nameKa: 'ანთების სანთლები', nameEn: 'Spark Plugs' },
      { slug: 'belts', nameKa: 'ქამრები', nameEn: 'Belts' },
      { slug: 'gaskets', nameKa: 'პროკლადკები', nameEn: 'Gaskets' },
      { slug: 'hoses', nameKa: 'შლანგები', nameEn: 'Hoses' },
      { slug: 'engine-mounts', nameKa: 'ძრავის საყრდენები', nameEn: 'Engine Mounts' },
    ],
  },
  {
    id: '7',
    slug: 'filters',
    nameKa: 'ფილტრები',
    nameEn: 'Filters',
    icon: 'air-filter',
    subcategories: [
      { slug: 'oil-filters', nameKa: 'ზეთის ფილტრები', nameEn: 'Oil Filters' },
      { slug: 'air-filters', nameKa: 'ჰაერის ფილტრები', nameEn: 'Air Filters' },
      { slug: 'cabin-filters', nameKa: 'სალონის ფილტრები', nameEn: 'Cabin Filters' },
      { slug: 'fuel-filters', nameKa: 'საწვავის ფილტრები', nameEn: 'Fuel Filters' },
    ],
  },
  {
    id: '8',
    slug: 'oils-fluids',
    nameKa: 'ზეთები და სითხეები',
    nameEn: 'Oils & Fluids',
    icon: 'oil',
    subcategories: [
      { slug: 'engine-oil', nameKa: 'ძრავის ზეთი', nameEn: 'Engine Oil' },
      { slug: 'transmission-fluid', nameKa: 'გადაცემათა კოლოფის სითხე', nameEn: 'Transmission Fluid' },
      { slug: 'brake-fluid', nameKa: 'სამუხრუჭე სითხე', nameEn: 'Brake Fluid' },
      { slug: 'coolant', nameKa: 'ანტიფრიზი', nameEn: 'Coolant' },
      { slug: 'windshield-fluid', nameKa: 'მინის სამრეცხი', nameEn: 'Windshield Fluid' },
    ],
  },
  {
    id: '9',
    slug: 'safety',
    nameKa: 'უსაფრთხოება',
    nameEn: 'Safety & Security',
    icon: 'shield-car',
    subcategories: [
      { slug: 'alarm-systems', nameKa: 'სიგნალიზაციები', nameEn: 'Alarm Systems' },
      { slug: 'parking-sensors', nameKa: 'პარკინგის სენსორები', nameEn: 'Parking Sensors' },
      { slug: 'first-aid', nameKa: 'აპთეკა', nameEn: 'First Aid Kits' },
      { slug: 'fire-extinguishers', nameKa: 'ცეცხლმაქრი', nameEn: 'Fire Extinguishers' },
    ],
  },
  {
    id: '10',
    slug: 'audio',
    nameKa: 'აუდიო სისტემები',
    nameEn: 'Audio Systems',
    icon: 'speaker',
    subcategories: [
      { slug: 'speakers', nameKa: 'დინამიკები', nameEn: 'Speakers' },
      { slug: 'subwoofers', nameKa: 'სუბვუფერები', nameEn: 'Subwoofers' },
      { slug: 'head-units', nameKa: 'მაგნიტოლები', nameEn: 'Head Units' },
      { slug: 'amplifiers', nameKa: 'ამპლიფიკატორები', nameEn: 'Amplifiers' },
      { slug: 'bluetooth-adapters', nameKa: 'Bluetooth ადაპტერები', nameEn: 'Bluetooth Adapters' },
    ],
  },
  {
    id: '11',
    slug: 'cleaning',
    nameKa: 'მოვლის საშუალებები',
    nameEn: 'Cleaning & Care',
    icon: 'spray-bottle',
    subcategories: [
      { slug: 'car-wash', nameKa: 'სარეცხი საშუალებები', nameEn: 'Car Wash' },
      { slug: 'polishes', nameKa: 'საპრიალებლები', nameEn: 'Polishes' },
      { slug: 'wax', nameKa: 'ცვილი', nameEn: 'Wax' },
      { slug: 'microfiber', nameKa: 'მიკროფიბრა', nameEn: 'Microfiber Cloths' },
      { slug: 'interior-cleaners', nameKa: 'სალონის საწმენდი', nameEn: 'Interior Cleaners' },
    ],
  },
  {
    id: '12',
    slug: 'cargo',
    nameKa: 'სატვირთო აქსესუარები',
    nameEn: 'Cargo & Towing',
    icon: 'truck-trailer',
    subcategories: [
      { slug: 'roof-racks', nameKa: 'სახურავის ბაგაჟნიკი', nameEn: 'Roof Racks' },
      { slug: 'cargo-nets', nameKa: 'ტვირთის ბადეები', nameEn: 'Cargo Nets' },
      { slug: 'tow-bars', nameKa: 'ფარკოპი', nameEn: 'Tow Bars' },
      { slug: 'bike-racks', nameKa: 'ველოსიპედის სამაგრი', nameEn: 'Bike Racks' },
      { slug: 'roof-boxes', nameKa: 'სახურავის ყუთი', nameEn: 'Roof Boxes' },
    ],
  },
];
