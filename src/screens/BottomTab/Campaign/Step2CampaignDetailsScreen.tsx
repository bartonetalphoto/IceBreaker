import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import AudienceSlider from '../../../components/AudienceSlider';

const SLIDER_MAX_AUDIENCE = 1000000;

const formatNumber = (value: number | string) => {
  return Number(value).toLocaleString();
};


const PLATFORMS = ['Instagram', 'TikTok', 'YouTube'];
const CATEGORIES = [
  'Beauty',
  'Fashion',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Animals',
  'Makeup',
  'Sport',
  'Content Creation',
];

const Step2CampaignDetailsScreen = () => {
  const navigation = useNavigation();

  const [platforms, setPlatforms] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [audienceRange, setAudienceRange] = useState<[number, number]>([1000, 1000000]);
  const [audienceOverride, setAudienceOverride] = useState(false);
  const [audienceMin, setAudienceMin] = useState('');
  const [audienceMax, setAudienceMax] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('campaignStep2');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPlatforms(parsed.platforms || []);
        setCategories(parsed.categories || []);
        setAudienceRange(parsed.audienceRange || [1000, 1000000]);
        setAudienceMin(parsed.audienceMin || '');
        setAudienceMax(parsed.audienceMax || '');
        setAudienceOverride(parsed.audienceOverride || false);
        setLocation(parsed.location || '');
      }
    })();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await AsyncStorage.setItem(
        'campaignStep2',
        JSON.stringify({
          platforms,
          categories,
          audienceRange,
          audienceOverride,
          audienceMin,
          audienceMax,
          location,
        })
      );
    };
    saveData();
  }, [platforms, categories, audienceRange, audienceOverride, audienceMin, audienceMax, location]);

  const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const renderToggles = (items: string[], selected: string[], setSelected: (v: string[]) => void) => (
    <View className="flex-row flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => toggleItem(item, selected, setSelected)}
          className={`px-4 py-2 rounded-full border ${
            selected.includes(item) ? 'bg-black border-black' : 'border-gray-300'
          }`}
        >
          <Text className={`text-sm ${selected.includes(item) ? 'text-white' : 'text-black'}`}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4">

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-4">
          <Text className="text-base font-medium text-gray-700">Platforms</Text>
          {renderToggles(PLATFORMS, platforms, setPlatforms)}
        </View>

        <View className="mt-6">
          <Text className="text-base font-medium text-gray-700">Niche</Text>
          {renderToggles(CATEGORIES, categories, setCategories)}
        </View>

<View className="mt-6 mb-4 ">
  <Text className="text-base font-medium text-gray-700">Audience Size</Text>

<AudienceSlider
  value={audienceRange}
  onChange={setAudienceRange}
/>
  </View>

        <View className="mt-6 mb-8">
          <Text className="text-base font-medium text-gray-700">Preferred Location</Text>
          <TextInput
            placeholder="City, Country or Region"
            value={location}
            onChangeText={setLocation}
            className="mt-2 border border-gray-300 rounded-lg px-4 py-2"
          />
        </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Step3CampaignBudgetScreen' as never)}
        className="bg-black rounded-full py-4 mb-4"
      >
        <Text className="text-white text-center font-semibold text-base">Next</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>

  );
};
// Add this function at the bottom (optional)
export const getStep2CampaignData = async () => {
  const saved = await AsyncStorage.getItem('campaignStep2');
  return saved ? JSON.parse(saved) : {};
};


export default Step2CampaignDetailsScreen;
