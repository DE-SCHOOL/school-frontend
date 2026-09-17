import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/setupTests.js'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			include: ['src/**/*.{js,jsx}'],
			exclude: [
				'src/**/*.test.{js,jsx}',
				'src/setupTests.js',
				'src/main.jsx',
				'src/index.jsx',
				// Icon/asset/style-only modules and re-export barrels have no
				// logic of their own to cover.
				'src/assets/**',
				'src/scss/**',
			],
			// A floor below current measured coverage (~36% statements), not
			// an aspirational target — this fails CI on a real regression,
			// not on the gap that already exists in the component/screen
			// layer.
			thresholds: {
				statements: 30,
				branches: 8,
				functions: 25,
				lines: 30,
			},
		},
	},
});
