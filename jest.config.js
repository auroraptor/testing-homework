module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  "setupFilesAfterEnv": [
    "<rootDir>/globals.d.ts"
  ]
};
