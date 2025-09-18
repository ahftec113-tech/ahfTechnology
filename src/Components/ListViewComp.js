import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  arrLeft,
  chevDown,
  chevUp,
  crossWhite,
  searchIcon,
  stepBg,
} from '../Assets';
import { Touchable } from './Touchable';
import { TextComponent } from './TextComponent';
import { Colors } from '../Theme/Variables';
import { useQuery } from '@tanstack/react-query';
import { hp, wp } from '../Hooks/useResponsive';
import API from '../Utils/helperFunc';

export default function ListViewScreen({ navigation, route }) {
  const { onSelectValue, selectedValue, urlName, isMultiSelect } =
    route?.params;

  const { data, error } = useQuery({
    queryKey: [urlName],
    queryFn: () => API.get(urlName),
  });

  const [selectedList, setSelectedList] = useState(selectedValue);

  const toggleAllergy = allergy => {
    console.log('selectedAllergies:', selectedList);
    if (isMultiSelect) {
      const foundAllergy = selectedList.find(res => res?.id === allergy?.id);

      if (foundAllergy) {
        setSelectedList(selectedList.filter(item => item?.id !== allergy?.id));
      } else {
        setSelectedList([...selectedList, allergy]);
      }
    } else if (!isMultiSelect) {
      const foundAllergy = selectedList.find(res => res?.id === allergy?.id);

      if (foundAllergy) {
        setSelectedList(selectedList.filter(item => item?.id !== allergy?.id));
      } else {
        setSelectedList([allergy]);
        navigation.goBack();
        onSelectValue(allergy);
      }
    }
  };

  const [filterData, setFilterData] = useState([]);
  const [text, setText] = useState('');

  function searchFun(e) {
    var text = e;
    if (text && data?.data?.data?.length > 0) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data?.data?.data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = (item.name || '').toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('newDatanewDatanewDatanewData', newData);
      setFilterData(newData);
      setText(text);
    } else {
      setFilterData(data?.data?.data ?? []);
      setText(text);
    }
  }

  return (
    <View style={styles.mainView}>
      <View>
        <View style={styles.headerMain}>
          <Touchable
            onPress={() => {
              navigation.goBack();
              if (isMultiSelect) onSelectValue(selectedList);
              else onSelectValue(...selectedList);
            }}
          >
            <Image
              source={arrLeft}
              style={styles.arrBack}
              tintColor={Colors.backgroundTheme}
            />
          </Touchable>
          {/* <TextComponent
            text={'Save'}
            styles={styles.saveText}
            onPress={() => {
              navigation.goBack();
              if (isMultiSelect) onSelectValue(selectedList);
              else onSelectValue(...selectedList);
            }}
          /> */}
        </View>
        <View style={styles.searchMain}>
          <Image
            source={searchIcon}
            style={styles.inputImage}
            tintColor={Colors.backgroundTheme}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder={'Search'}
            placeholderTextColor={Colors.textGray}
            value={text}
            onChangeText={e => searchFun(e)}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.btnsMain}
        showsVerticalScrollIndicator={false}
      >
        {/* <MultiSelectButton
          items={filterData.length >= 0 && text != '' ? filterData : data?.data}
          onSelectVal={(objId, item) => toggleAllergy(item)}
          objId={urlName}
          selectedAlter={selectedList}
          isMultipule={true}
          leftChildComp={
            <Image
              source={crossWhite}
              resizeMode="contain"
              style={{
                width: wp('3'),
                height: hp('5'),
                marginLeft: wp('3'),
              }}
            />
          }
        /> */}
        {data?.data?.data != null &&
          data?.data?.data?.length > 0 &&
          (filterData.length >= 0 && text != ''
            ? filterData
            : data?.data?.data
          )?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleAllergy(item)}
              style={{
                backgroundColor: selectedList?.filter(
                  res => res?.id == item?.id,
                )[0]?.id
                  ? Colors.backgroundTheme
                  : Colors.white,
                ...styles.allergiesBtns,
              }}
            >
              <Text
                style={{
                  color: selectedList?.filter(res => res?.id == item?.id)[0]?.id
                    ? 'white'
                    : 'black',
                }}
              >
                {item?.name ?? item?.agency_name}
              </Text>
              {Boolean(
                selectedList?.filter(res => res?.id == item?.id)[0]?.id,
              ) && (
                <Image
                  source={crossWhite}
                  resizeMode="contain"
                  style={{
                    width: wp('3'),
                    height: hp('5'),
                    marginLeft: wp('3'),
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: 'contain',
    width: wp('100'),
    height: hp('40'),
  },
  mainView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: hp('3'),
  },
  stepCirclesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: Platform.OS == 'ios' ? hp('5') : 0,
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: wp('16.5'),
    height: hp('0.6'),
  },
  activeCircle: {
    backgroundColor: Colors.primaryColor,
  },
  circleText: {
    fontSize: hp('3'),
    fontWeight: '800',
    color: 'white',
  },
  activeLine: {
    backgroundColor: Colors.primaryColor,
  },
  nonActiveLine: {
    flex: 1,
    height: hp('.6'),
    backgroundColor: 'gray',
    position: 'absolute',
    left: 30,
    right: 20,
    top: 18,
    width: wp('10'),
    zIndex: 0,
  },
  skipBtn: {
    width: wp('100'),
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? hp('5') : hp('2'),
    paddingHorizontal: wp('3'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horse: {
    resizeMode: 'contain',
    width: wp('8'),
    height: hp('8'),
    alignSelf: 'center',
    marginRight: wp('3'),
    // marginTop: Platform.OS == 'ios' && hp('5'),
  },
  mainContent: {
    width: wp('100'),
    paddingHorizontal: wp('4'),
  },
  tagline: {
    color: Colors.black,
    paddingTop: hp(Platform.OS == 'android' ? '27' : '25'),
    // paddingBottom: hp('3'),
    textAlign: 'center',
    fontSize: hp('2'),
    fontWeight: 700,
    marginBottom: hp('2'),
  },
  innerTitle: {
    textAlign: 'center',
    marginBottom: hp('3'),
    fontSize: hp('1.5'),
    marginTop: hp('2'),
  },
  stepTwoStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: hp('6'),
  },
  inputMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: Colors.backgroundTheme,
    borderRadius: 30,
    paddingHorizontal: wp('4'),
    width: wp('92'),
    height: hp('5'),
    fontSize: hp('1.5'),
  },
  btnTextTwo: {
    fontSize: hp('1.2'),
    color: 'white',
  },
  inputImage: {
    width: wp('6'),
    resizeMode: 'contain',
    marginRight: wp('0'),
  },
  arrowImage: {
    width: wp('3'),
    resizeMode: 'contain',
    marginRight: wp('1'),
    tintColor: Colors.backgroundTheme,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: wp('5'),
    position: 'absolute',
    bottom: hp('5'),
    alignSelf: 'center',
    width: wp('90'),
  },

  pickerStyle: {
    width: wp('90'),
    height: hp('6.2'),
    alignItems: 'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    color: 'transparent',
  },
  pickerStyleIOS: {
    width: wp('80'),
    alignSelf: 'center',
  },
  content: {
    marginBottom: hp('2'),
  },
  gender: selectedGender => ({
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: selectedGender ? Colors.black : Colors.textGray,
    borderRadius: 50,
    width: wp('92'),
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1.5'),
    alignItems: 'center',
    marginBottom: hp('3.5'),
    backgroundColor: selectedGender ? Colors.black : 'transparent',
    // height: hp('3'),
  }),
  genderTitle: selectedGender => ({
    fontWeight: '400',
    fontSize: hp('1.5'),
    color: selectedGender ? Colors.white : Colors.textGray,
  }),
  catImage: selectedGender => ({
    width: wp('7'),
    height: hp('3'),
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: selectedGender ? 'white' : Colors.textGray,
    marginRight: wp('3'),
  }),
  content: {
    marginBottom: hp('2'),
  },
  previousButton: isStart => ({
    backgroundColor: isStart ? 'transparent' : Colors.primaryColor,

    // display: isStart ? 'none' : 'flex',
  }),
  nextButton: {
    backgroundColor: Colors.primaryColor,
  },
  themeButton: {
    color: Colors.white,

    fontSize: hp('1.5'),
  },
  selectedValStyle: {
    paddingHorizontal: wp('2'),
    backgroundColor: Colors.lightGray,
    overflow: 'hidden',
    height: 'auto',
    paddingVertical: hp('0.5'),
    borderWidth: 0,
  },
  innerScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('2'),
    // paddingBottom: hp('60'),
    // flexGrow: 1,
    // backgroundColor: 'red',
    // overflow: 'scroll',
    height: hp('25'),
  },

  // ListViewStyle

  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1'),
    marginTop: Platform.OS == 'ios' ? hp('3') : 0,
  },
  arrBack: {
    resizeMode: 'contain',
    width: wp('6'),
    height: hp('3'),
  },
  saveText: {
    color: Colors.primaryColor,
  },
  titleMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp('2'),
    // borderTopWidth: 0.2,
    // marginBottom: hp('2'),
  },
  searchMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#525252',
    borderRadius: 30,
    paddingHorizontal: wp('4'),
    width: wp('92'),
    marginVertical: hp('1'),
    marginBottom: hp('2'),
    height: hp('5.5'),
  },
  inputImage: {
    width: wp('6'),
    resizeMode: 'contain',
    marginRight: wp('0'),
  },
  inputStyle: {
    width: wp('73'),
    color: 'black',
  },
  btnsMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp('92'),
    paddingBottom: hp('20'),
  },
  allergiesBtns: {
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: hp('4'),
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.themeGreen,
    paddingHorizontal: wp('3'),
    marginHorizontal: wp('1'),
    marginVertical: hp('.5'),
  },
  textStyle: {
    fontSize: hp('1.2'),
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: hp('1.5'),
    backgroundColor: Colors.backgroundTheme,
    overflow: 'hidden',
    color: 'white',
  },
});
