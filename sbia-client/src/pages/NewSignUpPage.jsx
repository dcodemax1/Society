import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemberDashboard from "./MemberDashboard";
import { tokenService } from "../services/tokenService";

function MemberDashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!tokenService.hasToken()) {
      navigate("/login");
    }
  }, [navigate]);

  return <MemberDashboard />;
}

export default MemberDashboardPage;
