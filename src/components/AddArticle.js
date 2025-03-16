import React, { useState } from "react";
import "./AddArticle.css"; // Import styles

const AddArticle = ({ onAddArticle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle1, setSubtitle1] = useState("");
  const [description1, setDescription1] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !date || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    // Set a default image if none is provided
    const defaultImage = "https://source.unsplash.com/100x100/?news,blogging";

    const newArticle = { 
      title, 
      author, 
      date, 
      image: image || defaultImage,  // Use default image if none is provided
      description, 
      subtitle1, 
      description1 
    };

    onAddArticle(newArticle);

    // Clear form fields after submission
    setTitle("");
    setAuthor("");
    setDate("");
    setImage("");
    setDescription("");
    setSubtitle1("");
    setDescription1("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-article-form">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" placeholder="Image URL (Optional)" value={image} onChange={(e) => setImage(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Subtitle 1 (Optional)" value={subtitle1} onChange={(e) => setSubtitle1(e.target.value)} />
      <textarea placeholder="Description 1 (Optional)" value={description1} onChange={(e) => setDescription1(e.target.value)} />
      <button type="submit">Add Article</button>
    </form>
  );
};

export default AddArticle;
