import { useQuery } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import API, {
  formDataFunc,
  formDataFuncForRealEstate,
} from '../../Utils/helperFunc';
import {
  addProjectUrl,
  getFavByLocalIdUrl,
  getMyProjectUrl,
} from '../../Utils/Urls';
import { removeArryAndReturnDirectUrl } from '../../Services/GlobalFunctions';
import { useEffect } from 'react';
import { successMessage } from '../../Config/NotificationMessage';
import {
  cleaDraftProject,
  deleteDraftProject,
} from '../../Redux/Action/DraftAction';

const useDraftAdsScreen = ({ addListener }) => {
  const { getState, dispatch } = useReduxStore();
  const { DraftAds } = getState('DraftAds');

  const demoBody = {
    ads: [
      {
        CountrySearchInput: 1,
        citySearchInput: 2,
        areaSearchInput: 4,
        adTitle: 'Ad number one',
        adDescription: 'This is the first ad',
        priceInput: '3000000',
        // image: {
        //   uri: 'https://images.pexels.com/photos/32825304/pexels-photo-32825304.jpeg',
        //   type: 'image/jpeg',
        //   name: 'test1.jpg',
        // },
      },
      {
        CountrySearchInput: 10,
        citySearchInput: 20,
        areaSearchInput: 40,
        adTitle: 'Ad number two',
        adDescription: 'This is the second ad',
        priceInput: '5000000',
        image: {
          uri: 'https://images.pexels.com/photos/32825304/pexels-photo-32825304.jpeg',
          type: 'image/jpeg',
          name: 'test2.jpg',
        },
      },
    ],
    category: 'Cars',
    contactEmail: 'example@gmail.com',
  };

  const bulkUpload = async () => {
    return new Promise(async (resolve, reject) => {
      const results = [];

      for (const [index, item] of DraftAds.entries()) {
        try {
          const response = await formDataFunc(
            addProjectUrl,
            item,
            'propertyImageInput',
            true,
          );

          if (!response.ok) {
            return reject({
              error: response.data?.errors || 'API request failed',
              index,
              item,
            });
          }

          results.push({
            data: response.data,
            index,
            item,
          });
        } catch (error) {
          return reject({
            error: error.message || 'Unexpected error during API call',
            index,
            item,
          });
        }
      }

      resolve(results);
    });
  };

  return {
    projectsList: DraftAds ?? [],
    bulkUpload,
  };
};

export default useDraftAdsScreen;
