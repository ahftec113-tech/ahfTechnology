import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import { trash } from '../../Assets';

export default function FilterResetModal({
  visible,
  onClose,
  onConfirm,
  data,
}) {
  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <View style={styles.iconLabel}>
        <View>
          <TextComponent styles={styles.label} text={item.label} />
          <TextComponent styles={styles.value} text={item.value} />
        </View>
      </View>
      <TouchableOpacity onPress={() => item?.onDelete(item.id)}>
        <Image
          source={trash}
          resizeMode="contain"
          style={{ width: wp('5'), height: hp('3') }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      style={{ flex: 1 }}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.modalBox}
          showsVerticalScrollIndicator={false}
        >
          <TextComponent styles={styles.title} text={'Reset All?'} />

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.btn, styles.noBtn]}
              onPress={onClose}
            >
              <TextComponent styles={styles.noText} text={'No'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.yesBtn]}
              onPress={onConfirm}
            >
              <TextComponent styles={styles.yesText} text={'Yes'} />
            </TouchableOpacity>
          </View>

          {/* Dynamic List */}
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: 'middle',
    flex: 1,
    textAlignVertical: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: wp(4),
    borderRadius: wp(5),
    width: wp(80),
    maxHeight: hp('60'),
    verticalAlign: 'middle',
    alignSelf: 'center',
    marginVertical: hp('20'),
  },
  title: {
    textAlign: 'center',
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  btn: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(10),
    marginHorizontal: wp(2),
  },
  noBtn: {
    backgroundColor: 'red',
  },
  yesBtn: {
    backgroundColor: 'gray',
  },
  noText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(1.8),
  },
  yesText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(1.8),
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.2),
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: hp(1.8),
    fontWeight: '500',
  },
  value: {
    fontSize: hp(1.6),
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
