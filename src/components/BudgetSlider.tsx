import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {BoltMarker} from './BoltMarker'; // adjust import if needed

const SLIDER_MIN = 0;
const SLIDER_MAX_BUDGET = 500000; // Changeable or importable

interface BudgetSliderProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  label?: string;
}

const formatCurrency = (value: number) => {
  return `R${value.toLocaleString('en-ZA')}`;
};

const BudgetSlider: React.FC<BudgetSliderProps> = ({
  value,
  onChange,
  label = 'Budget Range (ZAR)',
}) => {
  const [budgetRange, setBudgetRange] = useState<[number, number]>(value);
  const [budgetOverride, setBudgetOverride] = useState<boolean>(
    value.some((v) => v > SLIDER_MAX_BUDGET)
  );

  const [budgetMin, setBudgetMin] = useState(value[0].toString());
  const [budgetMax, setBudgetMax] = useState(value[1].toString());

  useEffect(() => {
    onChange(budgetRange);
  }, [budgetRange]);

  return (
    <View className="mt-6 mb-4">
      <Text className="text-base font-medium text-gray-700">{label}</Text>

      <View className="mt-4 items-center px-6">
        <MultiSlider
          values={budgetRange}
          min={SLIDER_MIN}
          max={SLIDER_MAX_BUDGET}
          step={1000}
          allowOverlap={false}
          snapped
          containerStyle={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onValuesChange={(values) => {
            setBudgetRange(values as [number, number]);
            const override = values.some((v) => v > SLIDER_MAX_BUDGET);
            setBudgetOverride(override);
          }}
          selectedStyle={{
            backgroundColor: budgetOverride ? '#FFD700' : '#136bc5',
          }}
          customMarker={() => <BoltMarker override={budgetOverride} />}
        />
      </View>

      <View className="flex-row gap-4 mt-4">
        <TextInput
          keyboardType="numeric"
          value={formatCurrency(budgetRange[0])}
          onChangeText={(val) => {
            const parsed = parseInt(val.replace(/[^0-9]/g, '')) || 0;
            if (parsed > budgetRange[1]) return;
            setBudgetRange(([_, max]) => {
              const newRange: [number, number] = [parsed, max];
              setBudgetOverride(parsed > SLIDER_MAX_BUDGET || max > SLIDER_MAX_BUDGET);
              return newRange;
            });
            setBudgetMin(parsed.toString());
          }}
          placeholder="Min"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <TextInput
          keyboardType="numeric"
          value={formatCurrency(budgetRange[1])}
          onChangeText={(val) => {
            const parsed = parseInt(val.replace(/[^0-9]/g, '')) || 0;
            if (parsed < budgetRange[0]) return;
            setBudgetRange(([min]) => {
              const newRange: [number, number] = [min, parsed];
              setBudgetOverride(parsed > SLIDER_MAX_BUDGET || min > SLIDER_MAX_BUDGET);
              return newRange;
            });
            setBudgetMax(parsed.toString());
          }}
          placeholder="Max"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
      </View>

      {budgetOverride && (
        <View className="flex-row items-center gap-2 mt-2" />
      )}
    </View>
  );
};

export default BudgetSlider;
