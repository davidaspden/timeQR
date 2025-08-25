const GRACE_PERIOD_MS = 300000;

function base36Time(){
    const now = new Date();
    const base36 = now.getTime().toString(36);
    return base36;
}

function timeFromBase36(str){
    const timestamp = parseInt(str, 36);
    const date = new Date(timestamp);
    return date;
}

function validTime(timeStr){
    const now = Date.now();
    return (now - timeFromBase36(timeStr).getTime()) <= GRACE_PERIOD_MS;
}

function setTimeCookie(){
    const time = base36Time();
    document.cookie = `time=${time}; path=/;`;
}

function readTimeCookie(){
    const match = document.cookie.match(new RegExp('(^| )time=([^;]+)'));
    return match ? match[2] : null;
}