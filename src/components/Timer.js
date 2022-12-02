import React, { useState } from "react";

export function Timer() {
    const [time, setTime] = useState(new Date(null).toISOString());

    setTimeout(() => {
        const date = new Date(time);
        date.setSeconds(date.getSeconds() + 1);
        setTime(date.toISOString());
    }, 1000);

    return (
        <p>{time.substring(11, 19)}</p>
    )
}