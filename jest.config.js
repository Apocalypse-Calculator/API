// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '~/src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/|.*.(test|spec))\\.ts$',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ['integration.test.ts'],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
};
