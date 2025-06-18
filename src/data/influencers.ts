// /src/data/Influencers.ts

export interface Influencer {
  id: string;
  name: string;
  image: string;
  category: string;
  rate: string;
  audience: number;
  location: string;
}

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1619300026534-8e8a76941138',
    category: 'Fashion | Lifestyle',
    rate: 'From R2000',
    audience: 30000,
    location: 'Cape Town',
  },
  {
    id: '2',
    name: 'Sara Jane',
    image: 'https://images.unsplash.com/photo-1553544923-37efbe6ff816',
    category: 'Beauty | UGC',
    rate: 'From R1500',
    audience: 50000,
    location: 'Johannesburg',
  },
  {
    id: '3',
    name: 'Mike Star',
    image: 'https://images.unsplash.com/photo-1485463598028-44d6c47bf23f',
    category: 'Film | Content Creation',
    rate: 'From R500',
    audience: 12000,
    location: 'Durban',
  },
  {
    id: '4',
    name: 'Tina Bell',
    image: 'https://images.unsplash.com/photo-1612928414075-bc722ade44f1',
    category: 'Travel | Makeup',
    rate: 'From R3000',
    audience: 90000,
    location: 'Cape Town',
  },
  {
    id: '5',
    name: 'Lara Moon',
    image: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab',
    category: 'Fashion | Lifestyle',
    rate: 'From R1800',
    audience: 40000,
    location: 'Pretoria',
  },
  {
    id: '6',
    name: 'Jess Ray',
    image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211',
    category: 'Beauty | UGC',
    rate: 'From R1500',
    audience: 25000,
    location: 'Bloemfontein',
  },
  // …and so on…
];
