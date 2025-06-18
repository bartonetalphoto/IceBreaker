import React from 'react';
import { View } from 'react-native';

const AppSpacer: React.FC<{ size?: number }> = ({ size = 16 }) => {
  return <View style={{ height: size }} />;
};

export default AppSpacer;