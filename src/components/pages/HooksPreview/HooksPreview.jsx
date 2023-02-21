/*eslint-disable*/

//TODO: Remove eslint-disable!  ... or not, this isn't a real page.

import "./HooksPreview.scss";


import { React, useState } from 'react';
import useQuestionData from '../../../hooks/useQuestionData';
import EpButton from "../../UI/EpButton/EpButton"
import EpTextInput from "../../UI/EpTextInput/EpTextInput";
import usePollData from "../../../hooks/usePollData";

const HooksPreview = () => {

  const {
    addGuestAnswer,
    answerData, 
    questionData, 
    questionIsLoaded, 
    updateQuestionData, 
  } = useQuestionData({subscribeToChanges: true, questionId: "001"});

  const {
    pollData,
    pollIsLoaded,
    updatePollData,
  } = usePollData({subscribeToChanges: true, pollId: "001"});

  const [ newAnswer, setNewAnswer ] = useState("");
  const [ newGuestName, setNewGuestName ] = useState("");
  const [ newPrompt, setNewPrompt ] = useState("");
  const [ newTitle, setNewTitle ] = useState("");

  const [ currentGuestId, setCurrentGuestId ] = useState("001");

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
              {/* <EpButton
                onClick={() => console.log("answerData:", answerData)}
              >
                Log answerData
              </EpButton> */}
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
                      disabled
                      fullWidth={true}
                      label={"New Guest Name"}
                      onChange={e => setNewGuestName(e.target.value)}
                      value={newGuestName}
                    />
                  </div>

                  <div>
                    <EpButton
                      disabled
                      // TODO: Change to use poll function for adding guests
                      onClick={() => {} }
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
                {/* <ul className="guest-data-list">    
                  {
                    answerData.map((answer, i) => (
                      <DataListItem
                        dataKey={`${(answer.id).slice(0,3)}`}
                        dataValue={answer.answer[0]}
                        key={`answer-${answer.id}`}
                      />
                    ))
                  }
                </ul> */}
              </div>
            </div>

          </div>
        ) 
      }
      { 
        (!questionIsLoaded && questionData === undefined) ? (
          <DataLoading dataName="question"/>
        ) : (
          <div className="question-data-container">
            <h2>useQuestionData results</h2>
            <div className='hooks-preview-controls'>
              <EpButton
                onClick={() => console.log("questionData:", questionData)}
              >
                Log questionData
              </EpButton>
              <EpButton
                onClick={() => console.log("answerData:", answerData)}
              >
                Log answerData
              </EpButton>
            </div>
            <div className="hooks-preview-container">
              <div className="hooks-preview-card-container">
                <div className='hooks-preview-card'>
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
                      onClick={() => updateQuestionData({prompt: newPrompt})}
                    >
                      Change Question Prompt
                    </EpButton>
                  </div>
                </div>

                <div className="hooks-preview-card">
                  <div>
                    <EpTextInput
                      fullWidth={true}
                      label={"New Answer Value"}
                      onChange={e => setNewAnswer(e.target.value)}
                      value={newAnswer}
                    />
                  </div>

                  <div>
                    <EpButton
                      onClick={() => addGuestAnswer({guestId: "001", answerValue: newAnswer})}
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
                    dataValue={questionData.id}
                    key={"id"}
                  />    
                  <DataListItem
                    dataKey={"prompt"}
                    dataValue={questionData.prompt}
                    key={"prompt"}
                  />
                  <DataListItem
                    dataKey={"answerOptions"}
                    dataValue={questionData.answerOptions}
                    key={"answerOptions"}
                  />
                  <DataListItem
                    dataKey={"pollQuestionsId"}
                    dataValue={questionData.pollQuestionsId}
                    key={"pollQuestionsId"}
                  />
                </ul>

                <h1>Answer Data</h1>
                <ul className="answer-data-list">    
                  {
                    answerData.map((answer, i) => (
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