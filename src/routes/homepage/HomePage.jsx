import { useState } from "react";
import "./hompage.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
function HomePage() {
  const [isTyping, setIsTyping] = useState("human");
  return (
    <div className="homepage">
      <div className="left">
        <h1>RESMI AI</h1>
        <h2>Creating safe AGI that benefits all of humanity.</h2>
        <p>
          Open AI | Creating safe AGI that benefits all of humanity; ChatGPT
          on your desktop
        </p>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <img src="/robot.png" alt="robot" className="robot" />
        <div className="chat">
          <img
            src={
              isTyping === "human1"
                ? "/img3.jpg"
                : isTyping === "human2"
                ? "/img3.jpg"
                : "/robot.png"
            }
            alt="robot"
            className="robot"
          />
          <TypeAnimation
            sequence={[
              "Human:We produce food for Mice",
              2000,
              () => {
                setIsTyping("bot");
              },
              "Bot:We produce food for Hamsters",
              2000,
              () => {
                setIsTyping("human2");
              },
              "Human2:We produce food for Guinea Pigs",
              2000,
              () => {
                setIsTyping("bot");
              },
              "Bot:We produce food for Chinchillas",
              2000,
              () => {
                setIsTyping("human1");
              },
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1em", display: "inline-block" }}
            repeat={Infinity}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
      <div className="terms">
        <img src="/logo.PNG" alt="logo" />
        <div className="links">
          <Link to="/">Terms of Services</Link>
          <Link to="/">Privacy & Policy</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
