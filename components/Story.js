import React from "react";

function Story({ key, img, username }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={img}
        alt="story_Image"
      ></img>
      <p className="text-sm w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
