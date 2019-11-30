const proxy = require('http-proxy-middleware');

module.exports = (app)=>{

  app.use(proxy('/api',{
    target:'http://localhost:3000',
    changeOrigin:true
  }));

  app.use(proxy('/v2',{
    target:'https://douban.uieee.com',
    changeOrigin:true
  }));

  app.use(proxy('/mock',{
    target:'http://localhost:3333',
    changeOrigin:true
  }));



};