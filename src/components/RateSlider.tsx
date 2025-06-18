import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {BoltMarker} from './BoltMarker'; // adjust the path as needed

const SLIDER_MIN = 0;
const SLIDER_MAX = 200000; // default max, or import from config

interface RateSliderProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  label?: string;
}

const formatCurrency = (value: number) => {
  return `R${value.toLocaleString('en-ZA')}`;
};

const RateSlider: React.FC<RateSliderProps> = ({
  value,
  onChange,
  label = 'Rate Range (ZAR)',
}) => {
  const [rateRange, setRateRange] = useState<[number, number]>(value);
  const [rateOverride, setRateOverride] = useState<boolean>(
    value.some((v) => v > SLIDER_MAX)
  );

  const [rateMin, setRateMin] = useState(value[0].toString());
  const [rateMax, setRateMax] = useState(value[1].toString());

  useEffect(() => {
    onChange(rateRange);
  }, [rateRange]);

  return (
    <View className="mt-1 mb-4">

      <View className="mt-4 items-center px-6">
        <MultiSlider
          values={rateRange}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={500}
          allowOverlap={false}
          snapped
          containerStyle={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onValuesChange={(values) => {
            setRateRange(values as [number, number]);
            const override = values.some((v) => v > SLIDER_MAX);
            setRateOverride(override);
          }}
          selectedStyle={{
            backgroundColor: rateOverride ? '#FFD700' : '#136bc5',
          }}
          customMarker={() => <BoltMarker override={rateOverride} />}
        />
      </View>

      <View className="flex-row gap-4 mt-4">
        <TextInput
          keyboardType="numeric"
          value={formatCurrency(rateRange[0])}
          onChangeText={(val) => {
            const parsed = parseInt(val.replace(/[^0-9]/g, '')) || 0;
            if (parsed > rateRange[1]) return;
            setRateRange(([_, max]) => {
              const newRange: [number, number] = [parsed, max];
              setRateOverride(parsed > SLIDER_MAX || max > SLIDER_MAX);
              return newRange;
            });
            setRateMin(parsed.toString());
          }}
          placeholder="Min"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <TextInput
          keyboardType="numeric"
          value={formatCurrency(rateRange[1])}
          onChangeText={(val) => {
            const parsed = parseInt(val.replace(/[^0-9]/g, '')) || 0;
            if (parsed < rateRange[0]) return;
            setRateRange(([min]) => {
              const newRange: [number, number] = [min, parsed];
              setRateOverride(parsed > SLIDER_MAX || min > SLIDER_MAX);
              return newRange;
            });
            setRateMax(parsed.toString());
          }}
          placeholder="Max"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
      </View>

      {rateOverride && (
        <View className="flex-row items-center gap-2 mt-2" />
      )}
    </View>
  );
};

export default RateSlider;
