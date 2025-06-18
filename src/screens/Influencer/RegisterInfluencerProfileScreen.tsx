// /Users/stevenbarton/IceBreaker/src/screens/Influencer/RegisterInfluencerProfileScreen.tsx

import React, { useState } from 'react';
import {
  ScrollView,
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  View as RNView,
  TextInput as RNTextInput,
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

// ✅ Define Formik value types
interface InfluencerProfileFormValues {
  fullName: string;
  handles: string;
  age: string;
  gender: string;
  location: string;
  primaryNiche: string;
  secondaryNiche: string;
  platforms: string[];
  priceRange: string;
  collabOptions: string[];
  preferredCollabType: string;
  contentType: string;
  previousWork: string;
}

// ✅ Yup Schema
const InfluencerProfileSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  handles: Yup.string().required('At least one handle is required'),
  age: Yup.number().nullable().min(13).max(100).required('Age is required'),
  gender: Yup.string().optional(),
  location: Yup.string().required('Location is required'),
  primaryNiche: Yup.string().required('Primary niche is required'),
  secondaryNiche: Yup.string().optional(),
  platforms: Yup.array().of(Yup.string()).min(1, 'Select at least one platform'),
  priceRange: Yup.string().required('Price range is required'),
  collabOptions: Yup.array().of(Yup.string()).min(1, 'Select at least one option'),
  preferredCollabType: Yup.string().required('This is required'),
  contentType: Yup.string().required('Content type is required'),
  previousWork: Yup.string().optional(),
});

// Options
const platformOptions = ['Instagram', 'TikTok', 'YouTube', 'Twitter'];
const collabOptionsList = ['Paid Posts', 'Gifting', 'Affiliate', 'UGC'];

export default function RegisterInfluencerProfileScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState<1 | 2>(1);

  // ✅ Initial values with correct types
  const initialValues: InfluencerProfileFormValues = {
    fullName: '',
    handles: '',
    age: '',
    gender: '',
    location: '',
    primaryNiche: '',
    secondaryNiche: '',
    platforms: [],
    priceRange: '',
    collabOptions: [],
    preferredCollabType: '',
    contentType: '',
    previousWork: '',
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F9] px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 pt-4 space-y-6">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => {
                if (step === 1) {
                  navigation.goBack();
                } else {
                  setStep(1);
                }
              }}
              className="mb-2"
            >
              <Text className="text-[#0F172A] text-base">← Back</Text>
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-center text-[#0F172A]">Influencer Profile</Text>

            <Formik
              initialValues={initialValues}
              validationSchema={InfluencerProfileSchema}
  onSubmit={(values) => {
    console.log('Submitted Influencer Profile:', values);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainApp',
          params: {
            userType: 'brand', // or 'influencer'
            startAt: 'Explore', // optional
          },
        },
      ],
    });
  }}
>
  {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View className="space-y-6">
                  {step === 1 ? (
                    <>
                      {/* Step 1 Fields */}
                      {[
                        { label: 'Full Name', name: 'fullName', placeholder: 'Jane Doe' },
                        { label: 'Social Handles', name: 'handles', placeholder: '@yourhandle' },
                        { label: 'Age', name: 'age', placeholder: '22', keyboardType: 'numeric' },
                        { label: 'Gender (optional)', name: 'gender', placeholder: 'Female / Male / Other' },
                        { label: 'Location', name: 'location', placeholder: 'City, Country' },
                        { label: 'Primary Niche', name: 'primaryNiche', placeholder: 'e.g. Fitness' },
                        { label: 'Secondary Niche (optional)', name: 'secondaryNiche', placeholder: 'e.g. Beauty' },
                      ].map((field) => (
                        <View key={field.name}>
                          <Text className="text-sm text-[#1E293B] mb-1">{field.label}</Text>
                          <TextInput
                            placeholder={field.placeholder}
                            className="border-b border-gray-300 pb-2 text-[#0F172A]"
                            keyboardType={field.keyboardType as any}
                            onChangeText={handleChange(field.name)}
                            onBlur={handleBlur(field.name)}
                            value={(values as any)[field.name]}
                          />
                          {touched[field.name as keyof typeof touched] && errors[field.name as keyof typeof errors] && (
                            <Text className="text-red-500 text-xs mt-1">
                              {errors[field.name as keyof typeof errors]}
                            </Text>
                          )}
                        </View>
                      ))}

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-2">Platforms</Text>
                        {platformOptions.map((platform) => (
                          <TouchableOpacity
                            key={platform}
                            className={`mb-2 px-4 py-2 rounded-full border ${
                              values.platforms.includes(platform) ? 'bg-black' : 'bg-white'
                            }`}
                            onPress={() => {
                              if (values.platforms.includes(platform)) {
                                setFieldValue(
                                  'platforms',
                                  values.platforms.filter((p) => p !== platform)
                                );
                              } else {
                                setFieldValue('platforms', [...values.platforms, platform]);
                              }
                            }}
                          >
                            <Text className={values.platforms.includes(platform) ? 'text-white' : 'text-black'}>
                              {platform}
                            </Text>
                          </TouchableOpacity>
                        ))}
                        {touched.platforms && errors.platforms && (
                          <Text className="text-red-500 text-xs mt-1">{errors.platforms}</Text>
                        )}
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
                      {/* Step 2 Fields */}
                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Rate Range</Text>
                        <TextInput
                          placeholder="e.g. R500 - R2000 per post"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('priceRange')}
                          onBlur={handleBlur('priceRange')}
                          value={values.priceRange}
                        />
                        {touched.priceRange && errors.priceRange && (
                          <Text className="text-red-500 text-xs mt-1">{errors.priceRange}</Text>
                        )}
                      </View>

                      <View className="mt-4">
                        <Text className="text-sm text-[#1E293B] mb-2">Available for</Text>
                        {collabOptionsList.map((option) => (
                          <TouchableOpacity
                            key={option}
                            className={`mb-2 px-4 py-2 rounded-full border ${
                              values.collabOptions.includes(option) ? 'bg-black' : 'bg-white'
                            }`}
                            onPress={() => {
                              if (values.collabOptions.includes(option)) {
                                setFieldValue(
                                  'collabOptions',
                                  values.collabOptions.filter((o) => o !== option)
                                );
                              } else {
                                setFieldValue('collabOptions', [...values.collabOptions, option]);
                              }
                            }}
                          >
                            <Text className={values.collabOptions.includes(option) ? 'text-white' : 'text-black'}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                        {touched.collabOptions && errors.collabOptions && (
                          <Text className="text-red-500 text-xs mt-1">{errors.collabOptions}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Preferred Collab Type</Text>
                        <TextInput
                          placeholder="e.g. Product Launch"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('preferredCollabType')}
                          onBlur={handleBlur('preferredCollabType')}
                          value={values.preferredCollabType}
                        />
                        {touched.preferredCollabType && errors.preferredCollabType && (
                          <Text className="text-red-500 text-xs mt-1">{errors.preferredCollabType}</Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-sm text-[#1E293B] mb-1">Content Type</Text>
                        <TextInput
                          placeholder="e.g. Tutorials, Reviews"
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
                        <Text className="text-sm text-[#1E293B] mb-1">Previous Brand Work (optional)</Text>
                        <TextInput
                          placeholder="Mention past collabs"
                          className="border-b border-gray-300 pb-2 text-[#0F172A]"
                          onChangeText={handleChange('previousWork')}
                          onBlur={handleBlur('previousWork')}
                          value={values.previousWork}
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
