import { arrRight } from '../../Assets';
import NavigationService from '../../Services/NavigationService';
import { Colors } from '../../Theme/Variables';

const useCodeTypeSelectorScreen = ({ navigate }, { params }) => {
  const title = {
    byBulk: 'Show Orders And\nPurchase Orders',
    byDate: 'Purchase Order By\nOrder Date',
    orderDetail: 'Purchase Order Details',
  };

  const arryList = {
    byBulk: [
      {
        title: `Order`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () =>
          NavigationService.navigate('TypeCodeScreen', {
            type: 'order_code',
            title: title[params?.moduleType],
          }),
      },
      {
        title: `Purchase Order`,
        rightIcon: arrRight,
        rightIconColor: Colors.black,
        onPress: () =>
          NavigationService.navigate('TypeCodeScreen', {
            type: 'purchase_order_id',
            title: title[params?.moduleType],
          }),
      },
    ],
    byDate: [
      {
        title: `Purchase Order ID`,
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
