(function(w,d,q){
   // var w = window, d = document;
    var targetInfo = {};
	var fnDownEvent = function(e){
        if( w.event ) {
            var fnGetTagValue = function () {
                var tag = w.event.srcElement.tagName.toLowerCase();
                var e = w.event.srcElement;
                switch (tag) {
                    case "a":
                        return e.firstChild.nodeValue;
                    case "input":
                        return e.value;
                    default:
                        return tag;
                }
            };

            var e = w.event.srcElement;
            targetInfo = {
                tag : e.tagName,
                value :  fnGetTagValue(),
                url : w.location.href,
                title : w.location.href,
                lang : window.navigator.language
            };
            /*
            targetInfo.tag = e.tagName;
            targetInfo.value = fnGetTagValue();
            targetInfo.url = w.location.href;
            targetInfo.title = document.title;
            targetInfo.lang = window.navigator.language;
            */
        }
	},
    addEvent = function(t,f,uc){
        w.addEventListener ? w.addEventListener(t, f, uc) : w.attachEvent && w.attachEvent("on" + t, f);
    },
    fnImageBeacon = function () {
        var domain =  'https://qtcollector.herokuapp.com';
        var img = new Image();
        img.onload = img.onerror = function (){

        };
        var src = domain + '/qtLogger' + '?' + 'cookieId='+fnCookie()+'&value='+fnGetValues(targetInfo)+'&cookieExpires=' + fnCookieExpires();
        img.src = src;
    },
    fnCookie = function (){
        function setCookie(cname, cvalue, exdays){
            var d = new Date();
            d.setDate(d.getDate() + exdays);
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires +"; path=/;";
        }

        function getCookie(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length;i++){
                var c = ca[i];
                while(c.charAt(0)==' ') c = c.substring(1);
                if(c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        }

        function makeCookieKey(){
            var d = new Date();
            return d.getTime();
        }

        var key = "_qtId";
        return getCookie(key) || setCookie(key, makeCookieKey(), 90);
    },
    fnCookieExpires = function (){
        return '90';
    }
    fnGetValues = function (obj){
        return JSON.stringify(obj)
    }

    fnUnloadEvent  = function(){
	    w[q].push(targetInfo);
        fnImageBeacon();
    };

	w[q] = w[q] || [];

    addEvent("beforeunload",fnUnloadEvent, true);
    addEvent("mousedown",fnDownEvent, true);

})(window,document,"gtQ");