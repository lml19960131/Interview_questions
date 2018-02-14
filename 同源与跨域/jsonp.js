let util = {};
util.indexOf = function (array, item) {
    for(let i=0; i < array.length; i++){
        if(array[i] === item){
            return i
        }
    }
    return -1;
};

util.isFunction = function (source) {
    return '[Object Function]' === Object.prototype.toString.call(source);
};

util.isIE = function () {
    let myNavigator = navigator.userAgent.toLowerCase();
    return (myNavigator.indexOf('MISE') !== -1 ? parseInt(myNavigator.split('MISE')[1]) : false);
};

util.copyObj = function (dst, obj) {
    for(let i in obj){
        if(obj.hasOwnProperty(i)) {
            dst[i] = obj[i]
        }
    }
};

util.getRandomString = function (prefix) {
    return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

util.createScript = function (url, charset) {
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    charset && script.setAttribute('charset', charset);
    script.setAttribute('src', url);
    script.async = true;
    return script
};

util.jsonp = function (url, onsuccess, onerror, charset) {
    let callbackName = util.getRandomString('tt_palyer');
    window[callbackName] = function () {
        if(onsuccess && util.isFunction(onsuccess)) {
            onsuccess(arguments[0]);
        }
    };
    let script = util.createScript(url + '&callback=' + callbackName, charset);
    script.onload = script.onreadystatechange = function () {
        if(!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            if(script.parentNode) {
                script.parentNode.removeChild(script);
            }
            window[callbackName] = null;
        }
    };
    script.onerror = function () {
        if(onerror && util.isFunction(onerror)){
            onerror();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
};
