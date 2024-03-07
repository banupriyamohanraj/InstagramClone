import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ModalContext from "@/ModalContext/ModalContext";
import { useContext } from "react";

function Navbar() {
  const { data: session, status } = useSession();
  let modalState = useContext(ModalContext);
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div
          className="relative hidden lg:inline-grid w-24 "
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="https://links.papareact.com/ocw"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="relative w-10  lg:hidden flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="relative mt-1 p-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 h-8 block w-full pl-10 sm:text-sm border-gray-500 rounded-md focus: ring-black focus:border-black"
            type="text"
            placeholder="Search"
          ></input>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon
            onClick={() => {
              router.push("/");
            }}
            className="navBtn"
          />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-3 -right-2 bg-red-500 text-sm w-5 rounded-full flex items-center justify-center animate-pulse">
                  1
                </div>
              </div>

              <PlusCircleIcon
                className="navBtn"
                onClick={() => {
                  modalState.setOpen(true);
                }}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                className="h-10 w-10 rounded-full cursor-pointer"
                alt="profile pic"
              ></img>
            </>
          ) : (
            <button type="btn" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
