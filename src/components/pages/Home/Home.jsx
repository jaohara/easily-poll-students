import React, { 
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom';

import {
  BsArrowDownCircleFill
} from "react-icons/bs";

import { 
  BiLogIn,
  BiUserPlus,
} from 'react-icons/bi';

import { useInView } from "react-intersection-observer";

import EpButton from '../../UI/EpButton/EpButton';

import "./Home.scss";

import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { getRoutePathByName } from '../../../routes';

import {
  exampleQuestions,
  heroBodyCopy,
  instructions,
  instructionTitles,
} from "./homeContent.js";

// import placeholderImage from '../../../img/placeholder.svg';
import createPollImage from '../../../img/create-poll.png';
import shareLinkImage from '../../../img/share-link.png';
import lockPollImage from '../../../img/lock-poll.png';
import seeResultsImage from '../../../img/see-results.png';

const instructionImages = [
  {
    image: createPollImage,
    alt: "Create a Poll Screenshot",
  },
  {
    image: shareLinkImage,
    alt: "Create a Poll Screenshot",
  },
  {
    image: lockPollImage,
    alt: "Lock Poll Screenshot",
  },
  {
    image: seeResultsImage,
    alt: "See Results Screenshot",
  },
]

const Home = () => {
  const [ currentExampleQuestionIndex, setCurrentExampleQuestionIndex ] = useState(0);
  const [ pageIsVisible, setPageIsVisible ] = useState(false);
  const navigate = useNavigate();

  const exampleQuestionAnimationTime = 5000;

  // const Auth = useContext(AuthContext);

  const { user } = useContext(AuthContext);

  // if user isn't authenticated, stay on this page
  // if they are, redirect to UserDashboard

  useEffect(() => {
    setPageIsVisible(true);

    if (user) {
      navigate(getRoutePathByName("User Dashboard"));
    }

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
              <BiLogIn />&nbsp;
              Login
            </EpButton>
            <EpButton
              fullWidth
              onClick={() => navigate("/register")}
            >
              <BiUserPlus />&nbsp;
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
        
        {
          instructions.map((instruction, index) => (
            <HomeInstruction
              key={`home-instruction-${index}`}
              image={instructionImages[index].image}
              imageAlt={instructionImages[index].alt}
              instructionBody={instruction}
              title={instructionTitles[index]}
            />
          ))
        }
      </div>
    </div>
  );
};

function HomeInstruction({
  image,
  imageAlt,
  instructionBody,
  title,
}) {
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
  })

  return (
    <div 
      className={`
        home-instructions-item
        ${inView ? "active" : ""}
      `}
      ref={ref}
    >
      <div className="home-instructions-item-content">
        <h1>{title}</h1>
        <p>
          {instructionBody}

        </p>
      </div>
      <div className="home-instructions-item-screenshot">
        <img src={image} alt={imageAlt} />
      </div>
    </div>
  )
}

export default Home
