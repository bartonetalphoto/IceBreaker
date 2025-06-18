// src/screens/BottomTab/Campaign/CampaignDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CampaignStackParamList } from '../../../Navigation/CampaignStackNavigator';
import { ArrowLeft } from 'lucide-react-native';
import { format } from 'date-fns';
import clsx from 'clsx';

type Campaign = {
  id: string;
  name: string;
  description: string;
  product: string;
  media?: string;
  briefURL?: string;
  budget: number;
  committed: number;
  influencers: number;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Active' | 'Completed';
  platform: string;
  niche: string;
  location: string;
  deliverables: string;
  createdAt: string;
  duration: 'fixed' | 'untilPaused'; // <-- ADD THIS
};

type RouteProps = RouteProp<CampaignStackParamList, 'CampaignDetail'>;

const statusColors = {
  Draft: 'bg-yellow-200 text-yellow-800',
  Active: 'bg-green-200 text-green-800',
  Completed: 'bg-gray-300 text-gray-800',
};

export default function CampaignDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { id: campaignId } = route.params;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState('');

  // Load campaign
  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const stored = await AsyncStorage.getItem('campaigns');
        if (stored) {
          const all = JSON.parse(stored);
          const found = all.find((c: Campaign) => c.id === campaignId);
          setCampaign(found);
          setUpdatedName(found?.name || '');
        }
      } catch (e) {
        console.error('Error loading campaign:', e);
      } finally {
        setLoading(false);
      }
    };
    loadCampaign();
  }, [campaignId]);

  const handleEndCampaign = () => {
    Alert.alert(
      'End Campaign',
      'Are you sure you want to mark this campaign as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem('campaigns');
              if (stored) {
                const all = JSON.parse(stored);
                const updated = all.map((c: Campaign) =>
                  c.id === campaignId ? { ...c, status: 'Completed' } : c
                );
                await AsyncStorage.setItem('campaigns', JSON.stringify(updated));
                const updatedCampaign = updated.find((c: Campaign) => c.id === campaignId);
                setCampaign(updatedCampaign);
              }
            } catch (err) {
              console.error('Error updating status:', err);
            }
          },
        },
      ]
    );
  };

  const handleSaveEdit = async () => {
    try {
      const stored = await AsyncStorage.getItem('campaigns');
      if (stored) {
        const all = JSON.parse(stored);
        const updated = all.map((c: Campaign) =>
          c.id === campaignId ? { ...c, name: updatedName } : c
        );
        await AsyncStorage.setItem('campaigns', JSON.stringify(updated));
        const updatedCampaign = updated.find((c: Campaign) => c.id === campaignId);
        setCampaign(updatedCampaign);
        setEditModalVisible(false);
      }
    } catch (e) {
      console.error('Edit failed:', e);
    }
  };

  if (loading || !campaign) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header Image */}
        {campaign.media ? (
          <Image
            source={{ uri: campaign.media }}
            className="w-full h-52"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-52 bg-gray-200 dark:bg-neutral-800 justify-center items-center">
            <Text className="text-gray-500 dark:text-gray-400">No Image</Text>
          </View>
        )}

        {/* Campaign Card */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-2xl font-bold text-black dark:text-white">
              {campaign.name}
            </Text>
            <View className={clsx('px-2 py-0.5 rounded-full', statusColors[campaign.status])}>
              <Text className="text-xs">{campaign.status}</Text>
            </View>
          </View>

          <Text className="text-gray-600 dark:text-gray-300 mb-2">{campaign.description}</Text>

          <Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Product: {campaign.product}
          </Text>
          <Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Platform: {campaign.platform}
          </Text>
          <Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Niche: {campaign.niche}
          </Text>
          <Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Location: {campaign.location}
          </Text>
          <Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Deliverables: {campaign.deliverables}
          </Text>
          {campaign.briefURL && (
            <Text className="mb-1 text-sm text-blue-600 underline">{campaign.briefURL}</Text>
          )}
<Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
  Budget: R{campaign.budget ? campaign.budget.toLocaleString() : '0'}
</Text>
<Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
  Committed: {campaign.committed ?? 0}
</Text>
<Text className="mb-1 text-sm text-gray-600 dark:text-gray-300">
  Influencers: {campaign.influencers ?? 0}
</Text>
<Text className="text-sm text-gray-500 dark:text-gray-400">
  {campaign.duration === 'untilPaused'
    ? 'Run until paused'
    : `${format(new Date(campaign.startDate), 'PPP')} – ${format(new Date(campaign.endDate), 'PPP')}`}
</Text>

        </View>

        {/* Actions */}
        <View className="flex-row justify-around mt-4">
          <TouchableOpacity
            onPress={() => setEditModalVisible(true)}
            className="px-6 py-2 bg-blue-600 rounded-full"
          >
            <Text className="text-white font-medium">Edit</Text>
          </TouchableOpacity>

          {campaign.status !== 'Completed' && (
            <TouchableOpacity
              onPress={handleEndCampaign}
              className="px-6 py-2 bg-red-500 rounded-full"
            >
              <Text className="text-white font-medium">End Campaign</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white dark:bg-neutral-900 p-4 rounded-2xl w-full max-w-md">
            <Text className="text-lg font-semibold mb-2 text-black dark:text-white">
              Edit Campaign Name
            </Text>
            <TextInput
              value={updatedName}
              onChangeText={setUpdatedName}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-black dark:text-white bg-white dark:bg-neutral-800 mb-4"
              placeholder="Campaign Name"
              placeholderTextColor="#999"
            />
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text className="text-gray-500">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveEdit}>
                <Text className="text-blue-600 font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
