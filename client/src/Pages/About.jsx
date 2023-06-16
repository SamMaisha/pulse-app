import React from "react";
import { Box } from "@mui/material";
import Pulse from "../imgs/Pulse.gif";
import pulsegraphic from "../imgs/pulsegraphic.png";
import "../App.css";

const About = () => {
  return (
    <div class="about-container">
      <div>
        <h1 class="about-title">
          Welcome to Pulse: <em>Your Career Companion!</em>
        </h1>
      </div>
      <div class="about-header">
        <div class="header-text">
          <p class="header-text">
            At Pulse, we understand the significance of building a successful
            career and the challenges that come with it. That's why we've
            developed an app specifically designed to empower individuals in
            their professional journey.
          </p>
          <p class="header-text">
            With Pulse, you'll have all the tools and resources you need to
            excel in your career, from job opportunities and networking to skill
            development and tracking.
          </p>
        </div>
        <div className="header-img">
          <img src={pulsegraphic} alt="pulse" class="pulse-graphic" />
        </div>
      </div>

      <h2 class="about-title">Our Mission</h2>

      <p class="about-text">
        At Pulse, our mission is to provide a comprehensive career management
        platform that helps users navigate the ever-evolving job market and
        achieve their professional goals. We strive to be the ultimate companion
        for individuals seeking career growth in one convenient app.
      </p>

      <h2 class="about-title">Key Features</h2>

      <p class="about-text">
        <strong class="feature-title">Quick Links:</strong> Store your most important links to easily share with your network or potential employer.
      </p>

      
      <p class="about-text">
      <strong class="feature-title">Job Opportunities: </strong> Track your job applications directly from your phone.
      </p>

      
      <p class="about-text">
      <strong class="feature-title">Networking: </strong> Expand your professional connections.
      </p>

     
      <p class="about-text">
      <strong class="feature-title">Skills Development: </strong> Track the skills you need to thrive in your desired field.
      </p>

   
      <p class="about-text">
      <strong class="feature-title">Cover Letter Generator:</strong> Use AI technology to create personalized cover letters that will
        stand out to employers.
      </p>
      <h2 class="about-header">Join Pulse today and unlock the full potential of your career!</h2>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src={Pulse}
          alt="Pulse GIF"
          style={{ maxWidth: "80%", height: "auto" }}
        />
      </Box>

    </div>
  );
};

export default About;
