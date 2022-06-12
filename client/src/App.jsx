import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { backendURL } from './config/backendURL.js';

export const Box = styled.div`
  ${tw`
    w-full 
    h-screen 
    bg-black 
    flex  
    flex-col
    justify-center
    items-center
    text-white
    text-2xl  
    gap-y-2
  `}
`;

export const Button = styled.button`
  ${tw`
    bg-blue-400 
    text-black 
    px-3 
    py-1 
    rounded
  `}
`;

const App = () => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');

  const handleClick = async () => {
    const res = await fetch(`${backendURL}/api/hello`);
    console.log(res);
    const { message, timestamp } = await res.json();
    setMessage(message);
    setTime(timestamp);
  };

  return (
    <Box>
      <div>
        Placeholder
      </div>
      <Button onClick={handleClick}>Call Backend</Button>

      <div tw="mt-2">
        <p>{message}{' '}{time}</p>
      </div>
    </Box>
  );
};

export default App;
