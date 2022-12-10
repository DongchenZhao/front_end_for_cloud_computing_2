import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		curTab: 0
	},
	getters: {
		curTab(state){
			return state.curTab;
		}
	},
	mutations: {
		changeCurTab(state, data){
			state.curTab = data;
		}
	},
	actions: {
	},
	modules: {
	}
});
