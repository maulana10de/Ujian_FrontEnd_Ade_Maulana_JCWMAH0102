const INITIAL_STATE = {
  id: null,
  username: '',
  email: '',
  phone: '',
  role: '',
  cart: [],
  totalOrder: 5,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      // apa yang akan disimpan di global store
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        phone: action.payload.phone,
        cart: action.payload.cart,
        role: action.payload.role,
      };
    case 'LOGOUT':
      // reset state ke semula
      return INITIAL_STATE;
    case 'CHECKOUT':
      // reset state ke semula
      return { ...state, cart: [] };
    default:
      // data terakhir sebelum logout
      return state;
  }
};
