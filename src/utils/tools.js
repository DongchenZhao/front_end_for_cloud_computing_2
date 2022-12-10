import {java_tag, rust_tag} from '@/utils/example';

function splitData(rawData) {
	let objData = JSON.parse(rawData);
	let keyLs = [];
	let valLs = [];
	for (let [key, value] of Object.entries(objData)) {
		keyLs.push(key);
		valLs.push(value);
	}
	return [keyLs, valLs];
}

function getFakeData(tag) {
	let rawData;
	if (tag === 'java') {
		rawData = JSON.parse(java_tag);
	} else {
		rawData = JSON.parse(rust_tag);
	}
	for (let key of Object.keys(rawData)) {
		if (key === tag) {
			delete rawData[key];
		}
		let rand1 = Math.random();
		let rand2 = Math.floor(Math.random() * 10);
		if (rand1 > 0.5) {
			rawData[key] += rand2;
		} else {
			rawData[key] -= rand2;
			if (rawData[key] <= 0) {
				rawData[key] = 1;
			}
		}
	}
	return JSON.stringify(rawData);
}


function processData(data, tag) {
	let keyLs = [];
	let valLs = [];
	for (let [key, value] of Object.entries(data)) {
		if(key === tag){
			continue;
		}
		keyLs.push(key);
		valLs.push(value);
	}
	return [keyLs, valLs];
}


export {splitData, getFakeData, processData};