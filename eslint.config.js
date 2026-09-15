import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

// Scoped to real bugs (unused variables, undefined references, broken
// React hook rules), not style — this project has no prior lint
// history, so a strict style ruleset would be mostly noise on day one.
export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,jsx}'],
		plugins: { react, 'react-hooks': reactHooks },
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		settings: { react: { version: 'detect' } },
		rules: {
			// Only the two long-established, universally-agreed-on hooks
			// rules — not eslint-plugin-react-hooks's full "recommended"
			// bundle, which as of v7 also ships a large set of speculative
			// React Compiler rules (immutability, purity, set-state-in-render,
			// and friends) that assume patterns this codebase predates and
			// doesn't use. Those would flag dozens of pre-existing,
			// intentional module-scope mutable variables across the table
			// components as errors — a much larger refactor than a lint
			// pass should trigger, not a real bug in how hooks are used.
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
	},
	{
		ignores: ['node_modules/', 'dist/', 'build/'],
	},
];
