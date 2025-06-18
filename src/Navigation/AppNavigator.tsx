import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterInfluencerProfileScreen from '../screens/Influencer/RegisterInfluencerProfileScreen';
import RegisterBrandProfileScreen from '../screens/Brand/RegisterBrandProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterInfluencerProfile: undefined;
  RegisterBrandProfile: undefined;
  MainApp: { startAt?: string; userType?: 'brand' | 'influencer' };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterInfluencerProfile" component={RegisterInfluencerProfileScreen} />
        <Stack.Screen name="RegisterBrandProfile" component={RegisterBrandProfileScreen} />

        {/* ✅ FIX: Pass route as props to access params */}
<Stack.Screen name="MainApp">
  {(props) => (
    <BottomTabNavigator
      {...props}
      userType={props.route.params?.userType}
      startAt={props.route.params?.startAt}
    />
  )}
</Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
