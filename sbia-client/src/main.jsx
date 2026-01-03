import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import MemberFormPage from "./pages/MemberFormPage.jsx";
import LoanFormPage from "./pages/LoanFormPage.jsx";
import BankFormPage from "./pages/BankFormPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
<<<<<<< HEAD
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
=======
>>>>>>> 34f949a57693ffc7e458c65d4c0d489add73950d
import {
  LoanRequestsPage,
  MembersPage,
  ReferralPage,
} from "./components/Admin";

function HomePage() {
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member-form" element={<MemberFormPage />} />
        <Route path="/loan-application" element={<LoanFormPage />} />
        <Route path="/bank-form" element={<BankFormPage />} />
        <Route path="/admin" element={<AdminPage />} />
<<<<<<< HEAD
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
=======
>>>>>>> 34f949a57693ffc7e458c65d4c0d489add73950d
        <Route path="/loan-requests" element={<LoanRequestsPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/referral" element={<ReferralPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
