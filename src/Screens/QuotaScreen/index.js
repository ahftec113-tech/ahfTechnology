import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { styles } from './styles';
import { wp } from '../../Hooks/useResponsive';
import { HeaderComponent } from '../../Components/HeaderComp';
import useQuotaScreen from './useQuotaScreen';
import { getUsedPercentage } from '../../Services/GlobalFunctions';
const QuotaScreen = () => {
  const { quotaData, userData } = useQuotaScreen();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: wp('4') }}
    >
      {/* Header */}
      <HeaderComponent headerTitle={'My Quota & Credits'} isBack />

      {/* User Info */}
      <View style={styles.profileContainer}>
        <View>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.subText}></Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {quotaData?.subcribedPackageName ?? 'Basic'}
            </Text>
          </View>
        </View>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.avatar}
        />
      </View>

      {/* Listing Quota */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ads Listing</Text>
          {/* <TouchableOpacity>
            <Text style={styles.link}>Learn More</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${getUsedPercentage(
                    quotaData?.subscribedPackageDetail?.ads_listing_allowed,
                    quotaData?.subscribedPackageDetail?.ads_listing_used,
                  )}%`,
                },
              ]}
            />
            <Text style={styles.progressText}>
              {getUsedPercentage(
                quotaData?.subscribedPackageDetail?.ads_listing_allowed,
                quotaData?.subscribedPackageDetail?.ads_listing_used,
              )}
              %
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.dotGreen} />
            <Text style={styles.legendText}>Used</Text>
            <View style={styles.dotGray} />
            <Text style={styles.legendText}>Availabe</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hot Credits</Text>
          {/* <TouchableOpacity>
            <Text style={styles.link}>Learn More</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${getUsedPercentage(
                    quotaData?.subscribedPackageDetail?.hot_credits_allowed,
                    quotaData?.subscribedPackageDetail?.hot_credits_used,
                  )}%`,
                },
              ]}
            />
            <Text style={styles.progressText}>
              {' '}
              {getUsedPercentage(
                quotaData?.subscribedPackageDetail?.hot_credits_allowed,
                quotaData?.subscribedPackageDetail?.hot_credits_used,
              )}
              %
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.dotGreen} />
            <Text style={styles.legendText}>Used</Text>
            <View style={styles.dotGray} />
            <Text style={styles.legendText}>Availabe</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monthly Booster</Text>
          {/* <TouchableOpacity>
            <Text style={styles.link}>Learn More</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${getUsedPercentage(
                    quotaData?.subscribedPackageDetail?.monthly_booster_allowed,
                    quotaData?.subscribedPackageDetail?.monthly_booster_used,
                  )}%`,
                },
              ]}
            />
            <Text style={styles.progressText}>
              {' '}
              {getUsedPercentage(
                quotaData?.subscribedPackageDetail?.monthly_booster_allowed,
                quotaData?.subscribedPackageDetail?.monthly_booster_used,
              )}
              %
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.dotGreen} />
            <Text style={styles.legendText}>Used</Text>
            <View style={styles.dotGray} />
            <Text style={styles.legendText}>Availabe</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Refresh Credits</Text>
          {/* <TouchableOpacity>
            <Text style={styles.link}>Learn More</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${getUsedPercentage(
                    quotaData?.subscribedPackageDetail?.refresh_credits_allowed,
                    quotaData?.subscribedPackageDetail?.refresh_credits_used,
                  )}%`,
                },
              ]}
            />
            <Text style={styles.progressText}>
              {' '}
              {getUsedPercentage(
                quotaData?.subscribedPackageDetail?.refresh_credits_allowed,
                quotaData?.subscribedPackageDetail?.refresh_credits_used,
              )}
              %
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.dotGreen} />
            <Text style={styles.legendText}>Used</Text>
            <View style={styles.dotGray} />
            <Text style={styles.legendText}>Availabe</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Booster</Text>
          {/* <TouchableOpacity>
            <Text style={styles.link}>Learn More</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${getUsedPercentage(
                    quotaData?.subscribedPackageDetail?.weekly_booster_allowed,
                    quotaData?.subscribedPackageDetail?.weekly_booster_used,
                  )}%`,
                },
              ]}
            />
            <Text style={styles.progressText}>
              {' '}
              {getUsedPercentage(
                quotaData?.subscribedPackageDetail?.weekly_booster_allowed,
                quotaData?.subscribedPackageDetail?.weekly_booster_used,
              )}
              %
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.dotGreen} />
            <Text style={styles.legendText}>Used</Text>
            <View style={styles.dotGray} />
            <Text style={styles.legendText}>Availabe</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Super Hot Credits</Text>
          {/* <TouchableOpacity>
            <Text style={styles.link}>Learn More</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${getUsedPercentage(
                    quotaData?.subscribedPackageDetail
                      ?.super_hot_credits_allowed,
                    quotaData?.subscribedPackageDetail?.super_hot_credits_used,
                  )}%`,
                },
              ]}
            />
            <Text style={styles.progressText}>
              {' '}
              {getUsedPercentage(
                quotaData?.subscribedPackageDetail?.super_hot_credits_allowed,
                quotaData?.subscribedPackageDetail?.super_hot_credits_used,
              )}
              %
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.dotGreen} />
            <Text style={styles.legendText}>Used</Text>
            <View style={styles.dotGray} />
            <Text style={styles.legendText}>Availabe</Text>
          </View>
        </View>
      </View>

      {/* Upgrade Credits */}
    </ScrollView>
  );
};

export default memo(QuotaScreen);

//   {[1, 2].map((_, index) => (
//     <View key={index} style={styles.section}>
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Upgrade Credits</Text>
//         {/* <TouchableOpacity>
//           <Text style={styles.link}>Learn More</Text>
//         </TouchableOpacity> */}
//       </View>
//       <View style={styles.tag}>
//         <Text style={styles.tagText}>Superhot Credits</Text>
//       </View>
//       <View style={styles.progressContainer}>
//         <View style={styles.progressBackground}>
//           <View style={[styles.progressFill, { width: '0%' }]} />
//           <Text style={styles.progressText}>0%</Text>
//         </View>
//         <View style={styles.legend}>
//           <View style={styles.dotGreen} />
//           <Text style={styles.legendText}>Available</Text>
//           <View style={styles.dotGray} />
//           <Text style={styles.legendText}>Used</Text>
//         </View>
//       </View>
//     </View>
//   ))}
