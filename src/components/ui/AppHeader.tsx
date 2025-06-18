import React from 'react';
import { Text, View } from 'react-native';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-6">
      <Text className="text-2xl font-bold text-gray-900">{title}</Text>
      {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
    </View>
  );
};

export default AppHeader;