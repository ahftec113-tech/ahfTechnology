import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React, { memo, useState } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import BtnModalComponent from '../../Components/BtnModalComp';
import usePostIssueFormScreen from './usePostIssueFormScreen';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { arrDown, cameraGray, plusGray } from '../../Assets';
import { styles } from './styles';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import RenderHTML from 'react-native-render-html';
import Accordion from 'react-native-collapsible/Accordion';
import { errorMessage } from '../../Config/NotificationMessage';

const PostIssueFormScreen = ({ navigation, route }) => {
  const {
    modalState,
    setModalState,
    selectTag,
    arrySelector,
    onChangeVal,
    setFormData,
    handleCameraPick,
    handleFilePick,
    onSearch,
    searchBar,
    headerArray,
    tableArryData,
    selectedCell,
    setSelectedCell,
    selectedFile,
    description,
    setDescription,
    setTableArryData,
    postIssue,
    zipCode,
    setZipCode,
    showText,
    setShowText,
  } = usePostIssueFormScreen(navigation, route);

  const [activeSections, setActiveSections] = useState([]);
  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const _renderHeader = (section, _, isActive) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{'Search Results'}</Text>
        <Image
          source={arrDown}
          resizeMode="contain"
          style={styles.headerIcon}
          tintColor={'white'}
        />
      </View>
    );
  };

  const _renderContent = section => {
    // console.log('sectionsectionsectionsectionsection', section);
    return (
      <FlatList
        data={tableArryData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: hp('50'), // small buffer, not huge
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: order }) => (
          <Pressable
            style={styles.cardContainer(
              selectedCell.some(res => res === order?.pid),
            )}
            onPress={() => {
              if (selectedCell.some(res => res === order?.pid)) {
                setSelectedCell(res => res.filter(item => item !== order?.pid));
              } else setSelectedCell([...selectedCell, order?.pid]);
            }}
          >
            {headerArray.map(
              (key, idx) =>
                order[key] != null && (
                  <View key={idx} style={styles.totalsRow}>
                    <Text style={styles.totalsText}>{key}</Text>
                    <Text style={styles.totalsValue} numberOfLines={2}>
                      {order[key] || ''}
                    </Text>
                  </View>
                ),
            )}
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderComponent headerTitle={'Type Issue'} isBack />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TextComponent text={'Select Issue:'} fade />
        <View style={styles.rowBetween}>
          <ThemeButton
            isTransparent
            title={selectTag?.statusOptions?.val ?? 'Select option'}
            image={arrDown}
            style={styles.halfButton}
            imageStyle={styles.themeIcon}
            onPress={() => setModalState('statusOptions')}
          />
          <View>
            <TextComponent
              text={
                (selectTag?.statusOptions?.id == 'Order Return' &&
                  'Return Date:') ||
                (selectTag?.statusOptions?.id == 'Order' && 'Search By:') ||
                (selectTag?.statusOptions?.id == 'Stock' &&
                  'Select file type') ||
                (selectTag?.statusOptions?.id == 'Printing' && 'Select') ||
                (selectTag?.statusOptions?.id == 'Materials' && 'Select')
              }
              fade
              styles={{ bottom: hp('3') }}
            />
            {Boolean(
              selectTag.statusOptions?.id == 'Order Return' ||
                selectTag.statusOptions?.id == 'Order' ||
                selectTag.statusOptions?.id == 'Stock' ||
                selectTag.statusOptions?.id == 'Printing' ||
                selectTag.statusOptions?.id == 'Materials',
            ) && (
              <ThemeButton
                isTransparent
                title={
                  selectTag.ReturnDate?.val ||
                  selectTag.SearchBy?.val ||
                  selectTag.selectFileType?.val ||
                  selectTag.printingStatus?.val ||
                  selectTag.materialType?.val ||
                  'Select Option'
                }
                image={arrDown}
                style={{ ...styles.halfButton, bottom: hp('1') }}
                imageStyle={styles.themeIcon}
                numberOfLine={1}
                onPress={() =>
                  setModalState(
                    (selectTag.statusOptions?.id == 'Order Return' &&
                      'ReturnDate') ||
                      (selectTag.statusOptions?.id == 'Order' && 'SearchBy') ||
                      (selectTag.statusOptions?.id == 'Stock' &&
                        'selectFileType') ||
                      (selectTag.statusOptions?.id == 'Printing' &&
                        'printingStatus') ||
                      (selectTag.statusOptions?.id == 'Materials' &&
                        'materialType'),
                  )
                }
              />
            )}
          </View>
        </View>
        {selectTag?.statusOptions?.id == 'Order Return' && (
          <>
            <TextComponent text={'Box No:'} fade />
            <View style={{ ...styles.rowBetween, marginVertical: hp('1') }}>
              <ThemeButton
                isTransparent
                title={
                  selectTag?.BoxNo?.val
                    ? `Box no: ${selectTag?.BoxNo?.val}`
                    : 'Select option'
                }
                image={arrDown}
                style={{ ...styles.halfButton, width: wp('93') }}
                imageStyle={styles.themeIcon}
                onPress={() => setModalState('BoxNo')}
              />
            </View>
          </>
        )}
        {Boolean(
          selectTag?.statusOptions?.id != 'Stock' &&
            selectTag?.statusOptions?.id != 'Printing' &&
            selectTag?.statusOptions?.id != null,
        ) && (
          <View
            style={{
              width: wp('93'),
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View>
              <TextComponent
                text={
                  (selectTag?.statusOptions?.id == 'Order Return' &&
                    'Search:') ||
                  (selectTag?.SearchBy?.id == 'SearchByName/Zip' &&
                    'CustomerName:') ||
                  (selectTag?.SearchBy?.id == 'OrderCode' &&
                    'Scan Order Code:') ||
                  (selectTag?.statusOptions?.id == 'Materials' && 'Add:') ||
                  'Search'
                }
                fade
                styles={{ marginBottom: hp('1') }}
              />
              <View
                style={{
                  width:
                    selectTag?.SearchBy?.id == 'SearchByName/Zip'
                      ? wp('43')
                      : wp('93'),
                  height: hp('6'),
                  borderRadius: 10,
                  justifyContent: 'center',
                  paddingHorizontal: wp('2'),
                  backgroundColor: Colors.bgGray,
                  borderColor: 'black',
                  borderWidth: 0.5,
                }}
              >
                <TextInput
                  style={{ flex: 1, color: 'black' }}
                  value={searchBar}
                  onChangeText={e => onChangeVal('searchBar', e)}
                />
              </View>
            </View>
            {Boolean(selectTag?.SearchBy?.id == 'SearchByName/Zip') && (
              <View>
                <TextComponent
                  text={
                    (selectTag?.statusOptions?.id == 'Order Return' &&
                      'Search:') ||
                    (selectTag?.SearchBy?.id == 'SearchByName/Zip' && 'Zip:')
                  }
                  fade
                  styles={{ marginBottom: hp('1') }}
                />
                <View
                  style={{
                    width:
                      selectTag?.SearchBy?.id == 'SearchByName/Zip'
                        ? wp('43')
                        : wp('93'),
                    height: hp('6'),
                    borderRadius: 10,
                    justifyContent: 'center',
                    paddingHorizontal: wp('2'),
                    backgroundColor: Colors.bgGray,
                    borderColor: 'black',
                    borderWidth: 0.5,
                  }}
                >
                  <TextInput
                    style={{ flex: 1, color: 'black' }}
                    value={zipCode}
                    onChangeText={e => setZipCode(e)}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            )}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {Boolean(
            selectTag?.statusOptions?.id != 'PO' &&
              selectTag?.statusOptions?.id != 'Stock' &&
              selectTag?.statusOptions?.id != 'Printing' &&
              selectTag?.statusOptions?.id != 'Miscellaneous' &&
              selectTag?.statusOptions?.id != null,
          ) && (
            <ThemeButton
              title={
                (selectTag?.statusOptions?.id == 'Order Return' && 'Search') ||
                (selectTag?.statusOptions?.id == 'Order' && 'Search') ||
                (selectTag?.statusOptions?.id == 'Package' &&
                  'Get Tracking Status') ||
                (selectTag?.statusOptions?.id == 'Materials' && 'Add')
              }
              style={{ width: wp('42'), height: hp('5'), marginTop: hp('2') }}
              isTheme
              onPress={() => {
                if (selectTag?.statusOptions?.id == 'Materials') {
                  if (selectTag?.materialType?.id != null) {
                    setDescription(prev => {
                      const newLine = `${selectTag?.materialType?.val} = ${searchBar} Qty`;
                      return prev ? `${prev}\n${newLine}` : newLine;
                    });
                  } else errorMessage('Please select material type first');
                } else onSearch();
              }}
            />
          )}
          {Boolean(
            (selectTag?.statusOptions?.id != 'Order Return' ||
              tableArryData.length > 0) &&
              // selectTag?.statusOptions?.id != 'Order' &&
              selectTag?.statusOptions?.id != null,
          ) && (
            <ThemeButton
              title={selectTag?.assignToUsers?.name ?? 'Assign To'}
              style={{ width: wp('42'), height: hp('5'), marginTop: hp('2') }}
              isTransparent
              onPress={() => setModalState('assignToUsers')}
              image={arrDown}
              imageStyle={{ tintColor: Colors.primaryColor }}
              numberOfLine={1}
            />
          )}
        </View>

        {Boolean(
          // selectTag?.statusOptions?.id != 'File Uploading' &&
          selectTag?.statusOptions?.id != 'Printing' &&
            selectTag?.statusOptions?.id != 'Materials' &&
            selectTag?.statusOptions?.id != null,
        ) && (
          <View style={{ marginTop: hp('1') }}>
            <TextComponent
              text={'Either take photo by camera or upload photo.'}
              family={'500'}
            />
            {(selectedFile?.fileName || selectedFile?.name) && (
              <TextComponent
                isThemeColor
                text={selectedFile?.fileName ?? selectedFile?.name}
              />
            )}
            <View
              style={{
                width: wp('92'),
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: hp('1'),
              }}
            >
              <ThemeButton
                title={'Choose file'}
                style={{ width: wp('43'), height: hp('5') }}
                isTheme
                onPress={handleFilePick}
              />
              <ThemeButton
                title={'Camera'}
                style={{ width: wp('43'), height: hp('5') }}
                isTheme
                image={cameraGray}
                imageStyle={{ tintColor: 'white' }}
                onPress={handleCameraPick}
              />
            </View>
          </View>
        )}
        {Boolean(
          (selectTag?.statusOptions?.id != 'Order Return' ||
            tableArryData.length > 0) &&
            selectTag?.statusOptions?.id != null,
        ) && (
          <>
            <TextComponent
              text={'Description:'}
              fade
              styles={{ marginTop: hp('1') }}
            />
            <View
              style={{
                width: wp('92'),
                backgroundColor: Colors.bgGray,
                height: hp('15'),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                paddingHorizontal: wp('1'),
                paddingVertical: hp('0.1'),
                justifyContent: 'flex-start',
                marginVertical: hp('1'),
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: 'black',
                  fontSize: 14,
                  textAlignVertical: 'top', // ensures text starts at the top for multiline
                  lineHeight: hp(3),
                }}
                placeholder="Enter description..."
                placeholderTextColor="#888"
                multiline
                value={description}
                onChangeText={e => setDescription(e)}
              />
            </View>
          </>
        )}
        {tableArryData.length > 0 && (
          <>
            <ThemeButton
              title={'Select All'}
              onPress={() => {
                setSelectedCell(tableArryData.map(res => res?.pid));
              }}
              style={{ width: wp('30'), alignSelf: 'flex-end' }}
            />
            <Accordion
              sections={[1]}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              touchableComponent={TouchableOpacity}
              expandMultiple={false}
            />
          </>
        )}
        {showText != null && showText != '' && (
          <TextComponent text={showText} />
        )}
      </ScrollView>
      {selectTag?.statusOptions?.id != null && (
        <ThemeButton
          title={'Post Issue'}
          style={{
            position: 'absolute',
            bottom: hp('2'),
            width: wp('90'),
            alignSelf: 'center',
          }}
          onPress={postIssue}
        />
      )}
      {modalState != null && (
        <BtnModalComponent
          activeTags={selectTag[modalState]}
          allData={arrySelector[modalState]}
          //   heading={onPressKey}
          // activeTitle={'select Diet'}
          isModal={modalState}
          onPress={() => setModalState(null)}
          onSelect={e => {
            if (modalState == 'statusOptions') {
              setFormData({
                BoardMessage: null,
                IssuetypeOptions: null,
                SuppliersDetail: null,
                officeOptions: null,
                statusOptions: e,
                issueText: null,
                searchQuery: null,
                startDate: null,
                endDate: null,
                UserList: null,
                ReturnDate: null,
                SearchBy: null,
                selectFileType: null,
                printingStatus: null,
                materialType: null,
                BoxNo: null,
                selectedFile: null,
                assignToUsers: null,
                searchBar: null,
                // searchBar: '114-9793394-8648252',
              });
              setDescription(null);
              setZipCode(null);
              setTableArryData([]);
              setSelectedCell([]);
              setShowText(null);
              if (e?.id == 'Printing') {
                setDescription(`\n------------------------------`);
              }
            } else {
              onChangeVal(modalState, e);
            }
          }}
          onBackPress={() => setModalState(null)}
        />
      )}
    </View>
  );
};

export default memo(PostIssueFormScreen);
