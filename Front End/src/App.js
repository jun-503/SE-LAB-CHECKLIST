// src/App.js
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Grocries from './Grocries';
import "./App.css"

function App() {
  const [userId, setUserId] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      setUserId(userId); // Set the userId from localStorage
    }
  }, []);

  const handleLowerButtonClick = ()=>{
    if (showSignup){
      setShowSignup(false);
      return;
    }
    if (userId){
      localStorage.removeItem("userId");
      setUserId(null);
    }
    else{
      setShowSignup(true);
    }
  }

  return (
    <div className='App'>
      <h1>Items Checklist</h1>
      {userId ? (
        <Grocries userId={userId} />
      ) : showSignup ? (
        <Signup />
      ) : (
        <Login setUserId={setUserId} />
      )}


      <button className='lowerButton' onClick={() => handleLowerButtonClick()}>
        {showSignup ? 'Back to Login'  : userId ? 'Back to Login' : 'Create a New Account'}
      </button>


    </div>
  );
}

export default App;
