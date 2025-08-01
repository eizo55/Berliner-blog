import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28  px-3 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold lg:text:6xl">
          Welcome to Berliner Blog{" "}
        </h1>
        <p className="text-gray-500 text-sm sm:text-lg">
          your inside guide to life, culture, and everyday discoveries in
          Berlin, written from an international perspective.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-lg text-teal-500 
        font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-5 bg-amber-100 dark:bg-slate-700 flex justify-center">
        <CallToAction className="!w-full" />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Recent Articles
            </h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline "
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
