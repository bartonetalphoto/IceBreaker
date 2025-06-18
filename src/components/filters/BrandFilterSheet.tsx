import React, {
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

export type BrandFilterSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  onApply: (filters: {
    location?: string;
    category?: string;
    rateRange?: { min: number; max: number };
  }) => void;
};

const BrandFilterSheet = forwardRef<BrandFilterSheetRef, Props>(
  ({ onApply }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['60%', '85%'], []);

    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [rate, setRate] = useState(2000);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const handleApply = () => {
      onApply({
        location,
        category,
        rateRange: { min: 0, max: rate },
      });
      bottomSheetRef.current?.close();
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#fff',
        }}
        handleIndicatorStyle={{ backgroundColor: '#ccc', width: 60 }}
      >
        <BottomSheetView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView className="px-5 pb-10">
              <Text className="text-lg font-bold mb-6">Filter Influencers</Text>

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

              {/* Category */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Category</Text>
                <TextInput
                  placeholder="e.g. Beauty"
                  className="border border-gray-300 rounded-xl px-4 py-3"
                  value={category}
                  onChangeText={setCategory}
                />
              </View>

              {/* Rate */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Rate (Max)</Text>
                <Slider
                  minimumValue={500}
                  maximumValue={10000}
                  step={100}
                  value={rate}
                  onValueChange={setRate}
                  minimumTrackTintColor="#7B61FF"
                  thumbTintColor="#7B61FF"
                />
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-500">R500</Text>
                  <Text className="text-gray-500">R10,000+</Text>
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  className="border border-gray-400 rounded-xl px-5 py-2"
                  onPress={() => {
                    setLocation('');
                    setCategory('');
                    setRate(2000);
                  }}
                >
                  <Text className="text-gray-600">Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#7B61FF] px-6 py-2 rounded-xl"
                  onPress={handleApply}
                >
                  <Text className="text-white font-medium">Apply</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BrandFilterSheet;
