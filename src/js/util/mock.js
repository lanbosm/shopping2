import Mock from 'mockjs'
//不懂的请看
//http://www.jianshu.com/p/8626d28f226f
//http://www.cnblogs.com/Leo_wl/p/6693211.html
const baseURL='http://192.168.1.69:82';

//测试接口
var re =new RegExp(`${baseURL}/testapi`,"i");
export let test1=Mock.mock(re,'GET', {
	'code':'20000',
    'list|6': [
        {   'name':'@cname',
            'cid |+1':'@id',
            'email':'@email',
            'age|20-30': 50,
            'photo':Mock.Random.image('200x200', '#999999', '#FFFFFF', '@name()'),          //随机头像
           // 'tel': /^1[0-9]{10}$/,
            'moblie|1':['13531544954','13632250649','15820292420','15999905612'], //在数组中随机找一个
            'balance|2000-10000.2':1, //1-100 中随机生成一个保留两位小数点
            'balance|2000-10000.2':1, //1-100 中随机生成一个保留两位小数点
            'point|0-10000':0,
            //'classroom|1':['精品语文班','精品作业A班','英语班','语文班'],
            'regtime':'@datetime'


        }
    ],
    'msg':'响应成功'
})


var re =new RegExp(`${baseURL}/logout`,"i");
export let test2=Mock.mock(re, {
    "logout": true
})


