import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[72px] w-full bg-[#343a40] z-50 shadow-xl text-white flex justify-between items-center px-4">
        <Link to="/"className="no-underline" >The News</Link>
          <form onSubmit={handleSubmit} className="relative">
          <svg
            className="absolute w-4 h-4 top-1/2 right-4 transform -translate-y-1/2 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="input"
            className="bg-black shadow-lg w-[190px] md:w-[300px] h-12 outline-none rounded-lg pl-4 pr-12 text-sm"
            placeholder="Search Articles"
            onChange={handleInputChange}
          />
          </form>
      </div>
    </>
  );
}

export default NavBar;
