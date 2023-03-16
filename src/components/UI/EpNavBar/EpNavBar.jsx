import {
  useContext,
  useState, 
  React,
  useEffect
} from 'react';
import './EpNavBar.scss';

import {
  BiLogOut,
  BiPoll,
  BiPulse,
  BiUser,
} from "react-icons/bi";

import EpButton from '../EpButton/EpButton';
import EpLogo from '../EpLogo/EpLogo';

import { AppDataContext } from '../../../contexts/AppDataContext/AppDataContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import { routes } from '../../../routes';
import { useNavigate } from "react-router-dom";

// kind of an ugly idea, but it works
const routeIcons = {
  "Login/Register": <BiUser />,
  "User Dashboard": <BiPoll />,
};

const EpNavButton = ({disabled, route, navHandler}) => {
  const routeIcon = routeIcons[route.name];
  
  return (
    <EpButton
      disabled={disabled}
      onClick={() => navHandler()}
    >
      {
        routeIcon && (
          <>
            {routeIcon} &nbsp;
          </>
        )
      }
      {route.name}
    </EpButton>
    );
};

const EpDiagnosticButton = ({ clickHandler }) => {
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
        (Array.isArray(dataValue) && dataValue.length === 0) 
          || typeof dataValue !== "object" || !dataValue ? (
          <span className="ep-diagnostics-value">
            {`${Array.isArray(dataValue) && dataValue.length === 0 ? "[]" : dataValue}`}
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
  const { logout, user } = useContext(AuthContext);

  const [ diagnosticsOpen, setDiagnosticsOpen ] = useState(false);
  const [ diagnosticsData, setDiagnosticsData ] = useState({});

  const { 
    dumpCurrentAppData,
  } = useContext(AppDataContext);

  const diagnosticClickHandler = (e) => {
    e.preventDefault;
    setDiagnosticsOpen(!diagnosticsOpen);
  } 

  const navigate = useNavigate();

  useEffect(() => {
    setDiagnosticsData(dumpCurrentAppData());
  }, [diagnosticsOpen])

  return (
    <div className='ep-nav-bar no-print'>
      <EpLogo />
      <div className="ep-nav-bar-controls">
        {
          routes.map((route, index) => 
            !route.hideInNavBar && 
            !(route.hideWhenAuthorized && user) &&
            (
              <EpNavButton 
                disabled={route.disableWhenUnauthorized === true && !user}
                key={`button-${index}`} 
                navHandler={() => {
                  console.log(`route.path: ${route.path}`);
                  navigate(route.path);
                }}
                route={route}
              />
            ))
        }
        {
          user && (
            <EpButton
              onClick={logout}
            >
              <BiLogOut />&nbsp;
              Logout
            </EpButton>
          )

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
