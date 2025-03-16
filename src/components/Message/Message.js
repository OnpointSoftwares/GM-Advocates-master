import React, { useState } from "react";
import "./Message.css";
function Message() {
  const [result, setResult] = React.useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "f43fbaa5-cc20-4848-9d64-3e5f97312773");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.log("Errors123", data);
        setResult(data.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };
  return (
    <div id="message" className="message">
      <div className="header">
        <h1>Talk To Us</h1>
      </div>
      <div className="content">
        <div className="msgtext">
          <h>
            Have a legal question? Need expert advice? Get in touch with us
            today. Our experienced team is here to help you navigate through
            your legal matters with clarity and confidence.Get in touch!
          </h>
        </div>
        <div className="form">
          {showSuccess && (
            <div className="success-response">
              <span className="success-message">Message sent Successfully</span>
            </div>
          )}
          {showError && (
            <div className="error-response">
              <span className="error-message">
                Sent failed! Check Network connection and Try again
              </span>
            </div>
          )}
          <form className="contactForm" onSubmit={onSubmit}>
            <input
              type="text"
              className="name"
              placeholder="Your name"
              name="name"
              autocomplete="off"
              required
            ></input>
            <input
              type="email"
              className="email"
              placeholder="Your email"
              name="email"
              autocomplete="off"
              required
            ></input>
            <textarea
              className="msg"
              name="message"
              placeholder="Your message"
              autocomplete="off"
              required
            ></textarea>
            <button type="submit" className="submitBtn">
              Get In Touch
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
