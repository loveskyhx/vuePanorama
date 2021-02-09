import axios from 'axios';

//配置跨域
axios.defaults.crossDomain = true;
//跨域安全策略
axios.defaults.withCredentials = true;

axios.defaults.transformRequest = [function (data) {
    if (data instanceof FormData) {
        return data;
    }
    data = qs.stringify(data);
    return data;
}];

axios.interceptors.request.use(
    config => {
        //store.dispatch('loading', true);
        return config;
    },
    err => {
        //store.dispatch('loading', false);
        return Promise.reject(err);
    }
);

axios.interceptors.response.use((response) => {
	
    //store.dispatch('loading', false);
    switch (response.data.code){
        case '500':

            break;
    }
    return response;
}, (error) => {
	
	if(!sessionStorage.getItem('ssh')){ //是否跳过验证
		//当code 为空的清空为为响应 向基础平台跳转
		 var errors=error.toString();
		 var num= errors.replace(/[^0-9]/ig,"");
			if(num==''){
				window.location.href=config.ip+'/a';
			}
		return Promise.reject(error)	
	}
	
	
});

