import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft } from 'lucide-react-native';
import BudgetSlider from '../../../components/BudgetSlider';
import { ScrollView } from 'react-native';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);

export default function Step3CampaignBudgetScreen() {
  const navigation = useNavigation();

  const [deliverables, setDeliverables] = useState('');
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 50000]);
  const [budgetMinOverride, setBudgetMinOverride] = useState('');
  const [budgetMaxOverride, setBudgetMaxOverride] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOngoing, setIsOngoing] = useState(true);
  const isSetDuration = !isOngoing;

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('campaignStep3');
      if (saved) {
        const parsed = JSON.parse(saved);
        setDeliverables(parsed.deliverables || '');
        setBudgetRange(parsed.budgetRange || [0, 50000]);
        setBudgetMinOverride(parsed.budgetMinOverride || '');
        setBudgetMaxOverride(parsed.budgetMaxOverride || '');
        setStartDate(parsed.startDate ? new Date(parsed.startDate) : null);
        setEndDate(parsed.endDate ? new Date(parsed.endDate) : null);
        setIsOngoing(parsed.isOngoing !== undefined ? parsed.isOngoing : true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = {
        deliverables,
        budgetRange,
        budgetMinOverride,
        budgetMaxOverride,
        startDate: startDate?.toISOString() || null,
        endDate: endDate?.toISOString() || null,
        isOngoing,
      };
      await AsyncStorage.setItem('campaignStep3', JSON.stringify(data));
    })();
  }, [
    deliverables,
    budgetRange,
    budgetMinOverride,
    budgetMaxOverride,
    startDate,
    endDate,
    isOngoing,
  ]);

  const handleToggle = (value: boolean) => setIsOngoing(value);

  const openPicker = (target: 'start' | 'end') => {
    setPickerTarget(target);
    setIsModalVisible(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setIsModalVisible(false);
      return;
    }

    if (pickerTarget === 'start' && selectedDate) {
      setStartDate(selectedDate);
    } else if (pickerTarget === 'end' && selectedDate) {
      setEndDate(selectedDate);
    }

    setIsModalVisible(false);
    setPickerTarget(null);
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white px-6">

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
      >
        <StyledView className="space-y-6">
          {/* Deliverables */}
          <StyledView>
            <StyledText className="text-sm text-[#1E293B] mb-1">
              Deliverables (optional)
            </StyledText>
            <StyledTextInput
              placeholder="e.g., 1 Instagram Reel, 3 Stories"
              placeholderTextColor="#94A3B8"
              multiline
              className="border-b border-gray-300 pb-2 text-[#0F172A]"
              value={deliverables}
              onChangeText={setDeliverables}
            />
          </StyledView>

          {/* Budget */}
          <BudgetSlider
            value={budgetRange}
            onChange={(range) => setBudgetRange(range)}
          />

          {/* Duration Toggles */}
          <StyledView>
            <StyledText className="text-sm font-medium text-[#1E293B] mb-2">
              Duration
            </StyledText>

            {/* Ongoing Option */}
            <StyledView className="flex-row justify-between items-start mb-4">
              <StyledView className="flex-1 pr-4">
                <StyledText className="text-[#0F172A] font-medium">
                  Run this campaign until I pause it
                </StyledText>
                <StyledText className="text-sm text-[#64748B] mt-1">
                  Let your campaign run for as long as you'd like. You can pause at any time in ad tools.
                </StyledText>
              </StyledView>
              <Switch
                value={isOngoing}
                onValueChange={() => handleToggle(true)}
              />
            </StyledView>

            {/* Set Duration Option */}
            <StyledView className="flex-row justify-between items-start">
              <StyledView className="flex-1 pr-4">
                <StyledText className="text-[#0F172A] font-medium">
                  Set duration
                </StyledText>
              </StyledView>
              <Switch
                value={isSetDuration}
                onValueChange={() => handleToggle(false)}
              />
            </StyledView>
          </StyledView>

          {/* Date Pickers */}
{isSetDuration && (
  <StyledView>
    {/* Start Date */}
    <StyledView>
      <StyledText className="text-sm text-[#1E293B] mb-1 mt-4">
        Start Date
      </StyledText>
      <StyledTouchable
        onPress={() => openPicker('start')}
        className="border border-gray-300 px-4 py-3 rounded-xl"
      >
        <StyledText className="text-[#0F172A]">
          {startDate ? startDate.toDateString() : 'Select a start date'}
        </StyledText>
      </StyledTouchable>
    </StyledView>

    {/* End Date */}
    <StyledView>
      <StyledText className="text-sm text-[#1E293B] mb-1 mt-2">
        End Date
      </StyledText>
      <StyledTouchable
        onPress={() => openPicker('end')}
        className="border border-gray-300 px-4 py-3 rounded-xl"
      >
        <StyledText className="text-[#0F172A]">
          {endDate ? endDate.toDateString() : 'Select an end date'}
        </StyledText>
      </StyledTouchable>
    </StyledView>
  </StyledView>
)}

          {/* Next Button */}
          <StyledTouchable
            onPress={() => navigation.navigate('Step4CampaignReviewScreen' as never)}
            className="bg-black rounded-full py-4 mt-6"
          >
            <StyledText className="text-white text-center font-semibold text-base">
              Review Campaign
            </StyledText>
          </StyledTouchable>
        </StyledView>
      </ScrollView>

      {/* Modal Date Picker */}
      <Modal transparent visible={isModalVisible} animationType="slide">
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-end"
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View className="bg-white p-4 rounded-t-2xl">
            <DateTimePicker
              value={
                pickerTarget === 'start'
                  ? startDate || new Date()
                  : endDate || new Date()
              }
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={handleDateChange}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </StyledSafeAreaView>
  );
}
// Add this function at the bottom (optional)
export const getStep3CampaignData = async () => {
  const saved = await AsyncStorage.getItem('campaignStep3');
  return saved ? JSON.parse(saved) : {};
};

