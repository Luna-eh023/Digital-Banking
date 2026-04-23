module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5005,
  api: {
    prefix: '/api', // 🔥 penting
  },
};
