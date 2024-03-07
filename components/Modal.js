import ModalContext from "@/ModalContext/ModalContext";
import React, { useContext, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Modal() {
  let { open, setOpen } = useContext(ModalContext);
  const { data: session } = useSession();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const fileClickRef = useRef(null);
  const captionRef = useRef(null);

  function handleChange(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  const UploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: caption,
      timestamp: serverTimestamp(),
      profileImage: session.user.image,
      likes: "unliked",
      comments: [],
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0 sm:m-[-10] py-64">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div class="bg-gray-50  flex flex-col ">
              {selectedFile ? (
                <img
                  src={selectedFile}
                  alt="post"
                  className="w-full object-contain cursor-pointer"
                ></img>
              ) : (
                <>
                  <div
                    className=" flex justify-center items-center p-5 "
                    onClick={() => {
                      fileClickRef.current.click();
                    }}
                  >
                    <input
                      ref={fileClickRef}
                      type="file"
                      name="file"
                      hidden
                      onChange={handleChange}
                    />
                    <CameraIcon className="h-14 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />
                  </div>
                  <div className="flex justify-center items-center">
                    <h3
                      class="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Upload Post
                    </h3>
                  </div>
                </>
              )}
              <div className="flex space-x-3 py-5 px-10 ">
                <input
                  type="text"
                  className="bg-white outline-1 text-black h-16 w-full"
                  placeholder="whats on your mind..."
                  ref={captionRef}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                ></input>
              </div>
              {loading ? (
                <div className="flex space-x-3 p-5  justify-center items-center">
                  <button className="inline-flex w-full justify-center rounded-md bg-black px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-1 sm:ml-3 sm:w-aut">
                    loading...
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3 p-5  justify-center items-center">
                  <button
                    onClick={UploadPost}
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-black px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-1 sm:ml-3 sm:w-auto"
                  >
                    Post
                  </button>

                  <button
                    type="button"
                    class=" inline-flex w-full justify-center rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
