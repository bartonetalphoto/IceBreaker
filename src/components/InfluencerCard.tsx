import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Heart, HeartOff } from 'lucide-react-native';

type Influencer = {
  id: string;
  name: string;
  image: string;
  category: string;
  rate: string;
};

type Props = {
  influencer: Influencer;
  isWished: boolean;
  onToggleWishlist: (id: string) => void;
};

const InfluencerCard = ({ influencer, isWished, onToggleWishlist }: Props) => {
  return (
    <View className="w-[48%] rounded-xl mb-4 overflow-hidden shadow-sm bg-white dark:bg-neutral-800">
      <View className="relative">
        <ImageBackground
          source={{ uri: influencer.image }}
          style={{ width: '100%', height: 160 }}
          imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}
        >
          <TouchableOpacity
  onPress={() => onToggleWishlist(influencer.id)}
  className="absolute top-2 right-2 z-10"
>
  <Heart
    size={20}
    color={isWished ? 'red' : 'white'} // stroke color
    fill={isWished ? 'red' : 'transparent'} // fill color
  />
</TouchableOpacity>


          {/* Overlay Strip */}
          <View className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 rounded-b-xl overflow-hidden">
            <Text className="text-white font-bold text-sm">{influencer.name}</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Info Section */}
      <View className="p-2">
        <Text className="text-sm text-black dark:text-white mt-0.3">
          {influencer.category}
        </Text>
        <Text className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          {influencer.rate}
        </Text>
      </View>
    </View>
  );
};

export default InfluencerCard;
