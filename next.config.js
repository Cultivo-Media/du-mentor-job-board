const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/about': { page: '/about' },
  }),
  assetPrefix: !debug ? '/du-mentor-job-board/' : '',
};
