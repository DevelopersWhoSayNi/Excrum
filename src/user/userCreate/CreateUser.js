import Axios from 'axios';
import config from '../../ServerConfig.json';

const CreateUser = userInfo => {
  const url = `${config.Server}/signup`;
  const body = {
    userID: userInfo.userID,
    name: userInfo.name,
    email: userInfo.email,
    password: userInfo.password
  };

  return Axios.post(url, body)
    .then(response => {
      if (response.data.message === 'User created') {
        localStorage.setItem('token', response.data.token);
        return {
          Registered: true,
          Token: response.data.token
        };
      } else {
        return {
          Registered: false
        };
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to create user: ', error.response));
    });
};

export default CreateUser;
