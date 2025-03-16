import React from "react";
import "./Review.css";
import reviewImg from "../../assets/Review-Us-Sticker-300x300.png";
function Review() {
  return (
    <section className="review">
      <div className="container">
        <div className="column1">
          <div className="horizontal-bar"></div>
          <h>
            What our <br /> clients say.
          </h>
          <p>
            Here's what clients had to say regarding their
            <br /> experience with our Legal Services{" "}
          </p>
          <a href="www.google.com">Our Reviews</a>
        </div>
        <div className="column2">
          <a href="www.google.com">
            {" "}
            <img src={reviewImg} alt="google-review"></img>{" "}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Review;
