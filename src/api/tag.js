import {axios} from '@/utils/request';

export default {
	flinkGetTag: function (tag){
		return axios({
			url: '/flink/getSingleTag?tag=' + tag,
			method: 'GET'
		});
	},
	sparkGetTag: function (tag){
		return axios({
			url: '/spark/getSingleTag?tag=' + tag,
			method: 'GET'
		});
	},
	flinkGetAllTags: function (){
		return axios({
			url: '/flink/getAllTag',
			method: 'GET'
		});
	},

	searchRequest: function (packageName) {
		return axios({
			url: '/search/' + packageName,
			method: 'GET'
		});
	}
};