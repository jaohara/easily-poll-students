import {
  useContext,
  useEffect,
  useState,
  React,
} from 'react'
import {
  useNavigate,
  useParams,  
} from 'react-router-dom';

import { AppDataContext } from '../../../contexts/AppDataContext/AppDataContext';

import EpChart from "../../UI/EpChart/EpChart";
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpLoading from '../../UI/EpLoading/EpLoading';

const PollResult = () => {
  const [ pollReportLoading, setPollReportLoading ] = useState(false);
  const [ pollReport, setPollReport ] = useState();

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  const {
    generatePollReport,
    pollIsLoaded,
    pollIsLoading,
    selectPollById,
  } = useContext(AppDataContext);

  const generateAndSetPollReport = async () => {
    if (!pollReportLoading) {
      setPollReportLoading(true);
      console.log("in generateAndSetPollReport, calling generatePollReport")
      const report = await generatePollReport();
      setPollReport(report);
    }
    setPollReportLoading(false);
  };

  /*
    Implementation notes:
      - create an async arrow function "generateAndSetPollReport" that awaits
        the result of "generatePollReport". 
        - Upon successful receipt, call setPollReport with the pollReport result as an arg
          and call setPollResultsLoading to false
      - on page load, have a useEffect hook that calls "selectPollById" with the 
        pollId pulled from useParams
  */

  useEffect(() => {
    if (!targetPollId) {
      // TODO: Maybe have a component that displays a message about not having a valid 
      //  poll id?
      navigate("/");
    }

    console.log(`selecting poll: ${targetPollId}`);
    selectPollById(targetPollId);
  }, []);

  useEffect(() => {
    // if (pollIsLoaded) {
    if (!pollIsLoading) {
      console.log("JAO In pollIsLoaded callback, calling generateAndSetPollReport");
      
      const getReport = async () => {
        generateAndSetPollReport();
      }
      
      getReport();
    }
  }, [pollIsLoaded])

  const reportReady = !pollReportLoading && pollIsLoaded 
    && !pollIsLoading && pollReport && pollReport.id === targetPollId;
  
  return (
    <div className="poll-results">
      {
        !reportReady ? (
        // pollReportLoading && !pollReport ? (
          <EpLoading />
        ) : (
          <>
            <h1>Poll Results</h1>

            <EpContainer>
              {
                pollReport.questions.map((question, index) => (
                  <div key={index}>
                    <h2>{question.prompt}</h2>
                
                    <EpChart  labels={question.answerTally.labels} data={question.answerTally.data} />
                  </div>
                ))
              }
            </EpContainer>
          </>
        )
      }
    </div>
  )
};

export default PollResult
