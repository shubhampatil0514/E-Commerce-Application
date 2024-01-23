import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ChatBot from "react-simple-chatbot";
import chatbotSteps from "../components/ChatStep";

function Home() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const images = [
    "./image/ebg1.jpg",
    "./image/ebg2.jpg",
    "./image/ebg3.png",
    "./image/ebg4.png",
  ];

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    const image = new Image();
    image.src = images[currentImageIndex];
    image.onload = () => {
      setIsImageLoading(false);
    };
  }, [currentImageIndex]);

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="">
      {isImageLoading ? (
        <Loading />
      ) : (
        <>
          <div className="relative mt-8">
            <img
              src={images[currentImageIndex]}
              alt="Logo"
              className="w-full h-96"
            />
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={() => handleArrowClick("left")}
                className="arrow-button left-arrow text-6xl
                "
              >
                &lt;
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={() => handleArrowClick("right")}
                className="arrow-button right-arrow text-6xl"
              >
                &gt;
              </button>
            </div>
          </div>

          {isChatbotOpen && (
            <ChatBot
              steps={chatbotSteps}
              className="fixed bottom-4 right-4" // Adjust the positioning here
            />
          )}

          <button
            onClick={toggleChatbot}
            className="chatbot-toggle-button fixed bottom-4 right-4"
          >
            <img
              src="./image/chatlogo.jpg"
              alt="chatbot Icon"
              className="h-12 w-12 rounded-full"
            />
          </button>

          <div className="flex justify-between h-96 mt-5">
            <div className="flex-1 max-w-1/4 m-4 border border-black text-center p-10">
              <div className="box-content h-full flex flex-col justify-center items-center">
                <h2 className="text-white bg-black px-2 text-xl font-semibold">
                  Mobile
                </h2>
                <img
                  src="./image/mobile.jpg"
                  alt="Gaming Accessories"
                  className="object-cover max-h-full mt-2 mx-auto"
                />
              </div>
            </div>

            <div className="flex-1 max-w-1/4 m-4 border border-black text-center p-10">
              <div className="box-content h-full flex flex-col justify-center items-center">
                <h2 className="text-white bg-black px-2 text-xl font-semibold">
                  Electronics
                </h2>
                <img
                  src="./image/electronics.jpg"
                  alt="Gaming Accessories"
                  className="object-cover max-h-full mt-2 mx-auto"
                />
              </div>
            </div>

            <div className="flex-1 max-w-1/4 m-4 border border-black text-center p-10">
              <div className="box-content h-full flex flex-col justify-center items-center">
                <h2 className="text-white bg-black px-2 text-xl font-semibold">
                  Fashion
                </h2>
                <img
                  src="./image/fashion.avif"
                  alt="Gaming Accessories"
                  className="object-cover max-h-full mt-2 mx-auto"
                />
              </div>
            </div>

            <div className="flex-1 max-w-1/4 m-4 border border-black text-center p-10">
              <div className="box-content h-full flex flex-col justify-center items-center">
                <h2 className="text-white bg-black px-2 text-xl font-semibold">
                  Toys
                </h2>
                <img
                  src="./image/toy.jpg"
                  alt="Gaming Accessories"
                  className="object-cover max-h-full mt-2 mx-auto"
                />
              </div>
            </div>
          </div>

          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
              <div class="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
                <div class="mx-auto max-w-md text-center lg:text-left">
                  <header>
                    <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
                      Watches
                    </h2>

                    <p class="mt-4 text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quas rerum quam amet provident nulla error!
                    </p>
                  </header>

                  <a
                    href="#"
                    class="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
                  >
                    Shop All
                  </a>
                </div>
              </div>

              <div class="lg:col-span-2 lg:py-8">
                <ul class="grid grid-cols-2 gap-4">
                  <li>
                    <a href="#" class="group block">
                      <img
                        src="./image/watch1.jpg"
                        alt=""
                        class="aspect-square w-full rounded object-cover"
                      />

                      <div class="mt-3">
                        <h3 class="font-medium text-black group-hover:underline group-hover:underline-offset-4">
                          Simple Watch
                        </h3>
                        <p class="mt-1 text-sm text-black">$150</p>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="#" class="group block">
                      <img
                        src="./image/watch2.jpg"
                        alt=""
                        class="aspect-square w-full rounded object-cover"
                      />

                      <div class="mt-3">
                        <h3 class="font-medium text-black group-hover:underline group-hover:underline-offset-4">
                          Simple Watch
                        </h3>
                        <p class="mt-1 text-sm text-black">$150</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;
