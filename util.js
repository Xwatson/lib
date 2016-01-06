/**
 * 
 */
function util() {
    //创建XMLHttpRequest
    function createHttpRequest() {
        var xmlHttp;
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        return xmlHttp;
    }
    /**
    * 发送ajax请求
    * url--url
    * method(post/get)
    * ansytype (true(异步)|false(同步))
    * params(参数)
    * functionName(回调方法名，不需要引号,这里只有成功的时候才调用)
    * (注意：这方法有二个参数，一个就是xmlhttp,一个就是要处理的对象)
    * obj需要到回调方法中处理的对象
    */
    function ajaxrequest(url, method, ansytype, params, callback, obj) {
        var xmlhttp = createHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                //HTTP响应已经完全接收才调用
                if (xmlHttp.status == 200) {
                    callback(xmlhttp, obj);
                }
            }
        };
        xmlhttp.open(method, url, ansytype);
        xmlhttp.send(params);
    }

    return {
        //获取元素by id or name
        getElement: function (id) {
            if (document.getElementById(id)) {
                return document.getElementById(id);
            }
            if (document.getElementsByName) {
                return document.getElementsByName(id);
            }
        },
        // 添加事件监听
        addEvent: function () {
            if (document.addEventListener) {
                return function (el, type, fn) {
                    if (el.length) {
                        for (var i = 0; i < el.length; i++) {
                            addEvent(el[i], type, fn);
                        }
                    } else {
                        el.addEventListener(type, fn, false);
                    }
                };
            } else {
                return function (el, type, fn) {
                    if (el.length) {
                        for (var i = 0; i < el.length; i++) {
                            addEvent(el[i], type, fn);
                        }
                    } else {
                        el.attachEvent('on' + type, function () {
                            return fn.call(el, window.event);
                        });
                    }
                };
            }
        } (),
        //ajax 操作方法
        //url:接口地址
        //method:方法（post/get)
        //ansytype:同步方式（true(异步)/false(同步) 默认true)
        //params:参数
        //callback:回调函数
        //obj:回调函数的参数
        ajax: function (url, method, ansytype, params, callback, obj) {
            var xmlhttp = createHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    //HTTP响应已经完全接收才调用
                    if (xmlHttp.status == 200) {
                        if (callback) {
                            callback(xmlhttp, obj);
                        }
                    }
                }
            };
            xmlhttp.open(method, url, ansytype == undefined ? true : false);
            xmlhttp.send(params);
        },
        //获取元素的样式值。
        getStyle: function (elem, name) {
            if (elem.style[name]) {
                return elem.style[name];
            }
            else if (elem.currentStyle) {
                return elem.currentStyle[name];
            }
            else if (document.defaultView && document.defaultView.getComputedStyle) {
                name = name.replace(/([A-Z])/g, "-$1");
                name = name.toLowerCase();
                var s = document.defaultView.getComputedStyle(elem, "");
                return s && s.getPropertyValue(name);
            }
            else {
                return null
            }
        },
        
        //获取元素相对于这个页面的x和y坐标。    
        getPageCoords: function (elem) {
            function pageX(elem) {
                return elem.offsetParent ? (elem.offsetLeft + pageX(elem.offsetParent)) : elem.offsetLeft;
            }

            function pageY(elem) {
                return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
            }
            return {
                X: pageX(elem),
                Y: pageY(elem)
            }
        },
        //获取元素相对于父元素的x和y坐标。    
        getParentCoords: function (elem) {
            function parentX(elem) {
                return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
            }
            function parentY(elem) {
                return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);
            }
            return {
                X: parentX(elem),
                Y: parentY(elem)
            }
        },
        //获取使用css定位的元素的x和y坐标。
        getCssCoords: function (elem) {
            function posX(elem) {
                return parseInt(util.getStyle(elem, "left"));
            }
            function posY(elem) {
                return parseInt(util.getStyle(elem, "top"));
            }
            return {
                X: posX(elem),
                Y: posY(elem)
            }
        },
        
        //获取元素使用css控制大小的高度和宽度    
        height: function (elem) {
            return parseInt(util.getStyle(elem, "height"));
        },
        width: function (elem) {
            return parseInt(utilgetStyle(elem, "width"));
        },
        getFullWidth: function (elem) {
            if (util.getStyle(elem, "display") != "none") {
                return util.width(elem) || elem.offsetWidth;
            }
            else {
                var old = util.resetCss(elem, { display: "block", visibility: "hidden", position: "absolute" });
                var w = elem.clientWidth || util.width(elem);
                util.restoreCss(elem, old);
                return w;
            }
        },
        //设置css，并保存旧的css
        resetCss: function (elem, prop) {
            var old = {};
            for (var i in prop) {
                old[i] = elem.style[i];
                elem.style[i] = prop[i];
            }
            return old;
        },
        restoreCss: function (elem, prop) {
            for (var i in prop) {
                elem.style[i] = prop[i];
            }
        },

        //显示
        show: function (elem) {
            elem.style.display = elem.$oldDisplay || " ";
        },
        //隐藏
        hide: function (elem) {
            var curDisplay = util.getStyle(elem, "display");
            if (curDisplay != "none") {
                elem.$oldDisplay = curDisplay;
                elem.style.display = "none";
            }
        },
        //设置透明度    
        setOpacity: function (elem, num) {
            if (elem.filters) {
                elem.style.filter = "alpha(opacity=" + num + ")";
            }
            else {
                elem.style.opacity = num / 100;
            }
        },
        //滑动    
        slideDown: function (elem) {
            var h = util.getFullHeight(elem);
            elem.style.height = "0px";
            util.show(elem);
            for (var i = 0; i <= 100; i += 5) {
                new function () {
                    var pos = i;
                    setTimeout(function () { elem.style.height = (pos / 100 * h) + "px"; }, (pos * 10));
                }
            }
        },
        //渐变
        fadeIn: function (elem) {
            util.show(elem);
            util.setOpacity(elem, 0);
            for (var i = 0; i <= 100; i += 5) {
                new function () {
                    var pos = i;
                    setTimeout(function () { util.setOpacity(elem, pos); }, (pos + 1) * 10);
                }
            }
        }
    }
}
