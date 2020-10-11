import Axios from 'axios';
import { API_URL } from '../../assets/path/urls';
// import cartUser from '../../pages/cartUser';

export const login = (data) => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const checkout = () => {
  return {
    type: 'CHECKOUT',
  };
};

// redux thunk
export const Login = (query, username, password) => {
  return (dispatch) => {
    Axios.get(API_URL + `/users?${query}=${username}&password=${password}`)
      .then((res) => {
        console.log('GET SUCCESS LOGIN', res.data);
        localStorage.setItem('id', res.data[0].id);
        dispatch({
          type: 'LOGIN',
          payload: res.data[0],
        });
      })
      .catch((err) => {
        console.log('GET ERROR LOGIN :', err);
      });
  };
};

export const KeepLogin = () => {
  return (dispatch) => {
    let id = localStorage.getItem('id');
    if (id) {
      Axios.get(API_URL + `/users?id=${id}`)
        .then((res) => {
          dispatch({
            type: 'LOGIN',
            payload: res.data[0],
          });
          console.log('GET SUCCESS KEEP_LOGIN:', res.data);
        })
        .catch((err) => {
          console.log('keep login error :', err);
        });
    }
  };
};

// export const KeepLogin = () => {
//   return async(dispatch) => {
//     try {
//       let get = await Axios.get(API_URL + `/users/${localStorage.getItem('id')}`)
//       dispatch({
//         type: "LOGIN",
//         payload: get.data
//       })
//     } catch (error) {
//       console.log("KEEPLOGIN", error)
//     }
// }
