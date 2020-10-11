export default (state = [], action) => {
  switch (action.type) {
    case 'GET_SLIDES':
      console.log('REDUCER SLIDE', action.payload);
      return action.payload;
    default:
      return state;
  }
};
