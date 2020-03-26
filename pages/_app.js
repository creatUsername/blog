import App from 'next/app'
import '../static/styles/custom-theme.less'
import '../static/styles/common.less'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../static/styles/nprogress.less'
import moment from '../utils/moment-locale'

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default App