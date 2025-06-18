import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const { height } = Dimensions.get('window');

const AnimatedFilterModal = ({ visible, onClose, children }: Props) => {
  const modalHeight = useSharedValue(60);
  const modalOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
    opacity: modalOpacity.value,
    borderRadius: withTiming(visible ? 0 : 30, { duration: 300 }),
    transform: [{ translateY: withTiming(visible ? 0 : -10, { duration: 300 }) }],
  }));

  useEffect(() => {
    if (visible) {
      modalHeight.value = withTiming(height, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      modalOpacity.value = withTiming(1, { duration: 250 });
    } else {
      modalOpacity.value = withTiming(0, { duration: 200 });
      modalHeight.value = withTiming(60, { duration: 300 });
    }
  }, [visible]);

if (!visible) return null;

  return (
    <Animated.View style={[styles.modalContainer, animatedStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Close Button */}
        <View className="flex-row justify-end px-5 pt-6">
          <TouchableOpacity onPress={onClose}>
            <X size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Filter Form */}
        <ScrollView className="px-5 pb-10">{children}</ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 100, // approximate search bar position
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});

export default AnimatedFilterModal;
