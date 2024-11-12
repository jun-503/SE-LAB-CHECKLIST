import React, { useState } from 'react';
function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <p>Current Count: {count}</p>
            <button onClick={increment} style={{
                backgroundColor: '#2ecc71', color: '#fff', border:
                    'none', padding: '10px'
            }}>
                Increment
            </button> </div>
    );
}
export default Counter;