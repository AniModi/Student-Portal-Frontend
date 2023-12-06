import React from "react";
import "./App.scss";
import Login from "./containers/Login";
import SemesterRegistration from "./containers/SemesterRegistration";
import RegistrationStatus from "./containers/RegistrationStatus";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import FacultyList from "./containers/FacultyList";
import FacultyStudentDetails from "./containers/FacultyStudentDetails";
import AcademicsResultUpload from "./containers/AcademicsResultUpload";
import ChangeWalletAddress from "./containers/ChangeWalletAddress";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/student/semester-registration", element: <SemesterRegistration /> },
  { path: "/student/registration-status", element: <RegistrationStatus /> },
  { path: "/student/fee-verification", element: <FeesVerificationForm /> },
  {
    path: "/student/fee-verification-status",
    element: <FeesVerificationStatus />,
  },
  { path: "/student/home", element: <Home /> },
  { path: "/student/profile", element: <Profile /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/change-wallet-address", element: <ChangeWalletAddress /> },
  { path: "/student/select-document", element: <DocumentSelectionPage /> },
  { path: "/student/select-document/:id", element: <DownloadDocumentPage /> },
  { path: "/finance/home", element: <FinanceDepartmentHome /> },
  { path: "/finance/students", element: <FinanceStudentList /> },
  { path: "/finance/students/:id/:semester", element: <VerifyStudentFees /> },
  { path: "/finance/upload", element: <FinanceUpload /> },
  { path: "/faculty/home", element: <FacultyList /> },
  {
    path: "/faculty/home/:username/:semester",
    element: <FacultyStudentDetails />,
  },
  {
    path: "/admin/home",
    element: <AcademicsResultUpload></AcademicsResultUpload>,
  },
];

export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="app_top">
        <div className="app_top__logo">
          <PiStudent></PiStudent>
        </div>
        Student Portal
        <div className="app_top__back_btn">
          <FaArrowLeft onClick={() => navigate(-1)}></FaArrowLeft>
        </div>
        <div className="app_top__logout_btn">
          <FaSignOutAlt
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className="app_body">
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              exact
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </div>
      <div className="app_bottom"></div>
    </>
  );
}
