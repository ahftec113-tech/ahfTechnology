import { useCallback, useEffect, useState } from 'react';
import {
  addProjectUrl,
  getFilterAttibutesUrl,
  getMyProjectDetailUrl,
  getProjectDetailUrl,
  getSearchProjectsUrl,
  newAgentListUrl,
  updateProjectUrl,
} from '../../Utils/Urls';
import {
  formatKeyName,
  getFileExtension,
} from '../../Services/GlobalFunctions';
import API, { formDataFunc } from '../../Utils/helperFunc';
import { useQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';
import useReduxStore from '../../Hooks/UseReduxStore';
import { successMessage } from '../../Config/NotificationMessage';
import {
  addDraftProject,
  deleteDraftProject,
} from '../../Redux/Action/DraftAction';
import { addCopyProject } from '../../Redux/Action/CopyAction';

const useCreateListingScreen = ({ navigate, goBack }, { params }) => {
  const { getState, dispatch } = useReduxStore();
  const { userData } = getState('Auth');
  const { DraftAds } = getState('DraftAds');
  const { projectCopies } = getState('projectCopies');
  const { data, refetch } = useQuery({
    queryKey: ['filterattributes'],
    queryFn: () => API.get(getFilterAttibutesUrl),
  });

  const { data: eventDetail } = useQuery({
    queryKey: ['eventDetail'],
    queryFn: () => API.get(getMyProjectDetailUrl + params?.id),
    enabled: params?.isEdit,
  });

  useEffect(() => {
    if (params?.isEdit) {
      const projectData = eventDetail?.data?.data;
      console.log('lsjkdbvklsdbvkdsbkvbdsklvksdbvdslkvsd', projectData);
      setFilterSelectedVal({
        country: {
          id: projectData?.country_id,
          slug: projectData?.country_id,
          name: projectData?.country_name,
        },
        city: {
          id: projectData?.city,
          name: projectData?.city_name,
          slug: projectData?.city,
        },
        propertyType: {
          id: projectData?.property_type_id,
          name: projectData?.type,
        },
        area: {
          id: projectData?.area_id,
          name: projectData?.area_name,
        },
        bedRooms: {
          id: projectData?.total_bedrooms,
          name: projectData?.total_bedrooms,
        },
        bathRoom: {
          id: projectData?.total_bathrooms,
          name: projectData?.total_bathrooms,
        },
        subChildArea: {
          id: projectData?.sub_child_area_id,
          name: projectData?.sub_child_area_name,
        },
        subArea: {
          id: projectData?.sub_area_id,
          name: projectData?.sub_area_name,
        },
        minPrice: projectData?.price,
        areaRange,
        minArea: projectData?.area,
        maxArea: 4000,
        type: {
          id: projectData?.purpose_id,
          name: projectData?.purpose,
        },
        AreaUnits: { id: projectData?.area_type, name: projectData?.area_type },
        images:
          projectData?.images &&
          projectData?.images?.map(res => ({
            uri: res,
            type: `image/${getFileExtension(res)}`,
            name: res.split('/').pop(),
            isEdit: true,
          })),
        amenitiesData: projectData?.feature_amenitie,
        isInstallment: projectData?.is_installment_avail == 1 ? true : false,
        readyForPossession: projectData?.is_ready_possess == 1 ? true : false,
        title: projectData?.project_name,
        description: projectData?.detail,
        propertyVideoLink: projectData?.video_link,
        propertyBlueprint: null,
        locationSearchInput: projectData?.exact_location_of_the_project,
        email: projectData?.email,
        phone1: projectData?.phone_1,
        phone2: projectData?.phone_2,
        contactPersonName: projectData?.contact_person,
        estateLogo: null,
        // businessName: projectData?.real_estate_name,
        locationSearchInput: projectData?.map_url,
        bannerImg: 0,
        businessName: {
          agency_name: projectData?.real_estate_name,
          agency_logo: projectData?.real_estate_logo,
        },
      });
    } else if (params?.isDraft) {
      const draftAd = DraftAds.find(res => res?.id == params?.id);

      setFilterSelectedVal({ ...draftAd, bannerImg: 0 });
    } else if (params?.isSaved) {
      const savedAd = projectCopies.find(res => res?.id == params?.id);

      setFilterSelectedVal({ ...savedAd, bannerImg: 0 });
    }
  }, [eventDetail]);

  useEffect(() => {
    return () => {
      setFilterSelectedVal(initialFilterState);
    };
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalStateFilter, setModalStateFilter] = useState(null);
  const MIN_PRICE = 0;
  const MAX_PRICE = 100000000;

  const MIN_AREA = 0;
  const MAX_AREA = 4000;

  const initialFilterState = {
    country: {
      id: 1,
      name: 'Pakistan',
      slug: 'pakistan',
    },
    city: {
      id: 2,
      name: 'Karachi',
      slug: 'karachi',
    },
    type: null,
    area: null,
    bedRooms: null,
    bathRoom: null,
    subChildArea: null,
    subArea: null,
    minPrice: null,
    maxPrice: 100000000,
    areaRange,
    minArea: null,
    maxArea: 4000,
    propertyType: null,
    AreaUnits: null,
    images: [],
    amenitiesData: null,
    isInstallment: false,
    readyForPossession: false,
    title: null,
    description: null,
    propertyVideoLink: null,
    propertyBlueprint: null,
    locationSearchInput: null,
    email: null,
    phone1: null,
    phone2: null,
    contactPersonName: null,
    estateLogo: null,
    businessName: null,
    bannerImg: 0,
  };

  const validateFilterState = filterState => {
    const errors = [];

    // Validate country
    if (!filterState.country) {
      errors.push('Country is required and must have a valid name.');
    }

    // Validate city
    if (!filterState.city) {
      errors.push('City is required and must have a valid name.');
    }

    // Validate type
    if (!filterState.type) {
      errors.push('Purpose type is required.');
    }

    // Validate area
    if (!filterState.area) {
      errors.push('Area is required.');
    }

    // Validate bedrooms
    if (!filterState.bedRooms) {
      errors.push('Number of bedrooms required.');
    }

    // Validate bathrooms
    if (!filterState.bathRoom) {
      errors.push('Number of bathrooms required.');
    }

    // Validate minPrice and maxPrice
    if (!filterState.minPrice || filterState.minPrice < 0) {
      errors.push('Property price is required.');
    }

    // Validate minArea and maxArea
    if (filterState.minArea && filterState.minArea < 0) {
      errors.push('Property area is required.');
    }

    // Validate propertyType
    if (!filterState.propertyType) {
      errors.push('Property type is required.');
    }

    // Validate AreaUnits
    if (!filterState.AreaUnits) {
      errors.push('Area units are required.');
    }

    // Validate images
    if (!filterState.images || filterState.images.length === 0) {
      errors.push('At least one image is required.');
    }
    // Validate images
    if (!filterState.bannerImg == null) {
      errors.push('Please select main image.');
    }

    // Validate title
    if (
      !filterState.title ||
      typeof filterState.title !== 'string' ||
      filterState.title.trim() === ''
    ) {
      errors.push('Property title is required and must be a non-empty string.');
    }

    // Validate description
    if (
      !filterState.description ||
      typeof filterState.description !== 'string' ||
      filterState.description.trim() === ''
    ) {
      errors.push('Description is required.');
    }

    // If there are errors, show them in an alert
    if (errors.length > 0) {
      Alert.alert(
        'Validation Errors',
        errors.join('\n\n'),
        [{ text: 'OK', onPress: () => console.log('Alert closed') }],
        { cancelable: false },
      );
      return false;
    }

    return true;
  };

  const [filterSelectedVal, setFilterSelectedVal] =
    useState(initialFilterState);
  const {
    area,
    bathRoom,
    bedRooms,
    country,
    city,
    type,
    subChildArea,
    subArea,
    minPrice,
    maxPrice,
    areaRange,
    minArea,
    maxArea,
    propertyType,
    AreaUnits,
    images,
    amenitiesData,
    isInstallment,
    readyForPossession,
    title,
    description,
    propertyVideoLink,
    propertyBlueprint,
    locationSearchInput,
    businessName,
    email,
    phone1,
    phone2,
    contactPersonName,
    estateLogo,
    bannerImg,
  } = filterSelectedVal;

  console.log(
    'businessNamebusinessNamebusinessNamebusinessNamebusinessName',
    businessName,
  );

  const updateState = data =>
    setFilterSelectedVal(prev => ({ ...prev, ...data }));
  const onChangeVal = (key, val) => updateState({ [key]: val });

  const handleValueChange = useCallback((newLow, newHigh) => {
    onChangeVal('minPrice', newLow);
    onChangeVal('maxPrice', newHigh);
  }, []);
  const handleValueChangeOfArea = useCallback((newLow, newHigh) => {
    onChangeVal('minArea', newLow);
    onChangeVal('maxArea', newHigh);
  }, []);

  const [disableRange, setDisableRange] = useState(false);
  const handleToggle = () => {
    setDisableRange(prev => !prev);
  };

  function getFileNameFromPath(path) {
    if (!path) return '';
    return path.substring(path.lastIndexOf('/') + 1);
  }

  const createPorject = async (isDraft, isCopy) => {
    console.log('saascascascacacsalksdnvklsdnklvnsdlkvnkdss');
    const body = {
      CountrySearchInput: country?.id,
      citySearchInput: city?.id,
      areaSearchInput: area?.id,
      subAreaSearchInput: subArea?.id,
      locationSearchInput,

      areaUnitInput: minArea,
      areaUnitSelect: AreaUnits?.id,
      priceInput: minPrice,
      adTitle: title,
      adDescription: description,
      contactEmail: email ?? businessName?.email ?? userData?.email,
      contactPhone1: phone1 ?? businessName?.phoneNum1 ?? userData?.phone,
      contactPhone2: phone2 ?? businessName?.phoneNum2 ?? userData?.phone,
      realEstateName:
        contactPersonName ?? businessName?.agency_name ?? userData?.name,
      realEstateLogo: getFileNameFromPath(businessName?.agency_logo),

      flooringSelect: amenitiesData?.flooring?.id,
      electricityBackupSelect: amenitiesData?.electBackup?.id,
      viewInput: amenitiesData?.view,
      otherMainFeaturesInput: amenitiesData?.otherMainFea,
      buildtInYearInput: amenitiesData?.builtInYear,
      parkingSpacesInput: amenitiesData?.parkingSpec,
      floorsInput: amenitiesData?.floors,

      doubleGlazedWindowsInput: amenitiesData?.doubleGlaz ? 'on' : null,
      centralAirContionInput: amenitiesData?.centerAc ? 'on' : null,
      centralHeatingInput: amenitiesData?.centerHeat ? 'on' : null,
      wasteDisposalInput: amenitiesData?.wasteDisp ? 'on' : null,
      furnishedInput: amenitiesData?.furnished ? 'on' : null,

      otherRoomsInput: amenitiesData?.otherRooms,
      bedroomsInput: bedRooms?.id,
      bathroomsInput: bathRoom?.id,
      servantQuartersInput: amenitiesData?.servantQuat,
      kitchensInput: amenitiesData?.kitchen,
      storeRoomInput: amenitiesData?.storeRoom,
      drawingRoomInput: amenitiesData?.drawingRoom ? 'on' : null,
      diningRoomInput: amenitiesData?.diningRoom ? 'on' : null,
      studyRoomInput: amenitiesData?.studyRoom ? 'on' : null,
      prayerRoomInput: amenitiesData?.prayerRoom ? 'on' : null,
      powderRoomInput: amenitiesData?.powerRoom ? 'on' : null,
      gymInput: amenitiesData?.gym ? 'on' : null,
      steamRoomInput: amenitiesData?.steamRoom ? 'on' : null,
      loungeOrSittingRoomInput: amenitiesData?.lounge ? 'on' : null,
      laundryRoomInput: amenitiesData?.laundryRoom ? 'on' : null,

      otherBusinessAndCommuncationFacilitiesInput: amenitiesData?.otherBusiness,
      broadbandInternetAccessInput: amenitiesData?.broadband ? 'on' : null,
      satelliteOrCableTvReadyInput: amenitiesData?.sateliite ? 'on' : null,
      intercomInput: amenitiesData?.interCom ? 'on' : null,

      otherCommunityFacilitiesInput: amenitiesData?.otherCommunity,
      communityLawnOrGardenInput: amenitiesData?.comLawn ? 'on' : null,
      communitySwimmingPoolInput: amenitiesData?.comSwimingPool ? 'on' : null,
      communityGymInput: amenitiesData?.comGym ? 'on' : null,
      firstAidOrMedicalCentreInput: amenitiesData?.firtAid ? 'on' : null,
      dayCareCenterInput: amenitiesData?.dayCare ? 'on' : null,
      kidsPlayAreaInput: amenitiesData?.playArea ? 'on' : null,
      barbequeAreaInput: amenitiesData?.bbqArea ? 'on' : null,
      mosqueInput: amenitiesData?.mosq ? 'on' : null,
      communityCentreInput: amenitiesData?.comCenter ? 'on' : null,

      otherHealthcareAndRecreationFacilitiesInput: amenitiesData?.otherFac,
      lawnOrGardenInput: amenitiesData?.lawnGarden ? 'on' : null,
      swimmingPoolInput: amenitiesData?.swimingPool ? 'on' : null,
      saunaInput: amenitiesData?.sauna ? 'on' : null,
      jacuzziInput: amenitiesData?.jacuzzi ? 'on' : null,

      nearbySchoolsInput: amenitiesData?.nearBySchool,
      nearbyHospitalsInput: amenitiesData?.nearbyHospital,
      nearbyShoppingMallsInput: amenitiesData?.nearByMall,
      nearbyRestaurantInput: amenitiesData?.nearbyRest,
      distanceFromAirportInput: amenitiesData?.disFromAirport,
      nearbyPublicTransportServiceInput: amenitiesData?.nearbyTrans,
      otherNearbyPlacesInput: amenitiesData?.otherNearby,

      otherFacilitiesInput: amenitiesData?.otherFac,
      maintenanceStaffInput: amenitiesData?.mainStaaf ? 'on' : null,
      securityStaffInput: amenitiesData?.securityStaff ? 'on' : null,
      facilitiesForDisabledInput: amenitiesData?.facForDisable ? 'on' : null,

      propertyListingPurpose: type?.id,
      propertyListingType: propertyType?.id,
      propertyListingBedrooms: bedRooms?.id,
      propertyListingBathrooms: bathRoom?.id,
      propertyBlueprint: propertyBlueprint,
      propertyImageInput: images.filter(res => !res?.isEdit),

      installmnentAvailable: isInstallment ? 1 : 0,
      possessionReady: readyForPossession ? 1 : 0,
      propertyVideoLink,
      propertyBlueprint,
      editPropertyImageInput: images
        .filter(res => res?.isEdit)
        .map(res => res?.uri),
      editMainImage: images[bannerImg]?.uri,
    };
    const isValid = validateFilterState(filterSelectedVal);
    if (isValid) {
      if (isDraft) {
        dispatch(addDraftProject({ ...body, ...filterSelectedVal }));
        successMessage('Changes saved');
        if (!params?.isDraft) setFilterSelectedVal(initialFilterState);
      } else if (isCopy) {
        // dispatch(addCopyProject({ ...body, ...filterSelectedVal }));
        dispatch(addDraftProject({ ...body, ...filterSelectedVal }));
        setFilterSelectedVal({
          ...filterSelectedVal,
          adTitle: null,
          title: null,
        });
        successMessage('Copied created successfully');
      } else {
        const { ok, data } = await formDataFunc(
          params?.isEdit ? updateProjectUrl + params?.id : addProjectUrl,
          body,
          'propertyImageInput',
          true,
        );
        console.log('API Response:', data);

        if (data?.exception != 'Error' && ok) {
          setFilterSelectedVal(initialFilterState);

          successMessage(
            `${params?.isEdit ? 'Update' : 'Created'} successfully`,
          );
          if (params?.isEdit || params?.isDraft) {
            goBack();
            dispatch(deleteDraftProject(body?.id ?? filterSelectedVal?.id));
          }
        }
      }
    }
  };

  const resetAll = () => {};
  const arrySelector = {
    1: data?.data?.data?.AreaUnits,
  };

  const selectTag = {
    1: AreaUnits,
  };

  return {
    onChangeVal,
    area,
    bathRoom,
    bedRooms,
    country,
    city,
    type,
    disableRange,
    handleValueChange,
    handleToggle,
    subChildArea,
    subArea,
    minPrice,
    maxPrice,
    MIN_PRICE,
    MAX_PRICE,
    areaRange,
    minArea,
    maxArea,
    MIN_AREA,
    MAX_AREA,
    handleValueChangeOfArea,
    onSearchFilter: createPorject,
    amenitiesData,
    setModalVisible,
    modalVisible,
    resetAll,
    modalState,
    setModalState,
    arrySelector,
    selectTag,
    attributesData: data?.data?.data,
    propertyType,
    AreaUnits,
    setModalStateFilter,
    modalStateFilter,
    images,
    isInstallment,
    readyForPossession,
    title,
    description,
    propertyVideoLink,
    propertyBlueprint,
    locationSearchInput,
    businessName,
    email,
    phone1,
    phone2,
    contactPersonName,
    estateLogo,
    userData,
    isEdit: params?.isEdit,
    isDraft: params?.isDraft,
    dispatch,
    bannerImg,
    isCopy: params?.isSaved,
  };
};
export default useCreateListingScreen;
