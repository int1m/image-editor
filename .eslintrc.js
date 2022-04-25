module.exports = {
    plugins: ['@typescript-eslint', 'vue', 'import'],
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:vue/vue3-recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
            alias: {
                map: [['@/', './src/']],
                extensions: ['.vue', '.ts'],
            },
        },
    },
    rules: {
        'import/no-unresolved': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-parens': ['error', 'as-needed'],
        'no-trailing-spaces': 'error',
        'computed-property-spacing': ['error', 'never'],
        'comma-spacing': ['error', {
            before: false,
            after: true,
        }],
        'space-in-parens': ['error', 'never'],
        'key-spacing': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'no-multi-spaces': ['error'],
        'space-unary-ops': 1,
        'space-infix-ops': ['error', { int32Hint: true }],
        'arrow-spacing': 'error',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

        'vue/component-tags-order': ['error', {
            order: ['script', 'template', 'style'],
        }],
        'vue/first-attribute-linebreak': ['error', {
            singleline: 'beside',
            multiline: 'below',
        }],
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 2,
            },
            multiline: {
                max: 1,
            },
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/valid-define-props': 'error',
        'vue/valid-define-emits': 'error',
        'vue/static-class-names-order': 'error',
        'vue/space-in-parens': ['error', 'never'],
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/space-infix-ops': ['error', { int32Hint: true }],
        'vue/arrow-spacing': 'error',

        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
    },
};
