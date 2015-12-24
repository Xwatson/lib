/**
 * 
 */
function util()
{
    //����XMLHttpRequest
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
    * ����ajax����
    * url--url
    * method(post/get)
    * ansytype (true(�첽)|false(ͬ��))
    * params(����)
    * functionName(�ص�������������Ҫ����,����ֻ�гɹ���ʱ��ŵ���)
    * (ע�⣺�ⷽ���ж���������һ������xmlhttp,һ������Ҫ����Ķ���)
    * obj��Ҫ���ص������д���Ķ���
    */
    function ajaxrequest(url, method, ansytype, params, callback, obj) {
        var xmlhttp = ceateHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                //HTTP��Ӧ�Ѿ���ȫ���ղŵ���
                if (xmlHttp.status == 200) {
                    callback(xmlhttp, obj);
                }
            }
        };
        xmlhttp.open(method, url, ansytype);
        xmlhttp.send(params);
    }
    return {
        //��ȡԪ��by id or name
        getElement: function (id) {
            if (document.getElementById(id)) {
                return document.getElementById(id);
            }
            if (document.getElementsByName) {
                return document.getElementsByName(id);
            }
        },
        // ����¼�����
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
        //ajax ��������
        //url:�ӿڵ�ַ
        //method:������post/get)
        //ansytype:ͬ����ʽ��true(�첽)/false(ͬ��) Ĭ��true)
        //params:����
        //callback:�ص�����
        //obj:�ص������Ĳ���
        ajax: function (url, method, ansytype, params, callback, obj) {
            var xmlhttp = ceateHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    //HTTP��Ӧ�Ѿ���ȫ���ղŵ���
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