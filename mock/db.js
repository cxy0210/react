// 用mockjs模拟生成数据
var Mock = require('mockjs');

let mr = Mock.Random;//提取mock的随机对象

//随机id和图片
let mapData = (n) => {
  var data = [];

  for (var i = 1; i <= n; i++) {

    data.push({
      id: i,
      cart_num:1,
      title: "@ctitle(4,12)",
      des: "@csentence(12, 20)",
      price:"@integer(1234,10999)",
      time: "@integer(1553425967486,1553475967486)",
      detail_banner: mr.image('400x400', mr.color(), mr.cword(4,10)),
      icon: mr.image('150x150', mr.color(), mr.cword(4,10)),
      banner: mr.image('150x150', mr.color(), mr.cword(4,10)),//banner不变
      details:{
        auth:"@cname()",
        content:"@cparagraph(10,40)",
        auth_icon:mr.image('10x10', mr.color(), mr.cword(1))
      }
    })
  }
  return data
};

//json-server 要对象||函数(返回mock后的数据)
module.exports = {
  ...Mock.mock({
    'home': mapData(32),//解决 auth_icon 不随机
    'follow': mapData(21),
    'user': mapData(10),
    'column': mapData(11),
    'banner|30': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        cart_num:1,
        title: "@ctitle(2,3)",//标题型中文4到8个字
        sub_title: "@ctitle(6,12)",
        price:"@integer(15,1553)",
        banner: mr.image('150x150', mr.color(), mr.cword(4,10)),//banner不变
        detail_banner: mr.image('400x400', mr.color(), mr.cword(4,10)),
        time: "@integer(1553425967486,1553475967486)",
        details:{
          icon:mr.image('20x20', mr.color(), mr.cword(1,2)),//20X20尺寸
          auth:"@cname()",//百家姓
          content:"@cparagraph(10,40)"//正文
        }
      }
    ],
  })
};
