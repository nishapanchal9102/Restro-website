export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'plates' | 'signatures' | 'sips';
  price: number;
  tags: string[];
  image: string;
  allergens: string[];
  preparationTime: string;
  calorieCount: number;
  heatLevel: number; // 0 to 3
  flavorProfile: string;
}

export type TableArea = 'Sushi Bar' | 'Main Hearth' | 'Ambient Mezzanine' | 'Private Garden';

export interface TableOption {
  id: string;
  name: string;
  capacity: number;
  area: TableArea;
  description: string;
  coordinates: { x: number; y: number }; // Relative position on interactive map
}

export interface Reservation {
  name: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  area: TableArea;
  tableId: string;
  specialRequest?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  tag: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    description: string;
    icon: string; // Lucide icon name
  }[];
}
