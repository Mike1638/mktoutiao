module.exports = {
   //配置要使用的POSTCSS插件
    plugins: {
      //配置使用 autoprefixer插件
      // vuecli 内部已经配置了 autoperfix 不要再配置了
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
      // 配置 postcss-pxtorm
      'postcss-pxtorem': {
        // lib-flexible 的REM 适配 方案 把一行分为 10 份，每份就是十分之一  
        // 所以 rootValue 应该设计成你设计稿的十分之一
        // 项目的设计稿是750px
        // 但是Vant 建议设置为37.5 唯一的缺点是使用设计稿的尺寸都必须 /2 
        // 有没有更好的办法？
        // 使用函数
        rootValue({file}){
           return file.indexOf('vant') !== -1 ? 37.5 :75  
        },
        // 配置要转换的CSS属性  * 代表所有
        propList: ['*']
      }
    }
  }