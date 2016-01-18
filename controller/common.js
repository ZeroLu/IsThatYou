/**
 * Created by s152047 on 2016/1/9.
 */
var dash = $("#dashboard");
$('form').hide();
for(var i = 0; i<commandTotal.length; i++){
    for(var j=0; j<commandTotal[i].commands.length; j++){
        dash.append("<div>"
            +"<a class='cmd-btn waves-effect waves-light btn' style='margin: 10px;' data-type='"+commandTotal[i].type+"' data-command='"+commandTotal[i].commands[j]+"'>"
            +"<b>Type: </b>"+commandTotal[i].type+ "; <b>Command: </b>" + commandTotal[i].commands[j]
            +"</a>"
            +"</div>"
        );
    }
}
dash.append();
var socket = io();
$('.cmd-btn').click(function () {
    var type = $(this).attr('data-type');
    var command = $(this).attr('data-command');
    sendMsg(type,command);
});

var defaultSettings = {
    parent:{
        mic:true,
        camera:false,
        wifi:true
    },
    kid:{
        mic:true,
        camera:false,
        wifi:false
    },
    old:{
        mic:true,
        camera:true,
        wifi:true
    }
};
var privacySettings = {
    parent:{
        mic:false,
        camera:false,
        wifi:false
    },
    kid:{
        mic:false,
        camera:false,
        wifi:false
    },
    old:{
        mic:true,
        camera:false,
        wifi:false
    }
};
var comfortableSettings = {
    parent:{
        mic:true,
        camera:false,
        wifi:true
    },
    kid:{
        mic:true,
        camera:false,
        wifi:true
    },
    old:{
        mic:true,
        camera:true,
        wifi:true
    }
};
var sleepSettings = {
    parent:{
        mic:true,
        camera:true,
        wifi:true
    },
    kid:{
        mic:true,
        camera:true,
        wifi:true
    },
    old:{
        mic:true,
        camera:true,
        wifi:true
    }
};

var modes = new Vue({
    el: '#modes',
    data: {mode:"default"},
    methods: {
        clickModes: function(singlemode){
            Vue.nextTick(function () {
                modes.$data.mode = singlemode;
                switch (singlemode){
                    case 'privacy':
                        settings.$data = privacySettings;
                        break;
                    case 'comfortable':
                        settings.$data = comfortableSettings;
                        break;
                    case 'night':
                        settings.$data = sleepSettings;
                        break;
                    default :
                        break;
                }
                setTimeout(function(){
                    if (typeof settingsRender == 'function') {
                        settingsRender();
                    }
                    sendMsg("setting",settings.$data);
                },500);
            });

        }
    }
});
window.setInterval(function () {
    var soundVol = 50*Math.random();
    //sendMsg("sound",document.getElementById("demo2").innerHTML);
    sendMsg("sound",soundVol);
},1000);

var settings = new Vue({
    el: '#appWrap',
    data: defaultSettings,
    methods: {
        sendSettings: function(event){
            modes.$data.mode = "default";
            Vue.nextTick(function () {
                setTimeout(function(){
                    if (typeof settingsRender == 'function') {
                        settingsRender();
                    }
                    sendMsg("setting",settings.$data);
                },500);
            });

        },
        clickSettings: function(singleSetting){
            console.log(singleSetting);
            modes.$data.mode = "default";
            switch (singleSetting){
                case  "parent.mic":
                    settings.$data.parent.mic=!settings.$data.parent.mic;
                    break;
                case  "parent.camera":
                    settings.$data.parent.camera=!settings.$data.parent.camera;
                    break;
                case  "parent.wifi":
                    settings.$data.parent.wifi=!settings.$data.parent.wifi;
                    break;
                case  "kid.mic":
                    settings.$data.kid.mic=!settings.$data.kid.mic;
                    break;
                case  "kid.camera":
                    settings.$data.kid.camera=!settings.$data.kid.camera;
                    break;
                case  "kid.wifi":
                    settings.$data.kid.wifi=!settings.$data.kid.wifi;
                    break;
                case  "old.mic":
                    settings.$data.old.mic=!settings.$data.old.mic;
                    break;
                case  "old.camera":
                    settings.$data.old.camera=!settings.$data.old.camera;
                    break;
                case  "old.wifi":
                    settings.$data.old.wifi=!settings.$data.old.wifi;
                    break;
                default :
                    break;

            }
            settings.$data.singleSetting = !settings.$data.singleSetting;
            Vue.nextTick(function () {
                setTimeout(function(){
                    if (typeof settingsRender == 'function') {
                        settingsRender();
                    }
                    sendMsg("setting",settings.$data);
                },500);
            });

        },
        submitSettings: function(event){
            Vue.nextTick(function () {
                setTimeout(function(){
                    if (typeof settingsRender == 'function') {
                        settingsRender();
                    }
                    sendMsg("setting",settings.$data);
                },500);
            });

        }
    }
});

var sounds = new Vue({
    el: '#audioPart',
    data: {
        oldSound:10,
        kidSound:11,
        parentSound:13
    },
    methods: {

    }
});


var alarmAudio = new Audio('./audio/alarm.mp3');
var isThatYouAudio = new Audio('./audio/IsThatYou.mp3');


$('form').submit(function(){
    var input = $('#m').val();
    sendMsg("free",input);
    $('#m').val('');
    return false;
});
function sendMsg(type,cmd){
    var msg = {
        "client": clientName,
        "type":type,
        "command": cmd
    };
    socket.emit('chat message', msg);
}

$("document").ready(function(){
    //$("#unknownSoundVideo").get(0).controls =false;
    $('.myHTMLvideo').click(function() {
        $(this).get(0).paused ? $(this).get(0).play() : $(this).get(0).pause();
    });
    window.setInterval(function () {
        $("#messages").html("");
    },30000);


});

socket.on('chat message', function(msg){
    //console.log(msg.command);
    if(msg.type !="sound"){
        $('#messages').append($('<li>').html("client: "+msg.client+" type: "+msg.type+" command: "+msg.command));
    }
    if(msg.type=="setting"){
        settings.$data = msg.command;
        if (typeof settingsRender == 'function') {
            settingsRender();
        }
    }
    else if(msg.type=="detection"){
        switch (msg.command){
            case "electricSound":
                if (typeof onElectricSoundDetection == 'function'){
                    onElectricSoundDetection();
                }
                break;
            case "timeChanged":
                onTimeChangedDetection();
                break;
            case "thief":
                onThiefDetection();
                break;
            case"notMatch":
                onNotMatchDetection();
                break;
            case"dayLockScreen":
                onDayLockScreenDetection();
                break;
            default :
                break;
        }
    }
    else if(msg.type=="action"){
        switch (msg.command){
            case "addToDb":
                onAddToDbAction();
                break;
            case "cancelAlarm":
                onCancelAlarmAction();
                break;
            default :
                break;
        }
    }
    else if(msg.type == "sound"){
        switch (msg.client){
            case "old":
                if(typeof (onOldSound == 'function')){
                    onOldSound(msg.command);
                }
                break;
            case "kid":
                if(typeof (onKidSound == 'function')) {
                    onKidSound(msg.command);
                }
                break;
            case "parent":
                if(typeof (onParentSound == 'function')) {
                    onParentSound(msg.command);
                }
                break;
            default :
                break;
        }
    }
});
function onOldSound(soundLevel){
    sounds.$data.oldSound = soundLevel;
}

function onKidSound(soundLevel){
    sounds.$data.kidSound = soundLevel;
}

function onParentSound(soundLevel){
    sounds.$data.parentSound = soundLevel;
}
