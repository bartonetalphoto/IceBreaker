// /src/screens/BottomTab/WishlistScreen.tsx

import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react-native';
import { useWishlist } from '../../context/WishlistContext';
import { mockInfluencers, Influencer } from '../../data/influencers';

const classNames = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const WishlistScreen = () => {
  const {
    wishlist,
    addToFolder,
    createFolder,
    deleteFolder,
    renameFolder,
    isWished,
  } = useWishlist();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Local state for renaming
  const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');

  // Local state for “Create New Folder” modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Track which folder is currently open (null → show folder grid)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Animated value for zoom effect
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Handle creating a new folder
  const handleCreateDone = () => {
    const trimmed = newFolderName.trim();
    if (trimmed) {
      createFolder(trimmed);
    }
    setNewFolderName('');
    setShowCreateModal(false);
  };

  // Handle finishing a rename
  const handleRenameDone = (oldName: string) => {
    const trimmed = renameText.trim();
    if (trimmed && trimmed !== oldName) {
      renameFolder(oldName, trimmed);
    }
    setRenamingFolder(null);
    setRenameText('');
  };

  // Utility: get up to 4 most recently wished influencers in a folder
  const getLatestFour = (folderName: string): Influencer[] => {
    const ids = wishlist[folderName] || [];
    const slice = ids.slice(-4).reverse();
    return slice
      .map((id) => mockInfluencers.find((inf) => inf.id === id))
      .filter((inf): inf is Influencer => !!inf);
  };

  // When user taps a folder tile, shrink list first, then mount it, then animate to full size
  const openFolder = (folderName: string) => {
    scaleAnim.setValue(0.8);
    setCurrentFolder(folderName);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // List of Influencer objects in the currently open folder
  const influencersInCurrentFolder: Influencer[] = useMemo(() => {
    if (!currentFolder) return [];
    const ids = wishlist[currentFolder] || [];
    return ids
      .map((id) => mockInfluencers.find((inf) => inf.id === id))
      .filter((inf): inf is Influencer => !!inf);
  }, [currentFolder, wishlist]);

  // Render each folder “tile” in the two-column grid
  const renderFolder = ({ item: folderName }: { item: string }) => {
    const influencersInFolder = getLatestFour(folderName);

    // Confirmation before deleting
    const confirmDelete = () => {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete the "${folderName}" folder?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteFolder(folderName),
          },
        ]
      );
    };

    return (
      <TouchableOpacity
        onPress={() => openFolder(folderName)}
        className="w-[48%] mb-4"
      >
        {/* Outer shadow container (overflow visible) */}
        <View
          style={{
            overflow: 'visible',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          {/* Inner rounded card */}
          <View className="bg-white dark:bg-neutral-800 rounded-xl p-2">
            <View className="flex-row flex-wrap justify-between">
              {influencersInFolder.map((inf) => (
                <Image
                  key={inf.id}
                  source={{ uri: inf.image }}
                  className="w-[48%] h-24 rounded-lg mb-2"
                  resizeMode="cover"
                />
              ))}
              {Array.from({ length: 4 - influencersInFolder.length }).map((_, idx) => (
                <View
                  key={`empty-${idx}`}
                  className="w-[48%] h-24 bg-gray-200 dark:bg-neutral-700 rounded-lg mb-2"
                />
              ))}
            </View>

            {/* Folder Name / Rename / Delete Row */}
            <View className="flex-row justify-between items-center mt-2 px-1">
              {renamingFolder === folderName ? (
                <TextInput
                  value={renameText}
                  onChangeText={setRenameText}
                  onSubmitEditing={() => handleRenameDone(folderName)}
                  placeholder="New name"
                  placeholderTextColor={isDark ? '#999' : '#555'}
                  className="flex-1 border-b border-gray-300 dark:border-neutral-600 text-black dark:text-white pb-1"
                  returnKeyType="done"
                  autoFocus
                />
              ) : (
                <Text className="text-base font-medium text-black dark:text-white flex-1">
                  {folderName}
                </Text>
              )}

              {folderName !== 'All' && (
                <View className="flex-row items-center ml-2 space-x-2">
                  {renamingFolder === folderName ? (
                    <TouchableOpacity onPress={() => handleRenameDone(folderName)}>
                      <Text className="text-blue-500 text-sm">Done</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setRenamingFolder(folderName);
                        setRenameText(folderName);
                      }}
                    >
                      <Edit2 size={18} color={isDark ? '#fff' : '#000'} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={confirmDelete}>
                    <Trash2 size={18} color={isDark ? '#fff' : '#000'} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render each influencer inside an open folder
  const renderInfluencer = ({ item }: { item: Influencer }) => (
    <View
      className="w-full mb-4 flex-row items-center bg-white dark:bg-neutral-800 rounded-xl p-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: item.image }}
        className="w-12 h-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-medium text-black dark:text-white">
          {item.name}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-neutral-400">
          {item.category}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          // remove from this folder (move back to “All”)
          addToFolder(item.id, 'All');
        }}
      >
        <Trash2 size={20} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black pt-6">
      {/* Padded container for side/top insets */}
      <View className="flex-1 px-6 pt-2">
        {currentFolder ? (
          <>
            {/* Back‐button + Folder Title */}
            <View className="flex-row items-center mb-4">
              <TouchableOpacity onPress={() => setCurrentFolder(null)}>
                <ArrowLeft size={24} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-black dark:text-white ml-3">
                {currentFolder}
              </Text>
            </View>

            {/* Animated zoom‐in wrapper around the influencer list */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <FlatList
                key="influencerList"
                data={influencersInCurrentFolder}
                keyExtractor={(item) => item.id}
                renderItem={renderInfluencer}
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
              />
            </Animated.View>
          </>
        ) : (
          <>
            {/* Heading + Create Folder Button */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold text-black dark:text-white">
                Your Wishlists
              </Text>
              <TouchableOpacity onPress={() => setShowCreateModal(true)}>
                <Text className="text-blue-500 text-base">Create Folder</Text>
              </TouchableOpacity>
            </View>

            {/* Two‐column grid of folders */}
            <FlatList
              key="folderGrid"
              data={Object.keys(wishlist)}
              keyExtractor={(item) => item}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={renderFolder}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          </>
        )}
      </View>

      {/* Create Folder Sub‐Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCreateModal(false)}>
          <View className="flex-1 bg-black/50 justify-center px-8">
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              >
                <View className="bg-white dark:bg-neutral-900 p-6 rounded-lg">
                  <Text className="text-lg font-medium text-black dark:text-white mb-2">
                    New Folder Name
                  </Text>
                  <TextInput
                    autoFocus
                    placeholder="Enter folder name"
                    placeholderTextColor="#999"
                    className="border-b border-gray-300 dark:border-neutral-600 text-black dark:text-white pb-1 mb-4"
                    value={newFolderName}
                    onChangeText={setNewFolderName}
                    onSubmitEditing={handleCreateDone}
                    returnKeyType="done"
                  />
                  <View className="flex-row justify-end">
                    <TouchableOpacity
                      onPress={handleCreateDone}
                      className="px-4 py-2 bg-blue-500 rounded-lg"
                    >
                      <Text className="text-white font-medium">Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default WishlistScreen;
