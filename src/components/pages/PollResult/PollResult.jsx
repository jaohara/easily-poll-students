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

import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

import {
  BiBarChartAlt2,
  BiPieChartAlt2,
} from "react-icons/bi";


import {
  ImFilePdf,
} from "react-icons/im";

import "./PollResult.scss";
import chartColors from '../../../styles/chartColors';

import { AppDataContext } from '../../../contexts/AppDataContext/AppDataContext';

import EpButton from '../../UI/EpButton/EpButton';
import EpChart from "../../UI/EpChart/EpChart";
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpLoading from '../../UI/EpLoading/EpLoading';

const getChartColor = (index) => chartColors[index % chartColors.length];

const PollResult = () => {
  const [ pollReportLoading, setPollReportLoading ] = useState(false);
  const [ pollReport, setPollReport ] = useState();

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  const [chartType, setChartType] = useState('pie');


  // TODO: Fix this
  //Switches Chart type
  const handleChartType = async() => {
    setChartType((chartType) =>
      //if bar chnage to pie and vice versa
      chartType === 'bar' ? 'pie' : 'bar'
    );
  };

  // Collect all div 
  // const reportSections = document.querySelectorAll('#REPORT123')
  // // const reportSections = document.querySelectorAll('.poll-report-item');
  
  const renderResultsToPDF = async () => {
    const renderedReport = new jsPDF('portrait', 'mm', 'a4',);
    // const reportSections = document.querySelectorAll('.poll-report-item');
    const reportSections = document.querySelectorAll('.printable-poll-report-item');

    const options = {
      pagesplit: true
    };

    for(let i = 0; i < reportSections.length; i++){
      let pageNumber = (i + 1).toString();
      renderedReport.text(pageNumber, 10, 20)
    
      const chart = reportSections[i];
      
      await html2canvas(chart, options)
        .then((canvas) => { 
          renderedReport.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 100, 180,90);
          renderedReport.setPage(i);

          if (i < (reportSections.length - 1)) {
            renderedReport.addPage();
          }
        });
    }

    renderedReport.save("report.pdf");
  };

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
      console.log("Generated report: ", report);
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
    <>
      <div className="poll-results no-print">
        {
          !reportReady ? (
          // pollReportLoading && !pollReport ? (
            <EpLoading />
          ) : (
            <>
              <h1>{pollReport.title} Results</h1>
              
              <PollResultControls
                chartType={chartType}
                handleChartType={handleChartType}
                renderResultsToPDF={renderResultsToPDF}
              />

              <EpContainer>
                {
                  pollReport.questions.map((question, index) => (
                    <PollReportItem
                      chartType={chartType}
                      index={index}
                      key={`poll-report-item-${index}`}
                      question={question}
                    />
                  ))
                }
              </EpContainer>
            </>
          )
        }
      </div>

      { 
        reportReady && (
          <div className="printable-poll-results">
            {
              pollReport.questions.map((question, index) => (
                <PrintableReportItem
                  chartType={chartType}
                  key={`printable-report-item-${index}`}
                  index={index}
                  question={question}
                />
              ))
            }
          </div>
        )
      }
    </>
  )
};

function PollResultControls ({
  chartType,
  handleChartType,
  renderResultsToPDF,
}) {
  return (
    <EpContainer
      className="poll-results-controls"
    >
      <EpButton 
        onClick={handleChartType}
      >
        {
          chartType === 'bar' ? (
            <>
              <BiPieChartAlt2 />&nbsp;
              Pie Charts 
            </>
          ) : (
            <>
              <BiBarChartAlt2 />&nbsp;
              Bar Charts 
            </>
          )
        }
      </EpButton>

      <EpButton 
        onClick={renderResultsToPDF}
      >
        <ImFilePdf />&nbsp;
        Save Results as PDF
      </EpButton>
    </EpContainer>
  )
}

function PollReportItem ({ chartType, question, index }) {
  const totalVotes = question.answerTally.data.reduce(
    (acc, current) => acc + current
  );

  return (
    <div className="poll-report-item" key={index}>
      <h2>{question.prompt}</h2>
{/* 
      <EpButton
        onClick={() => console.log("question: ", question)}
      >
        Log Question 
      </EpButton> */}
  
      <div className="poll-report-item-body">
        <div className="poll-report-item-body-stats">
          {
            question.answerTally.data.map((data, index) => (
              <PollReportItemStat 
                // TODO: this might be off - is this 0 indexed?
                color={getChartColor(index)}
                key={`poll-report-item-stat-${index}`}
                statValue={data}
                statTitle={`${question.answerTally.labels[index]}`}
                totalVotes={totalVotes}
                // statistic={`${question.answerTally.labels[index]} - ${data}`}
              />
            ))
          }
        </div>

        <div className="poll-report-item-body-chart">
          <EpChart 
            chartType={chartType} 
            data={question.answerTally.data}
            hideLegend
            labels={question.answerTally.labels} 
          />
        </div>
      </div>
    </div>
  );
}

function PollReportItemStat ({ 
  color, 
  statTitle,
  statValue,
  totalVotes,
}) {
  const precision = 2;
  const percentage = ((statValue / totalVotes) * 100).toFixed(precision);

  useEffect(() => {
    console.log(`${statTitle} - statValue, totalVotes, percentage: `, statValue, totalVotes, percentage);
  }, [])

  return (
    <div className="poll-report-item-stat">
      <div 
        className="poll-report-item-stat-color"
        style={{
          backgroundColor: color,
        }}
      ></div>

      <div className="poll-report-item-stat-data">
        <div className="poll-report-item-stat-data-title-and-votes">
          <div className="poll-report-item-stat-title">
            {statTitle}
          </div>
          <div className="poll-report-item-stat-votes">
            {statValue} Votes
          </div>
        </div>

        <div className="poll-report-item-stat-data-percentage">
          {percentage}%
        </div>
      </div>
    </div>
  )
}

function PrintableReportItem ({ chartType, question, index}){
  return (
    <div className="printable-poll-report-item" key={index}>
      <h2>{question.prompt}</h2>
      <EpChart 
        chartType={chartType} 
        labels={question.answerTally.labels} 
        data={question.answerTally.data} 
      />
    </div>
  );
} 

export default PollResult
