// import { fireEvent, render, screen, } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import UserDashboard from '../UserDashboard';
// // import { AuthContext } from '../../../../../../src/contexts/AuthContext/AuthContext'
// import { AppDataContext } from '../../../../contexts/AuthContext/AppDataContext';
//  import { useNavigate } from 'react-router'


// const AdhocUseNavigate = () => {
//   return (   
//     <BrowserRouter>
//       <AppDataContext >
//         {/* <useNavigate> */}
//           <UserDashboard>          
//           </UserDashboard>
//         {/* </useNavigate> */}
//       </AppDataContext>
//     </BrowserRouter>
//   )
// };


// test('check for "Dont have an account"', () => {
//     render( <AdhocUseNavigate/> );
//     const userDBText = screen.getByText(/User Dashboard/i);
//     expect(userDBText).toBeInTheDocument();
// });

// test('check for "Easy Poll"', () => {
//   render(<AdhocLogin/>);
//   const logoElement = screen.getByText(/easy poll/i);
//   expect(logoElement).toBeInTheDocument();
// });

// test('user is unauthenticated by default at home screen', () => {
//   render(<AdhocLogin/>);
//   const unauthenticatedWarning = screen.getByText(/unauthenticated/i);
//   expect(unauthenticatedWarning).toBeInTheDocument();
// });

// test('user cannot create a poll when visiting site without logging in', () => {
//   render(<App />);
//   // "getBy" throws an error when something isn't present, so we use "queryBy" when
//   //  we want to assert that something isn't present.
//   const dashboardCreatePollButton = screen.queryByText(/create poll/i);
//   expect(dashboardCreatePollButton).toBeNull();
// });



// TODO: Figure out how to test for this button click
// .ep-diagnostic-button is the className for the diagnostics button
// test('displays diagnostics window when ep-diagnostic-button is clicked', () => {
//   const { container } = render(<App />);
//   const epDiagnosticsButton = container.getElementsByClassName('ep-diagnostics-button')[0];
//   expect(epDiagnosticsButton).toBeInTheDocument();
// });

// TODO: Implement this as EpCopyright is finalized
// test('renders ep-copyright component', () => {
//   render(<App />);
//   const copyrightElement = screen.getByText(/copyright 2023/i);
//   expect(copyrightElement).toBeInTheDocument();
// });