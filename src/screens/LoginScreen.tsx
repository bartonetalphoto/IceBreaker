import React, { useRef } from 'react';
import {
  TextInput as RNTextInput,
  Platform,
  ScrollView,
  TouchableOpacity as RNTouchableOpacity,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  View as RNView,
  Text as RNText,
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Styled components
const SafeAreaView = styled(RNSafeAreaView);
const View = styled(RNView);
const KeyboardAvoidingView = styled(RNKeyboardAvoidingView);
const Text = styled(RNText);
const TextInput = styled(RNTextInput);
const TouchableOpacity = styled(RNTouchableOpacity);

// Form validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const passwordRef = useRef<RNTextInput>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F9] px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center space-y-8">
            {/* Placeholder for logo */}
            <View className="items-center mb-4">
              <Text className="text-2xl font-bold text-gray-400">[Logo]</Text>
            </View>

            <Text className="text-3xl font-bold text-center text-[#0F172A]">
              Welcome Back
            </Text>

            <Formik
              initialValues={{ email: 'test@brand.com', password: '123456' }} // autofill for testing
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                console.log('Login values:', values);

  // 🔁 MOCK NAVIGATION to MainApp > ExploreScreen
  (navigation as any).navigate('MainApp', {
    userType: 'brand',
    startAt: 'Explore',
  });
}}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="space-y-6">
                  <View>
                    <Text className="text-sm text-[#1E293B] mb-1">Email</Text>
                    <TextInput
                      placeholder="you@example.com"
                      placeholderTextColor="#94A3B8"
                      className="border-b border-gray-300 pb-2 text-[#0F172A]"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      onSubmitEditing={() => passwordRef.current?.focus()}
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
                      returnKeyType="done"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-black rounded-full py-4 shadow-md shadow-black/10"
                  >
                    <Text className="text-white text-center font-semibold text-base">Login</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <Text className="text-sm text-center text-gray-500 mt-2">
              Forgot your password?
            </Text>

            <View className="mt-4">
              <Text className="text-center text-gray-500">
                Don’t have an account?{' '}
                <Text
                  className="text-black font-semibold"
                  onPress={() => navigation.navigate('Register' as never)}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
