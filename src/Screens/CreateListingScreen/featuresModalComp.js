import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { boldDivider, checkBoxIcon, crossWhite, unChecked } from '../../Assets';
import { useState } from 'react';
import { TextComponent } from '../../Components/TextComponent';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import ThemeButton from '../../Components/ThemeButton';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { Touchable } from '../../Components/Touchable';

const ageRange = Array.from({ length: 23 }, (_, i) => {
  const age = 18 + i;
  return { label: String(age), value: String(age) };
});

const FeaturesModalComp = ({
  activeTags,
  isModal,
  onPress,
  heading,
  onSelect,
  onBackPress,
  activeTitle,
  allData,
}) => {
  const [innerDataState, setInnerDateState] = useState({
    flooring:
      activeTags?.flooring ?? { id: activeTags?.flooringSelect } ?? null,
    view: activeTags?.view ?? activeTags?.viewInput,
    builtInYear: activeTags?.builtInYear ?? activeTags?.buildtInYearInput,
    floors: activeTags?.floors ?? activeTags?.floorsInput,
    centerAc: activeTags?.centerAc ?? activeTags?.centralAirContionInput,
    wasteDisp: activeTags?.wasteDisp ?? activeTags?.wasteDisposalInput,
    electBackup:
      activeTags?.electBackup ?? {
        id: activeTags?.electricityBackupSelect?.id,
      } ??
      null,
    otherMainFea:
      activeTags?.otherMainFea ?? activeTags?.otherMainFeaturesInput,
    parkingSpac: activeTags?.parkingSpac ?? activeTags?.parkingSpacesInput,
    doubleGlaz: activeTags?.doubleGlaz ?? activeTags?.doubleGlazedWindowsInput,
    centerHeat: activeTags?.centerHeat ?? activeTags?.centralHeatingInput,
    furnished: activeTags?.furnished ?? activeTags?.furnishedInput,
    otherRooms: activeTags?.otherRooms ?? activeTags?.otherRoomsInput,
    kitchen: activeTags?.kitchen ?? activeTags?.kitchensInput,
    drawingRoom: activeTags?.drawingRoom ?? activeTags?.drawingRoomInput,
    studyRoom: activeTags?.studyRoom ?? activeTags?.studyRoomInput,
    powerRoom: activeTags?.powerRoom ?? activeTags?.powderRoomInput,
    steamRoom: activeTags?.steamRoom ?? activeTags?.steamRoomInput,
    laundryRoom: activeTags?.laundryRoom ?? activeTags?.laundryRoomInput,
    servantQuat: activeTags?.servantQuat ?? activeTags?.servantQuartersInput,
    storeRoom: activeTags?.storeRoom ?? activeTags?.storeRoomInput,
    diningRoom: activeTags?.diningRoom ?? activeTags?.diningRoomInput,
    prayerRoom: activeTags?.prayerRoom ?? activeTags?.prayerRoomInput,
    gym: activeTags?.gym ?? activeTags?.gymInput,
    lounge: activeTags?.lounge ?? activeTags?.loungeOrSittingRoomInput,
    otherBusiness:
      activeTags?.otherBusiness ??
      activeTags?.otherBusinessAndCommuncationFacilitiesInput,
    sateliite:
      activeTags?.sateliite ?? activeTags?.satelliteOrCableTvReadyInput,
    broadband:
      activeTags?.broadband ?? activeTags?.broadbandInternetAccessInput,
    interCom: activeTags?.interCom ?? activeTags?.intercomInput,
    otherCommunity:
      activeTags?.otherCommunity ?? activeTags?.otherCommunityFacilitiesInput,
    comSwimingPool:
      activeTags?.comSwimingPool ?? activeTags?.communitySwimmingPoolInput,
    firtAid: activeTags?.firtAid ?? activeTags?.firstAidOrMedicalCentreInput,
    playArea: activeTags?.playArea ?? activeTags?.kidsPlayAreaInput,
    mosq: activeTags?.mosq ?? activeTags?.mosqueInput,
    comLawn: activeTags?.comLawn ?? activeTags?.communityLawnOrGardenInput,
    comGym: activeTags?.comGym ?? activeTags?.communityGymInput,
    dayCare: activeTags?.dayCare ?? activeTags?.dayCareCenterInput,
    bbqArea: activeTags?.bbqArea ?? activeTags?.barbequeAreaInput,
    comCenter: activeTags?.comCenter ?? activeTags?.communityCentreInput,
    parkingSpec: activeTags?.parkingSpec ?? activeTags?.parkingSpacesInput,
    swimingPool: activeTags?.swimingPool ?? activeTags?.swimmingPoolInput,
    jacuzzi: activeTags?.jacuzzi ?? activeTags?.jacuzziInput,
    lawnGarden: activeTags?.lawnGarden ?? activeTags?.lawnOrGardenInput,
    sauna: activeTags?.sauna ?? activeTags?.saunaInput,
    nearBySchool: activeTags?.nearBySchool ?? activeTags?.nearbySchoolsInput,
    nearByMall: activeTags?.nearByMall ?? activeTags?.nearbyShoppingMallsInput,
    disFromAirport:
      activeTags?.disFromAirport ?? activeTags?.distanceFromAirportInput,
    otherNearby: activeTags?.otherNearby ?? activeTags?.otherNearbyPlacesInput,
    nearbyHospital: activeTags?.nearbyHospital ?? activeTags?.nearbyHospital,
    nearbyRest: activeTags?.nearbyRest ?? activeTags?.nearbyRestaurantInput,
    nearbyTrans:
      activeTags?.nearbyTrans ?? activeTags?.nearbyPublicTransportServiceInput,
    otherFac:
      activeTags?.otherFac ??
      activeTags?.otherFacilitiesInput ??
      activeTags?.otherHealthcareAndRecreationFacilitiesInput,
    securityStaff: activeTags?.securityStaff ?? activeTags?.securityStaffInput,
    possession: activeTags?.possession ?? activeTags?.possessionReady,
    balloted: activeTags?.balloted,
    elect: activeTags?.elect,
    suiGas: activeTags?.suiGas,
    mainStaaf: activeTags?.mainStaaf ?? activeTags?.maintenanceStaffInput,
    facForDisable:
      activeTags?.facForDisable ?? activeTags?.facilitiesForDisabledInput,
    file: activeTags?.file,
    severage: activeTags?.severage,
    waterSupply: activeTags?.waterSupply,
  });
  const [selectedTab, setSelectedTab] = useState({
    id: 'mainfeatures',
    name: 'Main Features',
  });
  const {
    balloted,
    bbqArea,
    broadband,
    builtInYear,
    centerAc,
    centerHeat,
    comCenter,
    comGym,
    comLawn,
    comSwimingPool,
    dayCare,
    diningRoom,
    disFromAirport,
    doubleGlaz,
    drawingRoom,
    elect,
    electBackup,
    facForDisable,
    file,
    firtAid,
    flooring,
    floors,
    furnished,
    gym,
    interCom,
    jacuzzi,
    kitchen,
    laundryRoom,
    lawnGarden,
    lounge,
    mainStaaf,
    mosq,
    nearByMall,
    nearBySchool,
    nearbyHospital,
    nearbyRest,
    nearbyTrans,
    otherBusiness,
    otherCommunity,
    otherFac,
    otherMainFea,
    otherNearby,
    otherRooms,
    parkingSpac,
    parkingSpec,
    playArea,
    possession,
    powerRoom,
    prayerRoom,
    sateliite,
    sauna,
    securityStaff,
    servantQuat,
    severage,
    steamRoom,
    storeRoom,
    studyRoom,
    suiGas,
    swimingPool,
    view,
    wasteDisp,
    waterSupply,
  } = innerDataState;

  const updateState = data => setInnerDateState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => {
    updateState({ [key]: val });
  };

  const [firstHit, setFirstHit] = useState(false);

  const ArryView = ({ stateName, arryData }) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.modalScroll}
      >
        <MultiSelectButton
          items={arryData}
          selectedAlter={innerDataState[stateName] ?? null}
          isPrimaryColorStyle
          onSelectVal={(objId, item) => {
            onChangeVal([stateName], item);
          }}
        />
      </ScrollView>
    );
  };

  const CheckBoxView = ({ title, stateName }) => {
    return (
      <Touchable
        style={styles.checkBoxRow}
        onPress={() => onChangeVal([stateName], !innerDataState[stateName])}
      >
        <TextComponent
          text={title}
          family={'bold'}
          styles={styles.checkBoxText}
        />
        <Image
          source={innerDataState[stateName] ? checkBoxIcon : unChecked}
          resizeMode="contain"
          style={styles.checkBoxIcon}
        />
      </Touchable>
    );
  };

  const topBarArry = [
    { id: 'mainfeatures', name: 'Main Features' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'business&Communication', name: 'Description' },
    { id: 'Comunity&features', name: 'Comunity Features' },
    { id: 'healtcare&Recreational', name: 'Healtcare Recreational' },
    { id: 'nearbyLocation', name: 'Near By location and Other Facilities' },
    { id: 'OtherFacilites', name: 'Other Facilites' },
  ];

  return (
    <View style={styles.modalView}>
      <Modal
        isVisible={isModal}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        onBackButtonPress={
          firstHit && activeTags.length == 0 ? onPress : onBackPress
        }
        style={styles.bottomModal}
      >
        <View style={styles.modalOuterView}>
          <View
            style={{
              ...styles.modalData,
              paddingBottom: onPress ? hp('2') : 0,
            }}
          >
            <View style={styles.upperIconView}>
              <Image
                source={boldDivider}
                resizeMode="contain"
                style={styles.divider}
              />
              <Touchable onPress={() => onBackPress()}>
                <Image
                  source={crossWhite}
                  resizeMode="contain"
                  style={styles.cancelIcon}
                />
              </Touchable>
            </View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: hp('3') }}
            >
              <ScrollView
                contentContainerStyle={styles.topBarScroll}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <MultiSelectButton
                  items={topBarArry}
                  isPrimaryColorStyle
                  selectedAlter={selectedTab}
                  onSelectVal={(_, e) => setSelectedTab(e)}
                  btnStyle={styles.topBarBtn}
                />
              </ScrollView>

              {selectedTab?.id == topBarArry[0]?.id && (
                <>
                  <TextComponent
                    text={'Flooring'}
                    family={'bold'}
                    styles={styles.sectionTitle}
                  />
                  <ArryView
                    arryData={[
                      { id: 'Titles', name: 'Titles' },
                      { id: 'Marble', name: 'Marble' },
                      { id: 'Wooden', name: 'Wooden' },
                      { id: 'Chip', name: 'Chip' },
                      { id: 'Cement', name: 'Cement' },
                      { id: 'Other', name: 'Other' },
                    ]}
                    stateName={'flooring'}
                  />

                  <View style={styles.row}>
                    <TextComponent
                      text={'View'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={view}
                      onChangeText={e => onChangeVal('view', e)}
                    />
                  </View>

                  <View style={styles.row}>
                    <TextComponent
                      text={'Built In Year'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={builtInYear}
                      onChangeText={e => onChangeVal('builtInYear', e)}
                    />
                  </View>

                  <View style={styles.row}>
                    <TextComponent
                      text={'Floors'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={floors}
                      onChangeText={e => onChangeVal('floors', e)}
                    />
                  </View>

                  <CheckBoxView
                    title={'Central Air Conditioning'}
                    stateName={'centerAc'}
                  />
                  <CheckBoxView
                    title={'Waste Disposal'}
                    stateName={'wasteDisp'}
                  />

                  <TextComponent
                    text={'Electricity Backup'}
                    family={'bold'}
                    styles={styles.sectionTitle}
                  />
                  <ArryView
                    arryData={[
                      { id: 'None', name: 'None' },
                      { id: 'Generator', name: 'Generator' },
                      { id: 'Ups', name: 'Ups' },
                      { id: 'Solar', name: 'Solar' },
                      { id: 'Other', name: 'Other' },
                    ]}
                    stateName={'electBackup'}
                  />

                  <View style={styles.row}>
                    <TextComponent
                      text={'Other Main Features'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={otherMainFea}
                      onChangeText={e => onChangeVal('otherMainFea', e)}
                    />
                  </View>

                  <View style={styles.row}>
                    <TextComponent
                      text={'Parking Spaces'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={parkingSpec}
                      onChangeText={e => onChangeVal('parkingSpec', e)}
                    />
                  </View>

                  <CheckBoxView
                    title={'Double Glazed Windows'}
                    stateName={'doubleGlaz'}
                  />
                  <CheckBoxView
                    title={'Central Heating'}
                    stateName={'centerHeat'}
                  />
                  <CheckBoxView title={'Furnished'} stateName={'furnished'} />
                </>
              )}
              {selectedTab?.id == topBarArry[1]?.id && (
                <>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Other Rooms'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={otherRooms}
                      onChangeText={e => onChangeVal('otherRooms', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Kitchens'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={kitchen}
                      onChangeText={e => onChangeVal('kitchen', e)}
                    />
                  </View>
                  <CheckBoxView
                    title={'Drawing Room'}
                    stateName={'drawingRoom'}
                  />
                  <CheckBoxView title={'Study Room'} stateName={'studyRoom'} />
                  <CheckBoxView title={'Powder Room'} stateName={'powerRoom'} />
                  <CheckBoxView title={'Steam Room'} stateName={'steamRoom'} />
                  <CheckBoxView
                    title={'Laundry Room'}
                    stateName={'laundryRoom'}
                  />

                  <View style={styles.row}>
                    <TextComponent
                      text={'Servant Quarters'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={servantQuat}
                      onChangeText={e => onChangeVal('servantQuat', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Store Rooms'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={storeRoom}
                      onChangeText={e => onChangeVal('storeRoom', e)}
                    />
                  </View>
                  <CheckBoxView
                    title={'Dining Room'}
                    stateName={'diningRoom'}
                  />
                  <CheckBoxView
                    title={'Prayer Room'}
                    stateName={'prayerRoom'}
                  />
                  <CheckBoxView title={'GYM'} stateName={'gym'} />
                  <CheckBoxView
                    title={'Lounge or Sitting Room'}
                    stateName={'lounge'}
                  />
                </>
              )}
              {selectedTab?.id == topBarArry[2]?.id && (
                <>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Other Business and Communication Facilities'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                      numberOfLines={2}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={otherBusiness}
                      onChangeText={e => onChangeVal('otherBusiness', e)}
                    />
                  </View>
                  <CheckBoxView
                    title={'Satellite or Cable TV Ready'}
                    stateName={'sateliite'}
                  />
                  <CheckBoxView
                    title={'Broadband Internet Access'}
                    stateName={'broadband'}
                  />
                  <CheckBoxView title={'Intercom'} stateName={'interCom'} />
                </>
              )}
              {selectedTab?.id == topBarArry[3]?.id && (
                <>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Other Community Facilities'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={otherCommunity}
                      onChangeText={e => onChangeVal('otherCommunity', e)}
                    />
                  </View>
                  <CheckBoxView
                    title={'Community Swimming Pool'}
                    stateName={'comSwimingPool'}
                  />
                  <CheckBoxView
                    title={'First Aid or Medical Centre'}
                    stateName={'firtAid'}
                  />
                  <CheckBoxView
                    title={'Kids Play Area'}
                    stateName={'playArea'}
                  />
                  <CheckBoxView title={'Mosque'} stateName={'mosq'} />
                  <CheckBoxView
                    title={'Community Lawn or Garden'}
                    stateName={'comLawn'}
                  />
                  <CheckBoxView title={'Community Gym'} stateName={'comGym'} />
                  <CheckBoxView
                    title={'Day Care Centre'}
                    stateName={'dayCare'}
                  />
                  <CheckBoxView title={'Barbeque Area'} stateName={'bbqArea'} />
                  <CheckBoxView
                    title={'Community Center'}
                    stateName={'comCenter'}
                  />
                </>
              )}
              {selectedTab?.id == topBarArry[4]?.id && (
                <>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Parking Spaces'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput placeholder="0" style={styles.inputBox} />
                  </View>
                  <CheckBoxView
                    title={'Swimming Pool'}
                    stateName={'swimingPool'}
                  />
                  <CheckBoxView title={'Jacuzzi'} stateName={'jacuzzi'} />
                  <CheckBoxView
                    title={'Lawn or Garden'}
                    stateName={'lawnGarden'}
                  />
                  <CheckBoxView title={'Sauna'} stateName={'sauna'} />
                </>
              )}
              {selectedTab?.id == topBarArry[5]?.id && (
                <>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Nearby Schools'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={nearBySchool}
                      onChangeText={e => onChangeVal('nearBySchool', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Nearby Shopping Malls'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={nearByMall}
                      onChangeText={e => onChangeVal('nearByMall', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Distance From Airport (kms)'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={disFromAirport}
                      onChangeText={e => onChangeVal('disFromAirport', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Other Nearby Places'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={otherNearby}
                      onChangeText={e => onChangeVal('otherNearby', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Nearby Hospitals'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={nearbyHospital}
                      onChangeText={e => onChangeVal('nearbyHospital', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Nearby Restaurants'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={nearbyRest}
                      onChangeText={e => onChangeVal('nearbyRest', e)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Nearby Public Transport Service'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={nearbyTrans}
                      onChangeText={e => onChangeVal('nearbyTrans', e)}
                    />
                  </View>
                </>
              )}
              {selectedTab?.id == topBarArry[6]?.id && (
                <>
                  <View style={styles.row}>
                    <TextComponent
                      text={'Other Facilities'}
                      family={'bold'}
                      styles={styles.sectionTitle}
                    />
                    <TextInput
                      placeholder="0"
                      style={styles.inputBox}
                      value={otherFac}
                      onChangeText={e => onChangeVal('otherFac', e)}
                    />
                  </View>
                  <CheckBoxView
                    title={'Security Staff'}
                    stateName={'securityStaff'}
                  />
                  <CheckBoxView title={'Possession'} stateName={'possession'} />
                  <CheckBoxView title={'Balloted'} stateName={'balloted'} />
                  <CheckBoxView title={'Electricity'} stateName={'elect'} />
                  <CheckBoxView title={'Sui Gas'} stateName={'suiGas'} />
                  <CheckBoxView
                    title={'Maintenance Staff'}
                    stateName={'mainStaaf'}
                  />
                  <CheckBoxView
                    title={'Facilities for Disabled'}
                    stateName={'facForDisable'}
                  />
                  <CheckBoxView title={'File'} stateName={'file'} />
                  <CheckBoxView title={'Severage'} stateName={'severage'} />
                  <CheckBoxView
                    title={'Water Supply'}
                    stateName={'waterSupply'}
                  />
                </>
              )}
              {/* {onSelect && ( */}
              <ThemeButton
                title={'Save'}
                btnStyle={styles.modalBtn}
                onPress={() => {
                  onBackPress();
                  onSelect(innerDataState);
                }}
                isTheme
                textStyle={styles.saveBtnText}
              />
              {/* )} */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeaturesModalComp;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOuterView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalData: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 3,
    shadowRadius: 7.68,
    elevation: 20,
    width: wp('100'),
    paddingHorizontal: wp('5'),
    maxHeight: hp('95'),
    height: 'auto',
    alignSelf: 'center',
    marginBottom: hp('-2.5'),
  },
  upperIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  divider: { width: wp('15'), height: hp('5'), left: wp('40'), top: hp('1') },
  cancelIcon: {
    alignSelf: 'flex-end',
    tintColor: 'black',
    width: wp('5'),
    height: hp('2'),
  },
  modalScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp('90'),
  },
  topBarScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2'),
    overflow: 'scroll',
  },
  topBarBtn: {
    marginRight: wp('1'),
  },
  sectionTitle: {
    marginVertical: hp('2'),
    width: wp('35'),
    fontSize: hp('1.5'),
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
  },
  inputBox: {
    color: 'black',
    width: wp('45'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    fontSize: hp('1.5'),
    height: hp('4.5'),
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
  },
  checkBoxText: {
    marginVertical: hp('2'),
    fontSize: hp('1.5'),
    fontWeight: '600',
  },
  checkBoxIcon: {
    width: wp('5'),
    height: hp('4'),
  },
  modalBtn: {
    width: wp('90'),
    alignSelf: 'center',
    marginTop: hp('2'),
    marginBottom: hp('5'),
    height: hp('4'),
  },
  saveBtnText: {
    fontSize: hp('1.5'),
  },
});
