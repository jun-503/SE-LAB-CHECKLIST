// import React from 'react';
// function Greeting() {
//  return <h1>Hello, welcome to my React App!</h1>;
// }
// export default Greeting;


// import React from 'react';
// function Greeting(props) {
//  return <h1>Hello, {props.name}! Welcome to my React App!</h1>;
// }
// export default Greeting;

import React from 'react';
import './Greeting.css';
function Greeting(props) {
 return <h1 className="greeting">Hello, {props.name}! Welcome to my React 
App!</h1>;
}
export default Greeting;