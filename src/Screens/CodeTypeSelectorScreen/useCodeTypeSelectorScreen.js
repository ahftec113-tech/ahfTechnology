import { arrRight } from '../../Assets';
import NavigationService from '../../Services/NavigationService';
import { Colors } from '../../Theme/Variables';

const useCodeTypeSelectorScreen = ({ navigate }, { params }) => {
  const title = {
    byBulk: 'Purchase Order By Order\n/Skus/PIDs',
    byDate: 'Purchase Order By\nOrder Date',
    orderDetail: 'Purchase Order Details',
  };

  const arryList = {
    byBulk: [
      {
        title: `Order`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `SKU`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `PID`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Purchase Order`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Customer Info`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
    ],
    byDate: [
      {
        title: `Purchase Order ID`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Order Code`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Supplier Name`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Tracking ID`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `SKU`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Style`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Size`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Color`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
    ],
    orderDetail: [
      {
        title: `Purchase Order Created`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
      {
        title: `Label generated`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () => NavigationService.navigate('TypeCodeScreen'),
      },
    ],
  };
  return {
    title: title[params?.moduleType],
    arryList: arryList[params?.moduleType],
  };
};
export default useCodeTypeSelectorScreen;
