const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
	// async redirects() {
	// 	return [
	// 		// Basic redirect
	// 		{
	// 			source: '/',
	// 			destination: '/en/home',
	// 			permanent: true,
	// 		},
	// 	]
	// },
};

module.exports = withNextIntl(nextConfig);
