import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { cn } from '/Users/stevenbarton/IceBreaker/src/lib/utils';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity
      className={cn(
        'bg-black py-4 rounded-2xl items-center shadow-sm',
        className
      )}
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;