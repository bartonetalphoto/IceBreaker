import React from 'react';
import { View } from 'react-native';
import { cn } from '/Users/stevenbarton/IceBreaker/src/lib/utils';

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
}

const AppCard: React.FC<AppCardProps> = ({ children, className }) => {
  return (
    <View className={cn('bg-white rounded-3xl p-4 shadow-sm', className)}>
      {children}
    </View>
  );
};

export default AppCard;