import useReduxStore from '../../Hooks/UseReduxStore';

const useProfileScreen = () => {
  const { getState } = useReduxStore();
  const { userData } = getState('Auth');
  console.log('userDatauserDatauserDatauserDatauserData', userData);
  return { userData };
};
export default useProfileScreen;
