// src/components/CampaignCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import clsx from 'clsx';

type Campaign = {
  id: string;
  name: string;
  status: 'Draft' | 'Active' | 'Completed';
  budget: number;
  committed: number;
  influencers: number;
  startDate: string;
  endDate: string;
  createdAt?: string; // optional
  onPress?: () => void;
};

const statusColors = {
  Draft: 'bg-yellow-200 text-yellow-800',
  Active: 'bg-green-200 text-green-800',
  Completed: 'bg-gray-300 text-gray-800',
};

export const CampaignCard = ({
  name,
  status,
  budget,
  committed,
  influencers,
  startDate,
  endDate,
  createdAt,
  onPress,
}: Campaign) => {
  const percent = budget ? Math.round((committed / budget) * 100) : 0;
  const createdDate = createdAt ? new Date(createdAt).toLocaleDateString() : null;

  return (
    <TouchableOpacity
      className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm mb-4"
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-black dark:text-white">
          {name}
        </Text>
        <View className={clsx('px-2 py-0.5 rounded-full text-xs', statusColors[status])}>
          <Text className="text-xs">{status}</Text>
        </View>
      </View>

      {/* Info */}
      <Text className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        Budget: R{budget?.toLocaleString?.() ?? '0'} • Committed: {percent}%
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        Influencers: {influencers}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        {startDate} – {endDate}
      </Text>

      {/* Optional createdAt */}
      {createdDate && (
        <Text className="text-xs text-gray-400 mt-1">Created: {createdDate}</Text>
      )}
    </TouchableOpacity>
  );
};
