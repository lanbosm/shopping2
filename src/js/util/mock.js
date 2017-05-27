import Mock from 'mockjs'
//不懂的请看
//http://www.jianshu.com/p/8626d28f226f
//http://www.cnblogs.com/Leo_wl/p/6693211.html
const baseURL='192.168.1.69:82';

//测试接口
var re =new RegExp(`${baseURL}/testapi/`,"i");
export let test1=Mock.mock(re,'get',{
	'code':'20000',
    'page': {
        "pageNum":1,"pageSize":5,"size":5,"orderBy":null,"startRow":1,"endRow":5,"total":16,"pages":3,
        'list|5': [
            {
                'ssss':123,
                'name': '@cname',
                'nickname':'@name',
                'cid': '@id',
                'email': '@email',
                'age|20-30': 50,
                'headPortrait': Mock.Random.image('200x200', '#999999', '#FFFFFF', '@name()'),          //随机头像
                // 'tel': /^1[0-9]{10}$/,
                'phone|1': ['13531544954', '13632250649', '15820292420', '15999905612'], //在数组中随机找一个
                'balance|2000-10000.2': 1, //1-100 中随机生成一个保留两位小数点
                'balance|2000-10000.2': 1, //1-100 中随机生成一个保留两位小数点
                'point|0-10000': 0,
                //'classroom|1':['精品语文班','精品作业A班','英语班','语文班'],
                'regtime': '@datetime',
                'appCoupons|0-4':[
                    {

                        'amount|1': ['20', '30', '50'],
                        'conditionLine|1': ['200', '300', '500'],
                        'endDate':'@date("yyyy-MM-dd")',
                        'toSbName':'sss',
                        'type|1':['fullReduce','fullBack']
                    }

                ]

            }
        ],
    },
    'msg':'响应成功'
})


var re =new RegExp(`${baseURL}/logout`,"i");
export let test2=Mock.mock(re, {
    "logout": true
})


