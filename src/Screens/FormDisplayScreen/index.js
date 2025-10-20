import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { memo, useState } from 'react';
import ThemeButton from '../../Components/ThemeButton';
import {
  afhLogo,
  arrDown,
  calendar,
  LoginBg,
  logOutGray,
  plusGray,
} from '../../Assets';
import { store } from '../../Redux/Reducer';
import { logOutAuth } from '../../Redux/Action/AuthAction';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import Accordion from 'react-native-collapsible/Accordion';
import useFormDisplayScreen from './useFormDisplayScreen';
import { hp, wp } from '../../Hooks/useResponsive';
import BtnModalComponent from '../../Components/BtnModalComp';
import DatePicker from 'react-native-date-picker';
import {
  formatDateToLong,
  formatDateToMDY,
} from '../../Services/GlobalFunctions';
import { Colors } from '../../Theme/Variables';
import RenderHTML from 'react-native-render-html';

const FormDisplayScreen = ({ navigation }) => {
  const {
    onChangeVal,
    onSearch,
    bottomDataArry,
    selectTag,
    modalState,
    setModalState,
    arrySelector,
    apiFormData,
    currentDate,
    apiAllData,
  } = useFormDisplayScreen();

  const [activeSections, setActiveSections] = useState([]);

  const _renderHeader = (section, _, isActive) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section?.created_at_wd_time}</Text>
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
    const source = {
      html: `Msg : ${section?.message}`,
    };

    function hasHtmlTags(str) {
      // Regex to detect any HTML tag like <tag> or <tag attr="">
      const regex = /<[^>]+>/g;
      return regex.test(str);
    }

    // console.log('sectionsectionsectionsectionsection', section);
    return (
      <View style={styles.content}>
        <View style={styles.contentBox}>
          <TextComponent
            text={`Name : ${section?.name}`}
            size={'1.5'}
            isThemeColor
            family={'400'}
          />
        </View>
        <View style={styles.contentBox}>
          <TextComponent
            text={`Issue : ${section?.issue_type}`}
            size={'1.5'}
            isThemeColor
            family={'400'}
          />
        </View>

        <View style={styles.contentBox}>
          {hasHtmlTags(section?.message) ? (
            <RenderHTML
              baseStyle={{
                // width: wp('90'),
                // alignSelf: 'center',
                // marginTop: hp('1'),
                fontSize: hp('1.5'),
                color: Colors.primaryColor,
              }}
              contentWidth={hp('90')}
              source={source}
              enableExperimentalMarginCollapsing={true}
              // allowedStyles={true}
              enableCSSInlineProcessing={true}
            />
          ) : (
            <TextComponent
              text={`Msg : ${section?.message}`}
              size={'1.5'}
              isThemeColor
              family={'400'}
            />
          )}
        </View>
        <View style={styles.contentBox}>
          <TextComponent
            text={`Modified : ${section?.lastModifiedDate}`}
            size={'1.5'}
            isThemeColor
            family={'400'}
          />
        </View>
        <ThemeButton
          title={'Chat'}
          onPress={() => navigation.navigate('ChatScreen', section?.id)}
          style={{
            width: wp('30'),
            alignSelf: 'flex-end',
            height: hp('4'),
            marginBottom: hp('1'),
          }}
        />
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  console.log('arrySelectorarrySelectorarrySelectorarrySelector', arrySelector);

  return (
    <ImageBackground source={LoginBg} style={styles.bgImage}>
      <View style={styles.headerRow}>
        <Image source={afhLogo} resizeMode="contain" style={styles.logo} />
        <ThemeButton
          isTheme
          style={styles.logoutButton}
          imageStyle={styles.logoutImage}
          image={logOutGray}
          title={'Log Out'}
          onPress={() => store.dispatch(logOutAuth())}
        />
      </View>
      <View style={styles.container}>
        <TextComponent text={'Status'} fade />
        <View style={styles.rowBetween}>
          <ThemeButton
            isTransparent
            title={apiFormData?.statusOptions?.val ?? 'Select option'}
            image={arrDown}
            style={styles.halfButton}
            imageStyle={styles.themeIcon}
            onPress={() => setModalState('statusOptions')}
          />
          <ThemeButton
            title={'Post Issues'}
            isTheme
            image={plusGray}
            style={styles.halfButton}
            imageStyle={styles.whiteIcon}
            onPress={() =>
              navigation.navigate('PostIssueFormScreen', {
                statusOptions: arrySelector.statusOptions,
                userList: apiAllData?.UserList,
              })
            }
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp('50') }}
        >
          <TextComponent text={'Date Range'} fade />
          <View style={styles.rowBetween}>
            <ThemeButton
              isTransparent
              title={
                apiFormData?.startDate
                  ? formatDateToMDY(apiFormData?.startDate)
                  : apiAllData?.StartDate
              }
              image={calendar}
              style={styles.halfButton}
              imageStyle={styles.themeIcon}
              onPress={() => setModalState('startDate')}
            />
            <TextComponent text={'--'} />
            <ThemeButton
              title={
                apiFormData?.endDate
                  ? formatDateToMDY(apiFormData?.endDate)
                  : apiAllData?.EndDate
              }
              isTransparent
              image={calendar}
              style={styles.halfButton}
              imageStyle={styles.themeIcon}
              onPress={() => setModalState('endDate')}
            />
          </View>

          <View style={styles.threeColRow}>
            <View>
              <TextComponent
                text={'Post PAK/USA'}
                fade
                styles={styles.centerText}
              />
              <ThemeButton
                title={apiFormData?.officeOptions?.val ?? 'Select'}
                image={arrDown}
                isTransparent
                style={styles.smallButton}
                imageStyle={styles.themeIcon}
                onPress={() => setModalState('officeOptions')}
              />
            </View>
            <View>
              <TextComponent
                text={'Issue Type'}
                fade
                styles={styles.centerText}
              />
              <ThemeButton
                title={apiFormData?.IssuetypeOptions?.val ?? 'Select'}
                image={arrDown}
                isTransparent
                style={styles.smallButton}
                imageStyle={styles.themeIcon}
                onPress={() => setModalState('IssuetypeOptions')}
              />
            </View>
            <View>
              <TextComponent
                text={'Post User'}
                fade
                styles={styles.centerText}
              />
              <ThemeButton
                title={apiFormData?.UserList?.name ?? 'Select'}
                image={arrDown}
                isTransparent
                style={styles.smallButton}
                imageStyle={styles.themeIcon}
                textStyle={{ width: wp('18') }}
                numberOfLine={1}
                onPress={() => setModalState('UserList')}
              />
            </View>
          </View>

          <View style={styles.searchBox}>
            <View>
              <TextComponent text={'Issue In'} fade />
              <TextInput
                placeholder="Search Here"
                placeholderTextColor={'gray'}
                style={styles.searchInput}
                value={apiFormData?.issueText}
                onChangeText={e => onChangeVal('issueText', e)}
              />
            </View>
            <View>
              <TextComponent
                text={'Search Query'}
                fade
                styles={styles.centerText}
              />
              <TextInput
                placeholder="Search Here"
                placeholderTextColor={'gray'}
                style={styles.searchInput}
                value={apiFormData?.searchQuery}
                onChangeText={e => onChangeVal('searchQuery', e)}
              />
            </View>
            <View>
              <TextComponent text={''} fade styles={styles.centerText} />
              <ThemeButton
                title={'Done'}
                style={styles.doneButton}
                isTheme
                onPress={onSearch}
              />
            </View>
          </View>

          <View style={styles.accordionBox}>
            <Accordion
              sections={bottomDataArry}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              touchableComponent={TouchableOpacity}
              expandMultiple={false}
            />
          </View>
        </ScrollView>
      </View>
      {Boolean(modalState == 'startDate' || modalState == 'endDate') && (
        <DatePicker
          // mode={'datetime'}
          mode={'date'}
          open={Boolean(modalState == 'startDate' || modalState == 'endDate')}
          date={selectTag[modalState] ?? currentDate}
          is24hourSource="locale"
          locale="en"
          onCancel={() => setModalState(null)}
          modal
          onConfirm={e => {
            console.log(
              'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
              e,
              new Date(e.getTime() + 24 * 60 * 60 * 1000),
              e.toDateString(),
            );
            onChangeVal(modalState, e);
            setModalState(null);
          }}
        />
      )}
      {Boolean(
        modalState != 'startDate' &&
          modalState != 'endDate' &&
          modalState != null,
      ) && (
        <BtnModalComponent
          activeTags={selectTag[modalState]}
          allData={arrySelector[modalState]}
          //   heading={onPressKey}
          // activeTitle={'select Diet'}
          isModal={Boolean(
            modalState != 'startDate' &&
              modalState != 'endDate' &&
              modalState != null,
          )}
          onPress={() => setModalState(null)}
          onSelect={e => {
            onChangeVal(modalState, e);
            setModalState(null);
          }}
          onBackPress={() => setModalState(null)}
        />
      )}
    </ImageBackground>
  );
};

export default memo(FormDisplayScreen);
