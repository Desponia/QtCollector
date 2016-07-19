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
            targetInfo.tag = e.tagName;
            targetInfo.value = fnGetTagValue();
            targetInfo.url = w.location.href;
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
        img.src = domain + '/qtLogger' + '?' + 'cookieId=11&value=22&cookieExpires=33';
    }

    fnUnloadEvent  = function(){
	    w[q].push(targetInfo);
        fnImageBeacon();
    };

	w[q] = w[q] || [];

    addEvent("beforeunload",fnUnloadEvent, true);
    addEvent("mousedown",fnDownEvent, true);

})(window,document,"gtQ");