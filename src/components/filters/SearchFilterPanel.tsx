// components/SearchFilterPanel.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import BrandFilterForm from './BrandFilterForm';

const { height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
  onSearch: (text: string) => void;
  recentSearches: string[];
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};

const SearchFilterPanel = ({
  visible,
  onClose,
  onSearch,
  recentSearches,
  searchQuery,
  setSearchQuery,
}: Props) => {
  const heightValue = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(visible ? 0 : height, { duration: 300, easing: Easing.out(Easing.ease) }) }],
    opacity: withTiming(visible ? 1 : 0, { duration: 250 }),
  }));

  useEffect(() => {
    if (visible && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [visible]);

  const handleSubmitSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      Keyboard.dismiss();
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          zIndex: 999,
          paddingTop: 50,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          ref={scrollRef}
          className="px-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold"></Text>
            <TouchableOpacity onPress={onClose}>
              <X size={26} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Search Input + Recent Searches Block */}
          <View className="bg-white p-4 rounded-2xl border border-gray-200 mb-4 shadow-sm">
            {/* Search Input */}
            <View className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-3">
              <TextInput
                placeholder="Search influencers..."
                className="text-base"
                value={searchQuery}
                autoFocus
                returnKeyType="search"
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSubmitSearch}
              />
            </View>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View>
                <Text className="text-sm font-medium text-gray-600 mb-2">
                  Recent Searches
                </Text>
                {recentSearches.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setSearchQuery(item);
                      onSearch(item);
                    }}
                    className="mb-2"
                  >
                    <Text className="text-gray-800">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Filters Block */}
          <View className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <BrandFilterForm
              onApply={(filters) => {
                onClose();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default SearchFilterPanel;
