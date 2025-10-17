import { View, Text, ScrollView } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import useListTableScreen from './useListTableScreen';
import { TextComponent } from '../../Components/TextComponent';

const ListTableScreen = ({ route }) => {
  const { headerArry, tableArryData } = useListTableScreen(route);
  return (
    <View>
      <HeaderComponent isBack headerTitle={''} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('40') }}
      >
        {tableArryData ? (
          tableArryData.map((order, orderIndex) => (
            <View key={orderIndex} style={styles.cardContainer}>
              {headerArry.map(
                (key, idx) =>
                  order[key] != null && (
                    <View key={idx} style={styles.totalsRow}>
                      <Text style={styles.totalsText}>{key}</Text>

                      <Text style={styles.totalsValue} numberOfLines={2}>
                        {order[key.replace('.', '')].toString() || ''}
                      </Text>
                    </View>
                  ),
              )}
            </View>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <TextComponent
              text={'No Data Found'}
              isThemeColor
              family={'bold'}
              size={'3'}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default memo(ListTableScreen);
