import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageSlide from "../components/PageSlide";
import { useEffect, useState } from "react";
import "../styles/index.scss";

const loadSlideShowPictures = () => {
  const pictureArray = import.meta.glob("../assets/homepage-slideshow/*.jpg");
  const paths: string[] = [];

  for (const path in pictureArray) {
    pictureArray[path]().then((pic) => paths.push(pic["default"]));
  }

  return paths;
};

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => loadSlideShowPictures(),
});

function Home() {
  const pictures = useLoaderData({ from: "/" });

  const [currentPicture, setPicture] = useState(pictures[3]);
  console.log(pictures[3]);

  useEffect(() => {
    setInterval(() => {
      const lastPic = pictures.pop() as string;
      pictures.unshift(lastPic);
      setPicture(lastPic);
    }, 5000);
  }, []);

  return (
    <>
      <Header />
      <PageSlide imagePath={currentPicture}>
        <div className="main-text-container">
          <h2>Discover the Future of Driving</h2>
          <p>
            Welcome to the world of electric cars, where innovation meets
            sustainability. Experience the thrill of cutting-edge technology
            combined with eco-friendly performance.
          </p>
        </div>
        <div className="arrow-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
        <div className="triangle"></div>
      </PageSlide>
      <Footer />
    </>
  );
}
