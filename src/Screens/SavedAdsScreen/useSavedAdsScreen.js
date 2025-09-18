import { useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { getFavByLocalIdUrl, getMyProjectUrl } from '../../Utils/Urls';
import { removeArryAndReturnDirectUrl } from '../../Services/GlobalFunctions';
import { useEffect } from 'react';

const useSavedAdsScreen = ({ addListener }) => {
  const { getState } = useReduxStore();
  const { projectCopies } = getState('projectCopies');
  console.log(
    'DraftAdsDraftAdsDraftAdsDraftAdsDraftAdsDraftAdsDraftAds',
    projectCopies,
  );

  // const

  return {
    projectsList: projectCopies ?? [],
  };
};

export default useSavedAdsScreen;
