/**
 * 
 */
function util()
{
    //创建XMLHttpRequest
    function ceateHttpRequest() {
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
        var xmlhttp = ceateHttpRequest();
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
        addEvent:function(){
            if(document.addEventListener){
                return function(el,type,fn){
                    if(el.length){
                        for(var i=0;i<el.length;i++){
                            addEvent(el[i],type,fn);
                        }
                    }else{
                        el.addEventListener(type,fn,false);
                    }
                };
            }else{
                return function(el,type,fn){
                    if(el.length){
                        for(var i=0;i<el.length;i++){
                            addEvent(el[i],type,fn);
                        }
                    }else{
                        el.attachEvent('on'+type,function(){
                            return fn.call(el,window.event);
                        });
                    }
                };
            }
        }(),
        //ajax 操作方法
        //url:接口地址
        //method:方法（post/get)
        //ansytype:同步方式（true(异步)/false(同步) 默认true)
        //params:参数
        //callback:回调函数
        //obj:回调函数的参数
        ajax: function (url, method, ansytype, params, callback, obj) {
            var xmlhttp = ceateHttpRequest();
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
            xmlhttp.open(method, url, ansytype==undefined?true:false);
            xmlhttp.send(params);
        }

    }
}