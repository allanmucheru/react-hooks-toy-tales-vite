import React, { useState } from "react";

const API = "http://localhost:3001/toys";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // 2. POST: Create a new toy
  function handleSubmit(e) {
    e.preventDefault();

    const newToyObj = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyObj),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        onAddToy(createdToy);
        setFormData({ name: "", image: "" });
      })
      .catch((err) => console.error("Error creating toy:", err));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;