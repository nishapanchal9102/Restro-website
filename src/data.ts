import { MenuItem, TableOption, GuestbookEntry, QuizQuestion } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'sushi-1',
    name: 'Black Gold Nigiri',
    description: 'Modern artisanal nigiri topped with 24k edible gold leaf, white truffle-infused soy glaze, and charred sesame seeds over premium vinegared black rice.',
    category: 'plates',
    price: 32,
    tags: ['Signature', 'Gluten-Free', 'Raw'],
    image: '/src/assets/images/kuro_dish_sushi_1782823895667.jpg',
    allergens: ['Soy', 'Finned Fish'],
    preparationTime: '12 min',
    calorieCount: 380,
    heatLevel: 0,
    flavorProfile: 'Umami & Truffle'
  },
  {
    id: 'wagyu-1',
    name: 'A5 Kuro Wagyu',
    description: 'A5 Grade Miyazaki Wagyu lightly seared over hot binchotan charcoal, dressed with aged soy reduction, shaved fresh summer truffle, and microgreens on a black slate platter.',
    category: 'signatures',
    price: 88,
    tags: ['Premium', 'Chef’s Special'],
    image: '/src/assets/images/kuro_dish_wagyu_1782823879620.jpg',
    allergens: ['Soy', 'Gluten'],
    preparationTime: '18 min',
    calorieCount: 650,
    heatLevel: 0,
    flavorProfile: 'Rich, Smokey & Melt-in-mouth'
  },
  {
    id: 'cocktail-1',
    name: 'The Obsidian Mist',
    description: 'Artisanal Japanese single malt whiskey, house-crafted blackened blackberry reduction, yuzu juice, and orange blossom mist. Served smoking with dry ice.',
    category: 'sips',
    price: 24,
    tags: ['Alcoholic', 'Smoky'],
    image: '/src/assets/images/kuro_drink_cocktail_1782823910632.jpg',
    allergens: [],
    preparationTime: '5 min',
    calorieCount: 180,
    heatLevel: 0,
    flavorProfile: 'Citrus, Oak & Smoke'
  },
  {
    id: 'plate-2',
    name: 'Charcoal Roasted Octopus',
    description: 'Sashimi-grade octopus glazed with sake-infused activated charcoal honey, seared to perfection, served over violet sweet potato cream and charred scallion oil.',
    category: 'plates',
    price: 28,
    tags: ['Seafood', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80',
    allergens: ['Mollusks'],
    preparationTime: '14 min',
    calorieCount: 290,
    heatLevel: 1,
    flavorProfile: 'Sweet, Charred & Zesty'
  },
  {
    id: 'signature-2',
    name: 'Cedar Miso Sablefish',
    description: 'Thick-cut black cod marinated for 72 hours in dark sweet miso, roasted on a cedar wood plank to lock in aromatic evergreen smoke, finished with fresh lime zest.',
    category: 'signatures',
    price: 45,
    tags: ['Classic', 'Sweet-Savoury'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    allergens: ['Soy', 'Finned Fish', 'Gluten'],
    preparationTime: '20 min',
    calorieCount: 480,
    heatLevel: 0,
    flavorProfile: 'Buttery, Sweet & Savoury'
  },
  {
    id: 'sip-2',
    name: 'Ceremonial Matcha Sour',
    description: 'Ceremonial grade Uji matcha, premium botanical craft gin, cold-pressed lemon juice, organic egg white, finished with a fine dust of golden crystal sugar.',
    category: 'sips',
    price: 22,
    tags: ['Alcoholic', 'Earth-Tone'],
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    allergens: ['Egg'],
    preparationTime: '6 min',
    calorieCount: 150,
    heatLevel: 0,
    flavorProfile: 'Herbaceous, Velvety & Tart'
  },
  {
    id: 'plate-3',
    name: 'Truffle-Salted Edamame',
    description: 'Young soybeans steamed in their pods, tossed in white truffle butter, coarse smoked sea salt, and dynamic dried chili threads.',
    category: 'plates',
    price: 14,
    tags: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    allergens: ['Soy', 'Milk'],
    preparationTime: '5 min',
    calorieCount: 190,
    heatLevel: 1,
    flavorProfile: 'Buttery, Earthy & Salty'
  },
  {
    id: 'signature-3',
    name: 'Spiced Hinoki Duck',
    description: 'Pan-seared dry-aged duck breast scented with five-spice and hinoki oil, sliced thin over ginger-roasted kabocha squash, black cherry reduction sauce.',
    category: 'signatures',
    price: 42,
    tags: ['Spicy-Hint', 'Aromatic'],
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80',
    allergens: ['Gluten'],
    preparationTime: '22 min',
    calorieCount: 580,
    heatLevel: 2,
    flavorProfile: 'Rich, Spiced & Tart'
  }
];

export const TABLES: TableOption[] = [
  // Sushi Bar area (Individual counter seats)
  { id: 'sb-1', name: 'Bar Seat 01', capacity: 1, area: 'Sushi Bar', description: 'Front-row interactiveness with the sushi masters.', coordinates: { x: 20, y: 30 } },
  { id: 'sb-2', name: 'Bar Seat 02', capacity: 1, area: 'Sushi Bar', description: 'Front-row interactiveness with the sushi masters.', coordinates: { x: 30, y: 30 } },
  { id: 'sb-3', name: 'Bar Seat 03', capacity: 1, area: 'Sushi Bar', description: 'Front-row interactiveness with the sushi masters.', coordinates: { x: 40, y: 30 } },
  
  // Main Hearth area (Circular tables near the center)
  { id: 'mh-1', name: 'Hearth Table 04', capacity: 4, area: 'Main Hearth', description: 'Warm and lively, located directly adjacent to our central roaring woodfire grill.', coordinates: { x: 25, y: 65 } },
  { id: 'mh-2', name: 'Hearth Table 05', capacity: 2, area: 'Main Hearth', description: 'Lively atmosphere centered near the chefs open grill.', coordinates: { x: 45, y: 65 } },
  { id: 'mh-3', name: 'Hearth Table 06', capacity: 6, area: 'Main Hearth', description: 'A large grand table built from ancient cedar, fireside view.', coordinates: { x: 35, y: 80 } },

  // Ambient Mezzanine (Intimate upper deck alcoves)
  { id: 'am-1', name: 'Mezzanine Booth 07', capacity: 2, area: 'Ambient Mezzanine', description: 'Elevated luxury booth with soft drapery, perfect for intimate conversations.', coordinates: { x: 65, y: 40 } },
  { id: 'am-2', name: 'Mezzanine Booth 08', capacity: 2, area: 'Ambient Mezzanine', description: 'Elevated luxury booth with soft drapery, perfect for intimate conversations.', coordinates: { x: 80, y: 40 } },
  { id: 'am-3', name: 'Mezzanine Lounge 09', capacity: 4, area: 'Ambient Mezzanine', description: 'Deep leather sofas overlooking the main dining room under suspended lanterns.', coordinates: { x: 72, y: 20 } },

  // Private Garden (Peaceful outdoor stone sanctuary)
  { id: 'pg-1', name: 'Zen Gazebo 10', capacity: 4, area: 'Private Garden', description: 'A private pagoda surrounded by bamboo plants and trickling stone fountains.', coordinates: { x: 70, y: 75 } },
  { id: 'pg-2', name: 'Pond Canopy 11', capacity: 2, area: 'Private Garden', description: 'Seated under cherry blossoms, overlooking our active koi pond.', coordinates: { x: 85, y: 75 } }
];

export const GUESTBOOK_ENTRIES: GuestbookEntry[] = [
  {
    id: '1',
    name: 'Sora Tanaka',
    rating: 5,
    comment: 'The Kuro Wagyu actually dissolved. The pairing with the Obsidian Mist cocktail is spectacular. The atmosphere feels like an immersive, high-end obsidian temple in modern Tokyo.',
    date: '2026-06-25',
    tag: 'Connoisseur'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    rating: 5,
    comment: 'Beautifully minimalist, dark, and highly intimate. Selected a Mezzanine Booth, and the level of service was impeccable. A total sensory experience.',
    date: '2026-06-28',
    tag: 'Local Guide'
  },
  {
    id: '3',
    name: 'Marcus Sterling',
    rating: 5,
    comment: 'The charcoal octopus had the perfect char and sweetness. We did the flavor quiz at the table and it accurately matched me with the Cedar Sablefish. Incredible coding on this site too!',
    date: '2026-06-29',
    tag: 'Vibe Enthusiast'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'What sensory texture appeals to you most tonight?',
    options: [
      { label: 'Delicate & Raw', value: 'plates', description: 'Sleek, refreshing, pure, clean textures.', icon: 'Fish' },
      { label: 'Rich, Melty & Savoury', value: 'signatures', description: 'Sizzling, hearty, buttery, bold textures.', icon: 'Flame' },
      { label: 'Sip-able, Smoky & Botanical', value: 'sips', description: 'Liquid art, complex aromas, refreshing notes.', icon: 'GlassWater' }
    ]
  },
  {
    id: 2,
    text: 'Which aromatic note matches your current frequency?',
    options: [
      { label: 'Charred & Woody', value: 'smoky', description: 'Scent of evergreens, binchotan fire, and cedar.', icon: 'Trees' },
      { label: 'Citrus & Herbaceous', value: 'fresh', description: 'Zesty yuzu, fresh lemon, ginger, and wild mint.', icon: 'Sparkles' },
      { label: 'Earthy & Creamy', value: 'rich', description: 'Black truffle butter, sweet miso, violet sweet potato.', icon: 'Leaf' }
    ]
  },
  {
    id: 3,
    text: 'What kind of atmosphere are you looking to unlock?',
    options: [
      { label: 'Intimate Sanctuary', value: 'intimate', description: 'Elevated alcoves, low lights, whispering drapes.', icon: 'Moon' },
      { label: 'Dynamic & Culinary', value: 'lively', description: 'Front-row chef counter action, glowing fire pit.', icon: 'Sparkle' },
      { label: 'Zen Solitude', value: 'peaceful', description: 'Sounds of trickling stone springs under bamboo trees.', icon: 'Compass' }
    ]
  }
];
