<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-tabs
          :value="curTab"
          style="margin-left: 100px"
      >
        <v-tab @click="tabChanged(0)">
          flink
        </v-tab>
        <v-tab @click="tabChanged(1)">
          spark
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex';

export default {
	name: 'App',

	data: () => ({}),

	watch: {},

	computed: {
		...mapGetters(['curTab'])
	},

	methods: {
		...mapMutations(['changeCurTab']),
		tabChanged(val) {
			this.changeCurTab(val);
		}
	}
};
</script>
