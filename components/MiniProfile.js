import React from "react";
import Image from "next/image";

import { Butterfly_Kids } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      {!session ? (
        <></>
      ) : (
        <>
          <img
            src={session?.user?.image}
            className="h-16 w-16 rounded-full cursor-pointer"
          ></img>
          <div className="flex-1 mx-4">
            <h2 className="font-bold ml-3">{session?.user?.name}</h2>
            <h3 className="text-sm text-gray-400 ml-3">Welcome to Instagram</h3>
          </div>
          <button
            type="btn"
            onClick={signOut}
            className=" text-blue-500 text-sm hover:text-blue-800 hover:scale-105 cursor-pointer transition-all duration-150 ease-out"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}

export default MiniProfile;
