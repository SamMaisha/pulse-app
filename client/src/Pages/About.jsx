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
      <img src={pulsegraphic} alt="pulse" style={{ maxWidth: "90%", height: "auto" }} />
      </Box>
      <h2>Our Mission:</h2>
      
      <p>At Pulse, our mission is to provide a comprehensive career
      management platform that helps users navigate the ever-evolving job market
      and achieve their professional goals. We strive to be the ultimate
      companion for individuals seeking career growth, offering valuable
      insights, connections, and opportunities in one convenient app.</p>
      
      <h2>Key Features:</h2> 
      
      <h3>1. Job Opportunities:</h3>
      <p> Pulse connects you with a vast array of
      job opportunities tailored to your interests, experience, and aspirations.
      Browse through listings from top companies, receive personalized job
      recommendations, and apply with ease, all within the app. Stay updated on
      the latest openings and never miss a chance to pursue your dream career.</p>
      
      <h3>2. Networking:</h3> 
      <p>Networking is a crucial aspect of career development, and
      Pulse empowers you to build and expand your professional connections.
      Discover like-minded individuals, industry experts, and potential mentors
      through our networking features. Engage in meaningful conversations, share
      insights, and collaborate to unlock new opportunities.</p>
      
      <h3>. Skills Development:</h3> 
      <p>Pulse recognizes the importance of continuous skill
      development for career growth. With our app, you can access a wide range
      of resources, including articles, tutorials, and online courses, to
      enhance your skill set. Set goals, track your progress, and acquire the
      skills needed to thrive in your desired field.</p>
      
      <h3>4. Customizable Widgets:</h3>
      <p> Pulse provides personalized widgets that allow you to create a customized dashboard, tailored to your specific career needs. Track your job
      applications, monitor industry trends, stay updated on networking events, and manage your skill development progress, all at a glance. Our widgets
      ensure that you have all the essential information at your fingertips.</p>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={Pulse} alt="Pulse GIF" style={{ maxWidth: "90%", height: "auto" }} />
      </Box>
      
      <h2>Join Pulse today and unlock the full potential of your career.</h2>
      
      <h3>Take control of your professional growth, discover new opportunities, and connect with a vibrant community of like-minded individuals.</h3>
      
      <h3>Download the app now and let Pulse be your ultimate career companion!</h3>
    </div>
  );
};

export default About;
