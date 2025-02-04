import React, { useState } from "react";
import "./Testimonial.css";
import imag1 from "./Componant/image/passport size photos 👍👍👍.jpeg";
import imag2 from "./Componant/image/Passport Size Photo.jpeg";
import imag3 from "./Componant/image/Mane Omsy Pass Pic.jpeg";
const TestimonialSlider = () => {
  const testimonials = [
    {
      image: imag1,
      quote: "This service is amazing! Highly recommend it to everyone.",
      name: "John Doe",
      position: "CEO, ExampleCorp",
    },
    {
      image: imag2,
      quote: "Exceptional experience! The team was professional and efficient.",
      name: "Jane Smith",
      position: "CTO, TechInnovators",
    },
    {
      image: imag3,
      quote: "I’m impressed by the quality of service. Will use it again.",
      name: "David Johnson",
      position: "Freelancer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonial-slider" style={{ height: "200px" }}>
      <div className="testimonial-slide">
        <img
          src={testimonials[currentIndex].image}
          style={{ height: "80px", borderRadius: "50px" }}
          alt="pic"
        />
        <p className="quote">"{testimonials[currentIndex].quote}"</p>
        <h5 className="name">{testimonials[currentIndex].name}</h5>
        <p className="position">{testimonials[currentIndex].position}</p>
      </div>
      <div className="controls">
        <button onClick={prevSlide} className="prev">
          ❮
        </button>
        <button onClick={nextSlide} className="next">
          ❯
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
