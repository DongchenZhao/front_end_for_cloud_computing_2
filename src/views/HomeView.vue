<template>
  <v-container fluid style="height: 100%">
    <v-fade-transition>
    <v-card
        v-if="panelVisible"
        style="height: 200px; position: absolute; z-index: 999; padding:10px 10px 10px 10px;">
      <v-container>
        <v-row style="display: flex; flex-direction: row; justify-content: right">
          <v-btn icon small @click="panelVisible=false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-row>
        <v-row style="display: flex; flex-direction: row; align-items: center; justify-content: center">
          <v-col cols="3">
            当前tag
          </v-col>
          <v-col cols="9">
            <v-autocomplete
                v-model="curTag"
                :items="tagLs"
                solo
                dense
                hide-details
                no-data-text="无"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row style="display: flex; flex-direction: row; align-items: center; justify-content: center">
          <v-col cols="3">
            topN
          </v-col>
          <v-col cols="9">
            <v-autocomplete
                v-model="nTopCnt"
                :items="[3,4,5,6,7,8,9,10,11,12,13,14,15]"
                solo
                dense
                hide-details
                no-data-text="无"
            ></v-autocomplete>
          </v-col>

        </v-row>
      </v-container>
    </v-card>
    </v-fade-transition>
    <v-btn
        fab
        style="position: absolute; z-index: 999"
        @click="panelVisible=true"
        v-if="!panelVisible"
    >
      <v-icon>
        mdi-tune
      </v-icon>
    </v-btn>


    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            fab
            style="position: absolute; z-index: 999; bottom: 20px"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>
            mdi-help
          </v-icon>
        </v-btn>
      </template>
      <span>数据来自于10分钟之内，每5秒钟更新一次</span>
    </v-tooltip>

    <div style="width: 100% ;height: 100%;" id="mount-point">

    </div>

  </v-container>
</template>

<script>
import tag from '@/api/tag';
import * as echarts from 'echarts';
import {splitData, getFakeData, processData} from '@/utils/tools';
import {tagLs} from '@/utils/config';
import {mapGetters} from 'vuex';

export default {
	name: 'Home',

	components: {},

	data() {
		return {
			baseOptions: {
				xAxis: {
					max: 'dataMax'
				},
				yAxis: {
					type: 'category',
					data: [],
					inverse: true,
					animationDuration: 300,
					animationDurationUpdate: 300,
					max: 7 // only the largest 3 bars will be displayed
				},
				series: [
					{
						realtimeSort: true,
						name: 'X',
						type: 'bar',
						data: [],
						label: {
							show: true,
							position: 'right',
							valueAnimation: true
						}
					}
				],
				legend: {
					show: false
				},
				animationDuration: 0,
				animationDurationUpdate: 300,
				animationEasing: 'linear',
				animationEasingUpdate: 'linear'
			},
			panelVisible: true,
			tagLs: tagLs,
			curData: {},
			nTopCnt: 10,
			curTag: 'java',
			keyLs: [],
			valLs: [],
			myChart: Object
		};
	},

	async mounted() {
		this.initEcharts();
		await this.getData();
		setInterval(this.getData, 5000);
	},

	watch: {
		nTopCnt() {
			console.log('nTopChanged');
			this.baseOptions.yAxis.max = this.nTopCnt - 1;
			this.myChart.setOption(this.baseOptions);
		},
		curTag() {
			console.log('curTagChanged', this.curTag);
			this.getData();
		},
		curTab(){
			console.log('curTabChanged', this.curTab);
			this.getData();
		}
	},
	computed:{
		...mapGetters(['curTab'])
	},

	methods: {
		initEcharts() {
			// 基于准备好的dom，初始化echarts实例
			this.myChart = echarts.init(document.getElementById('mount-point'));
			// 绘制图表
			// this.myChart.setOption(this.baseOptions);
		},
		refreshEcharts() {
			[this.keyLs, this.valLs] = splitData(getFakeData(this.curTag));
			this.baseOptions.series[0].data = this.valLs;
			this.baseOptions.yAxis.data = this.keyLs;
			this.myChart.setOption(this.baseOptions);
		},
		async getData(){
			let constTag;
			let originTag = this.curTag;
			if(this.curTag === 'c++'){
				constTag = 'c%2b%2b';
			}
			else if(this.curTag === 'c#'){
				constTag = 'c%23';
			}
			else{
				constTag = this.curTag;
			}
			if(this.curTab === 0){
				const [resp, err] = await tag.flinkGetTag(constTag);
				if(!err){
					[this.keyLs, this.valLs] = processData(resp, originTag);
				}
			}
			else{
				const [resp, err] = await tag.sparkGetTag(constTag);
				if(!err){
					[this.keyLs, this.valLs] = processData(resp, originTag);
				}
			}
			this.baseOptions.series[0].data = this.valLs;
			this.baseOptions.yAxis.data = this.keyLs;
			this.myChart.setOption(this.baseOptions);
		},
	}
};
</script>
