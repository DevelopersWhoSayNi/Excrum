import Axios from 'axios';

const Authenticate = userInfo => {
  const url = `http://localhost:8000/login`;
  const body = {
    email: userInfo.email,
    password: userInfo.password
  };

  return Axios.post(url, body)
    .then(response => {
      if (response.data.message === 'Success') {
        localStorage.setItem('token', response.data.token);
        return {
          Authenticated: true,
          Token: response.data.token
        };
      } else {
        return {
          Authenticated: false
        };
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to authenticate user' + error));
    });
};

export default Authenticate;
