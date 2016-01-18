/**
 * Created by s152047 on 2016/1/9.
 */
var clientName = "parent";
var commandTotal = [
    {
        type:"action",
        commands:[
            "addToDb",
            "cancelAlarm"
        ]
    }
];

var modeScreen = $("#modeScreen");
var notifyLockScreen = $("#notifyLockScreen");
var dayLockScreen = $("#dayLockScreen");
var nightLockScreen = $("#nightLockScreen");
var configureScreen = $("#configureScreen");
var alarmLockScreen = $("#alarmLockScreen");
var screens = [modeScreen, notifyLockScreen, dayLockScreen, nightLockScreen, configureScreen, alarmLockScreen];

var modeBtn = $("#security_mode_button");
var modeMenu = $("#security_mode_menu");
var parentSettingBtn = $("#alarm5");
var kidSettingBtn = $("#alarm3");
var oldSettingBtn = $("#alarm2");


var settingLayer = $(".settingLayer");
var oldSettingLayer = $("#oldSettingLayer");
var kidSettingLayer = $("#kidSettingLayer");
var parentSettingLayer = $("#parentSettingLayer");
var settingLayers = [oldSettingLayer, kidSettingLayer, parentSettingLayer];

var deviceTab = $(".deviceTab");

var notificationBlock = $("#unknown_sound_notification");
var addMenu = $("#add_menu");
var addMenuRect = addMenu.find("rect");
var dismissMenu = $("#dismiss_menu");
var configureBackBtn = $("#configure_back_btn");
var configureVideoPlay = $("#configure_video_play");

var alarmActionBlk = $("#video_play");
var alarmVideoPlay = $("#alarm_video_play");

$("document").ready(function(){
    addMenu.hide();
    switchScreen(modeScreen);
    mapAnimation();
    modeBtn.mousedown(function () {
        modeMenu.fadeToggle();
    });
    notificationBlock.mousedown(function () {
        switchScreen(configureScreen);
    });
    configureBackBtn.mousedown(function () {
        switchScreen(dayLockScreen);
    });
    addMenuRect.mousedown(function () {
        Materialize.toast('Sound added to the database.', 8000);
        sendMsg(commandTotal[0].type,commandTotal[0].commands[0]);
        addMenu.fadeToggle();
    });
    dismissMenu.mousedown(function () {
        console.log(this);
        addMenu.fadeToggle();
    });
    
    alarmActionBlk.mousedown(function () {
        console.log(this);
        sendMsg(commandTotal[0].type,commandTotal[0].commands[1]);
    });
    alarmVideoPlay.mousedown(function () {
        console.log(this);
        playAlarmVideo();
    });
    oldSettingBtn.mousedown(function () {
        switchSettingLayer(oldSettingLayer);
    });
    kidSettingBtn.mousedown(function () {
        switchSettingLayer(kidSettingLayer);
    });
    parentSettingBtn.mousedown(function () {
        switchSettingLayer(parentSettingLayer);
    });
});

function mapAnimation(){
    function alarm2() {
        //var takeMagnitude = document.getElementById("demo2").innerHTML;
        var takeMagnitude = sounds.$data.oldSound;
        for (var i = 0; i < 1; i++) {
            d3.select("#alarm2 polygon:nth-child(" + (i + 1) + ")").attr("fill", "rgba(0, 200, 100,  0.8)").transition().delay(100).duration(100).attr("fill", "rgba(0, 200, 100,  0.8)");
        }
        for (var i = 1; i < 7; i++) {
            d3.select("#alarm2 polygon:nth-child(" + (i + 1) + ")").attr("fill", "black").transition().delay(i * 200).duration(200).attr("fill", "rgba(200, 40, 100,  " + takeMagnitude/20 + ")");
        }
        for (var i = 7; i < 20; i++) {
            d3.select("#alarm2 polygon:nth-child(" + (i + 1) + ")").attr("fill", "black").transition().delay(i * 100).duration(100).attr("fill", "rgba(5, 84, 200,  "+ takeMagnitude/20 + ")");
        }
    }
    setInterval(alarm2, 1000);

    function alarm3() {
        var takeMagnitude = sounds.$data.kidSound;
        for (var i = 0; i < 1; i++) {
            d3.select("#alarm3 polygon:nth-child(" + (i + 1) + ")").attr("fill", "rgba(0, 200, 100,  0.8)").transition().delay(100).duration(100).attr("fill", "rgba(0, 200, 100,  0.8)");
        }
        for (var i = 1; i < 7; i++) {
            d3.select("#alarm3 polygon:nth-child(" + (i + 1) + ")").attr("fill", "black").transition().delay(i * 200).duration(200).attr("fill", "rgba(200, 40, 100,  " + takeMagnitude/20 + ")");
        }
        for (var i = 7; i < 20; i++) {
            d3.select("#alarm3 polygon:nth-child(" + (i + 1) + ")").attr("fill", "black").transition().delay(i * 100).duration(100).attr("fill", "rgba(5, 84, 200,  "+ takeMagnitude/20 + ")");
        }
    }
    setInterval(alarm3, 1000);


    function alarm5() {
        var takeMagnitude = sounds.$data.parentSound;
        for (var i = 0; i < 1; i++) {
            d3.select("#alarm5 polygon:nth-child(" + (i + 1) + ")").attr("fill", "rgba(0, 200, 100,  0.8)").transition().delay(100).duration(100).attr("fill", "rgba(0, 200, 100,  0.8)");
        }
        for (var i = 1; i < 7; i++) {
            d3.select("#alarm5 polygon:nth-child(" + (i + 1) + ")").attr("fill", "black").transition().delay(i * 200).duration(200).attr("fill", "rgba(200, 40, 100,  " + takeMagnitude/20 + ")");
        }
        for (var i = 7; i < 20; i++) {
            d3.select("#alarm5 polygon:nth-child(" + (i + 1) + ")").attr("fill", "black").transition().delay(i * 100).duration(100).attr("fill", "rgba(5, 84, 200,  "+ takeMagnitude/20 + ")");
        }
    }
    setInterval(alarm5, 1000);
}
function switchSettingLayer(settingLayer){
    for(var index in settingLayers){
        if(settingLayers.hasOwnProperty(index))
            settingLayers[index].hide();
    }
    settingLayer.show();
}
function switchScreen(screen){
    for(var index in screens){
        if(screens.hasOwnProperty(index))
        screens[index].hide();
    }
    screen.show();
}
function playAlarmVideo(){

}
function onElectricSoundDetection(){
    switchScreen(notifyLockScreen);
}

function onTimeChangedDetection(){
    modes.clickModes('night');
    switchScreen(nightLockScreen);
}

function onThiefDetection(){

}

function onNotMatchDetection(){
    alarmAudio.play();
    switchScreen(alarmLockScreen);
}
function onAddToDbAction(){
    //TODO toast add to database, and need to add an empty lockscreen
    switchScreen(dayLockScreen);
}
function onCancelAlarmAction(){
    //switchScreen(nightLockScreen);
    alarmAudio.paused ? alarmAudio.play() : alarmAudio.pause();
}
function onDayLockScreenDetection(){
    switchScreen(dayLockScreen);
}



