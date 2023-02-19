/*eslint-disable*/
import { React, useState } from 'react';
import useQuestionData from '../../../hooks/useQuestionData';
import EpButton from "../../UI/EpButton/EpButton"
import EpTextInput from "../../UI/EpTextInput/EpTextInput";

const HooksPreview = () => {
  const { questionData, questionIsLoaded, updateQuestionData } = useQuestionData(true);
  const [ newPrompt, setNewPrompt ] = useState("");

  return ( 
    <div className="hooks-preview-container">
      <h1>Hooks Preview</h1>
      { 
        (!questionIsLoaded && questionData !== undefined) ? (
          <DataLoading dataName="question"/>
        ) : (
          <div className="question-data-container">
            <h2>useQuestionData results</h2>

            <EpButton
              onClick={() => console.log("questionData:", questionData)}
            >
              Log Current questionData Object
            </EpButton>

            <div>
              <EpTextInput
                onChange={e => setNewPrompt(e.target.value)}
                value={newPrompt}
              />
              <EpButton
                onClick={() => updateQuestionData({prompt: newPrompt})}
              >
                Change Question Prompt
              </EpButton>
            </div>

            <ul className="question-data-list">
              {/* {Object.keys(questionData).map(qKey => (
                <DataListItem
                  dataKey={qKey}
                  dataValue={questionData[qKey]}
                  key={qKey}
                />
              ))} */}
            </ul>
          </div>
        ) 
      }
    </div>
  );
};

const DataListItem = (dataKey, dataValue) => (
  <li className="data-list-item">
    <strong>{dataKey}:</strong>&nbsp;{dataValue}
  </li>
)

const DataLoading = (dataName) => {
  return (
    <div className="data-loading">
      Loading {dataName} data...
    </div>
  )
}
 
export default HooksPreview;