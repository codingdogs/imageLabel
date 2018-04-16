function imageLabel(c) {
    if (!c.img) {
        alert('请填写图片地址');
        return false;
    }
    var config = {
        only: false, //选中是否只显示自己
        shade: true, //遮罩
        editPop: true, //修改内容弹窗
        close: function () {
            return true;
        },
        edit: function () {

        },
        startArea: function () {

        },
        clickArea: function () {

        }
    }
    config = $.extend(config, c);
    $('imageLable-box').remove();
    var html = `<div class="imageLabel-box">
    <div class="imageLabel">
        <div class="imageLabel-img-boxs">
            <span class="imageLabel-img-body">
                <div class="imageLabel-loading-body">
                    <div class="imageLabel-loading"></div>
                </div>
                <div class="imageLabel-jisuan" style="position: relative;overflow:hidden;">
                    <img src="${c.img}" alt="" style='position: absolute;with:100%;height:100%;' class="imageLabel-img">
                    <div class="imageLabel-content">

                    </div>
                </div>
            </span>
            <ul class="imageLabel-drap-menu">
                <div style='overflow: hidden;'>
                    <div style="cursor: pointer;" class="imageLabel-delete btns">删除</div>
                    <div style="cursor: pointer;" class="imageLabel-edit btns">编辑</div>
                </div>
                <!--

                <li style='padding:10px;'>
                    <i></i>红色
                </li>
                <li style='padding:10px;'>
                    <i></i>红色
                </li>
                -->
            </ul>
        </div>
        <div class="imageLabel-buttons">
            <div class="imageLabel-btn imageLabel-closes">关闭</div>
            <div class="imageLabel-btn">确定</div>
        </div>
        <div class="imageLabel-input" style='background-color:rgba(255,255,255,0.3);'>
            <div class="imageLabel-input-box" style='width:250px;'>
                <div style='background-color: #333;'>
                    <div style='color:#fff;overflow:hidden;line-height: 40px;'>
                        <span style='float: left;margin-left:20px;'>编辑内容</span>
                        <span class="imageLabel-input-close" style='float:right;margin-right:20px;cursor: pointer;'>X</span>
                    </div>
                </div>

                <div style='background: #fff;padding:20px;'>
                    <input type="text" value='' max='10' style='width:100%;padding:5px;'>
                    <div style='margin-top:20px;overflow:hidden;'>
                        <div class="imageLabel-input-close imageLabel-btn" style='float: left;width:90px;background-color: #959595;'>取消</div>
                        <div class="imageLabel-input-ok imageLabel-btn" style='float: right;width:90px;'>确定</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    var $html = $(html);
    // $html.find('')
    function next() {
        var obj, $d, objt, $t, button, objm, $ii;
        var s_time;
        var flag = false,
            flag_target = false,
            flag_i = false;
        var $menu = $('.imageLabel-drap-menu');
        $('.imageLabel-content')[0].oncontextmenu = function () {
            return false;
        }
        $menu[0].oncontextmenu = function () {
            return false;
        }
        $('body').click(function (e) {
            $menu.hide();
        })
        $('.imageLabel-content').mousedown(function (e) {
            button = e.button;
            if (e.button != 2) { //左键点击事件
                $menu.hide();
                if (config.only) {
                    $(this).find('.imageLabel-imgDrop').hide();
                }
                flag = true;
                $t = $(this);
                obj = {
                    x: $t.offset().left, //box--left
                    y: $t.offset().top, //box--top
                    cx: e.clientX, //鼠标距离网页左边的距离
                    cy: e.clientY,
                    w: $t.width(),
                    h: $t.height(),
                };
                objt = {
                    x: (obj.cx - obj.x) / obj.w,
                    y: (obj.cy - obj.y) / obj.h,
                    ex: 0,
                    ey: 0
                }
                if ($(e.target).hasClass('imageLabel-imgDrop')) {
                    flag_target = true;
                    $d = $(e.target);
                    objm = JSON.parse($d.attr('data-json'));
                    objt = $.extend({}, objm);
                    config.startArea();
                } else if ($(e.target).hasClass('imageLable-i')) {
                    flag_i = true;
                    $ii = $(e.target);
                    $d = $(e.target).parents('.imageLabel-imgDrop');
                    objm = JSON.parse($d.attr('data-json'));
                    objt = $.extend({}, objm);
                } else {
                    s_time = new Date().getTime();
                    flag_target = false;
                    $d = $(
                        '<div class="imageLabel-imgDrop"><span></span><div class="imageLable-i-s"></div></div>'
                    );
                    for (let index = 0; index < 8; index++) {
                        $d.find('.imageLable-i-s').append('<i class="imageLable-i">')
                    }
                    if (config.shade) {
                        for (let index = 0; index < 4; index++) {
                            $d.append('<em>')
                        }
                    }

                    $d.appendTo($t);
                }
                $d.addClass('imageLabel-drop-now');
            } else {
                if ($(e.target).hasClass('imageLabel-imgDrop')) {
                    $d = $(e.target);
                    setTimeout(() => {
                        $menu.css({
                            left: e.clientX,
                            top: e.clientY
                        }).show();
                    }, 0);
                }
            }

        });
        $('.imageLabel-img-boxs').mousemove(function (e) {
            if (flag) {
                if (flag_target) {
                    objt.x = objm.x + (e.clientX - obj.cx) / obj.w;
                    objt.ex = objm.ex + (e.clientX - obj.cx) / obj.w;
                    objt.y = objm.y + (e.clientY - obj.cy) / obj.h;
                    objt.ey = objm.ey + (e.clientY - obj.cy) / obj.h;
                } else if (flag_i) {
                    var i = $ii.index();
                    if (i == 0) {
                        objt.x = objm.x + (e.clientX - obj.cx) / obj.w;
                        objt.y = objm.y + (e.clientY - obj.cy) / obj.h;
                    }
                    if (i == 1) {
                        objt.ex = objm.ex + (e.clientX - obj.cx) / obj.w;
                        objt.y = objm.y + (e.clientY - obj.cy) / obj.h;
                    }
                    if (i == 2) {
                        objt.ex = objm.ex + (e.clientX - obj.cx) / obj.w;
                        objt.ey = objm.ey + (e.clientY - obj.cy) / obj.h;
                    }
                    if (i == 3) {
                        objt.x = objm.x + (e.clientX - obj.cx) / obj.w;
                        objt.ey = objm.ey + (e.clientY - obj.cy) / obj.h;

                    }
                    if (i == 4) {
                        objt.y = objm.y + (e.clientY - obj.cy) / obj.h;
                    }
                    if (i == 5) {
                        objt.ex = objm.ex + (e.clientX - obj.cx) / obj.w;
                    }
                    if (i == 6) {
                        objt.ey = objm.ey + (e.clientY - obj.cy) / obj.h;
                    }
                    if (i == 7) {
                        objt.x = objm.x + (e.clientX - obj.cx) / obj.w;
                    }

                } else {
                    objt.ex = (e.clientX - obj.x) / obj.w;
                    objt.ey = (e.clientY - obj.y) / obj.h;
                }
                //解决超出问题
                // // var b = $.extend({}, objt);
                if (objt.y < 0) {
                    objt.y = 0
                }
                if (objt.x < 0) {
                    objt.x = 0
                }
                if (objt.ey < 0) {
                    objt.ey = 0
                }
                if (objt.ex < 0) {
                    objt.ex = 0
                }
                if (objt.ey > 1) {
                    objt.ey = 1;
                }
                if (objt.ex > 1) {
                    objt.ex = 1;
                }
                if (objt.y > 1) {
                    objt.y = 1;
                }
                if (objt.x > 1) {
                    objt.x = 1;
                }
                $d.css({
                    left: (objt.ex - objt.x > 0 ? objt.x : objt.ex) * 100 + '%',
                    top: (objt.ey - objt.y > 0 ? objt.y : objt.ey) * 100 + '%',
                    width: Math.abs(objt.ex - objt.x) * 100 + '%',
                    height: Math.abs(objt.ey - objt.y) * 100 + '%',
                })
            }
        }).mouseup(function (e) {
            if (flag) {
                var o = {

                }
                // var j = $.extend({}, objt);
                if (objt.x < objt.ex) {
                    o.x = objt.x
                    o.ex = objt.ex;
                } else {
                    o.x = objt.ex
                    o.ex = objt.x;
                }
                if (objt.y < objt.ey) {
                    o.y = objt.y
                    o.ey = objt.ey;
                } else {
                    o.y = objt.ey
                    o.ey = objt.y;
                }

                $d.attr('data-json', JSON.stringify(o));
                if (Math.abs(e.clientX - obj.cx) > 10 &&
                    Math.abs(e.clientY - obj.cy) > 10 && !flag_target && !flag_i) {
                    if (config.editPop) {
                        $('.imageLabel-input').addClass('imageLabel-active').find('input').focus().val('');
                    }
                    config.edit($d)
                } else {
                    if (!flag_target && !flag_i) {
                        // alert(1)
                        $d.remove();
                    }
                }
                flag = false;
                flag_target = false;
                flag_i = false;
                //让小的方块层级更高，便于选中；
                var $drops = $('.imageLabel-imgDrop');
                var d = [];
                $drops.each(function (index, obj) {
                    var n = $(obj).width() * $(obj).height();
                    d.push(n);
                });
                console.log(d);
                $drops.each(function (index, obj) {
                    var $t = $(obj);
                    var n = $t.width() * $t.height();
                    var num = 0;
                    $.each(d, function (i, o) {
                        console.log(o)
                        if (n <= o) {
                            num++;
                        }
                    })
                    $t.css({
                        'z-index': num
                    })
                });
                $d.removeClass('imageLabel-drop-now');

            }
            if (config.only) {
                $(this).find('.imageLabel-imgDrop').show();
            }
        });
        var $input = $('.imageLabel-input'),
            $i = $input.find('input');
        $input.find('.imageLabel-input-close').click(function () { //关闭
            $input.removeClass('imageLabel-active')
        })
        $input.find('.imageLabel-input-ok').click(function () {
            $d.find('span').html($i.val());
            $input.removeClass('imageLabel-active');
        })
        $('.imageLabel-delete').click(function () { //删除操作
            console.log($d)
            $d.remove();
            $menu.hide();
        })
        $('.imageLabel-edit').click(function () { //修改操作
            config.edit($d)
            if (config.editPop) {
                $input.addClass('imageLabel-active').find('input').focus().val($d.find('span').html());
            }
            $menu.hide();
        })
        $i.keydown(function (e) {
            if (e.keyCode == 13) { //回车事件
                $input.find('.imageLabel-input-ok').click();
            }
        })
        $(window).keydown(function (e) { //esc 事件
            if (e.keyCode == 27 && $input.hasClass('imageLabel-active')) {
                $input.removeClass('imageLabel-active')
            }

        })

        function j() {
            var $img = $('.imageLabel-img');
            var $j = $('.imageLabel-jisuan')
            var w = $img[0].naturalWidth,
                h = $img[0].naturalHeight;
            var w1 = $img.parents('.imageLabel-img-body').width(),
                h1 = $img.parents('.imageLabel-img-body').height();
            if (w / h > w1 / h1) {
                $j.css({
                    width: '100%',
                    height: h / w * w1
                })
            } else {
                $j.css({
                    height: '100%',
                    width: w / h * h1
                })
            }
            // $('.imageLabel-content').css({
            //     left:$img.position().left,
            //     top:$img.position().left,
            //     width:$img.width(),
            //     height:$img.height()
            // })
        }
        j();
        $(window).resize(j);
        //关闭整个事件
        function getData() {
            var d = [];
            $('.imageLabel-imgDrop').each(function () {
                d.push(JSON.parse($(this).attr('data-json')));
            })
            return d;
        }
        $('.imageLabel-closes').click(function () {
            if (config.close(getData())) { //

            }
        })
    }
    $html.find('.imageLabel-img').one('load', function () {
        $(this).addClass('imageLabel-img-active');
        $('.imageLabel-loading-body').hide();
        next();
    })
    $html.appendTo('body');
    setTimeout(function () {
        $html.addClass('imageLabel-box-active');
    }, 0)
}
