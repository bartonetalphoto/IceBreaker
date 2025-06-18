import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {BoltMarker} from './BoltMarker'; // Adjust path as needed

const SLIDER_MIN = 1000;
const SLIDER_MAX = 1000000;

interface AudienceSliderProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  label?: string;
}

const formatNumber = (value: number) => {
  return value.toLocaleString('en-ZA');
};

const AudienceSlider: React.FC<AudienceSliderProps> = ({
  value,
  onChange,
  label = 'Audience Size',
}) => {
  const [audienceRange, setAudienceRange] = useState<[number, number]>(value);
  const [audienceOverride, setAudienceOverride] = useState<boolean>(
    value.some((v) => v > SLIDER_MAX)
  );

  const [audienceMin, setAudienceMin] = useState(value[0].toString());
  const [audienceMax, setAudienceMax] = useState(value[1].toString());

  useEffect(() => {
    onChange(audienceRange);
  }, [audienceRange]);

  return (
    <View className="mt-1 mb-4">

      <View className="mt-4 items-center px-6">
        <MultiSlider
          values={audienceRange}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={1000}
          allowOverlap={false}
          snapped
          containerStyle={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onValuesChange={(values) => {
            setAudienceRange(values as [number, number]);
            const override = values.some((v) => v > SLIDER_MAX);
            setAudienceOverride(override);
          }}
          selectedStyle={{
            backgroundColor: audienceOverride ? '#FFD700' : '#136bc5',
          }}
          customMarker={() => <BoltMarker override={audienceOverride} />}
        />
      </View>

      <View className="flex-row gap-4 mt-4">
        <TextInput
          keyboardType="numeric"
          value={formatNumber(audienceRange[0])}
          onChangeText={(val) => {
            const parsed = parseInt(val.replace(/[^0-9]/g, '')) || SLIDER_MIN;
            if (parsed > audienceRange[1]) return;
            setAudienceRange(([_, max]) => {
              const newRange: [number, number] = [parsed, max];
              setAudienceOverride(parsed > SLIDER_MAX || max > SLIDER_MAX);
              return newRange;
            });
            setAudienceMin(parsed.toString());
          }}
          placeholder="Min"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <TextInput
          keyboardType="numeric"
          value={formatNumber(audienceRange[1])}
          onChangeText={(val) => {
            const parsed = parseInt(val.replace(/[^0-9]/g, '')) || SLIDER_MIN;
            if (parsed < audienceRange[0]) return;
            setAudienceRange(([min]) => {
              const newRange: [number, number] = [min, parsed];
              setAudienceOverride(parsed > SLIDER_MAX || min > SLIDER_MAX);
              return newRange;
            });
            setAudienceMax(parsed.toString());
          }}
          placeholder="Max"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
      </View>

      {audienceOverride && (
        <View className="flex-row items-center gap-2 mt-2" />
      )}
    </View>
  );
};

export default AudienceSlider;
