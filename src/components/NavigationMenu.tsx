import { Button } from "./ui/button";
import Account from "../features/authentication/Account";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

const NavigationMenu = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3">
      <p className="cursor-pointer " onClick={() => navigate("/all-posts")}>
        Home
      </p>
      {user ? (
        <Account />
      ) : (
        <div className="flex items-center gap-3">
          <p className="cursor-pointer" onClick={() => navigate("/login-page")}>
            Login
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/registration-page")}
          >
            Create an account
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
