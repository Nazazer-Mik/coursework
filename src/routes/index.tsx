import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageSlide from "../components/PageSlide";
import { useEffect, useState } from "react";
import "../styles/index.scss";

// Loading pictures

import firstImage from "../assets/homepage-slideshow/slide3.jpg";
import secondSlideImage from "../assets/home-slide-2.webp";
import thirdSlideImage from "../assets/home-slide-3.jpg";

const loadSlideShowPictures = () => {
  const pictureArray = import.meta.glob("../assets/homepage-slideshow/*.jpg");
  const paths: string[] = [];

  for (const path in pictureArray) {
    pictureArray[path]().then((pic) => paths.push(pic["default"]));
  }

  return paths;
};

// Page itslef

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => loadSlideShowPictures(),
});

function Home() {
  const pictures = useLoaderData({ from: "/" });

  const [currentPicture, setPicture] = useState(firstImage);

  useEffect(() => {
    setInterval(() => {
      const lastPic = pictures.pop() as string;

      if (lastPic == undefined) return;

      pictures.unshift(lastPic);
      setPicture(lastPic);
    }, 5000);
  }, []);

  return (
    <>
      <Header />
      <div className="scroll-container">
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
        <PageSlide imagePath={thirdSlideImage}>
          <div className="sidebars-container">
            <div className="sidebar">
              <div className="upper-block">
                <h3>Targets for achieving climate neutrality</h3>
                <ul>
                  <li>Creating a truly climate-neutral car by 2030</li>
                  <li>
                    Halving per-vehicle-sold greenhouse gas emissions by 2030
                  </li>
                  <li>
                    Becoming climate-neutral across our value chain by 2040
                  </li>
                </ul>
              </div>
              <div className="bottom-block">
                <h3>How we define climate neutrality</h3>
                <p>We have a goal of reaching climate neutrality by 2040. </p>
                <p>
                  Becoming truly climate-neutral means eliminating all
                  greenhouse gas emissions across our operations, and all phases
                  of our cars’ life cycles. This includes emissions from supply
                  chain and manufacturing, as well as energy use during the
                  car’s use phase.
                </p>
              </div>
            </div>
            <div>
              <h2 className="slide-title">
                Advanced Batteries and Sustainable Tech to match Eco-Friendly
                Enviroment
              </h2>
            </div>
          </div>
        </PageSlide>
        <PageSlide imagePath={secondSlideImage}>
          <div className="upper-text-block">
            <h2> Explore the Ultimate Driving Experience with Polestar 2 </h2>
            <Link to={""}>Learn more</Link>
          </div>
        </PageSlide>
        <Footer />
      </div>
    </>
  );
}
