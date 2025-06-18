import React, { useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  View as RNView,
  TextInput as RNTextInput,
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Text,
  TextInput,
  TouchableOpacity,
} from '../components/Styled';

const SafeAreaView = styled(RNSafeAreaView);
const View = styled(RNView);
const KeyboardAvoidingView = styled(RNKeyboardAvoidingView);

// Validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm your password'),
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [accountType, setAccountType] = useState<'influencer' | 'brand'>('influencer');

  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  const handleRegistration = (values: any) => {
    console.log('Register values:', values, 'as', accountType);
    if (accountType === 'brand') {
      navigation.navigate('RegisterBrandProfile' as never);
    } else {
      navigation.navigate('RegisterInfluencerProfile' as never);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F9] px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center space-y-8">

        
            <Text className="text-3xl font-bold text-center text-[#0F172A]">
              Create Account
            </Text>

            {/* Toggle Buttons */}
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity
                className={`px-4 py-2 rounded-full border ${
                  accountType === 'influencer' ? 'bg-black' : 'bg-white'
                }`}
                onPress={() => setAccountType('influencer')}
              >
                <Text className={accountType === 'influencer' ? 'text-white' : 'text-black'}>
                  Influencer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-full border ${
                  accountType === 'brand' ? 'bg-black' : 'bg-white'
                }`}
                onPress={() => setAccountType('brand')}
              >
                <Text className={accountType === 'brand' ? 'text-white' : 'text-black'}>
                  Brand
                </Text>
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegistration}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="space-y-6">
                  <View>
                    <Text className="text-sm text-[#1E293B] mb-1">Full Name</Text>
                    <TextInput
                      placeholder="John Doe"
                      placeholderTextColor="#94A3B8"
                      className="border-b border-gray-300 pb-2 text-[#0F172A]"
                      returnKeyType="next"
                      onSubmitEditing={() => emailRef.current?.focus()}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {touched.name && errors.name && (
                      <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
                    )}
                  </View>

                  <View>
                    <Text className="text-sm text-[#1E293B] mb-1">Email</Text>
                    <TextInput
                      ref={emailRef}
                      placeholder="you@example.com"
                      placeholderTextColor="#94A3B8"
                      className="border-b border-gray-300 pb-2 text-[#0F172A]"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
                    )}
                  </View>

                  <View>
                    <Text className="text-sm text-[#1E293B] mb-1">Password</Text>
                    <TextInput
                      ref={passwordRef}
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      className="border-b border-gray-300 pb-2 text-[#0F172A]"
                      secureTextEntry
                      returnKeyType="next"
                      onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
                    )}
                  </View>

                  <View>
                    <Text className="text-sm text-[#1E293B] mb-1">Confirm Password</Text>
                    <TextInput
                      ref={confirmPasswordRef}
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      className="border-b border-gray-300 pb-2 text-[#0F172A]"
                      secureTextEntry
                      returnKeyType="done"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit as () => void}
                    className="bg-black rounded-full py-4 shadow-md shadow-black/10"
                  >
                    <Text className="text-white text-center font-semibold text-base">
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View className="mt-4">
              <Text className="text-center text-gray-500">
                Already have an account?{' '}
                <Text
                  className="text-black font-semibold"
                  onPress={() => navigation.navigate('Login' as never)}
                >
                  Log in
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
