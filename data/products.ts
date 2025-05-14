export type EyewearProduct = {
  id: string;
  name: string;
  type: 'eyeglasses' | 'sunglasses';
  brand: string;
  price: number;
  colors: string[];
  imageUrls: string[];
  description: string;
  features: string[];
  frameShape: string;
  frameMaterial: string;
  arModelUrl?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
};

export const featuredProducts: EyewearProduct[] = [
  {
    id: 'feat-001',
    name: 'Horizon',
    type: 'sunglasses',
    brand: 'Ray-Ban',
    price: 129.99,
    colors: ['Black', 'Tortoise', 'Crystal'],
    imageUrls: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Sleek and modern sunglasses for everyday style. UV400 protection with polarized lenses.',
    features: ['Polarized', 'UV Protection', 'Scratch-resistant coating', 'Lightweight'],
    frameShape: 'Square',
    frameMaterial: 'Acetate',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 126
  },
  {
    id: 'feat-002',
    name: 'Vista Clear',
    type: 'eyeglasses',
    brand: 'Warby Parker',
    price: 99.99,
    colors: ['Black', 'Tortoise', 'Blue'],
    imageUrls: [
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Classic rectangular frames with blue light filtering lenses. Perfect for everyday computer use.',
    features: ['Blue light filtering', 'Anti-glare coating', 'Lightweight'],
    frameShape: 'Rectangle',
    frameMaterial: 'Metal',
    isFeatured: true,
    rating: 4.5,
    reviewCount: 98
  },
  {
    id: 'feat-003',
    name: 'Aviator Pro',
    type: 'sunglasses',
    brand: 'Ray-Ban',
    price: 149.99,
    colors: ['Gold', 'Silver', 'Black'],
    imageUrls: [
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Timeless aviator style with modern updates. Premium metal frame with adjustable nose pads.',
    features: ['Polarized', 'UV Protection', 'Adjustable nose pads', 'Spring hinges'],
    frameShape: 'Aviator',
    frameMaterial: 'Metal',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 215
  },
];

export const eyeglasses: EyewearProduct[] = [
  {
    id: 'eg-001',
    name: 'Clarity Round',
    type: 'eyeglasses',
    brand: 'Oliver Peoples',
    price: 289.99,
    colors: ['Black', 'Tortoise', 'Clear'],
    imageUrls: [
      'https://images.pexels.com/photos/2148344/pexels-photo-2148344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2148344/pexels-photo-2148344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Trendy round frames with blue light filtering technology. Light and comfortable for all-day wear.',
    features: ['Blue light filtering', 'Spring hinges', 'Lightweight'],
    frameShape: 'Round',
    frameMaterial: 'Acetate',
    isNew: true,
    rating: 4.2,
    reviewCount: 45
  },
  {
    id: 'eg-002',
    name: 'Tech Squared',
    type: 'eyeglasses',
    brand: 'Tom Ford',
    price: 359.99,
    colors: ['Matte Black', 'Tortoise', 'Navy'],
    imageUrls: [
      'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Modern square frames with a minimalist design. Features anti-glare and anti-smudge coatings.',
    features: ['Anti-glare', 'Anti-smudge', 'Spring hinges'],
    frameShape: 'Square',
    frameMaterial: 'Titanium',
    rating: 4.6,
    reviewCount: 87
  },
  {
    id: 'eg-003',
    name: 'Thin Wire',
    type: 'eyeglasses',
    brand: 'Moscot',
    price: 249.99,
    colors: ['Gold', 'Silver', 'Rose Gold'],
    imageUrls: [
      'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Elegant wire frames with an understated design. Ultra-lightweight with adjustable nose pads.',
    features: ['Ultra-lightweight', 'Adjustable nose pads', 'Slim temples'],
    frameShape: 'Oval',
    frameMaterial: 'Metal',
    rating: 4.4,
    reviewCount: 62
  },
  {
    id: 'eg-004',
    name: 'Bold Cat Eye',
    type: 'eyeglasses',
    brand: 'Gentle Monster',
    price: 329.99,
    colors: ['Black', 'Tortoise', 'Red'],
    imageUrls: [
      'https://images.pexels.com/photos/3762624/pexels-photo-3762624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3762624/pexels-photo-3762624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Statement cat eye frames with a bold, fashionable look. Features blue light filtering lenses.',
    features: ['Blue light filtering', 'Spring hinges', 'Decorative temples'],
    frameShape: 'Cat Eye',
    frameMaterial: 'Acetate',
    isNew: true,
    rating: 4.7,
    reviewCount: 53
  },
];

export const sunglasses: EyewearProduct[] = [
  {
    id: 'sg-001',
    name: 'Classic Wayfarer',
    type: 'sunglasses',
    brand: 'Ray-Ban',
    price: 169.99,
    colors: ['Black', 'Tortoise', 'Blue'],
    imageUrls: [
      'https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Iconic wayfarer style with modern updates. Features polarized lenses with UV protection.',
    features: ['Polarized', 'UV Protection', 'Durable hinges', 'Scratch-resistant lenses'],
    frameShape: 'Wayfarer',
    frameMaterial: 'Acetate',
    rating: 4.8,
    reviewCount: 147
  },
  {
    id: 'sg-002',
    name: 'Sport Shield',
    type: 'sunglasses',
    brand: 'Oakley',
    price: 199.99,
    colors: ['Black', 'White', 'Red'],
    imageUrls: [
      'https://images.pexels.com/photos/2158195/pexels-photo-2158195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2158195/pexels-photo-2158195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Performance shield sunglasses for sports and outdoor activities. Wrap-around design for full coverage.',
    features: ['Polarized', 'UV Protection', 'Anti-fog', 'Impact-resistant'],
    frameShape: 'Shield',
    frameMaterial: 'Carbon Fiber',
    isNew: true,
    rating: 4.6,
    reviewCount: 83
  },
  {
    id: 'sg-003',
    name: 'Retro Round',
    type: 'sunglasses',
    brand: 'Persol',
    price: 279.99,
    colors: ['Gold', 'Silver', 'Black'],
    imageUrls: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Vintage-inspired round sunglasses with modern lens technology. Stylish and lightweight.',
    features: ['UV Protection', 'Gradient lenses', 'Adjustable nose pads'],
    frameShape: 'Round',
    frameMaterial: 'Metal',
    rating: 4.5,
    reviewCount: 92
  },
  {
    id: 'sg-004',
    name: 'Oversized Glam',
    type: 'sunglasses',
    brand: 'Tom Ford',
    price: 399.99,
    colors: ['Black', 'Tortoise', 'Pink'],
    imageUrls: [
      'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    description: 'Glamorous oversized sunglasses with high-end detailing. Provides maximum UV protection and style.',
    features: ['Polarized', 'UV Protection', 'Gradient lenses', 'Designer detailing'],
    frameShape: 'Oversized',
    frameMaterial: 'Acetate',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 124
  },
];

export const allProducts: EyewearProduct[] = [...featuredProducts, ...eyeglasses, ...sunglasses];

export const getProductsByType = (type: 'eyeglasses' | 'sunglasses') => {
  return allProducts.filter(product => product.type === type);
};

export const getProductById = (id: string) => {
  return allProducts.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.isFeatured);
};

export const getNewProducts = () => {
  return allProducts.filter(product => product.isNew);
};