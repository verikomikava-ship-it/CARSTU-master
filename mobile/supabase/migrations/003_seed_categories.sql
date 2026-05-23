-- Seed: Top-level categories
INSERT INTO categories (id, slug, name_ka, name_en, icon, sort_order) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'interior', 'სალონის აქსესუარები', 'Interior Accessories', 'car-seat', 1),
  ('c0000001-0000-0000-0000-000000000002', 'exterior', 'გარე აქსესუარები', 'Exterior Accessories', 'car-side', 2),
  ('c0000001-0000-0000-0000-000000000003', 'tires-wheels', 'საბურავები და დისკები', 'Tires & Wheels', 'tire', 3),
  ('c0000001-0000-0000-0000-000000000004', 'electronics', 'ელექტრონიკა', 'Electronics', 'chip', 4),
  ('c0000001-0000-0000-0000-000000000005', 'lighting', 'განათება', 'Lighting', 'lightbulb-on', 5),
  ('c0000001-0000-0000-0000-000000000006', 'engine-parts', 'ძრავის ნაწილები', 'Engine Parts', 'engine', 6),
  ('c0000001-0000-0000-0000-000000000007', 'filters', 'ფილტრები', 'Filters', 'air-filter', 7),
  ('c0000001-0000-0000-0000-000000000008', 'oils-fluids', 'ზეთები და სითხეები', 'Oils & Fluids', 'oil', 8),
  ('c0000001-0000-0000-0000-000000000009', 'safety', 'უსაფრთხოება', 'Safety & Security', 'shield-car', 9),
  ('c0000001-0000-0000-0000-000000000010', 'audio', 'აუდიო სისტემები', 'Audio Systems', 'speaker', 10),
  ('c0000001-0000-0000-0000-000000000011', 'cleaning', 'მოვლის საშუალებები', 'Cleaning & Care', 'spray-bottle', 11),
  ('c0000001-0000-0000-0000-000000000012', 'cargo', 'სატვირთო აქსესუარები', 'Cargo & Towing', 'truck-trailer', 12);

-- Seed: Subcategories for Interior
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('seat-covers', 'სავარძლის გადასაფარებლები', 'Seat Covers', 'c0000001-0000-0000-0000-000000000001', 1),
  ('floor-mats', 'იატაკის საფენები', 'Floor Mats', 'c0000001-0000-0000-0000-000000000001', 2),
  ('steering-covers', 'საჭის გადასაფარებლები', 'Steering Wheel Covers', 'c0000001-0000-0000-0000-000000000001', 3),
  ('sun-shades', 'მზისგან დამცავი', 'Sun Shades', 'c0000001-0000-0000-0000-000000000001', 4),
  ('organizers', 'ორგანაიზერები', 'Organizers', 'c0000001-0000-0000-0000-000000000001', 5);

-- Seed: Subcategories for Exterior
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('body-kits', 'ბოდი კიტები', 'Body Kits', 'c0000001-0000-0000-0000-000000000002', 1),
  ('spoilers', 'სპოილერები', 'Spoilers', 'c0000001-0000-0000-0000-000000000002', 2),
  ('mirror-covers', 'სარკის გადასაფარებლები', 'Mirror Covers', 'c0000001-0000-0000-0000-000000000002', 3),
  ('door-guards', 'კარის დამცავები', 'Door Guards', 'c0000001-0000-0000-0000-000000000002', 4),
  ('mud-flaps', 'ბრიზგვალები', 'Mud Flaps', 'c0000001-0000-0000-0000-000000000002', 5);

-- Seed: Subcategories for Tires & Wheels
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('summer-tires', 'საზაფხულო საბურავები', 'Summer Tires', 'c0000001-0000-0000-0000-000000000003', 1),
  ('winter-tires', 'ზამთრის საბურავები', 'Winter Tires', 'c0000001-0000-0000-0000-000000000003', 2),
  ('allseason-tires', 'ოთხსეზონიანი', 'All-Season Tires', 'c0000001-0000-0000-0000-000000000003', 3),
  ('alloy-wheels', 'დისკები', 'Alloy Wheels', 'c0000001-0000-0000-0000-000000000003', 4),
  ('wheel-caps', 'დისკის თავსახურები', 'Wheel Caps', 'c0000001-0000-0000-0000-000000000003', 5);

-- Seed: Subcategories for Electronics
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('dash-cameras', 'ვიდეო რეგისტრატორები', 'Dash Cameras', 'c0000001-0000-0000-0000-000000000004', 1),
  ('gps', 'GPS ნავიგატორები', 'GPS Navigators', 'c0000001-0000-0000-0000-000000000004', 2),
  ('phone-holders', 'ტელეფონის სამაგრები', 'Phone Holders', 'c0000001-0000-0000-0000-000000000004', 3),
  ('usb-chargers', 'USB დამტენები', 'USB Chargers', 'c0000001-0000-0000-0000-000000000004', 4),
  ('obd-scanners', 'OBD სკანერები', 'OBD Scanners', 'c0000001-0000-0000-0000-000000000004', 5);

