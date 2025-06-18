import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);

const STORAGE_KEY = 'campaignStep1';

export default function Step1CampaignBasicsScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    title: '',
    description: '',
    product: '',
    briefUrl: '',
    media: '',
  });

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted' || camStatus !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      handleChange('media', uri);
    }
  };

  useEffect(() => {
    const loadSaved = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setForm(JSON.parse(saved));
      }
    };
    loadSaved();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-6" keyboardShouldPersistTaps="handled">

      <StyledText className="text-sm text-[#1E293B] mb-1">Campaign Title</StyledText>
      <StyledInput
        placeholder="Summer Glow Promo"
        placeholderTextColor="#94A3B8"
        className="border-b border-gray-300 mb-4 pb-2 text-[#0F172A]"
        value={form.title}
        onChangeText={(text) => handleChange('title', text)}
      />

      <StyledText className="text-sm text-[#1E293B] mb-1">Description</StyledText>
      <StyledInput
        placeholder="Tell influencers about your campaign..."
        placeholderTextColor="#94A3B8"
        className="border-b border-gray-300 mb-4 pb-2 text-[#0F172A]"
        multiline
        numberOfLines={4}
        value={form.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <StyledText className="text-sm text-[#1E293B] mb-1">Product / Service</StyledText>
      <StyledInput
        placeholder="E.g. SkinCare Kit, App Launch"
        placeholderTextColor="#94A3B8"
        className="border-b border-gray-300 mb-4 pb-2 text-[#0F172A]"
        value={form.product}
        onChangeText={(text) => handleChange('product', text)}
      />

      <StyledText className="text-sm text-[#1E293B] mb-1">Campaign Brief URL (optional)</StyledText>
      <StyledInput
        placeholder="https://yourdomain.com/campaign-brief.pdf"
        placeholderTextColor="#94A3B8"
        className="border-b border-gray-300 mb-4 pb-2 text-[#0F172A]"
        keyboardType="url"
        autoCapitalize="none"
        value={form.briefUrl}
        onChangeText={(text) => handleChange('briefUrl', text)}
      />

      <StyledText className="text-sm text-[#1E293B] mb-1">Upload Media</StyledText>
      <StyledTouchable
        onPress={handleImagePick}
        className="h-48 rounded-lg border border-dashed border-gray-400 justify-center items-center mb-6"
      >
        {form.media ? (
          <Image
            source={{ uri: form.media }}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <StyledText className="text-gray-500">Tap to upload image</StyledText>
        )}
      </StyledTouchable>

      <StyledTouchable
        onPress={() => navigation.navigate('Step2CampaignDetailsScreen' as never)}
        className="bg-black rounded-full py-4 shadow-md shadow-black/10"
      >
        <StyledText className="text-white text-center font-semibold text-base">Next</StyledText>
      </StyledTouchable>
    </ScrollView>
  );
}
// Add this function at the bottom (optional)
export const getStep1CampaignData = async () => {
  const saved = await AsyncStorage.getItem('campaignStep1');
  return saved ? JSON.parse(saved) : {};
};

