import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import { getFavByLocalIdUrl, getMyProjectUrl } from '../../Utils/Urls';
import { removeArryAndReturnDirectUrl } from '../../Services/GlobalFunctions';
import { useEffect, useState } from 'react';

const useMyProjectsScreen = ({ addListener }) => {
  const [statusValue, setStatusValue] = useState({
    id: 1,
  });
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['myProjects'],
    queryFn: async ({ pageParam = 1 }) => {
      //   setTimeout(() => {
      //     dispatch(loadingFalse());
      //   }, 100);
      return API.get(
        `${getMyProjectUrl}?status_id=${statusValue?.id}&page=${pageParam}&per_page=20`,
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (pages?.length ?? 0) + 1,
  });

  const list =
    data?.pages.flatMap(page => page.data?.data?.propertyListings) || [];

  // const { data, refetch, isLoading } = useQuery({
  //   queryKey: ['myProjects'],
  //   queryFn: () => API.get(getMyProjectUrl + `?status_id=${statusValue?.id}`),
  //   refetchOnWindowFocus: true,
  // });
  useEffect(() => {
    const event = addListener('focus', refetch);
    return event;
  });

  console.log(
    'datadatadatadatadatadatadatadatadatadatadata',
    data?.pages.flatMap(page => page.data?.data),
  );
  return {
    projectsList: list,
    refetch,
    isLoading,
    statusData: data?.pages.flatMap(page => page.data?.data)[0] ?? {},
    statusValue,
    setStatusValue,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  };
};

export default useMyProjectsScreen;
