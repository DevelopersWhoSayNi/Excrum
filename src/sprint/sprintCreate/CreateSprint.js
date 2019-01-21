import Axios from 'axios';
import config from '../../ServerConfig.json';

const CreateSprint = async userInfo => {
  const url = `${config.Server}/newsprint`;
  const body = {
    userID: userInfo.userID,
    name: userInfo.name,
    email: userInfo.email,
    password: userInfo.password
  };

  try {
    const response = await Axios.post(url, body);
    if (response.data.message === 'User created') {
      return {
        Registered: true
      };
    } else {
      return {
        Registered: false
      };
    }
  } catch (error) {
    return Promise.reject(new Error('fail to create user: ', error.response));
  }
};

export default CreateSprint;
