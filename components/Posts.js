import React from "react";
import Post from "./Post";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs);
    });
  }, [db]);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return (
            <Post
              id={post.id}
              key={post.id}
              username={post.data().username}
              img={post.data().profileImage}
              caption={post.data().caption}
              postImage={post.data().image}
            />
          );
        })}
    </div>
  );
}

export default Posts;
