import config from '../config/config';
import webpack from 'webpack';
import webpackMainMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.config.client';
import webpackProdConfig from '../webpack.config.client.production';

export default (app) => {
    if(config.env === "development"){
        const compiler = webpack(webpackDevConfig);
        const middleware = webpackMainMiddleware(compiler, {
            publicPath: webpackDevConfig.output.publicPath
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    } else if(config.env === "production"){
        const compiler = webpack(webpackProdConfig);
        const middleware = webpackMainMiddleware(compiler, {
            publicPath: webpackProdConfig.output.publicPath
        });
        app.use(middleware);
    }
}