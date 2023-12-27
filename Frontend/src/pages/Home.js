import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import ChatBot from 'react-simple-chatbot'; 
import chatbotSteps from '../components/ChatStep'; 

function Home() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); 

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    const image = new Image();
    image.src = './image/ebg.jpg';
    image.onload = () => {
      setIsImageLoading(false);
    };
  }, []);

  return (
    <div>
      {isImageLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <img
              src='./image/ebg3.jpg'
              alt="Logo"
              className="w-full max-h-screen"
            />
             <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: '999',
              }}
            >              
              <button onClick={toggleChatbot} className="chatbot-toggle-button">
    
                <img src='./image/chatlogo.jpg' alt="chatbot Icon" className='h-12 w-12 rounded-full'              
               />
              </button>              
              {isChatbotOpen && (
                <ChatBot
                  steps={chatbotSteps}
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex-1 max-w-1/4 m-4 border border-gray-300 text-center h-400px p-10">
              <div className="box-content">
                <h2 className="text-xl font-semibold">Mobile</h2>
                <img
                  src='./image/m1.jpg'
                  alt="Gaming Accessories"
                  className="w-80 h-90 object-cover mt-5 mx-auto "
                />
              </div>
            </div>

            <div className="flex-1 max-w-1/4 m-4 border border-gray-300 text-center h-400px p-10">
              <div className="box-content">
                <h2 className="text-xl font-semibold">Electronics</h2>
                <img
                  src='./image/m1.jpg'
                  alt="Gaming Accessories"
                  className="w-80 h-90 object-cover mt-5 mx-auto "
                />
              </div>
            </div>

            <div className="flex-1 max-w-1/4 m-4 border border-gray-300 text-center h-400px p-10">
              <div className="box-content">
                <h2 className="text-xl font-semibold">Shop deals in Fashion</h2>
                <img
                  src='./image/m1.jpg'
                  alt="Gaming Accessories"
                  className="w-80 h-90 object-cover mt-5 mx-auto "
                />
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
