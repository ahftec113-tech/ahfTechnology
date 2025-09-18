import { useState } from 'react';
import { getFbResult, logOutFirebase } from '../../Services/AuthServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import { loginUser, registerUser } from '../../Redux/Action/AuthAction';
import { loginThunk, updateProfileThunk } from '../../Redux/Saga/AuthSaga';

const { default: useFormHook } = require('../../Hooks/UseFormHooks');
const { default: Schemas } = require('../../Utils/Validation');

/**
 * The `useLogin` function is a custom hook in JavaScript that handles user login functionality,
 * including form validation, state management, and navigation.
 * @returns The `useLogin` function is returning an object with the following properties and methods:
 */
const useEditProfileScreen = ({ navigate, goBack }) => {
  const { handleSubmit, errors, reset, control, getValues } = useFormHook(
    Schemas.editProfile,
  );
  const { dispatch, getState } = useReduxStore();
  const { userData } = getState('Auth');
  console.log('ksdnvlsdnvnsdl;vnl;sdvn;lsd', userData);
  const [remember, setRemember] = useState(true);
  const rememberValue = () => {
    setRemember(!remember);
  };

  const socialLoginFun = type => {
    dispatch(updateProfileThunk({ type, datas: {} }));
  };

  const onPress = () => navigate('RegisterScreen');

  /**
   * The `loginUserFun` function dispatches an action to register a user with the provided email and
   * password.
   */
  const loginUserFun = ({ name, password, phone = '' }) => {
    console.log('ljksdbvklsdbvklsdbkvlsdklvklsdv', name, password);
    dispatch(updateProfileThunk({ name, pass: password ?? null, phone }));
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    PhoneNumberLoginFuc: () => {},
    remember,
    setRemember,
    rememberValue,
    onPress,
    profileUPdate: loginUserFun,
    socialLoginFun,
    userData,
  };
};

export default useEditProfileScreen;
