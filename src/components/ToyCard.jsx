import React from "react";

const API = "http://localhost:3001/toys";

function ToyCard({ toy, onUpdateToy, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  // 3. PATCH: Increment likes
  function handleLikeClick() {
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => onUpdateToy(updatedToy))
      .catch((err) => console.error("Error updating likes:", err));
  }

  // 4. DELETE: Remove toy ("Donate")
  function handleDeleteClick() {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDeleteToy(id);
        }
      })
      .catch((err) => console.error("Error deleting toy:", err));
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to Goodwill
      </button>
    </div>
  );
}

export default ToyCard;