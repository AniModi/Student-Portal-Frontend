import React from "react";
import "./App.scss";
import Login from "./containers/Login";
import SemesterRegistration from "./containers/SemesterRegistration";
import RegistrationStatus from "./containers/RegistrationStatus";
import { Route, Routes } from "react-router-dom";
import FeesVerificationForm from "./containers/FeesVerificationForm";
import FeesVerificationStatus from "./containers/FeesVerificationStatus";
import Home from "./containers/Home";
import { PiStudent } from "react-icons/pi";
import Profile from "./containers/Profile";
import ChangePassword from "./containers/ChangePassword";
import DocumentSelectionPage from "./containers/DocumentSelectionPage";
import DownloadDocumentPage from "./containers/DownloadDocumentPage";
import FinanceDepartmentHome from "./containers/FinanceDepartmentHome";
import FinanceStudentList from "./containers/FinanceStudentList";
import VerifyStudentFees from "./containers/VerifyStudentFees";
import FinanceUpload from "./containers/FinanceUpload";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/semester-registration", element: <SemesterRegistration /> },
  { path: "/registration-status", element: <RegistrationStatus /> },
  { path: "/fee-verification", element: <FeesVerificationForm /> },
  { path: "/fee-verification-status", element: <FeesVerificationStatus /> },
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/change-password", element: <ChangePassword /> },
  {path : "/select-document", element : <DocumentSelectionPage/>},
  {path : "/select-document/:id", element : <DownloadDocumentPage/>},
  {path : "/finance/home", element : <FinanceDepartmentHome/>},
  {path : "/finance/students", element : <FinanceStudentList/>},
  {path : "/finance/students/:id", element : <VerifyStudentFees/>},
  {path : "/finance/upload", element : <FinanceUpload/>},
];

export default function App() {
  return (
    <>
      <div className="app_top">
        <div>
          <PiStudent></PiStudent>
        </div>
        Student Portal
      </div>
      <div className="app_body">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} exact path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <div className="app_bottom"></div>
    </>
  );
}
