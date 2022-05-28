import React, { useCallback, useState, useRef, useEffect } from "react";
import classNames from 'classnames';

const POMO_INTERVAL = 25 * 60 * 1000;
const DEFAULT_DIVIDER = ':';
const DEFAULT_RENDER_INTERVAL = 100;

const addZero = (num) => {
    return `0${num}`.slice(-2);
};

const Timer = (props) => {
    const [active, setActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(POMO_INTERVAL);
    const lastStartTimestamp = useRef(null);
    const interval = useRef(null);

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeLeft(POMO_INTERVAL);
            setActive(false)
            clearInterval(interval.current);
        }
    }, [timeLeft]);

    const calculated = useCallback(() => {
        const now = Date.now();
        const timePassed = now - lastStartTimestamp.current;
        setTimeLeft(v => v - timePassed);
        lastStartTimestamp.current = now;
    }, []);

    const onButtonToggle = useCallback(() => {
        const now = Date.now();

        if (active) {
            const timePassed = now - lastStartTimestamp.current;
            setTimeLeft(v => v - timePassed);
            clearInterval(interval.current);
            lastStartTimestamp.current = null;
        } else {
            lastStartTimestamp.current = now;
            interval.current = setInterval(calculated, DEFAULT_RENDER_INTERVAL);
        }

        setActive(v => !v);
    }, [active, calculated]);

    const timeLeftDate = new Date(timeLeft);
    const mins = timeLeftDate.getMinutes();
    const secs = timeLeftDate.getSeconds();
    const { divider = DEFAULT_DIVIDER } = props;
    const playBtnClass = classNames(
        'play__button',
        active && 'play__button_state-active',
        !active && 'play__button_state-paused'
    );

    return (
        <div className="pomo">
            <div className="pomo__clock">
                <div className="pomo__min">{addZero(mins)}</div>
                <div className="pomo__divider">{divider}</div>
                <div className="pomo__sec">{addZero(secs)}</div>
            </div>
            <div className="play">
                <button className={playBtnClass} onClick={onButtonToggle}></button>
            </div>
        </div >
    );
}

export { Timer }