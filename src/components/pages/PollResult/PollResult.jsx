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
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

const PollResult = () => {
  const [ pollReportLoading, setPollReportLoading ] = useState(false);
  const [ pollReport, setPollReport ] = useState();

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  const [chartType, setChartType] = useState('bar');


  // TODO: Fix this
  //Switches Chart type
  const handleChartType = async() => {
    setChartType((chartType) =>
      //if bar chnage to pie and vice versa
      chartType === 'bar' ? 'pie' : 'bar'
    );
  };

  // Collect all div 
  const reportSections = document.querySelectorAll('#REPORT123')
  // const reportSections = document.querySelectorAll('.poll-report-item');
  // const reportSections = document.querySelectorAll('.poll-report-item');

  console.log('Test Length ' + reportSections.length )
  console.log(reportSections)

  const handleDownloadPDF = async () => {
    // const reportSections = pollReport.questions.map((question, index) => (
    //   <PrintableReportItem
    //     chartType={chartType}
    //     index={index}
    //     key={`printable-report-item-${index}`}
    //     question={question}
    //   />
    // ));


    const options = {
      pagesplit: true
    };
    //save report 

    let report = new jsPDF('portrait','mm','a4',);
    let pageNumber = 0;
    //To Do Add Time Date Stamp to pages
    //const currentDate = new Date();
    //const dateStamp = currentDate.getDay()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear();
    //console.log( dateStamp)
    //var data = null;
    for(let i=0;i<reportSections.length;i++){
      //let idAll =  '#'+ reportSections[i].id
      pageNumber +=1;
      let page = pageNumber.toString()
      report.text(page,10,20)
    
      const chart = reportSections[i];
      
      await html2canvas(chart,options).then(function (canvas) { 
          report.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 100, 180,90);
          report.setPage(i);
          console.log(canvas.children)
          if (i < (reportSections.length - 1)) {
            report.addPage();
          }
        });
    }

    report.save("report.pdf")
  }

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

            {
              //TODO: fix this
            }
            <Button onClick={handleChartType}>
                  {chartType === 'bar' ? 'To Pie Chart' : 'To Bar Chart'}
        
            </Button>

            {
              // TODO: Fix this
            }
            <Button onClick={handleDownloadPDF}>
                Download Result
            </Button>

            <EpContainer>
              {
                pollReport.questions.map((question, index) => (
                  <div id='REPORT123' key={index}>
                  {/* <div className="poll-report-item" key={index}> */}
                    <h2>{question.prompt}</h2>
                
                    <EpChart 
                    chartType={chartType} 
                    labels={question.answerTally.labels} 
                    data={question.answerTally.data} />
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

// function PrintableReportItem ({ chartType, question, index}){
//   return (
//     <div className="poll-report-item" key={index}>
//       <h2>{question.prompt}</h2>

//       <EpChart 
//       chartType={chartType} 
//       labels={question.answerTally.labels} 
//       data={question.answerTally.data} />
//     </div>
//   );
// } 

export default PollResult
