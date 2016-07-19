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
    fnSendData = function () {
        var domain =  'https://fierce-garden-33452.herokuapp.com';



    }


    fnUnloadEvent  = function(){
	    w[q].push(targetInfo);

    };

	w[q] = w[q] || [];

    addEvent("beforeunload",fnUnloadEvent, true);
    addEvent("mousedown",fnDownEvent, true);

})(window,document,"gtQ");