/*eslint-disable*/

//TODO: Remove eslint-disable!  ... or not, this isn't a real page.

import "./HooksPreview.scss";


import { React, useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 

import useQuestionData from '../../../hooks/useQuestionData';
import usePollData from "../../../hooks/usePollData";

import EpButton from "../../UI/EpButton/EpButton";
import EpChart from "../../UI/EpChart/EpChart";
import EpTextInput from "../../UI/EpTextInput/EpTextInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const HooksPreview = () => {

  const [ currentGuestId, setCurrentGuestId ] = useState(null);
  const [ currentQuestionId, setCurrentQuestionId ] = useState(null);

  // const {
  //   addGuestAnswer,
  //   answerData, 
  //   questionData, 
  //   questionIsLoaded, 
  //   updateQuestionData, 
  // } = useQuestionData({subscribeToChanges: true, questionId: "001"});

  const { targetPollId } = useParams(); 
  const DEFAULT_POLL_ID = "001"

  const {
    addGuestAnswerToCurrentQuestion,
    addNewPollGuest,
    currentAnswerData,
    currentAnswerTally, 
    currentQuestionData, 
    currentQuestionIsLoaded, 
    pollData,
    pollGuestsData,
    pollIsLoaded,
    pollQuestionsData,
    updateCurrentQuestionData, 
    updatePollData,
  } = usePollData({
    subscribeToChanges: true, 
    pollId: targetPollId === undefined ? DEFAULT_POLL_ID : targetPollId, 
    questionId: currentQuestionId,
  });

  const [ newAnswer, setNewAnswer ] = 
    useState(currentQuestionData ? currentQuestionData.answerOptions[0] : "");
  const [ newGuestName, setNewGuestName ] = useState("");
  const [ newPrompt, setNewPrompt ] = useState("");
  const [ newTitle, setNewTitle ] = useState("");

  const formatIdString = (idString) => 
    idString.length > 6 ? `${idString.slice(0,7)}...` : idString;

  useEffect(() => {console.log("targetPollID:", targetPollId)}, [])

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
                {
                  targetPollId === undefined && 
                  (<div className="default-poll-message">
                    No poll specified, using default of "{DEFAULT_POLL_ID}"
                  </div>)
                }
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

                <h1>Question Data</h1>
                <ul className="question-data-list">    
                  {
                    pollQuestionsData.map((question, i) => (
                      <li className="data-list-item" key={`guest-${i}`}>
                        <a
                          className="question-link" 
                          onClick={e => {
                            e.preventDefault();
                            setCurrentQuestionId(question.id);
                          }}
                        >
                          <strong>{question.prompt}</strong>
                        </a>
                      </li>
                    ))
                  }
                </ul>

                <h1>Guest Data</h1>
                <ul className="guest-data-list">    
                  {
                    pollGuestsData.length > 0 ? 
                    pollGuestsData.map((guest, i) => (
                      <li className="data-list-item" key={`guest-${i}`}>
                        <a
                          className="guest-link" 
                          onClick={e => {
                            e.preventDefault();
                            setCurrentGuestId(guest.id);
                          }}
                        >
                          <strong>{guest.name}:</strong>&nbsp;{formatIdString(guest.id)}
                        </a>
                      </li>
                    )) :
                    <li>No Guests in Poll.</li>
                  }
                </ul>
              </div>
            </div>

          </div>
        ) 
      }
      { 
        (!currentQuestionIsLoaded && currentQuestionData === undefined) ? (
          currentQuestionId === null ? (
            <h4>No Question Selected.</h4>
          ): (
            <DataLoading dataName="question"/>
          )
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
                  {
                    currentGuestId !== null ? (
                      <h4>Answering as 
                        <span className="current-data">
                          Guest {formatIdString(currentGuestId)}
                        </span>
                      </h4>
                    ) : (
                      <h4>No Guest Selected.</h4>
                    )
                  }

                  {/* <div>
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
                  </div> */}
                </div>

                <div className="hooks-preview-card">
                  <div>
                    <EpTextInput
                      disabled={currentGuestId === null}
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
                      disabled={currentGuestId === null}
                      onClick={() => 
                        addGuestAnswerToCurrentQuestion({guestId: currentGuestId, answerValue: newAnswer})}
                      >
                      Submit New Answer
                    </EpButton>
                  </div>
                </div>
              </div>

              <div className="hooks-preview-card-container data-container">
                <h1>Current Question Data</h1>
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
                {
                  currentAnswerTally && (
                    <DemoEpChart
                      chartType={'pie'}
                      data={currentAnswerTally.data}
                      labels={currentAnswerTally.labels}
                    />
                  )
                }
                
                <ul className="answer-data-list">    
                  {
                    currentAnswerData.length > 0 ?
                    currentAnswerData.map((answer, i) => (
                      <DataListItem
                        dataKey={`${formatIdString(answer.id)}`}
                        dataValue={answer.answer[0]}
                        key={`answer-${answer.id}`}
                      />
                    )) :
                    <li>No Answers for Question.</li>
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

const DemoEpChart = ({labels, data, chartType}) => (
  <div className="demo-chart-container">
    <div className="demo-chart-wrapper">
      <EpChart chartType={chartType}
        chartData={{
          labels: labels, 
          datasets: [
            {
              label: "",
              data: data,
              backgroundColor: [
                "#519e8a",
                "#FF785A",
                "#EC0B43",
                "#6A7FDB",
                "#F4B942",
              ],
              borderColor: "black",
              borderWidth: 2, 
            }
          ]
        }}
      />
    </div>
  </div>
);
 
export default HooksPreview;