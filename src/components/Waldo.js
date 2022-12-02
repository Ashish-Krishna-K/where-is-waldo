import { useState } from 'react';
import waldoImg from '../images/where-is-waldo.jpg';

export function Waldo() {
    const [coordinates, setCoordinates] = useState({
        left: null,
        top: null,
    })

    const handleClick = (e) => {
        setCoordinates({
            left: e.nativeEvent.offsetX,
            top: e.nativeEvent.offsetY,
        })
    };

    return (
        <div id='container'>
            <img src={waldoImg} alt='where-is-waldo' className='waldo-image' onClick={handleClick} />
            <div style={coordinates} className='attempt'></div>
        </div>
    )
}
