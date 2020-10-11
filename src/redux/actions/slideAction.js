export const getSlides = (data) => {
  console.log('ACTION SLIDE', data);
  return {
    type: 'GET_SLIDES',
    payload: data,
  };
};
