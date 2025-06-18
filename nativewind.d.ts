// types/nativewind.d.ts

import 'react-native';
import type { NativeWindStyleSheet } from 'nativewind';

declare module 'react-native' {
  interface ViewProps extends NativeWindStyleSheet {}
  interface TextProps extends NativeWindStyleSheet {}
  interface TextInputProps extends NativeWindStyleSheet {}
  interface PressableProps extends NativeWindStyleSheet {}
}
