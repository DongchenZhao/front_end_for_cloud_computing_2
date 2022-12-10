let baseOptions = {
	xAxis: {
		max: 'dataMax'
	},
	yAxis: {
		type: 'category',
		data: [],
		inverse: true,
		animationDuration: 300,
		animationDurationUpdate: 300,
		max: 2 // only the largest 3 bars will be displayed
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
		show: true
	},
	animationDuration: 0,
	animationDurationUpdate: 3000,
	animationEasing: 'linear',
	animationEasingUpdate: 'linear'
};

let tagLs = ['javascript', 'python', 'java', 'c++', 'c#', 'scala', 'php', 'go', 'rust', 'r'];

export {baseOptions, tagLs};