import React, { useState, useEffect } from "react";

const EditArticle = ({ article, onUpdateArticle, onCancel }) => {
  const [updatedArticle, setUpdatedArticle] = useState({ ...article });

  // Ensure date is in YYYY-MM-DD format and set initial value
  useEffect(() => {
    if (article.date) {
      const formattedDate = article.date.split("T")[0]; // Remove time if present
      setUpdatedArticle((prev) => ({ ...prev, date: formattedDate }));
    }
  }, [article.date]);

  const handleChange = (e) => {
    setUpdatedArticle({ ...updatedArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateArticle(updatedArticle);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>✏️ Edit Article</h3>
          <button className="close-btn" onClick={onCancel}>❌</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={updatedArticle.title || ""} onChange={handleChange} required />

          <label>Author:</label>
          <input type="text" name="author" value={updatedArticle.author || ""} onChange={handleChange} required />

          <label>Date:</label>
          <input type="date" name="date" value={updatedArticle.date || ""} onChange={handleChange} required />

          <label>Image URL:</label>
          <input type="text" name="image" value={updatedArticle.image || ""} onChange={handleChange} />

          <label>Description:</label>
          <textarea name="description" value={updatedArticle.description || ""} onChange={handleChange} required rows="5"></textarea>

          <label>Subtitle 1:</label>
          <input type="text" name="subtitle1" value={updatedArticle.subtitle1 || ""} onChange={handleChange} />

          <label>Description 1:</label>
          <textarea name="description1" value={updatedArticle.description1 || ""} onChange={handleChange} rows="4"></textarea>

          <button type="submit" className="edit-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
