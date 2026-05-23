-- Sample Products for ManqanaAccessory
-- Run after categories are seeded

-- LED Headlights - Premium
INSERT INTO products (name_ka, name_en, description_ka, description_en, price, sale_price, category_id, brand, stock_quantity, is_featured, specifications) VALUES
('LED ფარები - Premium', 'LED Headlights - Premium', 'მაღალი ხარისხის LED ფარები ყველა მარკის ავტომობილისთვის. 6000K ნათელი თეთრი შუქი.', 'High quality LED headlights for all car brands. 6000K bright white light.', 249.99, 199.99, 'c0000001-0000-0000-0000-000000000005', 'Philips', 50, true, '{"Power": "55W", "Color Temperature": "6000K", "Lumens": "12000lm", "Lifespan": "50000h"}'),

-- Floor Mats
('იატაკის საფენები - ხის ტიპი', 'Car Floor Mats - Wood Style', 'უნივერსალური იატაკის საფენები წყალგაუმტარი მასალისგან.', 'Universal floor mats made from waterproof material.', 89.99, 69.99, 'c0000001-0000-0000-0000-000000000001', 'WeatherTech', 120, true, '{"Material": "TPE Rubber", "Pieces": "4", "Waterproof": "Yes"}'),

-- Bluetooth Audio System
('Bluetooth აუდიო სისტემა', 'Bluetooth Audio System', 'უკაბელო აუდიო სისტემა Bluetooth 5.0 კავშირით.', 'Wireless audio system with Bluetooth 5.0 connectivity.', 199.99, null, 'c0000001-0000-0000-0000-000000000010', 'Pioneer', 35, true, '{"Bluetooth": "5.0", "Power": "200W", "Channels": "4"}'),

-- GPS Navigation
('GPS ნავიგაცია 7"', 'GPS Navigation 7"', '7 ინჩიანი სენსორული ეკრანით, საქართველოს რუკებით.', '7 inch touchscreen with Georgia maps pre-loaded.', 159.99, 129.99, 'c0000001-0000-0000-0000-000000000004', 'Garmin', 25, true, '{"Screen": "7 inch", "Maps": "Georgia + Europe", "Updates": "Free lifetime"}'),

-- USB Charger
('სმარტ დამტენი USB-C', 'Smart Charger USB-C', 'სწრაფი დამტენი 65W USB-C პორტით.', 'Fast charger with 65W USB-C port.', 54.99, 39.99, 'c0000001-0000-0000-0000-000000000004', 'Anker', 200, true, '{"Power": "65W", "Ports": "2x USB-C", "Fast Charge": "PD 3.0"}'),

-- Rear View Camera
('უკანა კამერა HD', 'Rear View Camera HD', '170° კუთხის HD კამერა ღამის ხედვით.', '170° angle HD camera with night vision.', 129.99, 99.99, 'c0000001-0000-0000-0000-000000000004', 'AUTO-VOX', 0, false, '{"Resolution": "1080P", "Angle": "170°", "Night Vision": "Yes", "Waterproof": "IP68"}'),

-- Neck Pillow
('ნახშირბადის ბოჭკოვანი ბალიში', 'Carbon Fiber Neck Pillow', 'ორთოპედიული ბალიში კისრის მხარდაჭერით.', 'Orthopedic pillow with neck support.', 45.99, null, 'c0000001-0000-0000-0000-000000000001', 'Carfy', 80, false, '{"Material": "Memory Foam", "Cover": "Carbon Fiber Pattern", "Washable": "Yes"}'),

-- Summer Tires
('საზაფხულო საბურავი 205/55R16', 'Summer Tire 205/55R16', 'პრემიუმ კლასის საზაფხულო საბურავი.', 'Premium class summer tire.', 189.99, null, 'c0000001-0000-0000-0000-000000000003', 'Michelin', 40, true, '{"Size": "205/55R16", "Season": "Summer", "Load Index": "91V"}'),

-- Engine Oil
('ძრავის ზეთი 5W-30 4L', 'Engine Oil 5W-30 4L', 'სინთეტიკური ძრავის ზეთი 4 ლიტრი.', 'Synthetic engine oil 4 liters.', 79.99, 64.99, 'c0000001-0000-0000-0000-000000000008', 'Mobil 1', 100, false, '{"Viscosity": "5W-30", "Volume": "4L", "Type": "Full Synthetic", "API": "SN Plus"}'),

-- Car Wash Kit
('ავტომობილის საწმენდი ნაკრები', 'Car Wash Kit', 'სრული ნაკრები ავტომობილის გარეცხვისთვის.', 'Complete kit for car washing.', 34.99, null, 'c0000001-0000-0000-0000-000000000011', 'Chemical Guys', 60, false, '{"Pieces": "8", "Includes": "Shampoo, Wax, Microfiber, Sponge"}'),

-- Alarm System
('სიგნალიზაცია GPS ტრეკერით', 'Alarm System with GPS Tracker', 'თანამედროვე სიგნალიზაცია GPS თვალთვალით და მობილური აპლიკაციით.', 'Modern alarm system with GPS tracking and mobile app.', 349.99, 289.99, 'c0000001-0000-0000-0000-000000000009', 'Pandora', 15, true, '{"GPS": "Yes", "App": "iOS/Android", "Range": "Unlimited", "Sensors": "Shock + Tilt"}'),

-- Roof Rack
('სახურავის ბაგაჟნიკი უნივერსალური', 'Universal Roof Rack', 'მაღალი ხარისხის ალუმინის ბაგაჟნიკი.', 'High quality aluminum roof rack.', 219.99, null, 'c0000001-0000-0000-0000-000000000012', 'Thule', 20, false, '{"Material": "Aluminum", "Load": "75kg", "Fits": "Universal"}');

-- Add primary images for each product
INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'LED Headlights - Premium';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Car Floor Mats - Wood Style';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Bluetooth Audio System';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'GPS Navigation 7"';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Smart Charger USB-C';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Rear View Camera HD';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Carbon Fiber Neck Pillow';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Summer Tire 205/55R16';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Engine Oil 5W-30 4L';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Car Wash Kit';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Alarm System with GPS Tracker';

INSERT INTO product_images (product_id, url, is_primary, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop', true, 0
FROM products WHERE name_en = 'Universal Roof Rack';
