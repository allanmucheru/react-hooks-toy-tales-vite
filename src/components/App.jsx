import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // 1. GET: Fetch toys on mount
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error fetching toys:", err));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // State update handlers
  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }

  function handleUpdateToy(updatedToy) {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  function handleDeleteToy(deletedToyId) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== deletedToyId));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onUpdateToy={handleUpdateToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;