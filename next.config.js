/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			// Basic redirect
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
		]
	},
};

module.exports = nextConfig;
