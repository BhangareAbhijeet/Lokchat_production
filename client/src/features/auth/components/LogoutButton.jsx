import { useNavigate } from "react-router-dom";
import { authService } from "../services/authservices.js";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login", { replace: true });
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}