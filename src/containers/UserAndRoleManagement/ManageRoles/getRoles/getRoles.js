import env from '../../../../config';
import Axios from 'axios';

const envVar = env();
const AUTH0_PROXY_URL = `${envVar.BASE_API_URL}/auth0`;

const getAllRoles = async token =>
  await Axios.get(`${AUTH0_PROXY_URL}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default getAllRoles;
