var ipcRenderer = require('electron').ipcRenderer;
var EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.setMaxListeners(Infinity);
var sn = 0;
global.LavaSDK= {
    "callMain" : (fn,argv , cbk) =>  {
        if (cbk && 'function' === typeof cbk){
            var channel_auto = Date.now().toString(36) + '_' + (sn++);
            myEmitter.once(channel_auto, cbk)
        }
        ipcRenderer.sendToHost(fn, {client_channel : channel_auto || null,client_data: argv})
    },
    "off" : (event_name , cbk) => {
        if (cbk){
            myEmitter.removeListener(event_name , cbk)
        }else{
            myEmitter.removeAllListeners(event_name)
        }
    },
    "on" : (event_name, cbk) => {
        myEmitter.on(event_name ,cbk)
    }
};
function setCookie(c_name, value, expiredays,domain) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = date.toUTCString();
    }

    if (undefined === domain) domain = domain_root
    domain = domain ? '; domain=' + domain : ''
    document.cookie = name + "=" + value + "; expires=" + expires + "; path=/" + domain
}
/*
window.onload = function () {
    $('.navigation-bar').remove()
}*/
