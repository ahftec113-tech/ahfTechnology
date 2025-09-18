import { useCallback, useState } from 'react';
import { getFilterAttibutesUrl, getSearchProjectsUrl } from '../../Utils/Urls';
import {
  formatKeyName,
  formatPrice,
  formatPriceToPKStandard,
} from '../../Services/GlobalFunctions';
import API from '../../Utils/helperFunc';
import { useQuery } from '@tanstack/react-query';

const useFilterScreen = ({ navigate }, { params }) => {
  const { selectedCountry, selectedCity, selectedArea, selectedType } = params;

  const { data, refetch } = useQuery({
    queryKey: ['filterattributes'],
    queryFn: () => API.get(getFilterAttibutesUrl),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalStateFilter, setModalStateFilter] = useState(null);
  const MIN_PRICE = 0;
  const MAX_PRICE = 100000000;

  const MIN_AREA = 0;
  const MAX_AREA = 4000;

  const initialFilterState = {
    country: selectedCountry?.id
      ? selectedCountry
      : {
          id: 1,
          name: 'Pakistan',
          slug: 'pakistan',
        },
    city: selectedCity?.id
      ? selectedCity
      : {
          id: 2,
          name: 'Karachi',
          slug: 'karachi',
        },
    type: selectedType?.id ? selectedType : { id: 1, label: 'Rent' },
    area: null,
    bedRooms: null,
    bathRoom: null,
    subChildArea: null,
    subArea: null,
    minPrice: 0,
    maxPrice: 100000000,
    areaRange,
    minArea: 0,
    maxArea: 4000,
    propertyType: null,
    AreaUnits: null,
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
  } = filterSelectedVal;
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

  const onSearchFilter = () => {
    navigate('ProjectListScreen', {
      url: `${getSearchProjectsUrl}country_id=${country?.id}&city_id=${
        city?.id
      }&area_id=${area?.id}&sub_area_id=${subArea?.id}&sub_child_area_id=${
        subChildArea?.id
      }&purpose_id=${type?.id}&searchAreaCustomUnit_val=${
        AreaUnits?.id ?? undefined
      }&searchPriceMin_val=${minPrice}&searchPriceMax_val=${maxPrice}&searchAreaMin_val=${minArea}&searchAreaMax_val=${
        AreaUnits?.id ? areaRange?.sqYd ?? maxArea : undefined
      }&searchBeds_val=${bedRooms?.id}&searchBaths_val=${
        bathRoom?.id
      }&sortBy_val=high&property_type_id=${propertyType?.id}`,
      country,
      city,
      type,
      area,
      extraFilter: [
        type?.label,
        subArea?.id && subArea?.name,
        subChildArea?.id && subChildArea?.name,
        propertyType?.id && propertyType?.name,
        `${formatPriceToPKStandard(minPrice)} - ${formatPriceToPKStandard(
          maxPrice,
        )}`,
        `Area: ${minArea} - ${maxArea}`,
        bedRooms?.id && `Bed: ${bedRooms?.label}`,
        bathRoom?.id && `Bath: ${bathRoom?.label}`,
        areaRange?.id &&
          `Area type: ${areaRange?.sqYd ?? ''} ${AreaUnits?.id ?? ''}`,
      ],
      isFilter: true,
    });
  };

  let filters = [];
  let idCounter = 1;

  Object.entries(filterSelectedVal).forEach(([key, value]) => {
    if (value) {
      filters.push({
        id: idCounter++,
        label: formatKeyName(key), // key name, e.g., "bedRooms"
        value:
          value?.id || typeof value === 'object'
            ? value?.name || value?.label || value?.sqYd || 'Not Selected'
            : value.toString() ?? 'Not Selected',
        onDelete: () => {
          setFilterSelectedVal(prev => ({
            ...prev,
            [key]: initialFilterState[key], // reset only that key
          }));
        },
      });
    }
  });

  const resetAll = () => {
    setFilterSelectedVal({
      country: selectedCountry,
      city: selectedCity,
      type: null,
      area: null,
      bedRooms: null,
      bathRoom: null,
      subChildArea: null,
      subArea: null,
      minPrice: 0,
      maxPrice: 10000000,
      areaRange: null,
      minArea: 0,
      maxArea: 4000,
      propertyType: null,
      AreaUnits: null,
    });
    setModalVisible(false);
  };
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
    onSearchFilter,
    filters,
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
  };
};

export default useFilterScreen;
