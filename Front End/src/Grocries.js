// src/components/Grocries.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Grocries.css";

const Grocries = ({ userId }) => {
  const [groceries, setGroceries] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Please log in to view your grocery list.");
      return;
    }

    // Fetch groceries for the logged-in user
    axios
      .get(`http://localhost:5000/users/${userId}/checklist`)
      .then((response) => {
        setGroceries(response.data);
        setError("");
      })
      .catch((err) => {
        setError("Error fetching groceries");
      });
  }, [userId]);

  const addItem = () => {
    if (!newItem) {
      setError("Please enter a grocery item");
      return;
    }

    // Add new grocery item for the logged-in user
    axios
      .post(`http://localhost:5000/users/${userId}/checklist`, { name: newItem })
      .then((response) => {
        setGroceries([...groceries, response.data]);
        setNewItem("");
        setError("");
      })
      .catch((err) => {
        setError("Error adding grocery item");
      });
  };

  const deleteItem = (id) => {
    // Delete grocery item for the logged-in user
    axios
      .delete(`http://localhost:5000/users/${userId}/checklist/${id}`)
      .then(() => {
        setGroceries(groceries.filter((grocery) => grocery.id !== id));
      })
      .catch((err) => {
        setError("Error deleting grocery item");
      });
  };


  const toggleCompleted = (id, completed) => {
    const url = completed
      ? `http://localhost:5000/users/${userId}/checklist/${id}/incomplete`
      : `http://localhost:5000/users/${userId}/checklist/${id}/complete`;

    // Toggle completion status for the logged-in user's grocery item
    axios
      .patch(url)
      .then((response) => {
        setGroceries(
          groceries.map((grocery) => {
            if (grocery.id === id ){
              grocery.completed = !completed;
            }
            return grocery;
          })
        );
      })
      .catch((err) => {
        setError("Error toggling completion status");
      });
  };

  return (
    <div className="Grocries">
      <h1>Item List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="input-data">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new grocery"
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {groceries.map((grocery) => (
          <li key={grocery.id}>
            <span style={{ textDecoration: grocery.completed ? "line-through" : "none" }}>
              - {grocery.name}
            </span>
            <button onClick={() => toggleCompleted(grocery.id, grocery.completed)}>
              {grocery.completed ? "Uncomplete" : "Complete"}
            </button>
            <button onClick={() => deleteItem(grocery.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grocries;
