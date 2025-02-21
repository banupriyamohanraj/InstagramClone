import React from "react";
import { useEffect, useState } from "react";

function Suggestions() {
  const [data, setData] = useState();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(
          `https://65dc2c1a3ea883a152929d72.mockapi.io/api/users/postdata`
        );
        const data = await res.json();
        setData(data);
       
      } catch (err) {
        console.log(err);
      }
    };
    callAPI();
  }, []);

  return (
    <div className="mt-8 ml-12">
      <div className="flex justify-between text-sm mb-4">
        Suggestions for you
        <button type="btn" className="text-sm font-semibold text-gray-600">
          See All
        </button>
      </div>
      {data &&
        data.map((item) => {
          return (
            <div
              key={item.id}
              className="mt-3 flex items-center justify-between"
            >
              <img src={item.useravatar} className="h-10 w-10 rounded-full " />
              <div className="flex-1 ml-2 ">
                <p className="text-left">{item.username}</p>
                <span>works at {item.companyname}</span>
              </div>
              <button
                type="btn"
                className="text-sm text-blue-500 ml-3 hover:text-blue-800 hover:scale-105 cursor-pointer transition-all duration-150 ease-out"
              >
                follow
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Suggestions;
