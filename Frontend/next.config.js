const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		runtimeCaching,
	},
	images: {
		domains: ['localhost', 'parchiapp-backend.vercel.app']
	  }
});
