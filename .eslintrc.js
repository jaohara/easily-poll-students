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
        {
            "files": ['*.ts', '*.tsx'],
            "extends": [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            "parserOptions": {
                "project": ['./tsconfig.json'],
            },
            "rules": {
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/no-floating-promises": "off",
            },
        },
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off",
    }
}
