export default (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      console.log('REDUCER PRODUCT', action.payload);
      return action.payload;
    default:
      return state;
  }
};
