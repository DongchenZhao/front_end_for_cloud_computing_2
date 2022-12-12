<template>
  <v-container fluid style="height: 100%;">
    <v-row :style="searchBoxHeightStyle" style="transition: height 0.2s; max-height: 500px">
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
            prepend-inner-icon="mdi-magnify"
        />
        <v-btn
            style="margin-left: 40px; font-weight: bold; font-size: 18px"
            min-width="150px"
            large
            color="primary"
            rounded
            @click="sendSearchRequest"
        >
          {{'搜   索'}}
        </v-btn>
      </v-col>
      <v-col :cols="3"/>
    </v-row>
    <v-row v-if="searchResultVisible" style="height: auto; min-height: 85%">
      <v-card style="width: 100%; margin: 20px; height: auto; min-height: 100%">
        <v-card-title style="display: flex; justify-content: center; align-items: center">
          <h3 v-if="searchHit">
            package: {{ previousSearchInput }}
          </h3>
          <h3 v-else>
            没有符合结果的软件包，您是否在找：
          </h3>
        </v-card-title>
        <v-divider v-if="searchHit" style="margin: 0 20px 0 20px"/>
        <v-divider v-else style="margin: 0 200px 0 200px"/>
        <div v-if="searchHit" style="width: 100%; background: antiquewhite">
          <v-tabs v-model="successTabIndex">
            <v-tab :key="0">依赖关系</v-tab>
            <v-tab :key="1">相似包</v-tab>
          </v-tabs>
          <v-tabs-items v-model="successTabIndex">
            <v-tab-item :key="0">
              <v-row style="padding: 10px">
                <v-col :cols="2">
                  <v-list>
                    <v-subheader>关系选择</v-subheader>
                    <v-list-item-group
                        v-model="depSelected"
                        color="primary"
                        @change="listGroupChanged()"
                    >
                      <v-list-item key="0">
                        <v-list-item-content>
                          <v-list-item-title>grand parents</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item key="1">
                        <v-list-item-content>
                          <v-list-item-title>parents</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item key="2">
                        <v-list-item-content>
                          <v-list-item-title>children</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item key="3">
                        <v-list-item-content>
                          <v-list-item-title>grandChildren</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col :cols="10">
                  {{ packageNameDisplayed }}
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item :key="1">
              <v-row style="padding: 10px">
                <v-col :cols="2">
                  <v-list>
                    <v-subheader>关系选择</v-subheader>
                    <v-list-item-group
                        v-model="simSelected"
                        color="primary"
                        @change="listGroupChanged()"
                    >
                      <v-list-item key="0">
                        <v-list-item-content>
                          <v-list-item-title>grand parents</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item key="1">
                        <v-list-item-content>
                          <v-list-item-title>parents</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item key="2">
                        <v-list-item-content>
                          <v-list-item-title>children</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item key="3">
                        <v-list-item-content>
                          <v-list-item-title>grandChildren</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col :cols="10">
                  {{ packageNameDisplayed }}
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </div>
        <div v-else style="width: 100%;">
          <v-list-item v-for="item in possiblePackagesTop40" :key="item.id" dense>
            <v-list-item-content>
              <v-list-item-title style="display: flex; justify-content: center; align-items: center">{{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div style="height: 10px"/>
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
			successTabIndex: 0,
			searchInput: '',
			searchResultVisible: false,
			searchResult: {},
			depParentChildInfo: {},
			simParentChildInfo: {},
			possiblePackages: [],
			searchHit: false,
			previousSearchInput: '',
			depSelected: 0,
			simSelected: 0,
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
		depGrandParents: function () {
			if (this.depParentChildInfo.hasOwnProperty('grandParents')) {
				return this.depParentChildInfo.grandParents;
			}
			return [];
		},
		depParents: function () {
			if (this.depParentChildInfo.hasOwnProperty('parents')) {
				return this.depParentChildInfo.parents;
			}
			return [];
		},
		depChildren: function () {
			if (this.depParentChildInfo.hasOwnProperty('children')) {
				return this.depParentChildInfo.children;
			}
			return [];
		},
		depGrandChildren: function () {
			if (this.depParentChildInfo.hasOwnProperty('grandChildren')) {
				return this.depParentChildInfo.grandChildren;
			}
			return [];
		},

		simGrandParents: function () {
			if (this.simParentChildInfo.hasOwnProperty('grandParents')) {
				return this.simParentChildInfo.grandParents;
			}
			return [];
		},
		simParents: function () {
			if (this.simParentChildInfo.hasOwnProperty('parents')) {
				return this.simParentChildInfo.parents;
			}
			return [];
		},
		simChildren: function () {
			if (this.simParentChildInfo.hasOwnProperty('children')) {
				return this.simParentChildInfo.children;
			}
			return [];
		},
		simGrandChildren: function () {
			if (this.simParentChildInfo.hasOwnProperty('grandChildren')) {
				return this.simParentChildInfo.grandChildren;
			}
			return [];
		},

		packageNameDisplayed: function () {
			let data = [];
			if (this.successTabIndex === 0) {
				switch (this.depSelected) {
				case 0:
					data = this.depGrandParents;
					break;
				case 1:
					data = this.depParents;
					break;
				case 2:
					data = this.depChildren;
					break;
				case 3:
					data = this.depGrandChildren;
					break;
				}
			} else {
				switch (this.simSelected) {
				case 0:
					data = this.simGrandParents;
					break;
				case 1:
					data = this.simParents;
					break;
				case 2:
					data = this.simChildren;
					break;
				case 3:
					data = this.simGrandChildren;
					break;
				}
			}
			if(data.length === 0 || data[0].name === this.previousSearchInput){
				return '无';
			}
			let res = '';
			for (let x of data) {
				if(x.name === this.previousSearchInput){
					continue;
				}
				res += x.name;
				res += ', ';
			}
			res = res.substring(0, res.length - 2);
			return res;
		},

		possiblePackagesTop40: function () {
			return this.possiblePackages.splice(0, 40);
		}
	},

	methods: {
		listGroupChanged() {
			console.log('list group changed');
		},
		async sendSearchRequest() {
			if (this.searchInput == null || this.searchInput.length === 0) {
				return;
			}
			this.searchResult = {};
			this.simParentChildInfo = {};
			this.depParentChildInfo = {};
			this.possiblePackages = [];
			this.simSelected = 0;
			this.depSelected = 0;
			this.successTabIndex = 0;
			const [resp, err] = await tag.searchRequest(this.searchInput);
			if (!err) {
				this.searchHit = resp.hit;
				this.previousSearchInput = this.searchInput;
				this.searchResult = resp;
				if (resp.hit) {
					this.depParentChildInfo = resp.depParentChildInfo;
					this.simParentChildInfo = resp.simParentChildInfo;
				} else {
					this.possiblePackages = resp.possiblePackages;
				}
			}
			this.searchResultVisible = true;
		}
	}
};
</script>
