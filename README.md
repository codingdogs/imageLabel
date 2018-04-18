# imageLabel

>基于jquery的图片标注插件（之后会有其他版本，请关注）

### example (图片展示)
![pic](https://codingdogs.github.io/imageLabel/dist/images/pic.gif)

### [demo](https://codingdogs.github.io/imageLabel/dist/index.html)

### start
>引入jquery，以及插件的css，js
```html
<link rel="stylesheet" type="text/css" href="jquery.imageLabel.min.css">
<script src="jquery.min.js"></script>
<script src="jquery.imageLabel.min.js"></script>
```
### use
```javascript
var $imageLabel = imageLabel({
    img: 'https://i1.mifile.cn/f/i/18/mitv4A/40/build.jpg', //要修改的图片地址
    editPop: true, //调用默认弹窗
    data: [{
        "x": 0.22570911285455642,
        "y": 0.37189688291389805,
        "ex": 0.45141822570911283,
        "ey": 0.6551396000355341,
        "name": "小米电视"
    }, {
        "x": 0.5932407966203983,
        "y": 0.36803448222587576,
        "ex": 0.8117079058539529,
        "ey": 0.6512771993475117,
        "name": "小米电视"
    }],
    close: function (d) { //关闭按钮事件 return false 阻止默认关闭
        console.log(d);//选区数据
        return true;
    },
    confirm: function (d) { //确定按钮事件 return false 阻止默认关闭
        console.log(d);//选区数据
        return true;
    }
})


//$imageLabel方法
$imageLabel.getData()//获取选区数据，返回array
$imageLabel.clearArea()//清除选区
$imageLabel.close()//关闭
```

### props

| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ---------------------------------------- |
| img        | String  |             | 必填值，图片路径                                     |
| data     | Array  |     []      |区域数据，默认渲染|
| editPop     | Boolean  |     true      | 是否启用默认修改弹窗 |
| only     | Boolean  |     false      | 选中单个区域是否隐藏其他区域，更加洁净 |
| shade     | Boolean  |     true      | 是否显示遮罩 |
| close     |Function  |           | 关闭按钮事件 return false 阻止默认关闭 |
| confirm     |Function  |           | 确定按钮事件 return false 阻止默认关闭 |
