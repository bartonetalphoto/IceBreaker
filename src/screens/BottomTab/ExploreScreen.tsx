// /Users/stevenbarton/IceBreaker/src/screens/BottomTab/ExploreScreen.tsx

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfluencerCard from '../../components/InfluencerCard';
import AnimatedFilterModal from '../../components/filters/AnimatedFilterModal';
import BrandFilterForm from '../../components/filters/BrandFilterForm';
import SearchFilterPanel from '../../components/filters/SearchFilterPanel';

import { useWishlist } from '../../context/WishlistContext';
import WishlistModal from '../../components/WishlistModal';
import { mockInfluencers, Influencer } from '../../data/influencers';

const categories = ['Beauty', 'Fitness', 'Travel', 'Film', 'Lifestyle'];

const classNames = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

const ExploreScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchPanelVisible, setSearchPanelVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [wishlistModalVisible, setWishlistModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const {
    wishlist,
    isWished,
    addToFolder,
    createFolder,
    deleteFolder,
    renameFolder,
    toggleWishlist: toggleWishlistInContext,
  } = useWishlist();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // When the heart icon on a card is tapped, open the wishlist modal
  const handleHeartTap = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setWishlistModalVisible(true);
  };

  // Apply filters from BrandFilterForm
  const handleApplyFilters = (appliedFilters: any) => {
    setFilters(appliedFilters);
    setFilterVisible(false);
    setSearchFocused(false);
  };

  // Compute filtered influencers based on search, category, location, rate, audience
  const filteredInfluencers = useMemo(() => {
    return mockInfluencers.filter((influencer) => {
      const rateNum = parseInt(influencer.rate.replace(/[^\d]/g, ''), 10);
      const audienceNum = influencer.audience || 0;

      const matchesSearch =
        !searchQuery ||
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !filters?.category ||
        influencer.category.toLowerCase().includes(filters.category.toLowerCase());

      const matchesLocation =
        !filters?.location ||
        influencer.location?.toLowerCase().includes(filters.location.toLowerCase());

      const matchesRate =
        !filters?.rateRange ||
        (rateNum >= filters.rateRange.min &&
          (filters.rateRange.max === null || rateNum <= filters.rateRange.max));

      const matchesAudience =
        !filters?.audienceRange ||
        (audienceNum >= filters.audienceRange.min &&
          (filters.audienceRange.max === null || audienceNum <= filters.audienceRange.max));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesRate &&
        matchesAudience
      );
    });
  }, [filters, searchQuery]);

  return (
    <>
      <SafeAreaView className="flex-1 bg-white dark:bg-black pt-6">
        {/* Wrap everything inside a padded View for consistent horizontal padding */}
        <View className="flex-1 px-3">
          {/* Search Bar */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Keyboard.dismiss();
              setSearchFocused(true);
              setSearchPanelVisible(true);
            }}
          >
            <View
              className="flex-row items-center bg-white dark:bg-neutral-800 px-4 py-2 rounded-full mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              <Search size={20} color="#999" className="mr-2" />
              <Text className="text-black dark:text-white text-base opacity-50">
                Search influencers...
              </Text>
              <SlidersHorizontal size={18} color="#999" className="ml-auto" />
            </View>
          </TouchableOpacity>

          {/* Category Chips */}
          <View className="mb-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 1 }} // slight inner padding
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => {
                      const newCategory = selectedCategory === cat ? null : cat;
                      setSelectedCategory(newCategory);
                      setFilters((prev: any) => ({
                        ...prev,
                        category: newCategory,
                      }));
                    }}
                    className={classNames(
                      'px-4 h-9 justify-center items-center mr-2 rounded-full border',
                      isSelected
                        ? 'bg-black dark:bg-white border-black dark:border-white'
                        : 'bg-gray-100 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600'
                    )}
                  >
                    <Text
                      className={classNames(
                        'text-sm font-medium',
                        isSelected
                          ? 'text-white dark:text-black'
                          : 'text-black dark:text-white'
                      )}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Influencer Grid */}
          <FlatList
            data={filteredInfluencers}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <InfluencerCard
                influencer={item}
                isWished={isWished(item.id)}
                onToggleWishlist={() => handleHeartTap(item)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Search Panel */}
        <SearchFilterPanel
          visible={searchPanelVisible}
          onClose={() => setSearchPanelVisible(false)}
          onSearch={(query) => {
            setRecentSearches((prev) => {
              const updated = [query, ...prev.filter((item) => item !== query)];
              return updated.slice(0, 5);
            });
            setSearchQuery(query);
          }}
          recentSearches={recentSearches}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Filter Modal */}
        <AnimatedFilterModal visible={filterVisible} onClose={() => setFilterVisible(false)}>
          <BrandFilterForm onApply={handleApplyFilters} />
        </AnimatedFilterModal>
      </SafeAreaView>

      {/* Wishlist Modal */}
      <WishlistModal
        visible={wishlistModalVisible}
        influencer={selectedInfluencer}
        folders={Object.keys(wishlist)}
        onAddToFolder={(influencerId, folderName) => {
          addToFolder(influencerId, folderName);
          setWishlistModalVisible(false);
        }}
        onRemoveFromWishlist={(influencerId) => {
          toggleWishlistInContext(influencerId);
          setWishlistModalVisible(false);
        }}
        onCreateFolder={(folderName) => {
          createFolder(folderName);
        }}
        onClose={() => {
          if (selectedInfluencer && !isWished(selectedInfluencer.id)) {
            addToFolder(selectedInfluencer.id, 'All');
          }
          setWishlistModalVisible(false);
        }}
      />
    </>
  );
};

export default ExploreScreen;
