module.exports = {
  coverageDirectory: "./coverage",
  testURL: "http://localhost",
  collectCoverageFrom: [
    "**/src/**/*.js",
    "!**/__tests__/**",
    "!**/node_modules/**",
  ],
};
