module.exports = {
	forceExit: true,
	verbose: true,
	collectCoverage: false,
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(js|ts|tsx)$': 'ts-jest',
	},
	testMatch: ['./**/*.spec.(ts|js)'],
	testEnvironment: 'node',
};
