module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json",
        // "project": true,
        // "tsconfigRootDir"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off",
    }
}
