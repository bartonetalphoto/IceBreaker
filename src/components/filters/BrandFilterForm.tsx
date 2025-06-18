// ...unchanged imports
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated as RNAnimated } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AudienceSlider from '../../components/AudienceSlider'; // Adjust path as needed
import RateSlider from '../../components/RateSlider'; // Adjust path as needed

type Props = {
  onApply: (filters: {
    location?: string;
    category?: string;
    rateRange?: { min: number; max: number };
    audienceRange?: { min: number; max: number };
    platforms?: string[];
  }) => void;
};

const formatNumber = (num: number) => num.toLocaleString('en-ZA');

const BrandFilterForm = ({ onApply }: Props) => {
  const [location, setLocation] = useState('');
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]); // CHANGED
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]); // NEW


  const niches = [
    'beauty', 'fashion', 'lifestyle', 'travel', 'food',
    'health', 'animals', 'makeup', 'sport', 'content creator',
  ]; // NEW

    const platforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter']; // NEW

    const [ageRange, setAgeRange] = useState<[number, number]>([18, 35]); // Default example


  const SLIDER_MAX_RATE = 200000;
  const SLIDER_MAX_AUDIENCE = 1000000;

  const [rateRange, setRateRange] = useState<[number, number]>([0, SLIDER_MAX_RATE]);
  const [audienceRange, setAudienceRange] = useState<[number, number]>([1000, SLIDER_MAX_AUDIENCE]);

  const [rateWarning, setRateWarning] = useState('');
  const [audienceWarning, setAudienceWarning] = useState('');

  const [rateOverride, setRateOverride] = useState(false);
  const [audienceOverride, setAudienceOverride] = useState(false);

  const pulseAnim = new RNAnimated.Value(1);

  RNAnimated.loop(
    RNAnimated.sequence([
      RNAnimated.timing(pulseAnim, {
        toValue: 1.3,
        duration: 600,
        useNativeDriver: true,
      }),
      RNAnimated.timing(pulseAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const BoltMarker = ({ override }: { override: boolean }) => (
    <RNAnimated.View style={{ transform: [{ scale: override ? pulseAnim : 1 }] }}>
      <MaterialCommunityIcons
        name="lightning-bolt"
        size={24}
        color={override ? '#FFD700' : '#136bc5'}
      />
    </RNAnimated.View>
  );

  const handleReset = () => {
    setLocation('');
    setSelectedNiches([]); // CHANGED
    setRateRange([0, SLIDER_MAX_RATE]);
    setAudienceRange([1000, SLIDER_MAX_AUDIENCE]);
    setRateWarning('');
    setAudienceWarning('');
    setRateOverride(false);
    setAudienceOverride(false);
  };

    const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche)
        ? prev.filter((n) => n !== niche)
        : [...prev, niche]
    );
  };

    const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <>
      {/* Location */}
      <View className="mb-4">
        <Text className="font-medium mb-2">Location</Text>
        <TextInput
          placeholder="e.g. Cape Town"
          className="border border-gray-300 rounded-xl px-4 py-3"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Niche Multi-Select */}
      <View className="mb-4">
        <Text className="font-medium mb-2">Niche</Text>
        <View className="flex-row flex-wrap gap-2">
          {niches.map((niche) => {
            const isSelected = selectedNiches.includes(niche);
            return (
              <TouchableOpacity
                key={niche}
                onPress={() => toggleNiche(niche)}
                className={`px-4 py-2 rounded-full border ${
                  isSelected ? 'bg-[#136bc5] border-[#136bc5]' : 'border-gray-300'
                }`}
              >
                <Text className={`${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {niche.charAt(0).toUpperCase() + niche.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

            {/* Platform Multi-Select */}
      <View className="mb-4">
        <Text className="font-medium mb-2">Platform</Text>
        <View className="flex-row flex-wrap gap-2">
          {platforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform);
            return (
              <TouchableOpacity
                key={platform}
                onPress={() => togglePlatform(platform)}
                className={`px-4 py-2 rounded-full border ${
                  isSelected ? 'bg-[#136bc5] border-[#136bc5]' : 'border-gray-300'
                }`}
              >
                <Text className={`${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {platform}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Rate Range */}
      <View className="mb-6 items-center">
        <Text className="font-medium mb-2">Rate Range (R)</Text>

<RateSlider
  value={rateRange}
  onChange={(range) => setRateRange(range)}
/>
      </View>

      {/* Audience Size */}
      <View className="mb-6 items-center">
        <Text className="font-medium mb-2">Audience Size</Text>

<AudienceSlider
  value={audienceRange}
  onChange={(range) => setAudienceRange(range)}
/>
      </View>

      {/* Age Range */}
      <View className="mb-6 items-center">
        <Text className="font-medium mb-2">Age Range</Text>

        <MultiSlider
          values={ageRange}
          min={0}
          max={65}
          step={1}
          onValuesChange={(values) => setAgeRange([values[0], values[1]])}
          selectedStyle={{ backgroundColor: '#136bc5' }}
          markerStyle={{
            height: 20,
            width: 20,
            backgroundColor: '#136bc5',
            borderWidth: 2,
            borderColor: 'white',
          }}
          containerStyle={{ marginHorizontal: 10 }}
        />

        <View className="flex-row space-x-4 mt-2">
          <Text className="text-gray-700">Min: {ageRange[0]}</Text>
          <Text className="text-gray-700">Max: {ageRange[1] === 65 ? '65+' : ageRange[1]}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity
          className="border border-gray-400 rounded-xl px-5 py-2"
          onPress={handleReset}
        >
          <Text className="text-gray-600">Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#136bc5] px-6 py-2 rounded-xl"
          disabled={!!rateWarning || !!audienceWarning}
          onPress={() =>
            onApply({
              location,
              category: undefined, // deprecated
              rateRange: { min: rateRange[0], max: rateRange[1] },
              audienceRange: { min: audienceRange[0], max: audienceRange[1] },
              platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined, // NEW

            })
          }
        >
          <Text className="text-white font-medium">Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BrandFilterForm;
