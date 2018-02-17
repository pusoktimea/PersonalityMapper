module.exports = {
  'transform': {'.*': '<rootDir>/jest-preprocessor.js'},
  'moduleNameMapper': {
    '^.*\\.s?css$': '<rootDir>/SCSSStub.js',
    '^utils[/](.+)': '<rootDir>/src/utils/$1',
    '^components[/](.+)': '<rootDir>/src/components/$1'
  }
};
