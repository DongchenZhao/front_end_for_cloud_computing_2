<template>
  <v-container fluid style="height: 100%;">
    <v-row :style="searchBoxHeightStyle" style="transition: height 0.2s">
        <v-col :cols="3"/>
        <v-col :cols="6" style="display: flex; flex-direction: row; align-items: center">
          <v-text-field
              v-model="searchInput"
              label="输入包名"
              clearable
              rounded
              solo
              hide-details
              @keydown.enter="sendSearchRequest"
              @keydown.esc="searchResultVisible = false"
              @click:clear="searchResultVisible = false"
          />
          <v-btn
              style="margin-left: 40px"
              min-width="150px"
              large
              color="primary"
              rounded
              @click="sendSearchRequest"
          >
            搜 索
          </v-btn>
        </v-col>
        <v-col :cols="3"/>
      </v-row>
    <v-row style="height: 85%" v-show="searchResultVisible">
      <v-card style="width: 100%; margin: 20px">
        <v-card-title style="height: 10%; display: flex; justify-content: center; align-items: center">
          {{previousSearchInput}}
        </v-card-title>
        <v-container v-if="searchHit" fluid style="width: 100%; background: antiquewhite; height: 90%">

        </v-container>
        <v-container v-else fluid style="width: 100%; height: 90%">

        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import tag from '@/api/tag';

export default {
	name: 'Home',

	components: {},

	data() {
		return {
			searchInput: '',
			searchResultVisible: false,
			searchResult: {},
			depParentChildInfo: {},
			simParentChildInfo:{},
			possiblePackages: [],
			searchHit: false,
			previousSearchInput: '',
		};
	},

	watch: {
		curTab() {
			console.log('curTabChanged', this.curTab);
			this.getData();
		}
	},
	computed: {
		...mapGetters(['curTab']),
		searchBoxHeightStyle: function () {
			return this.searchResultVisible ? {height: '15%'} : {height: '60%'};
		},
		depGrandParents: function (){
			if(this.depParentChildInfo.hasOwn('grandParents')){
				return this.depParentChildInfo.grandParents;
			}
			return [];
		},
		depParent: function (){
			if(this.depParentChildInfo.hasOwn('parents')){
				return this.depParentChildInfo.parents;
			}
			return [];
		},
		depChildren: function (){
			if(this.depParentChildInfo.hasOwn('children')){
				return this.depParentChildInfo.children;
			}
			return [];
		},
		depGrandChildren: function (){
			if(this.depParentChildInfo.hasOwn('grandChildren')){
				return this.depParentChildInfo.grandChildren;
			}
			return [];
		},

		simGrandParents: function (){
			if(this.simParentChildInfo.hasOwn('grandParents')){
				return this.simParentChildInfo.grandParents;
			}
			return [];
		},
		simParent: function (){
			if(this.simParentChildInfo.hasOwn('parents')){
				return this.simParentChildInfo.parents;
			}
			return [];
		},
		simChildren: function (){
			if(this.simParentChildInfo.hasOwn('children')){
				return this.simParentChildInfo.children;
			}
			return [];
		},
		simGrandChildren: function (){
			if(this.simParentChildInfo.hasOwn('grandChildren')){
				return this.simParentChildInfo.grandChildren;
			}
			return [];
		},
	},

	methods: {
		async sendSearchRequest() {
			this.searchResult = {};
			this.simParentChildInfo = {};
			this.depParentChildInfo = {};
			this.possiblePackages = [];
			if (this.searchInput == null || this.searchInput.length === 0) {
				return;
			}
			const [resp, err] = await tag.searchRequest(this.searchInput);
			if (!err) {
				this.previousSearchInput = this.searchInput;
				this.searchResult = resp;
				if(resp.hit){
					this.depParentChildInfo = resp.depParentChildInfo;
					this.simParentChildInfo = resp.simParentChildInfo;
				}
				else{
					this.possiblePackages = resp.possiblePackages;
				}
			}
			this.searchResultVisible = true;
		}
	}
};
</script>
