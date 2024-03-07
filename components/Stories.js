import { useEffect, useState } from "react";
import Story from "../components/Story";

function Stories() {
  const [data, setData] = useState();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(
          `https://65dc2c1a3ea883a152929d72.mockapi.io/api/users/users`
        );
        const data = await res.json();
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    callAPI();
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {data &&
        data.map((item) => {
          return (
            <Story key={item.id} img={item.avatar} username={item.name}></Story>
          );
        })}
    </div>
  );
}

export default Stories;
