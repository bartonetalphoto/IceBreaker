import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function Step4CampaignReviewScreen() {
  const navigation = useNavigation();
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    const loadAllSteps = async () => {
      const step1 = JSON.parse(await AsyncStorage.getItem('campaignStep1') || '{}');
      const step2 = JSON.parse(await AsyncStorage.getItem('campaignStep2') || '{}');
      const step3 = JSON.parse(await AsyncStorage.getItem('campaignStep3') || '{}');
      const all = { ...step1, ...step2, ...step3 };
      setCampaign(all);
    };
    loadAllSteps();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!campaign) return;

      const newCampaign = {
        ...campaign,
        createdAt: new Date().toISOString(),
        status: 'Active',
        influencers: [],
        committed: 0
      };

      // Optionally still store locally
      const existing = await AsyncStorage.getItem('campaigns');
      const localCampaigns = existing ? JSON.parse(existing) : [];
      await AsyncStorage.setItem('campaigns', JSON.stringify([newCampaign, ...localCampaigns]));

      await AsyncStorage.multiRemove(['campaignStep1', 'campaignStep2', 'campaignStep3']);

      Alert.alert('Campaign Created', 'Your campaign has been saved.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Campaigns' as never),
        },
      ]);
    } catch (err) {
      console.error('Error saving campaign:', err);
      Alert.alert('Error', 'There was a problem creating your campaign.');
    }
  };

  if (!campaign) return null;

  return (
    <StyledSafeAreaView className="flex-1 bg-white px-6">
      <StyledScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        <StyledView>
          <StyledText className="text-sm text-gray-500">Title</StyledText>
          <StyledText className="text-base text-black font-medium">{campaign.title}</StyledText>
        </StyledView>

        <StyledView>
          <StyledText className="text-sm text-gray-500">Description</StyledText>
          <StyledText className="text-base text-black">{campaign.description}</StyledText>
        </StyledView>

        <StyledView>
          <StyledText className="text-sm text-gray-500">Product/Service</StyledText>
          <StyledText className="text-base text-black">{campaign.product}</StyledText>
        </StyledView>

        {campaign.media && (
          <Image source={{ uri: campaign.media }} className="h-48 w-full rounded-xl" resizeMode="cover" />
        )}

        <StyledView>
          <StyledText className="text-sm text-gray-500">Platform</StyledText>
          <StyledText className="text-base text-black">
            {campaign.platforms?.join(', ') || 'Not specified'}
          </StyledText>
        </StyledView>

        <StyledView>
          <StyledText className="text-sm text-gray-500">Niche</StyledText>
          <StyledText className="text-base text-black">
            {campaign.categories?.join(', ') || 'Not specified'}
          </StyledText>
        </StyledView>

        <StyledView>
          <StyledText className="text-sm text-gray-500">Audience Size</StyledText>
          <StyledText className="text-base text-black">
            {campaign.audienceOverride
              ? `${campaign.audienceMin} - ${campaign.audienceMax}`
              : `${campaign.audienceRange?.[0]} - ${campaign.audienceRange?.[1]}`}
          </StyledText>
        </StyledView>

        <StyledView>
          <StyledText className="text-sm text-gray-500">Location</StyledText>
          <StyledText className="text-base text-black">{campaign.location}</StyledText>
        </StyledView>

        {campaign.deliverables ? (
          <StyledView>
            <StyledText className="text-sm text-gray-500">Deliverables</StyledText>
            <StyledText className="text-base text-black">{campaign.deliverables}</StyledText>
          </StyledView>
        ) : null}

        <StyledView>
          <StyledText className="text-sm text-gray-500">Budget (R)</StyledText>
          <StyledText className="text-base text-black">
            {campaign.budgetMinOverride && campaign.budgetMaxOverride
              ? `${campaign.budgetMinOverride} - ${campaign.budgetMaxOverride}`
              : `${campaign.budgetRange?.[0]} - ${campaign.budgetRange?.[1]}`}
          </StyledText>
        </StyledView>

        {campaign.duration === 'untilPaused' || campaign.isOngoing ? (
          <StyledView>
            <StyledText className="text-sm text-gray-500">Duration</StyledText>
            <StyledText className="text-base text-black">Run until paused</StyledText>
          </StyledView>
        ) : (
          <>
            {campaign.startDate && (
              <StyledView>
                <StyledText className="text-sm text-gray-500">Start Date</StyledText>
                <StyledText className="text-base text-black">
                  {new Date(campaign.startDate).toDateString()}
                </StyledText>
              </StyledView>
            )}
            {campaign.endDate && (
              <StyledView>
                <StyledText className="text-sm text-gray-500">End Date</StyledText>
                <StyledText className="text-base text-black">
                  {new Date(campaign.endDate).toDateString()}
                </StyledText>
              </StyledView>
            )}
          </>
        )}

        {campaign.briefUrl && (
          <StyledView>
            <StyledText className="text-sm text-gray-500">Campaign Brief URL</StyledText>
            <StyledText className="text-blue-600 underline">{campaign.briefUrl}</StyledText>
          </StyledView>
        )}

        <StyledTouchable
          onPress={handleSubmit}
          className="bg-black rounded-full py-4 mt-8 mb-8"
        >
          <StyledText className="text-white text-center font-semibold text-base">
            Create Campaign
          </StyledText>
        </StyledTouchable>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
