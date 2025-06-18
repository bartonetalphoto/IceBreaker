import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '/Users/stevenbarton/IceBreaker/src/lib/utils'; // Assuming you have a utility function for class names

interface AppBadgeProps {
  label: string;
  className?: string;
}

const AppBadge: React.FC<AppBadgeProps> = ({ label, className }) => {
  return (
    <View
      className={cn(
        'bg-gray-100 rounded-full px-3 py-1',
        className
      )}
    >
      <Text className="text-xs text-gray-600">{label}</Text>
    </View>
  );
};

export default AppBadge;