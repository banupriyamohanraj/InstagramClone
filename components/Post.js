import React, { useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";

function Post({ key, id, username, img, caption, postImage }) {
  let { data: session } = useSession();

  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);
  let [like, setLike] = useState(false);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentValue = comment;

    setComment("");

    const q = doc(collection(db, "posts", id));

    await addDoc(q, collection("comments"), {
      comment: commentValue,
      username: session.user.username,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const setLikes = async () => {
    setLike(true);
    const likeRef = doc(db, "posts", id);

    setDoc(
      likeRef,
      {
        likes: "liked",
      },
      {
        merge: true,
      }
    ).then(() => console.log("Document updated"));
  };

  return (
    <div className="bg-white my-7 border-rounded-sm ">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          className="h-14 w-14 rounded-full object-contain p-1 mr-3"
          src={img}
          alt="profile pictire"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5 " />
      </div>
      {/* post Image */}
      <img src={postImage} className="object-cover w-full" alt="post Image" />
      {/* buttons */}
      <div className="flex justify-between py-3">
        <div className="flex space-x-3  items-center">
          {!like ? (
            <div onClick={setLikes}>
              <HeartIcon className="btn" />
            </div>
          ) : (
            <>
              <HeartIconFilled className="btn" />
            </>
          )}
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn rotate-45" />
        </div>
        <div>
          <BookmarkIcon className="btn " />
        </div>
      </div>
      {/* captions */}
      <div className="flex space-x-2">
        <p className="font-bold truncate">{username}</p>
        <p>{caption}</p>
      </div>
      {/*comments */}

      {/* input box */}
      <div>
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none pl-2"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            type="submit"
            className="font-semibold text-blue-400"
            disabled={!comment.trim()}
            onClick={() => {
              sendComment;
            }}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
