import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '/Users/stevenbarton/IceBreaker/src/lib/utils';

interface AppTextInputProps extends TextInputProps {
  className?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ className, ...props }) => {
  return (
    <TextInput
      className={cn(
        'border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800',
        className
      )}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

export default AppTextInput;