import Navbar from "@/components/Navbar";
import { getProviders, signIn as SignIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function signIn({ providers }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center ">
        <img src="https://links.papareact.com/ocw" className="w-72 h-34"></img>
      </div>
      <div className="mt-10 flex-1 text-center ">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => SignIn(provider.id, { callbackUrl: "/" })}
              className="bg-blue-500 text-white rounded-md p-4 "
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers: providers ?? [],
    },
  };
}
