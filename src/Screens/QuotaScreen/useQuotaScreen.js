import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { quotaDataUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';

const useQuotaScreen = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['quotaData'],
    queryFn: () => API.get(quotaDataUrl),
  });
  const { getState } = useReduxStore();
  const { userData } = getState('Auth');
  return {
    quotaData: data?.data?.data,
    userData,
  };
};
export default useQuotaScreen;
