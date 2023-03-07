import {
  useContext,
  useState, 
  React,
  useEffect
} from 'react';
import './EpNavBar.scss';

/*
  John, 2/2/23:

  This is a very basic stub to demonstrate routing functionality, layout and behavior
  are not yet finalized.
*/
import {
  BiPulse
} from "react-icons/bi";

// import Button from '@mui/material/Button';
import EpButton from '../EpButton/EpButton';
import EpLogo from '../EpLogo/EpLogo';

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';
// import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { routes } from '../../../routes';
import { useNavigate } from "react-router-dom";

const EpNavButton = ({route, navHandler}) => (
  <EpButton
    onClick={() => navHandler()}
  >
    {route.name}
  </EpButton>
);

const EpDiagnosticButton = ({ clickHandler }) => {
  // return (
  //   <div className="ep-diagnostic-wrapper">
  //     <BiPulse />
  //   </div>
  // );
  return (
    <EpButton 
      className="ep-diagnostic-button"
      onClick={clickHandler}
    >
      <BiPulse />
    </EpButton>
  );
};

const EpDiagnosticsWindow = ({diagnosticsData, diagnosticsOpen}) => {
  const diagnosticsKeys = Object.keys(diagnosticsData);

  const EpDiagnosticsItem = ({dataKey, dataValue}) => (
    <div 
      className="ep-diagnostics-item"
      key={`diag-item-${dataKey}`}
    >
      <span className="ep-diagnostics-key">{dataKey}:&nbsp;</span>
      {
        typeof dataValue !== "object" || !dataValue ? (
          <span className="ep-diagnostics-value">
            {`${dataValue}`}
          </span>
        ) : (
          Object.keys(dataValue).map((subKey, index) => (
            <EpDiagnosticsItem
              dataKey={subKey}
              dataValue={dataValue[subKey]}
              key={`${subKey}-item-${index}`}
            />
          ))
        )
      }
    </div>
  )

  return (
    <div 
      className={`ep-diagnostics-window ${diagnosticsOpen ? "active" : ""}`}
    >
      {/* {
        diagnosticsKeys.map((diagKey, index) => {
          const data = typeof diagnosticsData[diagKey] === "object" ? 
            JSON.stringify(diagnosticsData[diagKey]) : diagnosticsData[diagKey];

          return (
            <div 
              className="ep-diagnostics-item"
              key={`diagnostic-item-${index}`}
            >
              <span className="ep-diagnostics-key">{diagKey}:</span>&nbsp;
              <span className="ep-diagnostics-value">
                {`${data}`}
              </span>
            </div>
          )
        })
      } */}
      {
        diagnosticsKeys.map((diagKey, index) => (
          <EpDiagnosticsItem
            key={`diag-item-${index}`}
            dataKey={diagKey}
            dataValue={diagnosticsData[diagKey]}
          />
        ))
      }
    </div>
  )
}

const EpNavBar = () => {
  const [ diagnosticsOpen, setDiagnosticsOpen ] = useState(false);
  const [ diagnosticsData, setDiagnosticsData ] = useState({});

  const { 
    dumpCurrentAppData,
  } = useContext(AppDataContext);

  const diagnosticClickHandler = (e) => {
    e.preventDefault;
    // temp behavior
    console.log(dumpCurrentAppData());
    setDiagnosticsOpen(!diagnosticsOpen);
  } 

  const navigate = useNavigate();

  useEffect(() => {
    setDiagnosticsData(dumpCurrentAppData());
  }, [diagnosticsOpen])

  return (
    <div className='ep-nav-bar'>
      <EpLogo />
      <div className="ep-nav-bar-controls">
        {
          routes.map((route, index) => !route.hideInNavBar && (
            <EpNavButton 
              key={`button-${index}`} 
              navHandler={() => {
                console.log(`route.path: ${route.path}`);
                navigate(route.path);
              }}
              route={route}
            />))
        }
        <EpDiagnosticButton 
          clickHandler={diagnosticClickHandler}
        />
      </div>

      <EpDiagnosticsWindow
        diagnosticsOpen={diagnosticsOpen}
        diagnosticsData={diagnosticsData}
      />
    </div>
  );
}
 
export default EpNavBar;