import { FlatList, Image, StyleSheet, View } from 'react-native';
import { hp, isIos, wp } from '../Hooks/useResponsive';
import IconBtnView from '../Components/IconBtnView';
import { Touchable } from '../Components/Touchable';
import DividerLine from '../Components/DividerLine';

export const MultiView = ({
  data,
  viewStyle,
  dividerStyles,
  rightTextStyles,
  titleStyles,
  leftStyles,
  rightStyles,
  isDivider,
  itemViewStyle,
}) => {
  const renderItem = ({ item }) => {
    return (
      <Touchable style={styles.listView} onPress={item?.onPress}>
        {/* {i > 0 && (
          <Image source={divider} resizeMode="contain" style={styles.divider} />
        )} */}
        <IconBtnView
          mainIcon={item.mainIcon}
          title={item?.title}
          leftIcon={item?.leftIcon}
          leftIconColor={item?.leftIconColor}
          rightIcon={item?.rightIcon}
          rightIconColor={item?.rightIconColor}
          rightText={item?.rightText}
          viewStyle={{ ...styles.innerView, ...itemViewStyle }}
          onPress={item?.onPress}
          rightTextStyles={item?.rightTextStyles ?? rightTextStyles}
          rightChilderView={item?.rightChilderView}
          textStyle={titleStyles}
          leftStyle={leftStyles}
          rightStyle={rightStyles}
          subView={item?.subView}
        />
      </Touchable>
    );
  };

  return (
    <View
      style={{
        ...styles.mainView,
        ...viewStyle,
        // borderWidth: data[0].leftIcon && 1,
      }}
    >
      <FlatList
        scrollEnabled={false}
        renderItem={renderItem}
        data={data ?? []}
        ItemSeparatorComponent={
          isDivider && (
            <DividerLine
              DividerLineStyle={{ ...styles.divider, ...dividerStyles }}
            />
          )
        }
      />
      {/* {data?.map((res, i) => {
        return (
          <Touchable style={styles.listView} onPress={res?.onPress}>
            {i > 0 && (
              <Image
                source={divider}
                resizeMode="contain"
                style={styles.divider}
              />
            )}
            <IconBtnView
              title={res?.title}
              leftIcon={res?.leftIcon}
              rightIcon={res?.rightIcon}
              rightText={res?.rightText}
              viewStyle={styles.innerView}
              onPress={res?.onPress}
            />
          </Touchable>
        );
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // alignItems: 'center',
    // flexDirection: 'row',
    // marginBottom: hp('2.5'),
    // width: wp('92'),
    // overflow: 'hidden',
    alignSelf: 'center',
    // paddingVertical: hp('2'),
    // marginTop: hp('3'),
    // justifyContent: 'space-between',
    // height: hp('50'),
    // paddingBottom: hp('2'),
  },
  listView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    // marginTop: hp('1.8'),
  },
  divider: {
    marginVertical: isIos ? hp('1') : hp('0'),
    width: wp('85'),
    marginBottom: isIos ? hp('1') : hp('2'),
  },
});