// src/Navigation/CampaignStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampaignScreen from '../screens/BottomTab/Campaign/CampaignScreen';
import CampaignDetailScreen from '../screens/BottomTab/Campaign/CampaignDetailScreen';
import Step1CampaignBasicsScreen from '../screens/BottomTab/Campaign/Step1CampaignBasicsScreen';
import Step2CampaignDetailsScreen from '../screens/BottomTab/Campaign/Step2CampaignDetailsScreen';
import Step3CampaignBudgetScreen from '../screens/BottomTab/Campaign/Step3CampaignBudgetScreen';
import Step4CampaignReviewScreen from '../screens/BottomTab/Campaign/Step4CampaignReviewScreen';

export type CampaignStackParamList = {
  CampaignScreen: undefined;
  CampaignDetail: { id: string };
  Step1CampaignBasicsScreen: undefined;
  Step2CampaignDetailsScreen: undefined;
  Step3CampaignBudgetScreen: undefined;
  Step4CampaignReviewScreen: undefined;
};

const Stack = createNativeStackNavigator<CampaignStackParamList>();

export default function CampaignStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CampaignScreen"
        component={CampaignScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step1CampaignBasicsScreen"                   // ← new screen entry
        component={Step1CampaignBasicsScreen}
        options={{ title: 'Create Campaign' }}
      />
      <Stack.Screen
        name="Step2CampaignDetailsScreen"
        component={Step2CampaignDetailsScreen} // Assuming this is a placeholder for the next step
        options={{ title: 'Influencer Preferences' }}
      />
      <Stack.Screen
        name="Step3CampaignBudgetScreen"
        component={Step3CampaignBudgetScreen} // Assuming this is a placeholder for the next step
        options={{ title: 'Budget & Dates' }}
      />
      <Stack.Screen
        name="Step4CampaignReviewScreen"
        component={Step4CampaignReviewScreen} // Assuming this is a placeholder for the next step
        options={{ title: 'Review Campaign' }}
      />
    
        <Stack.Screen
        name="CampaignDetail"
        component={CampaignDetailScreen}
        options={{ title: 'Campaign Details' }}
      />
    </Stack.Navigator>
  );
}
