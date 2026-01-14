import { LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../components/ui/menubar";
import { useNavigate } from "react-router-dom";
import { useLogout } from "./useLogout";

const Account = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate("/user-post")}>
            My Posts
          </MenubarItem>
          <MenubarItem onClick={() => navigate("/create-post")}>
            Create A Post
          </MenubarItem>
          <Button variant="outline" className="w-full" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Account;
