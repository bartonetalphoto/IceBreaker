import React, { useState } from 'react';
import {
  ScrollView,
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  View as RNView,
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import {
  Text,
  TextInput,
  TouchableOpacity,
} from '../../components/Styled';

const SafeAreaView = styled(RNSafeAreaView);
const View = styled(RNView);
const KeyboardAvoidingView = styled(RNKeyboardAvoidingView);

const relaxedUrlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\S*)?$/;

const BrandProfileSchema = Yup.object().shape({
  brandName: Yup.string().required('Brand name is required'),
  industryCategory: Yup.string().required('Industry is required'),
  location: Yup.string().required('Location is required'),
  website: Yup.string()
    .matches(relaxedUrlRegex, 'Enter a valid website URL')
    .optional(),
  socialLinks: Yup.string().optional(),
  targetAudience: Yup.string().required('Target audience is required'),
  contentType: Yup.string().required('Content type is required'),
  budgetRange: Yup.string().required('Budget range is required'),
  collabGoals: Yup.string().required('Goals are required'),
  preferredPlatforms: Yup.string().required('Preferred platforms are required'),
  pastCampaigns: Yup.string().optional(),
});

export default function RegisterBrandProfileScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="px-6 pt-4">
          <TouchableOpacity
            onPress={() => {
              if (step === 1) {
                navigation.goBack();
              } else {
                setStep(1);
              }
            }}
          >
            <Text className="text-[#0F172A] text-base">← Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-6 space-y-6">
            <Text className="text-3xl font-bold text-center text-[#0F172A]">
              Brand Profile
            </Text>

            <Formik
              initialValues={{
                brandName: '',
                industryCategory: '',
                location: '',
                socialLinks: '',
                website: '',
                targetAudience: '',
                contentType: '',
                budgetRange: '',
                collabGoals: '',
                preferredPlatforms: '',
                pastCampaigns: '',
              }}
              validationSchema={BrandProfileSchema}
              onSubmit={(values) => {
  console.log('Submitted Brand Profile:', values);
  navigation.reset({
  index: 0,
  routes: [
    {
      name: 'MainApp',
      params: {
        userType: 'brand',
        startAt: 'Explore',
        },
      },
    ],
  });
}}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="space-y-6">
                  {step === 1 ? (
                    <>
                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Brand Name</Text>
                        <TextInput
                          placeholder="e.g. Pené Cosmetics"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('brandName')}
                          onBlur={handleBlur('brandName')}
                          value={values.brandName}
                        />
                        {touched.brandName && errors.brandName && (
                          <Text className="text-red-500 text-xs mt-1">{errors.brandName}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Industry Category</Text>
                        <TextInput
                          placeholder="e.g. Beauty, Fitness, Tech"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('industryCategory')}
                          onBlur={handleBlur('industryCategory')}
                          value={values.industryCategory}
                        />
                        {touched.industryCategory && errors.industryCategory && (
                          <Text className="text-red-500 text-xs mt-1">{errors.industryCategory}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Location</Text>
                        <TextInput
                          placeholder="e.g. Cape Town, South Africa"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('location')}
                          onBlur={handleBlur('location')}
                          value={values.location}
                        />
                        {touched.location && errors.location && (
                          <Text className="text-red-500 text-xs mt-1">{errors.location}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Website or Primary Link</Text>
                        <TextInput
                          placeholder="yourbrand.com"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('website')}
                          onBlur={handleBlur('website')}
                          value={values.website}
                          autoCapitalize="none"
                        />
                        {touched.website && errors.website && (
                          <Text className="text-red-500 text-xs mt-1">{errors.website}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Social Media Links (optional)</Text>
                        <TextInput
                          placeholder="https://instagram.com/yourbrand"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('socialLinks')}
                          onBlur={handleBlur('socialLinks')}
                          value={values.socialLinks}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() => setStep(2)}
                        className="bg-black py-4 rounded-3xl shadow-md mt-4"
                      >
                        <Text className="text-white text-center font-semibold text-base">Continue</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Target Audience</Text>
                        <TextInput
                          placeholder="e.g. 18-30, Female, South Africa"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('targetAudience')}
                          onBlur={handleBlur('targetAudience')}
                          value={values.targetAudience}
                        />
                        {touched.targetAudience && errors.targetAudience && (
                          <Text className="text-red-500 text-xs mt-1">{errors.targetAudience}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Content Type</Text>
                        <TextInput
                          placeholder="e.g. Reels, Tutorials, Unboxings"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('contentType')}
                          onBlur={handleBlur('contentType')}
                          value={values.contentType}
                        />
                        {touched.contentType && errors.contentType && (
                          <Text className="text-red-500 text-xs mt-1">{errors.contentType}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Budget Range per Campaign (ZAR)</Text>
                        <TextInput
                          placeholder="e.g. R5000 - R15000"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('budgetRange')}
                          onBlur={handleBlur('budgetRange')}
                          value={values.budgetRange}
                        />
                        {touched.budgetRange && errors.budgetRange && (
                          <Text className="text-red-500 text-xs mt-1">{errors.budgetRange}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Collaboration Goals</Text>
                        <TextInput
                          placeholder="e.g. Brand Awareness, Conversions"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('collabGoals')}
                          onBlur={handleBlur('collabGoals')}
                          value={values.collabGoals}
                        />
                        {touched.collabGoals && errors.collabGoals && (
                          <Text className="text-red-500 text-xs mt-1">{errors.collabGoals}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Preferred Platforms</Text>
                        <TextInput
                          placeholder="e.g. Instagram, TikTok"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('preferredPlatforms')}
                          onBlur={handleBlur('preferredPlatforms')}
                          value={values.preferredPlatforms}
                        />
                        {touched.preferredPlatforms && errors.preferredPlatforms && (
                          <Text className="text-red-500 text-xs mt-1">{errors.preferredPlatforms}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Past Influencer Campaigns (optional)</Text>
                        <TextInput
                          placeholder="e.g. https://link.com/campaign"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('pastCampaigns')}
                          onBlur={handleBlur('pastCampaigns')}
                          value={values.pastCampaigns}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-black py-4 rounded-3xl shadow-md mt-6"
                      >
                        <Text className="text-white text-center font-semibold text-base">Finish</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
