export const getProducts = (data) => {
  console.log('Action product', data);
  return {
    type: 'GET_PRODUCTS',
    payload: data,
  };
};
