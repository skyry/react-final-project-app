// Скрипт для завантаження даних на mockapi.io
const mockProducts = [
  {
    id: "1",
    name: "AMD Ryzen 9 7950X",
    description: "16-ядерний процесор з архітектурою Zen 4, базова частота 4.5 ГГц",
    price: 14000,
    originalPrice: 15000,
    category: "processors",
    brand: "AMD",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 12,
    isNew: false,
    discount: 1000,
    createdAt: "2024-08-25T10:00:00Z"
  },
  {
    id: "2",
    name: "Intel Core i9-13900K",
    description: "24-ядерний процесор з технологією Intel Thread Director",
    price: 21900,
    originalPrice: 21900,
    category: "processors",
    brand: "Intel",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 8,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-25T10:15:00Z"
  },
  {
    id: "3",
    name: "NVIDIA GeForce RTX 4090",
    description: "Топова відеокарта з 24 ГБ GDDR6X пам'яті",
    price: 42000,
    originalPrice: 52000,
    category: "graphics",
    brand: "NVIDIA",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 5,
    isNew: true,
    discount: 10000,
    createdAt: "2024-08-25T10:30:00Z"
  },
  {
    id: "4",
    name: "AMD Radeon RX 7900 XTX",
    description: "Потужна відеокарта з 24 ГБ GDDR6 пам'яті",
    price: 49999.99,
    category: "graphics",
    brand: "AMD",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 15,
    isNew: false,
    discount: 0,
    createdAt: "2024-08-20T14:00:00Z"
  },
  {
    id: "5",
    name: "Corsair Vengeance DDR5-5600",
    description: "32 ГБ (2x16 ГБ) DDR5 оперативна пам'ять",
    price: 8999.99,
    originalPrice: 9999.99,
    category: "memory",
    brand: "Corsair",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 20,
    isNew: false,
    discount: 10,
    createdAt: "2024-08-18T11:00:00Z"
  },
  {
    id: "6",
    name: "G.Skill Trident Z5 DDR5-6000",
    description: "16 ГБ (2x8 ГБ) високошвидкісна DDR5 пам'ять",
    price: 5999.99,
    category: "memory",
    brand: "G.Skill",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 25,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-22T09:30:00Z"
  },
  {
    id: "7",
    name: "Samsung 980 PRO 2TB",
    description: "NVMe SSD диск з швидкістю читання до 7000 МБ/с",
    price: 8499.99,
    originalPrice: 9499.99,
    category: "storage",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 18,
    isNew: false,
    discount: 11,
    createdAt: "2024-08-15T16:00:00Z"
  },
  {
    id: "8",
    name: "WD Black SN850X 1TB",
    description: "Ігровий NVMe SSD з радіатором охолодження",
    price: 4999.99,
    category: "storage",
    brand: "Western Digital",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    inStock: false,
    stockQuantity: 0,
    isNew: false,
    discount: 0,
    createdAt: "2024-08-10T12:00:00Z"
  },
  {
    id: "9",
    name: "ASUS ROG Strix Z790-E",
    description: "Материнська плата для Intel 12-13 покоління з Wi-Fi 6E",
    price: 14999.99,
    originalPrice: 16999.99,
    category: "motherboards",
    brand: "ASUS",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 10,
    isNew: false,
    discount: 12,
    createdAt: "2024-08-12T13:30:00Z"
  },
  {
    id: "10",
    name: "MSI X670E Carbon WiFi",
    description: "Преміум материнська плата для AMD Ryzen 7000",
    price: 16999.99,
    category: "motherboards",
    brand: "MSI",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 7,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-23T08:00:00Z"
  },
  {
    id: "11",
    name: "Corsair RM1000x",
    description: "1000W модульний блок живлення 80+ Gold",
    price: 7999.99,
    originalPrice: 8999.99,
    category: "power",
    brand: "Corsair",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 15,
    isNew: false,
    discount: 11,
    createdAt: "2024-08-14T15:20:00Z"
  },
  {
    id: "12",
    name: "Seasonic Focus GX-850",
    description: "850W блок живлення з 10-річною гарантією",
    price: 6499.99,
    category: "power",
    brand: "Seasonic",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 12,
    isNew: false,
    discount: 0,
    createdAt: "2024-08-08T11:45:00Z"
  },
  {
    id: "13",
    name: "Noctua NH-D15",
    description: "Двобаштовий процесорний кулер з тихими вентиляторами",
    price: 3999.99,
    originalPrice: 4499.99,
    category: "cooling",
    brand: "Noctua",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 22,
    isNew: false,
    discount: 11,
    createdAt: "2024-08-05T14:10:00Z"
  },
  {
    id: "14",
    name: "Corsair H150i Elite LCD",
    description: "360мм рідинне охолодження з LCD дисплеєм",
    price: 8999.99,
    category: "cooling",
    brand: "Corsair",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: false,
    stockQuantity: 0,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-24T17:30:00Z"
  },
  {
    id: "15",
    name: "Fractal Design Define 7",
    description: "Тихий ATX корпус з шумоізоляцією",
    price: 5999.99,
    originalPrice: 6999.99,
    category: "cases",
    brand: "Fractal Design",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 8,
    isNew: false,
    discount: 14,
    createdAt: "2024-08-03T10:20:00Z"
  },
  {
    id: "16",
    name: "Lian Li O11 Dynamic EVO",
    description: "Скляний корпус для водяного охолодження",
    price: 7499.99,
    category: "cases",
    brand: "Lian Li",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 6,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-21T12:45:00Z"
  },
  {
    id: "17",
    name: "AMD Ryzen 7 7800X3D",
    description: "8-ядерний ігровий процесор з 3D V-Cache технологією",
    price: 18999.99,
    originalPrice: 21999.99,
    category: "processors",
    brand: "AMD",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 14,
    isNew: false,
    discount: 14,
    createdAt: "2024-08-16T09:00:00Z"
  },
  {
    id: "18",
    name: "Intel Core i5-13600K",
    description: "14-ядерний процесор середнього класу з високою продуктивністю",
    price: 12999.99,
    category: "processors",
    brand: "Intel",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 20,
    isNew: false,
    discount: 0,
    createdAt: "2024-08-07T13:15:00Z"
  },
  {
    id: "19",
    name: "NVIDIA GeForce RTX 4070 Ti",
    description: "Високопродуктивна відеокарта з 12 ГБ GDDR6X",
    price: 34999.99,
    originalPrice: 38999.99,
    category: "graphics",
    brand: "NVIDIA",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 9,
    isNew: false,
    discount: 10,
    createdAt: "2024-08-11T16:20:00Z"
  },
  {
    id: "20",
    name: "AMD Radeon RX 7700 XT",
    description: "Відеокарта для 1440p ігор з 12 ГБ GDDR6",
    price: 21999.99,
    category: "graphics",
    brand: "AMD",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 16,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-19T11:30:00Z"
  },
  {
    id: "21",
    name: "Kingston Fury Beast DDR4-3200",
    description: "16 ГБ (2x8 ГБ) DDR4 оперативна пам'ять",
    price: 2999.99,
    originalPrice: 3499.99,
    category: "memory",
    brand: "Kingston",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 35,
    isNew: false,
    discount: 14,
    createdAt: "2024-08-01T08:45:00Z"
  },
  {
    id: "22",
    name: "Crucial Ballistix DDR5-4800",
    description: "32 ГБ (2x16 ГБ) DDR5 пам'ять для робочих станцій",
    price: 7499.99,
    category: "memory",
    brand: "Crucial",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 18,
    isNew: false,
    discount: 0,
    createdAt: "2024-08-06T15:00:00Z"
  },
  {
    id: "23",
    name: "Seagate FireCuda 530 1TB",
    description: "Швидкий NVMe SSD для геймерів з радіатором",
    price: 5499.99,
    originalPrice: 6199.99,
    category: "storage",
    brand: "Seagate",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 12,
    isNew: false,
    discount: 11,
    createdAt: "2024-08-13T12:30:00Z"
  },
  {
    id: "24",
    name: "Crucial MX4 500GB",
    description: "Надійний SATA SSD диск для повсякденних завдань",
    price: 2199.99,
    category: "storage",
    brand: "Crucial",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 28,
    isNew: false,
    discount: 0,
    createdAt: "2024-07-30T14:45:00Z"
  },
  {
    id: "25",
    name: "Gigabyte B650 AORUS Elite",
    description: "Материнська плата для AMD Ryzen 7000 з підтримкою DDR5",
    price: 8999.99,
    originalPrice: 9999.99,
    category: "motherboards",
    brand: "Gigabyte",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 11,
    isNew: false,
    discount: 10,
    createdAt: "2024-08-09T10:15:00Z"
  },
  {
    id: "26",
    name: "ASRock B760M Pro RS",
    description: "Бюджетна материнська плата для Intel 12-13 покоління",
    price: 4999.99,
    category: "motherboards",
    brand: "ASRock",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 25,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-17T16:00:00Z"
  },
  {
    id: "27",
    name: "be quiet! Pure Power 11 600W",
    description: "Тихий блок живлення 600W 80+ Gold",
    price: 3999.99,
    originalPrice: 4499.99,
    category: "power",
    brand: "be quiet!",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 20,
    isNew: false,
    discount: 11,
    createdAt: "2024-08-04T11:20:00Z"
  },
  {
    id: "28",
    name: "Arctic Liquid Freezer II 280",
    description: "280мм рідинне охолодження з високою продуктивністю",
    price: 4999.99,
    category: "cooling",
    brand: "Arctic",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 16,
    isNew: true,
    discount: 0,
    createdAt: "2024-08-20T13:40:00Z"
  },
  {
    id: "29",
    name: "Cooler Master MasterBox Q300L",
    description: "Компактний mITX корпус для малих збірок",
    price: 2499.99,
    originalPrice: 2999.99,
    category: "cases",
    brand: "Cooler Master",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 14,
    isNew: false,
    discount: 17,
    createdAt: "2024-07-28T09:30:00Z"
  },
  {
    id: "30",
    name: "Phanteks Eclipse P400A",
    description: "Стильний корпус з відмінною вентиляцією",
    price: 4499.99,
    category: "cases",
    brand: "Phanteks",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
    inStock: true,
    stockQuantity: 10,
    isNew: false,
    discount: 0,
    createdAt: "2024-08-02T15:10:00Z"
  }
];

const uploadData = async () => {
  const baseUrl = 'https://68ab6acc7a0bbe92cbb77ce5.mockapi.io/api/v1/Products';
  
  console.log('Початок завантаження даних...');
  
  for (let i = 0; i < mockProducts.length; i++) {
    const product = mockProducts[i];
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Продукт ${i + 1}/${mockProducts.length} завантажено: ${data.name}`);
      } else {
        console.error(`Помилка завантаження продукту ${product.name}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Помилка мережі для продукту ${product.name}:`, error);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('Завантаження завершено!');
};

uploadData();