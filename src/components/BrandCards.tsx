import React from 'react';
import { View, Text, Image, TouchableOpacity } from './Styled';

interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
}

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Glow Essentials',
    logo: 'https://via.placeholder.com/60',
    industry: 'Beauty & Skincare',
    description: 'We partner with influencers to bring natural skincare to the spotlight.',
  },
  {
    id: '2',
    name: 'FitFuel',
    logo: 'https://via.placeholder.com/60',
    industry: 'Health & Fitness',
    description: 'Fitness-focused food brand creating energy-packed snacks.',
  },
  {
    id: '3',
    name: 'Urban Threads',
    logo: 'https://via.placeholder.com/60',
    industry: 'Fashion',
    description: 'Trend-forward streetwear with a conscious twist.',
  },
];

const BrandCards = () => {
  return (
    <View className="space-y-4 mt-4">
      {mockBrands.map((brand) => (
        <TouchableOpacity key={brand.id} className="bg-white p-4 rounded-xl shadow-md flex-row items-start space-x-4">
          <Image source={{ uri: brand.logo }} className="w-12 h-12 rounded-full" />
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">{brand.name}</Text>
            <Text className="text-xs text-gray-500">{brand.industry}</Text>
            <Text className="text-sm text-gray-600 mt-1">{brand.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BrandCards;
