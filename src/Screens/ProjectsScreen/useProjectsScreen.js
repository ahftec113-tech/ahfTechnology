import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { newProjectsUrl } from '../../Utils/Urls';

const useProjectsScreen = ({ navigate }, { params }) => {
  // const { data } = useQuery({
  //   queryKey: [params?.url],
  //   queryFn: () => API.get(params?.url),
  // });

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
    queryKey: ['newProjectsUrl'],
    queryFn: async ({ pageParam = 1 }) => {
      //   setTimeout(() => {
      //     dispatch(loadingFalse());
      //   }, 100);
      return API.get(`${newProjectsUrl}?page=${pageParam}&per_page=20`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (pages?.length ?? 0) + 1,
  });

  const list =
    data?.pages
      .flatMap(page => page.data?.data)
      .filter(res => res?.country_name != undefined) || [];

  console.log(
    'sdjjvblskdvbklsdbvksdbfsdffdsfdsklvbsdklvbdsklvbkldsvbkldvbkld',
    data?.pages.flatMap(page => page),
    `${params?.url}&per_page=${100}`,
    data?.pages,
  );

  return {
    propertyListing: list ?? [],
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isLoading,
    refetch,
  };
};

export default useProjectsScreen;
