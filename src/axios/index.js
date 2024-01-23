import axios from 'axios';

import * as CONFIG from './../config';

const instance = axios.create({
	baseURL: CONFIG.API_ROOT_URL,
});

export default instance;
