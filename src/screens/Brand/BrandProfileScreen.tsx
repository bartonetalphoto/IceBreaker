import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type BottomTabParamList = {
  Explore: undefined;
  Wishlists: undefined;
  Campaigns: undefined;
  Messages: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<BottomTabParamList, 'Profile'>;

const BrandProfileScreen: React.FC<Props> = ({ navigation }) => {
    
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold text-gray-800 mb-4">
        🚀 Welcome to the Brand Profile Screen
      </Text>
      <Text className="text-base text-gray-500 mb-6">You're logged in as a brand.</Text>

      <Button
        title="Go to Explore"
        onPress={() => navigation.navigate('Explore')}
      />
    </View>
  );
};

export default BrandProfileScreen;
