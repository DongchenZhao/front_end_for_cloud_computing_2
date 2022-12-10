import axios from 'axios';

const instance = axios.create({
	// 设置baseUr地址,如果通过proxy跨域可直接填写base地址
	baseURL: 'http://172.19.240.113:9091/',
	// 定义统一的请求头部
	headers: {},
	// 配置请求超时时间
	timeout: 120000,
	// 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
	withCredentials: true
});
// 请求拦截
instance.interceptors.request.use(config => {
	// 自定义header，可添加项目token
	// config.headers.token = 'token';
	if (localStorage.getItem('token')) { //判断token是否存在
		config.headers.Authorization = 'Bearer ' +  localStorage.getItem('token');  //将token设置成请求头
	}
	return config;
});
// 返回拦截
instance.interceptors.response.use((response) => {
	// console.log('response data', response.data);
	console.log('axios response', response);
	if (response.status === 200) {
		return [response.data, null];
	}
	else {
		console.log('request failed with code ', response.status);
		return [null, response];
	}
}, (error) => {
	console.log('error.response', error.response);
	return [null, error];
});


export {
	instance as axios
};