import { View, Text, FlatList } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import useCodeTypeSelectorScreen from './useCodeTypeSelectorScreen';
import { keyExtractor } from '../../Utils';
import { MultiView } from '../../Components/MultiView';
import { arrRight, userEdit } from '../../Assets';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

const CodeTypeSelectorScreen = ({ navigation, route }) => {
  const { title, arryList } = useCodeTypeSelectorScreen(navigation, route);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={title} numberOfLines={2} isBack />
      <MultiView
        data={arryList}
        isDivider
        viewStyle={{
          alignSelf: 'center',
          width: wp('95'),
          marginTop: hp('2'),
          //   backgroundColor: 'red',
        }}
        dividerStyles={{ width: wp('100'), marginTop: hp('2') }}
        titleStyles={{ width: wp('88'), fontSize: hp('3'), fontWeight: '300' }}
        rightStyles={{ width: wp('5'), height: hp('3') }}
      />
    </View>
  );
};

export default memo(CodeTypeSelectorScreen);
