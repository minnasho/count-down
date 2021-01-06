import React, {useEffect, useState} from 'react';
import moment from 'moment';
import * as Comlink from 'comlink';

const CountDown = ({targetDate, timeFormat}) => {
    const [timeLeft, setTimeLeft] = useState({});

    let then = moment(targetDate, timeFormat);
    let now = moment();
    let countdown = moment(then - now);
    console.log(countdown);

    useEffect(() => {
        const calculateRemainingTime = Comlink.wrap(
            new Worker('worker.js')
        );
        const timer = setTimeout(() => {
            const remainingTime = calculateRemainingTime(Comlink.proxy(countdown));
            remainingTime
                .then(() => {
                    setTimeLeft(remainingTime)
                    console.log('success', remainingTime)
                })
                .catch(() => {
                    console.log('failure', remainingTime)
                });

        }, 1000);
        // Clear timeout if the component is unmounted
        return () => {
            clearTimeout(timer);
            calculateRemainingTime.terminate();
        };
    });

    // const calculateTimeLeft = () => {
    //     let timeLeft;
    //
    //     timeLeft = {
    //         days: countdown.format('D'),
    //         hours: countdown.format('HH'),
    //         minutes: countdown.format('mm'),
    //         seconds: countdown.format('ss')
    //     };
    //
    //     return timeLeft;
    //
    // }

    return (
        <>
            <div>
                <span>{timeLeft.days}{' '}</span>
                <span>{timeLeft.hours}{' '}</span>
                <span>{timeLeft.minutes}{' '}</span>
                <span>{timeLeft.seconds}</span>
            </div>
        </>
    );
};
export default CountDown;