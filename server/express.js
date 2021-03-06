import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';



const CWD = process.cwd();



// Template page for Reactjs.
// From this template we serve client applications.
// This client application will be Single Page Application.
// According to our decision, this client application would be Server-Side-Rendered(SSR)
// or Client-Side-Rendered(CCR). My Thought is that CCR web application
// is very economic and and with proper configuration of bundling and building process, 
// CCR's performance can be greater than SSR.
import Template from '../template';

const app = express();

// Webpack bundler for both backend and frontend codes
import bundlingEngine from './devBundler';
bundlingEngine(app);

// middlewares for express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(cors()); // we permit cross-origin requests, according to our decision this can be disabled.

// serve static files(i.e bundle files, images, etc...) on `dist` folder
app.use('/dist', express.static(path.join(CWD, 'dist')));

// Routes
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import doorRoutes from './routes/door.route';
import personRoutes from './routes/person.route';
import departmentRoutes from './routes/department.route';
import accessRoutes from './routes/access.route';
import logRoutes from './routes/log.route';
import blockRoutes from './routes/block.route';
import placeRoutes from './routes/place.route';
import ruleRoutes from './routes/rule.route';
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', doorRoutes);
app.use('/', personRoutes);
app.use('/', departmentRoutes);
app.use('/', accessRoutes);
app.use('/', logRoutes);
app.use('/', blockRoutes);
app.use('/', placeRoutes);
app.use('/', ruleRoutes);

// SPA Template will be served at root path.
// We use especially HTTP status code 200, because status code 200 
// with GET method is cacheable for browsers by default.
app.get('*', (req, res) => {
  res.status(200).send(Template());
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : "Kullanıcı girişi gereklidir."})
  }else if (err) {
    res.status(400).json({"error" : "Kullanıcı girişi gereklidir. Lütfen yetkiliye bildiriniz."})
    console.log(err)
  }
})

export default app;

