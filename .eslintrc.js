module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'allowImportExportEverywhere': true
	},
	'plugins': [
		'vue'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'vue/multi-word-component-names': 'off',
		'vue/no-v-model-argument': 'off',
		// 'vue/valid-v-bind-sync': 'off',
		'vue/no-side-effects-in-computed-properties': 'off',
		'no-prototype-builtins': 'off',
	}
};