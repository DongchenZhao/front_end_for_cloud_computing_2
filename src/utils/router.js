import Vue from 'vue';
import VueRouter from 'vue-router';
// components
import home from '@/views/HomeView';

Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		name: 'home',
		component: home
	},
];

const createRouter = () => new VueRouter({
	// mode: 'history', // require service support
	scrollBehavior: () => ({y: 0}),
	routes
});
const router = createRouter();


export default router;