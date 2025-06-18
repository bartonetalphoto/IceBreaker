// /src/components/WishlistModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Heart, Plus } from 'lucide-react-native';

type Influencer = {
  id: string;
  name: string;
  image: string;
};

type WishlistModalProps = {
  visible: boolean;
  influencer: Influencer | null;
  folders: string[];
  onAddToFolder: (influencerId: string, folderName: string) => void;
  onRemoveFromWishlist: (influencerId: string) => void; // NEW: to un-wishlist
  onCreateFolder: (folderName: string) => void;
  onClose: () => void;
};

const WishlistModal = ({
  visible,
  influencer,
  folders,
  onAddToFolder,
  onRemoveFromWishlist,
  onCreateFolder,
  onClose,
}: WishlistModalProps) => {
  // Local state to control the “Create Folder” sub‐modal (text input)
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Called when tapping outside the main modal content
  const handleDismiss = () => {
    if (influencer) {
      onAddToFolder(influencer.id, 'All');
    }
    setShowNewFolderInput(false);
    setNewFolderName('');
    onClose();
  };

  // Called when “Create Folder” link is pressed
  const openNewFolderInput = () => {
    setShowNewFolderInput(true);
  };

  // Called when “Done” is pressed in the sub‐modal
  const handleCreateFolderDone = () => {
    const trimmed = newFolderName.trim();
    if (trimmed && influencer) {
      onCreateFolder(trimmed);
      // Optionally: directly add to this new folder
      onAddToFolder(influencer.id, trimmed);
    }
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleDismiss}
    >
      {/* Backdrop: tapping here dismisses and auto‐saves to “All” */}
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View className="flex-1 bg-black/50 justify-end">
          {/* Main modal content (prevent backdrop tap from closing) */}
          <TouchableWithoutFeedback>
            <View
              className="bg-white dark:bg-neutral-900 p-4 rounded-t-3xl"
              style={{ minHeight: '45%' }}
            >
              {/* --- Influencer Preview Row --- */}
              {influencer && (
                <View className="flex-row items-center mb-4">
                  <Image
                    source={{ uri: influencer.image }}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <Text className="text-lg font-semibold text-black dark:text-white flex-1">
                    {influencer.name}
                  </Text>
                  {/* Tappable heart icon to un-wishlist */}
                  <TouchableOpacity
                    onPress={() => {
                      onRemoveFromWishlist(influencer.id); // UN-WISHLIST
                      onClose();
                    }}
                  >
                    <Heart size={24} color="red" fill="red" />
                  </TouchableOpacity>
                </View>
              )}

              {/* --- Heading Row: “Folders” + “Create Folder” --- */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-bold text-black dark:text-white">
                  Folders
                </Text>
                <TouchableOpacity onPress={openNewFolderInput}>
                  <Text className="text-blue-500 text-sm">Create Folder</Text>
                </TouchableOpacity>
              </View>

              {/* --- Folder List --- */}
              <FlatList
                data={folders}
                keyExtractor={(item) => item}
                renderItem={({ item: folderName }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (influencer) {
                        onAddToFolder(influencer.id, folderName);
                      }
                      onClose();
                    }}
                    className="flex-row items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-700"
                  >
                    {/* Rounded cover image */}
                    <View className="flex-row items-center">
                      {influencer && (
                        <Image
                          source={{ uri: influencer.image }}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <Text className="text-base text-black dark:text-white">
                        {folderName}
                      </Text>
                    </View>
                    {/* Plus icon */}
                    <Plus size={20} color="#999" />
                  </TouchableOpacity>
                )}
              />

              {/* --- New Folder Input Sub-Modal --- */}
              {showNewFolderInput && (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                  <View className="mt-4 p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                    <TextInput
                      autoFocus
                      placeholder="Enter folder name"
                      placeholderTextColor="#999"
                      className="text-black dark:text-white border-b border-gray-300 dark:border-neutral-600 pb-1 mb-3"
                      value={newFolderName}
                      onChangeText={setNewFolderName}
                      onSubmitEditing={handleCreateFolderDone}
                      returnKeyType="done"
                    />
                    <View className="flex-row justify-end">
                      <TouchableOpacity
                        onPress={handleCreateFolderDone}
                        className="px-4 py-2 bg-blue-500 rounded-lg"
                      >
                        <Text className="text-white font-medium">Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </KeyboardAvoidingView>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WishlistModal;
