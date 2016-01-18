/**
 * Created by s152047 on 2016/1/9.
 */
var clientName = "old";
var commandTotal = [

];

var Bg = $("#Bg");
var earphoneTop = $("#earphoneTop");
var headphoneL = $("#headphoneL");
var headphoneR = $("#headphoneR");
var glasses = $("#glasses");
var Hat = $("#Hat");
var mouth = $("#mouth");
var moustache = $("#moustache");
var head = $("#head");
var leftEye = $("#leftEye");
var rightEye = $("#rightEye");

$("document").ready(function(){
    settingsRender();
});
var chickPokokkAudio = new Audio('./audio/chickPokokk.mp3');
function settingsRender(){
    if(!settings.$data.old.camera){
        glasses.show();
    }else{
        glasses.hide();
    }
    if(!settings.$data.old.mic){
        earphoneTop.show();
        headphoneL.show();
        headphoneR.show();
    }else{
        earphoneTop.hide();
        headphoneL.hide();
        headphoneR.hide();
    }
    if(settings.$data.old.wifi){
        Hat.show();
    }else{
        Hat.hide();
    }
    chickPokokkAudio.play();
}
var dialogWrap = $("#dialogWrap");
var dialogTxt = $("#dialogTxt");
function showDialog(txt){
    dialogTxt.html(txt);
    dialogWrap.fadeIn('slow');
    window.setTimeout(function () {
        dialogWrap.fadeOut('slow');
    },8000);
}


function onElectricSoundDetection(){
    showDialog('Strange sound detected!');
}

function onTimeChangedDetection(){
    showDialog('<tspan x="0" dy="1.2em">At night now, </tspan><tspan x="0" dy="1.2em">I am maintaining a lookout!</tspan>');
}

function onThiefDetection(){
    showDialog('<tspan x="0" dy="1.2em">Sound detected at night. </tspan><tspan x="0" dy="1.2em">Is that you?</tspan>');
    isThatYouAudio.play();
}

function onNotMatchDetection(){
    //showDialog('Voice not found in the database!<br> I am gonna sound the alarm!');
    showDialog('<tspan x="0" dy="1.2em">Voice not found in the database!</tspan><tspan x="0" dy="1.2em">I am gonna sound the alarm!</tspan>');
    alarmAudio.play();
}
function onAddToDbAction(){
    showDialog('I will remember this sound, boss~');
}
function onCancelAlarmAction(){
    showDialog('I will be quiet now~');
}