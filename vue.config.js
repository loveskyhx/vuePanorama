module.exports = {
	publicPath: './',
	productionSourceMap: false,
	//changeOrigin:true,
	devServer: {
		host: '192.168.0.170',
		port: 8200,
		open: true,
		proxy: {
			//配置跨域
			'/api': {
				target: "192.168.0.170",
				changOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		},

	},



}
