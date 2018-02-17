import {doGet, doPatch} from 'utils/APIUtils';

export const getProfile = () => {
  return doGet('user/profile').then((response) => {
    return response.profile;
  });
};

export const updateProfile = (data) => {
  return doPatch('user/profile', data).then((response) => {
    if (response.success === 1) {
      return {
        success: true,
        profile: response.profile
      };
    } else {
      return {
        success: false,
        error: response.error
      };
    }
  });
};
