export const SET_USER_IMAGE = 'SET_USER_IMAGE';

export const setUserImage = (imageUrl) => {
  console.log('Setting user image:', imageUrl); 
  return {
    type: SET_USER_IMAGE,
    payload: imageUrl,
  };
};
