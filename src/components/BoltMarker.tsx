// components/BoltMarker.tsx
import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const BoltMarker = ({ override }: { override: boolean }) => {
  return (
    <View
      style={{
        backgroundColor: override ? '#FFD700' : '#136bc5',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {override ? <Ionicons name="flash" size={14} color="black" /> : null}
    </View>
  );
};
