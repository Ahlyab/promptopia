"use client";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const handleEdit = async () => {};
  const handleDelete = async () => {};
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log("useEffect calling", session);

    if (session?.user.id) {
      console.log("comming here");
      fetchPosts();
    }
  }, [session]);

  return (
    <Profile
      name={"My"}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
