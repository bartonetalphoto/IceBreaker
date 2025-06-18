// src/screens/BottomTab/Campaign/CampaignScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CampaignCard } from '../../../components/CampaignCard';
import { Plus } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CampaignStackParamList = {
  CampaignDetail: { id: string };
  Step1CampaignBasicsScreen: undefined;
};

export default function CampaignScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CampaignStackParamList>>();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Load campaigns from AsyncStorage on screen focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchCampaigns = async () => {
        const stored = await AsyncStorage.getItem('campaigns');
        const parsed = stored ? JSON.parse(stored) : [];

        // Sort by createdAt (newest first)
parsed.sort((a: any, b: any) => {
  const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  return dateB - dateA;
});

        setCampaigns(parsed);

        // Scroll to top when returning
        if (parsed.length > 0 && flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: false });
        }
      };

      fetchCampaigns();
    }, [])
  );

  return (
    <View className="flex-1 px-4 pt-4 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-black dark:text-white">
          Your Campaigns
        </Text>
        <TouchableOpacity
          className="flex-row items-center space-x-1"
          onPress={() => navigation.navigate('Step1CampaignBasicsScreen')}
        >
          <Plus size={20} color="#4f46e5" />
          <Text className="text-indigo-600 font-medium text-sm">Create</Text>
        </TouchableOpacity>
      </View>

      {/* Campaign List */}
      {campaigns.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={campaigns}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CampaignCard
              {...item}
              onPress={() =>
                navigation.navigate('CampaignDetail', { id: item.id })
              }
            />
          )}
        />
      ) : (
        <Text className="text-gray-500 text-center mt-8">
          You haven’t created any campaigns yet.
        </Text>
      )}
    </View>
  );
}