-- Seed: Subcategories for Lighting
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('led-headlights', 'LED ფარები', 'LED Headlights', 'c0000001-0000-0000-0000-000000000005', 1),
  ('fog-lights', 'ნისლის ფარები', 'Fog Lights', 'c0000001-0000-0000-0000-000000000005', 2),
  ('interior-led', 'სალონის LED', 'Interior LED', 'c0000001-0000-0000-0000-000000000005', 3),
  ('turn-signals', 'მოსახვევის ფარები', 'Turn Signals', 'c0000001-0000-0000-0000-000000000005', 4),
  ('tail-lights', 'უკანა ფარები', 'Tail Lights', 'c0000001-0000-0000-0000-000000000005', 5);

-- Seed: Subcategories for Engine Parts
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('spark-plugs', 'ანთების სანთლები', 'Spark Plugs', 'c0000001-0000-0000-0000-000000000006', 1),
  ('belts', 'ქამრები', 'Belts', 'c0000001-0000-0000-0000-000000000006', 2),
  ('gaskets', 'პროკლადკები', 'Gaskets', 'c0000001-0000-0000-0000-000000000006', 3),
  ('hoses', 'შლანგები', 'Hoses', 'c0000001-0000-0000-0000-000000000006', 4),
  ('engine-mounts', 'ძრავის საყრდენები', 'Engine Mounts', 'c0000001-0000-0000-0000-000000000006', 5);

-- Seed: Subcategories for Filters
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('oil-filters', 'ზეთის ფილტრები', 'Oil Filters', 'c0000001-0000-0000-0000-000000000007', 1),
  ('air-filters', 'ჰაერის ფილტრები', 'Air Filters', 'c0000001-0000-0000-0000-000000000007', 2),
  ('cabin-filters', 'სალონის ფილტრები', 'Cabin Filters', 'c0000001-0000-0000-0000-000000000007', 3),
  ('fuel-filters', 'საწვავის ფილტრები', 'Fuel Filters', 'c0000001-0000-0000-0000-000000000007', 4);

-- Seed: Subcategories for Oils & Fluids
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('engine-oil', 'ძრავის ზეთი', 'Engine Oil', 'c0000001-0000-0000-0000-000000000008', 1),
  ('transmission-fluid', 'გადაცემათა კოლოფის სითხე', 'Transmission Fluid', 'c0000001-0000-0000-0000-000000000008', 2),
  ('brake-fluid', 'სამუხრუჭე სითხე', 'Brake Fluid', 'c0000001-0000-0000-0000-000000000008', 3),
  ('coolant', 'ანტიფრიზი', 'Coolant', 'c0000001-0000-0000-0000-000000000008', 4),
  ('windshield-fluid', 'მინის სამრეცხი', 'Windshield Fluid', 'c0000001-0000-0000-0000-000000000008', 5);

-- Seed: Subcategories for Safety
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('alarm-systems', 'სიგნალიზაციები', 'Alarm Systems', 'c0000001-0000-0000-0000-000000000009', 1),
  ('parking-sensors', 'პარკინგის სენსორები', 'Parking Sensors', 'c0000001-0000-0000-0000-000000000009', 2),
  ('first-aid', 'აპთეკა', 'First Aid Kits', 'c0000001-0000-0000-0000-000000000009', 3),
  ('fire-extinguishers', 'ცეცხლმაქრი', 'Fire Extinguishers', 'c0000001-0000-0000-0000-000000000009', 4);

-- Seed: Subcategories for Audio
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('speakers', 'დინამიკები', 'Speakers', 'c0000001-0000-0000-0000-000000000010', 1),
  ('subwoofers', 'სუბვუფერები', 'Subwoofers', 'c0000001-0000-0000-0000-000000000010', 2),
  ('head-units', 'მაგნიტოლები', 'Head Units', 'c0000001-0000-0000-0000-000000000010', 3),
  ('amplifiers', 'ამპლიფიკატორები', 'Amplifiers', 'c0000001-0000-0000-0000-000000000010', 4),
  ('bluetooth-adapters', 'Bluetooth ადაპტერები', 'Bluetooth Adapters', 'c0000001-0000-0000-0000-000000000010', 5);

-- Seed: Subcategories for Cleaning
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('car-wash', 'სარეცხი საშუალებები', 'Car Wash', 'c0000001-0000-0000-0000-000000000011', 1),
  ('polishes', 'საპრიალებლები', 'Polishes', 'c0000001-0000-0000-0000-000000000011', 2),
  ('wax', 'ცვილი', 'Wax', 'c0000001-0000-0000-0000-000000000011', 3),
  ('microfiber', 'მიკროფიბრა', 'Microfiber Cloths', 'c0000001-0000-0000-0000-000000000011', 4),
  ('interior-cleaners', 'სალონის საწმენდი', 'Interior Cleaners', 'c0000001-0000-0000-0000-000000000011', 5);

-- Seed: Subcategories for Cargo
INSERT INTO categories (slug, name_ka, name_en, parent_id, sort_order) VALUES
  ('roof-racks', 'სახურავის ბაგაჟნიკი', 'Roof Racks', 'c0000001-0000-0000-0000-000000000012', 1),
  ('cargo-nets', 'ტვირთის ბადეები', 'Cargo Nets', 'c0000001-0000-0000-0000-000000000012', 2),
  ('tow-bars', 'ფარკოპი', 'Tow Bars', 'c0000001-0000-0000-0000-000000000012', 3),
  ('bike-racks', 'ველოსიპედის სამაგრი', 'Bike Racks', 'c0000001-0000-0000-0000-000000000012', 4),
  ('roof-boxes', 'სახურავის ყუთი', 'Roof Boxes', 'c0000001-0000-0000-0000-000000000012', 5);
