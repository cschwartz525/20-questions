import React, { useEffect } from 'react';

const lettersArray = [
    '2',
    '0',
    ' ',
    'Q',
    'u',
    'e',
    's',
    't',
    'i',
    'o',
    'n',
    's'
];

const Title = () => {
    useEffect(() => {
        const letters = document.getElementsByClassName('letter');

        Array.from(letters as HTMLCollectionOf<HTMLElement>).forEach((letter, index) => {
            letter.style.animationDelay = `${index / 4}s`;
        });
    }, []);

    return (
        <h1 className='title'>
            {lettersArray.map((letter, index) => (
                <span key={`letter-${index}`} className='letter'>
                    {letter}
                </span>
            ))}
        </h1>
    );
};

export default Title;