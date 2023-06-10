import React from "react";
import { Box } from "@mui/material";
import Pulse from "../imgs/Pulse.gif";
import pulsegraphic from "../imgs/pulsegraphic.png";

const About = () => {
  return (
    <div>
      <h1>Welcome to Pulse App: Your Career Companion!</h1>
      
      <p>At Pulse, we understand the significance of building a successful career and the challenges that come
      with it. That's why we've developed an app specifically designed to empower individuals in their professional journey.</p> 
      
      <h3>With Pulse, you'll have all the tools and resources you need to excel in your career, from job
      opportunities and networking to skill development and tracking.</h3>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={pulsegraphic} alt="pulse" style={{ maxWidth: "80%", height: "auto" }} />
      </Box>
      <h2>Our Mission:</h2>
      
      <p>At Pulse, our mission is to provide a comprehensive career
      management platform that helps users navigate the ever-evolving job market
      and achieve their professional goals. We strive to be the ultimate
      companion for individuals seeking career growth in one convenient app.</p>
      
      <h2>Key Features:</h2> 

      <h3>Quick Links</h3>
      <p>Quick Links is a feature that allows you to save your most important links to easily share with eyour network or employers.</p>     

      <h3>1. Job Opportunities:</h3>
      <p> Pulse allows you to track and apply for jobs directly from your phone.
   .</p>
      
      <h3>2. Networking:</h3> 
      <p>Networking is a crucial aspect of career development, and
      Pulse empowers you to build and expand your professional connections.</p>
      
      <h3>. Skills Development:</h3> 
      <p>Pulse recognizes the importance of continuous skill
      development for career growth. With our app, you can track your progress, and identify the
      skills needed to thrive in your desired field.</p>
      
      <h3>4. Cover Letter Generator:</h3>
      <p> Pulse provides AI technology to help you create a cover letter that will stand out to employers.</p>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={Pulse} alt="Pulse GIF" style={{ maxWidth: "80%", height: "auto" }} />
      </Box>
      
      <h2>Join Pulse today and unlock the full potential of your career.</h2>
      
      <h3>Take control of your professional growth, discover new opportunities, and connect with a vibrant community of like-minded individuals.</h3>
      
      <h3>Download the app now and let Pulse be your ultimate career companion!</h3>
    </div>
  );
};

export default About;
