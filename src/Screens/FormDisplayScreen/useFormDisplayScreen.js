import { useMutation, useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import { AuthUrl } from '../../Utils/Urls';
import { errorMessage } from '../../Config/NotificationMessage';
import { useEffect, useState } from 'react';
import { formatDateToMDY } from '../../Services/GlobalFunctions';

const useFormDisplayScreen = () => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const currentDate = new Date();

  const [modalState, setModalState] = useState(null);

  const [apiAllData, setApiAllData] = useState({
    BoardMessage: [],
    EndDate: null,
    IssuetypeOptions: null,
    StartDate: null,
    SuppliersDetail: [],
    officeOptions: [],
    statusOptions: null,
    UserList: [],
  });
  const [apiFormData, setFormData] = useState({
    BoardMessage: null,
    IssuetypeOptions: null,
    SuppliersDetail: null,
    officeOptions: null,
    statusOptions: null,
    issueText: null,
    searchQuery: null,
    startDate: null,
    endDate: null,
    UserList: null,
  });

  const {
    BoardMessage,
    EndDate,
    IssuetypeOptions,
    StartDate,
    SuppliersDetail,
    officeOptions,
    statusOptions,
  } = apiAllData;

  const updateState = data => setFormData(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(AuthUrl, {
        rqst_ke_fntn_vl: 'issue_forum_parent_list_show',
        userLoginIDC: userData,
        userLoginToken: token,
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksdkkkkkkkkkkkk',
        data,
      );
      if (ok) {
        if (data?.data?.afterFirstQueries) {
          setApiAllData(prev => ({
            ...prev,
            BoardMessage: data?.data?.BoardMessage,
          }));
        } else setApiAllData(data?.data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  const onSearch = () => {
    console.log('kksdvnksndvnsdnvkds', {
      after_ftm_lg: 'afterFirstQueries',
      showParentIssueByStatusAjax: apiFormData?.statusOptions?.id ?? 5,
      // parentPostPagingAjax :"50",
      ViewByDatRangeStartDate: apiFormData?.startDate
        ? formatDateToMDY(apiFormData?.startDate)
        : apiAllData?.StartDate,
      ViewByDatRangeEndDate: apiFormData?.endDate
        ? formatDateToMDY(apiFormData?.endDate)
        : apiAllData?.EndDate,
      // OrdersPerPage => "2"
      ViewByissueTypeToSrch: apiFormData?.IssuetypeOptions?.id ?? null,
      ViewByissueInToSrch: apiFormData?.issueText ?? null,
      ViewBysrchInQueryToSrch: apiFormData?.searchQuery ?? null,
      ViewBysearchByOffice: apiFormData?.officeOptions?.id ?? null,
      ViewBySearchByPostedUSer: apiFormData?.UserList?.id ?? null,
      OrdersPerPage: 1,
    });

    mutate({
      after_ftm_lg: 'afterFirstQueries',
      showParentIssueByStatusAjax: apiFormData?.statusOptions?.id ?? 5,
      // parentPostPagingAjax :"50",
      ViewByDatRangeStartDate: apiFormData?.startDate
        ? formatDateToMDY(apiFormData?.startDate)
        : apiAllData?.StartDate,
      ViewByDatRangeEndDate: apiFormData?.endDate
        ? formatDateToMDY(apiFormData?.endDate)
        : apiAllData?.EndDate,
      // OrdersPerPage => "2"
      ViewByissueTypeToSrch: apiFormData?.IssuetypeOptions?.id ?? null,
      ViewByissueInToSrch: apiFormData?.issueText ?? null,
      ViewBysrchInQueryToSrch: apiFormData?.searchQuery ?? null,
      ViewBysearchByOffice: apiFormData?.officeOptions?.id ?? null,
      ViewBySearchByPostedUSer: apiFormData?.UserList?.id ?? null,
      OrdersPerPage: 1,
    });
  };
  useEffect(mutate, []);
  const arrySelector = {
    SuppliersDetail: SuppliersDetail,
    officeOptions: Object.entries(officeOptions ?? {}).map(([key, value]) => ({
      id: key,
      val: value,
    })),
    IssuetypeOptions: Object.entries(IssuetypeOptions ?? {}).map(
      ([key, value]) => ({
        id: key,
        val: value,
      }),
    ),
    UserList: apiAllData?.UserList,
    statusOptions: Object.entries(statusOptions ?? {}).map(([key, value]) => ({
      id: key,
      val: value,
    })),
  };

  const selectTag = {
    SuppliersDetail: apiFormData?.SuppliersDetail,
    officeOptions: apiFormData?.officeOptions,
    IssuetypeOptions: apiFormData?.IssuetypeOptions,
    statusOptions: apiFormData?.statusOptions,
    startDate: apiFormData?.startDate,
    endDate: apiFormData?.endDate,
    UserList: apiFormData?.UserList,
  };

  //    const { data, refetch, isLoading } = useQuery({
  //     queryKey: ['favByLocalId'],
  //     queryFn: () =>
  //       API.get(getFavByLocalIdUrl + removeArryAndReturnDirectUrl(favProjects)),
  //     refetchOnWindowFocus: true,
  //   });

  return {
    onChangeVal,
    onSearch,
    bottomDataArry: BoardMessage,
    selectTag,
    modalState,
    setModalState,
    arrySelector,
    apiFormData,
    currentDate,
    apiAllData,
  };
};
export default useFormDisplayScreen;
