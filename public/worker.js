import * as Comlink from 'comlink';

function calculateRemainingTime(countdown) {
    console.log(countdown);
    let timeLeft;

    timeLeft = {
        days: countdown.format('D'),
        hours: countdown.format('HH'),
        minutes: countdown.format('mm'),
        seconds: countdown.format('ss')
    };

    return timeLeft;
}

Comlink.expose(calculateRemainingTime());