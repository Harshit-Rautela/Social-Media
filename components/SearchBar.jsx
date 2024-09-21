"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const image = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?name=${searchTerm}`);
        if (!response.ok) throw new Error("could not fetch users");
        const data = await response.json();
        console.log('The data is: ',data)
        setSearchResults(data);
      } catch (error) {
        console.log("The error is:", error);
      }
    };
    //Here debounce fetch will run the function after user has stopped writing for 1 sec to minimize API calls.
    const debounceFetch = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);
  const handleSelectProfile = (userId) => {
    router.push(`/profile/${userId}`);
  }
  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for Users"
        className="p-2 w-full border rounded-lg bg-gray-800"
      />
      {searchResults.length > 0 && (
        <div className="absolute top-full right-0 left-0 bg-gray-600 border rounded-lg mt-1 shadow-lg ">
          {searchResults.map((user) => (
            <div
              className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
              key={user._id}
              onClick={() => handleSelectProfile(user._id)}
            >
              <img
                src={user.profilePicture || image}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>{user.userName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
