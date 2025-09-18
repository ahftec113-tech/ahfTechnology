import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAreasUrl,
  getCitriesUrl,
  getCountriesUrl,
  getCountryDataUrl,
  getFilterAttibutesUrl,
  getSearchProjectsUrl,
  homeDataUrl,
  searchByLocationUrl,
} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { useEffect, useState } from 'react';
import { errorMessage } from '../../Config/NotificationMessage';
import { formatPriceRange } from '../../Services/GlobalFunctions';

const useHoemScreen = ({ navigate }) => {
  return {};
};

export default useHoemScreen;
