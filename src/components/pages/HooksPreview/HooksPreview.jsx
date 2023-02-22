/*eslint-disable*/

//TODO: Remove eslint-disable!  ... or not, this isn't a real page.

import "./HooksPreview.scss";


import { React, useState } from 'react';
import useQuestionData from '../../../hooks/useQuestionData';
import usePollData from "../../../hooks/usePollData";

import EpButton from "../../UI/EpButton/EpButton"
import EpTextInput from "../../UI/EpTextInput/EpTextInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const HooksPreview = () => {
  const [ currentGuestId, setCurrentGuestId ] = useState("001");
  const [ currentQuestionId, setCurrentQuestionId ] = useState("001");

  // const {
  //   addGuestAnswer,
  //   answerData, 
  //   questionData, 
  //   questionIsLoaded, 
  //   updateQuestionData, 
  // } = useQuestionData({subscribeToChanges: true, questionId: "001"});

  const {
    addGuestAnswerToCurrentQuestion,
    addNewPollGuest,
    currentAnswerData, 
    currentQuestionData, 
    currentQuestionIsLoaded, 
    pollData,
    pollGuestsData,
    pollIsLoaded,
    pollQuestionsData,
    updateCurrentQuestionData, 
    updatePollData,
  } = usePollData({subscribeToChanges: true, pollId: "001", questionId: currentQuestionId});

  const [ newAnswer, setNewAnswer ] = 
    useState(currentQuestionData ? currentQuestionData.answerOptions[0] : "");
  const [ newGuestName, setNewGuestName ] = useState("");
  const [ newPrompt, setNewPrompt ] = useState("");
  const [ newTitle, setNewTitle ] = useState("");

  const formatGuestIdString = (idString) => 
    idString.length > 6 ? `${idString.slice(0,7)}...` : idString;


  return ( 
    <div className="hooks-preview">
      <h1>Hooks Preview</h1>
      {
        (!pollIsLoaded && pollData === undefined) ? (
          <DataLoading dataName="poll"/>
        ) : (
          <div className="poll-data-container">
            <h2>usePollData results</h2>
            <div className='hooks-preview-controls'>
              <EpButton
                onClick={() => console.log("pollData:", pollData)}
              >
                Log pollData
              </EpButton>
              <EpButton
                onClick={() => console.log("guestData:", pollGuestsData)}
              >
                Log pollGuestsData
              </EpButton>
            </div>
            <div className="hooks-preview-container">
              <div className="hooks-preview-card-container">
                <div className='hooks-preview-card'>
                  <div>
                    <EpTextInput
                      fullWidth={true}
                      label={"Poll Title"}
                      onChange={e => setNewTitle(e.target.value)}
                      value={newTitle}
                    />
                  </div>
                  <div>
                    <EpButton
                      onClick={() => updatePollData({title: newTitle})}
                    >
                      Change Poll Title
                    </EpButton>
                  </div>
                </div>

                <div className="hooks-preview-card">
                  <div>
                    <EpTextInput
                      fullWidth={true}
                      label={"New Guest Name"}
                      onChange={e => setNewGuestName(e.target.value)}
                      value={newGuestName}
                    />
                  </div>

                  <div>
                    <EpButton
                      onClick={() => addNewPollGuest({name: newGuestName, key: `guest-key-${Date.now()}`})}
                    >
                      Create New Guest
                    </EpButton>
                  </div>
                </div>
              </div>

              <div className="hooks-preview-card-container data-container">
                <h1>Poll Data</h1>
                <ul className="question-data-list">
                  <DataListItem
                    dataKey={"id"}
                    dataValue={pollData.id}
                    key={"id"}
                  />    
                  <DataListItem
                    dataKey={"title"}
                    dataValue={pollData.title}
                    key={"title"}
                  />
                  <DataListItem
                    dataKey={"isActive"}
                    dataValue={`${pollData.isActive}`}
                    key={"isActive"}
                  />
                  <DataListItem
                    dataKey={"isLocked"}
                    dataValue={`${pollData.isLocked}`}
                    key={"isLocked"}
                  />
                </ul>

                <h1>Guest Data</h1>
                <ul className="guest-data-list">    
                  {
                    pollGuestsData.map((guest, i) => (
                      <li className="data-list-item" key={`guest-${i}`}>
                        <a
                          className="guest-link" 
                          onClick={e => {
                            e.preventDefault();
                            setCurrentGuestId(guest.id);
                          }}
                        >
                          <strong>{guest.name}:</strong>&nbsp;{formatGuestIdString(guest.id)}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>

          </div>
        ) 
      }
      { 
        (!currentQuestionIsLoaded && currentQuestionData === undefined) ? (
          <DataLoading dataName="question"/>
        ) : (
          <div className="question-data-container">
            <h2>useQuestionData results</h2>
            <div className='hooks-preview-controls'>
              <EpButton
                onClick={() => console.log("questionData:", currentQuestionData)}
              >
                Log currrentQuestionData
              </EpButton>
              <EpButton
                onClick={() => console.log("answerData:", currentAnswerData)}
              >
                Log currentAnswerData
              </EpButton>
            </div>
            <div className="hooks-preview-container">
              <div className="hooks-preview-card-container">
                <div className='hooks-preview-card'>
                  <h4>Answering as 
                    <span className="current-data">
                      Guest {formatGuestIdString(currentGuestId)}
                    </span>
                  </h4>
                  <div>
                    <EpTextInput
                      fullWidth={true}
                      label={"Question Prompt"}
                      onChange={e => setNewPrompt(e.target.value)}
                      value={newPrompt}
                    />
                  </div>
                  <div>
                    <EpButton
                      onClick={() => updateCurrentQuestionData({prompt: newPrompt})}
                    >
                      Change Question Prompt
                    </EpButton>
                  </div>
                </div>

                <div className="hooks-preview-card">
                  <div>
                    <EpTextInput
                      fullWidth={true}
                      label="New Answer"
                      value={newAnswer}
                      select
                      onChange={e => setNewAnswer(e.target.value)}
                    >
                      {
                        currentQuestionData.answerOptions.map(answer => (
                          <MenuItem 
                            key={`answer-${answer}`}
                            value={answer}
                          >
                            {answer}
                          </MenuItem>
                        ))
                      }
                    </EpTextInput>
                  </div>

                  <div>
                    <EpButton
                      onClick={() => 
                        addGuestAnswerToCurrentQuestion({guestId: currentGuestId, answerValue: newAnswer})}
                      >
                      Submit New Answer
                    </EpButton>
                  </div>
                </div>
              </div>

              <div className="hooks-preview-card-container data-container">
                <h1>Question Data</h1>
                <ul className="question-data-list">
                  <DataListItem
                    dataKey={"id"}
                    dataValue={currentQuestionData.id}
                    key={"id"}
                  />    
                  <DataListItem
                    dataKey={"prompt"}
                    dataValue={currentQuestionData.prompt}
                    key={"prompt"}
                  />
                  <DataListItem
                    dataKey={"answerOptions"}
                    dataValue={`${currentQuestionData.answerOptions}`}
                    key={"answerOptions"}
                  />
                  <DataListItem
                    dataKey={"pollQuestionsId"}
                    dataValue={currentQuestionData.pollQuestionsId}
                    key={"pollQuestionsId"}
                  />
                </ul>

                <h1>Answer Data</h1>
                <ul className="answer-data-list">    
                  {
                    currentAnswerData.map((answer, i) => (
                      <DataListItem
                        dataKey={`${(answer.id).slice(0,3)}`}
                        dataValue={answer.answer[0]}
                        key={`answer-${answer.id}`}
                      />
                    ))
                  }
                </ul>
              </div>
            </div>

          </div>
        ) 
      }
    </div>
  );
};

const DataListItem = ({dataKey, dataValue}) => (
  <li className="data-list-item">
    <strong>{dataKey}:</strong>&nbsp;{dataValue}
  </li>
)

const DataLoading = ({dataName}) => {
  return (
    <div className="data-loading">
      Loading {dataName} data...
    </div>
  )
}
 
export default HooksPreview;