import React from "react";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold p-3">Projects</h1>
      <p className="text-md tex-gray-500">
        Explore the creative projects and collaborations that reflect our
        passion for Berlin’s culture, community, and stories.
      </p>
      <CallToAction />
    </div>
  );
}
