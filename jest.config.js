module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/apps/backend", "<rootDir>/apps/frontend"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
      "^shared/(.*)$": "<rootDir>/shared/$1",
    },
  };
  