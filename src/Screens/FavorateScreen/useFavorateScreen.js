import { useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { getFavByLocalIdUrl } from '../../Utils/Urls';
import { removeArryAndReturnDirectUrl } from '../../Services/GlobalFunctions';
import { useEffect } from 'react';

const useFavorateScreen = ({ addListener }) => {
  const { getState } = useReduxStore();

  const { favProjects } = getState('favProjects');
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['favByLocalId'],
    queryFn: () =>
      API.get(getFavByLocalIdUrl + removeArryAndReturnDirectUrl(favProjects)),
    refetchOnWindowFocus: true,
  });
  useEffect(() => {
    const event = addListener('focus', refetch);
    return event;
  });

  return {
    favList: data?.data?.data,
    refetch,
    isLoading,
  };
};

export default useFavorateScreen;
