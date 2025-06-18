import React from 'react';
import { Image, View } from 'react-native';
import { cn } from '/Users/stevenbarton/IceBreaker/src/lib/utils';

interface AppAvatarProps {
  uri: string;
  size?: number;
  className?: string;
}

const AppAvatar: React.FC<AppAvatarProps> = ({ uri, size = 48, className }) => {
  return (
    <Image
      source={{ uri }}
      className={cn('rounded-full', className)}
      style={{ width: size, height: size }}
    />
  );
};

export default AppAvatar;