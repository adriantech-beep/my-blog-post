import NavigationMenu from "./NavigationMenu";
import SearchBar from "./SearchBar";

const Navigation = () => {
  return (
    <div className="flex justify-between bg-white p-2 rounded-md shadow-md">
      <SearchBar />
      <NavigationMenu />
    </div>
  );
};

export default Navigation;
