import { Linking } from 'react-native';
import {
  aboutGray,
  callGray,
  draftGray,
  edit2,
  heartGray,
  homeGray,
  logOutGray,
  profile,
  ProfileGray,
  quotaGray,
  saveGray,
  settingGray,
  termGray,
} from '../Assets';
import NavigationService from '../Services/NavigationService';
import { aboutUrl, privacyUrl } from './Urls';
import { store } from '../Redux/Reducer';
import { logOutAuth, logOutUser } from '../Redux/Action/AuthAction';

export const sizes = [
  { id: 1, sqYd: 120 },
  { id: 2, sqYd: 250 },
  { id: 3, sqYd: 500 },
];
export const bedroomsArry = [
  { id: 'All', label: 'All' },
  { id: 'studio', label: 'studio' },
  { id: 1, label: 1 },
  { id: 2, label: 2 },
  { id: 3, label: 3 },
  { id: 4, label: 4 },
  { id: 5, label: 5 },
  { id: 6, label: 6 },
  { id: 7, label: 7 },
  { id: 8, label: 8 },
  { id: 9, label: 9 },
  { id: '10+', label: '10+' },
];
export const bathroomsArry = [
  { id: 'All', label: 'All' },
  { id: 1, label: 1 },
  { id: 2, label: 2 },
  { id: 3, label: 3 },
];
export const profilesBtn = [
  {
    id: 1,
    label: 'Edit Profile',
    icon: ProfileGray,
    onPress: () => NavigationService.navigate('EditProfileScreen'),
  },
  {
    id: 2,
    label: 'Favorites',
    icon: heartGray,
    onPress: () => NavigationService.navigate('FavorateScreen'),
  },
  {
    id: 3,
    label: 'Drafts',
    icon: draftGray,
    onPress: () => NavigationService.navigate('DraftAdScreen'),
  },
  {
    id: 5,
    label: 'My Quota & Credits',
    icon: quotaGray,
    onPress: () => NavigationService.navigate('QuotaScreen'),
  },
  {
    id: 5,
    label: 'Saved Ads',
    icon: saveGray,
    onPress: () => NavigationService.navigate('SavedAdsScreen'),
  },
];
export const profilesBottomBtn = [
  {
    id: 1,
    label: 'Invite Friends',
    icon: saveGray,
    onPress: () => Linking.openURL('https://www.realstateshop.com/'),
  },
  {
    id: 4,
    label: 'About Us',
    icon: aboutGray,
    onPress: () => Linking.openURL(aboutUrl),
  },
  {
    id: 4,
    label: 'Terms & Privacy',
    icon: termGray,
    onPress: () => Linking.openURL(privacyUrl),
  },
  {
    id: 5,
    label: 'Log Out',
    icon: logOutGray,
    onPress: () => store.dispatch(logOutAuth()),
  },
  // { id: 6, label: 'Settings', icon: settingGray },
];

export const orders = [
  {
    POID: '38445',
    OCode: '112-9313437-9389018',
    OdQty: '1',
    SpQty: '1',
    PkgTracking: '1Z3861340315132373',
    TrackingID: '9400150899560068543934',
    FLBy: 'ByPO',
    Sku: '6137-WTBK-S',
    UPC: '052987065732',
    Style: '6137',
    Size: 'S',
    Color: 'White/Black',
    OrderStatus: 'Shipped',
    POCreated: '8/27/2025',
    OrderDate: '8/26/2025',
  },
  {
    POID: '38445',
    OCode: '112-9313437-9389018',
    OdQty: '1',
    SpQty: '1',
    PkgTracking: '1Z3861340315132373',
    TrackingID: '9400150899560068543934',
    FLBy: 'ByPO',
    Sku: '6137-VRDW-S',
    UPC: '052987046298',
    Style: '6137',
    Size: 'S',
    Color: 'Vintage Red/Blended White',
    OrderStatus: 'Shipped',
    POCreated: '8/27/2025',
    OrderDate: '8/26/2025',
  },
];

export const orderDetail = {
  orderCode: '112-9313437-9389018',
  note: 'Print Sent By: Hafeez Zeeshan And Print Sent Date: 2025-08-29 09:28:10',
  generalInfo: {
    channelName: 'Amazon',
    shippingService: 'FreeEconomy',
    orderDate: '8/26/2025',
    isPrime: 'No',
    totalWeight: '7.04 (oz)',
  },
  customerInfo: {
    name: 'Sheema Razvi',
    address: '25012 VERMETTE RD, PLAINFIELD, IL, 60585-7735',
    phone: '+1 207-835-4259 ext. 60134',
    deliveryDate: 'Sep 05, 2025',
    earliestShipDate: 'Aug 27, 2025',
    latestShipDate: 'Aug 28, 2025',
  },
  products: [
    {
      prodName: 'YOUTH FOOTBALL TEE 6137, White/Black, S',
      supplier: 'LAT Apparel',
      brand: 'LAT',
      ordQty: 1,
      shipQty: 1,
      itemCost: 5.48,
      itemPrice: 9.8,
      pkgTracking: '1Z3861340315132373',
      postBkTracking: '9400150899560068543934',
      poid: '38445',
      poCreatedDate: '8/27/2025',
      status: 'Shipped',
      slipGenerated: 'Yes',
    },
    {
      prodName: 'YOUTH FOOTBALL TEE 6137, Vintage Red/Blended White, S',
      supplier: 'LAT Apparel',
      brand: 'LAT',
      ordQty: 1,
      shipQty: 1,
      itemCost: 5.48,
      itemPrice: 9.8,
      pkgTracking: '1Z3861340315132373',
      postBkTracking: '9400150899560068543934',
      poid: '38445',
      poCreatedDate: '8/27/2025',
      status: 'Shipped',
      slipGenerated: 'Yes',
    },
  ],
  totals: {
    itemTotalCost: 10.96,
    shippingCost: 3.59,
    taxCost: 0,
    orderTotalCost: 14.55,
    itemTotalSelling: 19.6,
    shippingCharges: 0,
    tax: 1.66,
    orderTotalSelling: 21.26,
  },
};
