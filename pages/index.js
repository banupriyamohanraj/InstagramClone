import ModalContext from "@/ModalContext/ModalContext";
import Feed from "@/components/Feed";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import { useContext } from "react";

export default function Home() {
  let { open } = useContext(ModalContext);
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      {open ? (
        <Modal />
      ) : (
        <>
          <Navbar />
          <Feed />{" "}
        </>
      )}
    </div>
  );
}
