module.exports = {
	forceExit: true,
	verbose: true,
	collectCoverage: false,
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(js|ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	testMatch: ['./**/*.spec.(ts|js)'],
	testEnvironment: 'node',
};
