import React from 'react';

export default function ErrorPage() {
  return(
    <div>
      <p className='center-error font-med'>Oops! Seems like that page doesn't exist...</p>
      <a href='/' className='center-error'>
        <button className='error-button font-med'>Click me to go to the main page</button>
      </a>
    </div>      
  )
} 
