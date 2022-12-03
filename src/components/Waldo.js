import { useState } from 'react';
import waldoImg from '../images/where-is-waldo.jpg';

export function Waldo() {
    const [coordinates, setCoordinates] = useState({
        left: null,
        top: null,
    })
    const [range, setRange] = useState({
        leftMin: null,
        leftMax: null,
        topMin: null,
        topMax: null
    })

    const handleClick = (e) => {
        console.log(e.nativeEvent.offsetX)
        setCoordinates({
            left: e.nativeEvent.offsetX,
            top: e.nativeEvent.offsetY,
        });
        setRange({
            leftMin: e.nativeEvent.offsetX - 15,
            leftMax: e.nativeEvent.offsetX + 15,
            topMin: e.nativeEvent.offsetY - 15,
            topMax: e.nativeEvent.offsetY + 15,
        })
    };

    return (
        <div id='container'>
            <img src={waldoImg} alt='where-is-waldo' className='waldo-image' onClick={handleClick} />
            <div style={coordinates} className='attempt'></div>
        </div>
    )
}
