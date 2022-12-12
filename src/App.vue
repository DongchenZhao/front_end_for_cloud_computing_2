<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <h2 style="color: white">Search for archlinux packages</h2>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
	name: 'App',

	data: () => ({}),

	watch: {},

};
</script>
