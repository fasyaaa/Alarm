var myAudio;

window.addEventListener("load", buildIt);

function buildIt() {
    startTime();
    hrsMenu();
    minsMenu();
    secsMenu();
    soundMenu();
    buildAudio();
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var time = checkZero(h) + ":" + checkZero(m) + ":" + checkZero(s);
    document.getElementById("time").innerHTML = time;
    var t = setTimeout(startTime, 500);
}

function checkZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

function hrsMenu() {
    var select = document.getElementById("alarmHrs");
    var hours = 23;

    for (var i = 0; i <= hours; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

function minsMenu() {
    var select = document.getElementById("alarmMnt"); // Corrected ID
    var mins = 59;

    for (var i = 0; i <= mins; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

function secsMenu() {
    var select = document.getElementById("alarmSec"); // Corrected ID
    var secs = 59;

    for (var i = 0; i <= secs; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

function soundMenu() {
    var select = document.getElementById("mySelect");

    var array = [
        {
            name: "Birds",
            url: "https://www.freespecialeffects.co.uk/soundfx/various/forest.wav"
        },
        // Other sound options...
    ];

    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i].url;
        option.text = array[i].name;
        select.appendChild(option);
    }
}

function buildAudio() {
    var myDiv = document.getElementById("myDiv");
    myAudio = document.createElement("audio");

    myAudio.src = "https://www.freespecialeffects.co.uk/soundfx/various/forest.wav";
    myAudio.id = "myAudio";
    myDiv.appendChild(myAudio);
}

/* trigger button alert */
document.getElementById("setAlarmButton").addEventListener("click", function() {
    console.log("Alarm button clicked");
    setAlarm();
    alert("Jangan Lupa untuk Bangun COIII!!!"); // Debugging alert
});


document.getElementById("clearAlarmButton").addEventListener("click", clearAlarm);
document.getElementById("mySelect").addEventListener("change", getSrc);

function getSrc() {
    myAudio.src = document.getElementById("mySelect").value;
}

function setAlarm() {
    var hour = document.getElementById("alarmHrs");
    var min = document.getElementById("alarmMnt"); // Corrected ID
    var sec = document.getElementById("alarmSec"); // Corrected ID

    var selectedHour = hour.options[hour.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec);

    hour.disabled = true;
    min.disabled = true;
    sec.disabled = true;
    document.getElementById('mySelect').disabled = true;

    console.log("Alarm set for: " + alarmTime);

    setTimeout(function() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var time = addZero(h) + ":" + addZero(m) + ":" + addZero(s);

        if (time === alarmTime) {
            myAudio.play();
            myAudio.loop = true;
            alert("Alarm has been set!"); // Display pop-up message
            console.log("Alarm activated!");
        }
    }, 1000);
}

function addZero(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function clearAlarm() {
    document.getElementById("alarmHrs").disabled = false;
    document.getElementById("alarmMnt").disabled = false; // Corrected ID
    document.getElementById("alarmSec").disabled = false; // Corrected ID
    document.getElementById("mySelect").disabled = false;
    myAudio.pause();
}
