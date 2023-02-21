/*eslint-disable*/

//TODO: Remove eslint-disable!  ... or not, this isn't a real page.

import "./HooksPreview.scss";


import { React, useState } from 'react';
import useQuestionData from '../../../hooks/useQuestionData';
import EpButton from "../../UI/EpButton/EpButton"
import EpTextInput from "../../UI/EpTextInput/EpTextInput";

const HooksPreview = () => {
  const {
    addGuestAnswer,
    answerData, 
    questionData, 
    questionIsLoaded, 
    updateQuestionData, 
  } = useQuestionData({subscribeToChanges: true});
  const [ newPrompt, setNewPrompt ] = useState("");
  const [ newAnswer, setNewAnswer ] = useState("");

  return ( 
    <div className="hooks-preview">
      <h1>Hooks Preview</h1>
      { 
        (!questionIsLoaded && questionData === undefined) ? (
          <DataLoading dataName="question"/>
        ) : (
          <div className="question-data-container">
            <h2>useQuestionData results</h2>
            <div className="hooks-preview-container">
              <div className="hooks-preview-card-container">
                <div className='hooks-preview-card'>
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

                <div className='hooks-preview-card'>
                  <div>
                    <EpTextInput
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
                        dataKey={`${(answer.id).slice(0,4)}...`}
                        dataValue={answer.answer[0]}
                        key={``}
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