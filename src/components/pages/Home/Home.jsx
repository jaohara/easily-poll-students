import React, { 
  useEffect,
  useState,
} from 'react'
// import { AuthContext } from '../../../contexts/AuthContext/AuthContext'

import {
  BsArrowDownCircleFill
} from "react-icons/bs";

import { useNavigate } from 'react-router-dom';

import "./Home.scss";

import {
  exampleQuestions,
  heroBodyCopy,
  instructions,
} from "./homeContent.js";

import placeholderImage from '../../../img/placeholder.svg';

import EpButton from '../../UI/EpButton/EpButton';

const Home = () => {
  const [ currentExampleQuestionIndex, setCurrentExampleQuestionIndex ] = useState(0);
  const [ pageIsVisible, setPageIsVisible ] = useState(false);
  const navigate = useNavigate();

  const exampleQuestionAnimationTime = 5000;

  // const Auth = useContext(AuthContext);

  // const { user } = useContext(AuthContext);

  // if user isn't authenticated, stay on this page
  // if they are, redirect to UserDashboard

  useEffect(() => {
    setPageIsVisible(true);

    // question animation effect counter
    setInterval(() => {
      setCurrentExampleQuestionIndex(previousIndex => {
        const newIndex = previousIndex + 1 >= exampleQuestions.length ? 0 : previousIndex + 1;
        return newIndex;
      })
    }, exampleQuestionAnimationTime);
  }, []);

  useEffect

  return (
    <div className="home-page">
      <div className="home-hero-wrapper">
        <div className={`home-hero ${pageIsVisible ? "active" : ""}`}>
          <div className="hero-description-wrapper">
            <div className="hero-description-example">
              {
                exampleQuestions.map((question, index) => (
                <h1
                  className={`
                    hero-description-example-question
                    ${currentExampleQuestionIndex === index ? "active" : ""}
                  `}
                  key={`example-question-${index}`}
                >
                  {question}
                </h1>
                ))
              }
              {/* <h1>{exampleQuestions[0]}</h1> */}
            </div>

            <div className="hero-description-body">
              {heroBodyCopy}
            </div>
          </div>
          <div className="hero-controls-wrapper">
            <EpButton
              fullWidth
              onClick={() => navigate("/login")}
              >
              Login
            </EpButton>
            <EpButton
              fullWidth
              onClick={() => navigate("/register")}
            >
              Register   
            </EpButton>
          </div>
        </div>

        <div className="home-hero-arrow">
          <p>Scroll to learn more</p>
          <div className="home-hero-arrow-icon">
            <BsArrowDownCircleFill />
          </div>
        </div>
      </div>
      <div className="home-instructions">
        <h1 className='home-instructions-title'>How Easy Poll Works</h1>

        <div className="home-instructions-item">
          <div className="home-instructions-item-content">
            <h1>1. Create a Poll</h1>
            <p>
              {instructions[0]}
            </p>
          </div>
          <div className="home-instructions-item-screenshot">
            <img src={placeholderImage} alt="Placeholder Screenshot" />
          </div>
        </div>
        <div className="home-instructions-item">
          <div className="home-instructions-item-content">
            <h1>2. Share Link</h1>
            <p>
              {instructions[1]}
            </p>
          </div>
          <div className="home-instructions-item-screenshot">
            <img src={placeholderImage} alt="Placeholder Screenshot" />
          </div>
        </div>
        <div className="home-instructions-item">
          <div className="home-instructions-item-content">
            <h1>3. Lock Room and Start Poll</h1>
            <p>
              {instructions[2]}
            </p>
          </div>
          <div className="home-instructions-item-screenshot">
            <img src={placeholderImage} alt="Placeholder Screenshot" />
          </div>
        </div>
        <div className="home-instructions-item">
          <div className="home-instructions-item-content">
            <h1>4. Finish Poll and See Results</h1>
            <p>
              {instructions[3]}
            </p>
          </div>
          <div className="home-instructions-item-screenshot">
            <img src={placeholderImage} alt="Placeholder Screenshot" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
