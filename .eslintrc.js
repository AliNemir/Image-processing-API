module.exports = {
    env: {
        es2021: true,
        node: true,
        jasmine: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'prettier/prettier': 2, // Means error
        'no-console': 'off', // Means warning
        'no-var': 'off',
        '@typescript-eslint/no-var-requires': 0,
        'prefer-const': 'error',
        '@typescript-eslint/no-explicit-any': ['off']
    }
};
