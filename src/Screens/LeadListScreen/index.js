// src/screens/LeadListScreen/index.js
import React, { memo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // install: npm i react-native-vector-icons
import styles from './styles';
import useLeadListScreen from './useLeadListScreen';
import { Checkbox } from 'react-native-paper';

const LeadListScreen = () => {
  const { leads, loading, total, onRefresh, onEndReached } =
    useLeadListScreen();

  // ---------- Simple filter UI (mirrors screenshot) ----------
  const [selectAll, setSelectAll] = useState(false);
  const [nameFilter, setNameFilter] = useState('All');
  const [mobileFilter, setMobileFilter] = useState('All');
  const [mobile2Filter, setMobile2Filter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const renderHeader = () => {
    return (
      <>
        {/* Top action buttons */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="refresh" size={16} color="#fff" />
            <Text style={styles.headerBtnText}>Refresh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="person-add" size={16} color="#fff" />
            <Text style={styles.headerBtnText}>Lead +</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.headerBtn]}>
            <Icon name="download" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Filter pickers */}
        <View style={styles.filterRow}>
          <View style={styles.filterPicker}>
            <Picker
              selectedValue={selectAll}
              onValueChange={setSelectAll}
              style={{ height: 36 }}
              itemStyle={{ fontSize: 13 }}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="Select All" value={false} />
              <Picker.Item label="Select All" value={true} />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={nameFilter}
              onValueChange={setNameFilter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
              {/* Add more options as needed */}
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={mobileFilter}
              onValueChange={setMobileFilter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={mobile2Filter}
              onValueChange={setMobile2Filter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={statusFilter}
              onValueChange={setStatusFilter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <TouchableOpacity
            style={{ justifyContent: 'center', paddingHorizontal: 6 }}
          >
            <Icon name="keyboard-return" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Table header */}
        <View style={styles.tableHeader}>
          <View style={styles.colCheckbox}>
            <Checkbox value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.colName}>
            <Text style={styles.headerText}>Name</Text>
          </View>
          <View style={styles.colMobile}>
            <Text style={styles.headerText}>Mobile</Text>
          </View>
          <View style={styles.colMobile2}>
            <Text style={styles.headerText}>Mobile 2</Text>
          </View>
          <View style={styles.colStatus}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={styles.colReturn} />
        </View>
      </>
    );
  };

  const renderItem = ({ item }) => {
    if (!item) return null; // safety

    return (
      <View style={styles.row}>
        <View style={styles.colCheckbox}>
          <Checkbox value={false} onValueChange={() => {}} />
        </View>
        <View style={styles.colName}>
          <Text style={styles.cellText}>{item.name || '—'}</Text>
        </View>
        <View style={styles.colMobile}>
          <Text style={styles.cellText}>{item.mobile || '—'}</Text>
        </View>
        <View style={styles.colMobile2}>
          <Text style={styles.cellText}>-</Text>
        </View>
        <View style={styles.colStatus}>
          <Text style={styles.statusText}>{item.status || '—'}</Text>
        </View>
        <View style={styles.colReturn} />
      </View>
    );
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.pageText}>
        Showing {leads.length} of {total} entries
      </Text>
      {/* Simple pagination placeholder – replace with real buttons if needed */}
      <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}>
        <Text style={styles.pageTextActive}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pageBtn}>
        <Text style={styles.pageText}>2</Text>
      </TouchableOpacity>
      {/* … */}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <FlatList
        data={leads}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={loading && leads.length === 0}
            onRefresh={onRefresh}
          />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          loading ? null : (
            <View style={styles.loadingContainer}>
              <Text>No leads found</Text>
            </View>
          )
        }
        ListFooterComponentStyle={{ marginBottom: 20 }}
      />
      {loading && leads.length > 0 && (
        <ActivityIndicator
          style={{ marginVertical: 12 }}
          size="small"
          color="#2196F3"
        />
      )}
    </View>
  );
};

export default memo(LeadListScreen);
