import { InputGroup, InputGroupInput } from "./ui/input-group";

const SearchBar = () => {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
