// src/screens/LeadFilterScreen/index.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLeadFilterScreen } from './useLeadFilterScreen';
import styles from './styles';

const CustomCheckbox = ({ checked, onPress, label }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <Icon
      name={checked ? 'check-box' : 'check-box-outline-blank'}
      size={20}
      color={checked ? '#2196F3' : '#999'}
    />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomRadio = ({ selected, onPress, label }) => (
  <TouchableOpacity style={styles.radioRow} onPress={onPress}>
    <Icon
      name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
      size={20}
      color={selected ? '#2196F3' : '#999'}
    />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const LeadFilterScreen = ({ navigation, route }) => {
  const { onApplyFilters } = route.params || {};

  const {
    filters,
    updateFilter,
    toggleSystemDefined,
    setSorting,
    applyFilters,
    resetFilters,
  } = useLeadFilterScreen(onApplyFilters);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Source</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.source}
              onValueChange={v => updateFilter('source', v)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Web" value="web" />
              <Picker.Item label="Mobile App" value="app" />
              <Picker.Item label="Manual" value="manual" />
            </Picker>
          </View>
        </View>

        {/* System Defined Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Defined Filter</Text>
          <CustomCheckbox
            checked={filters.systemDefined.includes('New Leads')}
            onPress={() => toggleSystemDefined('New Leads')}
            label="New Leads"
          />
          <CustomCheckbox
            checked={filters.systemDefined.includes('Touched Leads')}
            onPress={() => toggleSystemDefined('Touched Leads')}
            label="Touched Leads"
          />
          <CustomCheckbox
            checked={filters.systemDefined.includes('Untouched Leads')}
            onPress={() => toggleSystemDefined('Untouched Leads')}
            label="Untouched Leads"
          />
        </View>

        {/* Agent Wise Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agent Wise Filter</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.agentWise}
              onValueChange={v => updateFilter('agentWise', v)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Agent A" value="a" />
              <Picker.Item label="Agent B" value="b" />
            </Picker>
          </View>
        </View>

        {/* User Wise Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Wise Filter</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.userWise}
              onValueChange={v => updateFilter('userWise', v)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
            </Picker>
          </View>
        </View>

        {/* Status Wise Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Wise Filter</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.statusWise}
              onValueChange={v => updateFilter('statusWise', v)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Contact in Future" value="future" />
              <Picker.Item label="Lost Lead" value="lost" />
            </Picker>
          </View>
        </View>

        {/* Date + Status Wise Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date + Status Wise Filter</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.dateStatusWise}
              onValueChange={v => updateFilter('dateStatusWise', v)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
            </Picker>
          </View>
        </View>

        {/* Action Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Action Filter</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.action}
              onValueChange={v => updateFilter('action', v)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
            </Picker>
          </View>
        </View>

        {/* Lead Created/Modified At */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Created/Modified At</Text>
          <View style={styles.radioGroup}>
            <CustomRadio
              selected={filters.createdModified === 'Created Date'}
              onPress={() => updateFilter('createdModified', 'Created Date')}
              label="Created Date"
            />
            <CustomRadio
              selected={filters.createdModified === 'Modified Date'}
              onPress={() => updateFilter('createdModified', 'Modified Date')}
              label="Modified Date"
            />
          </View>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue="" style={styles.picker}>
              <Picker.Item label="Select" value="" />
            </Picker>
          </View>
        </View>

        {/* Follow Up Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Up Date</Text>
          <Text style={styles.dateInput}>dd / mm / yyyy</Text>
        </View>

        {/* Sorting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sorting</Text>
          {['Campaign Name', 'Lead Name', 'Mobile', 'Email', 'Leads'].map(
            field => (
              <View key={field} style={styles.sortingRow}>
                <CustomCheckbox
                  checked={filters.sorting.field === field}
                  onPress={() => setSorting(field, filters.sorting.order)}
                  label={field}
                />
                {filters.sorting.field === field && (
                  <View style={{ flexDirection: 'row', marginLeft: 16 }}>
                    <CustomRadio
                      selected={filters.sorting.order === 'ASC'}
                      onPress={() => setSorting(field, 'ASC')}
                      label="ASC"
                    />
                    <CustomRadio
                      selected={filters.sorting.order === 'DESC'}
                      onPress={() => setSorting(field, 'DESC')}
                      label="DESC"
                    />
                  </View>
                )}
              </View>
            ),
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
            <Text style={styles.btnText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
            <Text style={[styles.btnText, styles.resetText]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeadFilterScreen;
