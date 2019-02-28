module.exports = process.env.NODE_ENV === 'development'
    ? require('./renderer/renderer.dev')
    : require('./renderer/renderer.prod');