import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';

import ExploreScreen from '../screens/BottomTab/ExploreScreen';
import WishlistsScreen from '../screens/BottomTab/WishlistsScreen';
import CampaignStackNavigator from './CampaignStackNavigator';
import MessagesScreen from '../screens/BottomTab/MessagesScreen';
import BrandProfileScreen from '../screens/Brand/BrandProfileScreen';
import InfluencerProfileScreen from '../screens/Influencer/InfluencerProfileScreen';

import { Home, Heart, Briefcase, MessageCircle } from 'lucide-react-native';

type Props = {
  route: RouteProp<RootStackParamList, 'MainApp'>;
  navigation: any;
  userType?: 'brand' | 'influencer';
  startAt?: string;
};

const Tab = createBottomTabNavigator();
const mockProfileImage = 'https://randomuser.me/api/portraits/women/44.jpg';

const BottomTabNavigator = ({ userType, startAt }: Props) => {
  const ProfileComponent =
    userType === 'brand' ? BrandProfileScreen : InfluencerProfileScreen;

  return (
    <Tab.Navigator
      initialRouteName={startAt || 'Explore'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#136bc5',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          height: 50,
          paddingBottom: 3,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Explore') {
            return <Home color={color} size={22} />;
          } else if (route.name === 'Wishlists') {
            return <Heart color={color} size={22} />;
          } else if (route.name === 'Campaigns') {
            return <Briefcase color={color} size={22} />;
          } else if (route.name === 'Messages') {
            return <MessageCircle color={color} size={22} />;
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={{ uri: mockProfileImage }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9999,
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? '#7B61FF' : 'transparent',
                }}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Wishlists" component={WishlistsScreen} />
      <Tab.Screen name="Campaigns" component={CampaignStackNavigator} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileComponent} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
