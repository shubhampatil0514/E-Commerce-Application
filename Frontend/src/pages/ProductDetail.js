import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import Loading from '../components/Loading';

function ProductDetailPage() {
  const [isLoading, setIsLoading] = useState(true); 
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCartMessage, setAddedToCartMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:3005/product/${id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setProduct(null);
      });
    

    axios
      .get(`http://localhost:3005/review/${id}`)
      .then((response) => {
        setReviews(response.data.reviews);
        console.log(reviews)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product reviews:', error);
        setReviews([]);
        setIsLoading(false);
      })
  }, [id]);

  const addToCart = () => {
    if (product) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
      const requestBody = {
        u_id:userId,
        productId: product._id, 
        productName: product.name,
        productPrice: product.price,
        quantity: quantity,
        productimg: product.img
      };
  
      axios
        .post(`http://localhost:3005/cart/add/${userId}`, requestBody)
        .then((response) => {
          setAddedToCartMessage('Added to cart successfully!');
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error);
        });
    }
  };

  const renderRatingStars = (rating) => {
    const maxRating = 5; 
    const starIcons = [];
    const starStyle = { fontSize: '24px' };
    
    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        starIcons.push(<span key={i} className="text-yellow-500" style={starStyle}>&#9733;</span>);
      } else {
        starIcons.push(<span key={i} className="text-yellow-500" style={starStyle}>&#9734;</span>);
      }
    }
    return starIcons;
  }

  const ColorPicker = ({ selectedColor, onColorChange }) => {
    const colors = ['gray', 'black', 'yellow', ];
  
    const handleColorChange = (color) => {
      onColorChange(color);
    };
  
    return (
      <div>
        <h3>Select Color:</h3>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {colors.map((color) => (
            <div
              key={color}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              style={{
                backgroundColor: color,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                margin: '5px',
                cursor: 'pointer',
                border: selectedColor === color ? '2px solid #000' : 'none',
              }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Loading /> 
      ) : product ? (
        <div className="flex ml-40 mr-40 mt-8 border-4 rounded-lg p-8">
          <div className="w-1/2">
             <div>
                <div >
                  <img
                    src={`http://localhost:3005/${product.img}`}
                    alt={`Product: ${product.name}`}
                    className="max-w-xs  mx-auto  mb-4"
                    />
                </div>
                <div className='flex-row ml-8 mr-8'  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img
                    src={`http://localhost:3005/${product.img3}`}
                    alt={`Product: ${product.name}`}
                    className={`small-image w-24 h-24 ${selectedImage === product.img3 ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => setSelectedImage(product.img3)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img
                    src={`http://localhost:3005/${product.img4}`}
                    alt={`Product: ${product.name}`}
                    className={`small-image w-24 h-24 ${selectedImage === product.img4 ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => setSelectedImage(product.img4)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img
                    src={`http://localhost:3005/${product.img5}`}
                    alt={`Product: ${product.name}`}
                    className={`small-image w-24 h-24 ${selectedImage === product.img5 ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => setSelectedImage(product.img5)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img
                    src={`http://localhost:3005/${product.img3}`}
                    alt={`Product: ${product.name}`}
                    className={`small-image w-24 h-24 ${selectedImage === product.img3 ? 'border-blue-500 border-2' : ''}`}
                    onClick={() => setSelectedImage(product.img3)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
          </div>

          <div className="w-1/2 ">
            <div className=" p-4">
             <h2 className="text-6xl font-bold ">{product.name}</h2>
             <p className="text-black text-4xl mt-2 ">
              ₹{product.price}
             </p>
             <div className="flex">
                {renderRatingStars(product.rating)}
             </div>
             <p className="text-gray-600">{product.description}</p>
             <p className="text-blue-600">
              Stock Quantity: {product.stockQuantity}
             </p>
             <p className="text-indigo-600">Category: {product.categories}</p>
             <p className="text-indigo-600">Product ID: {product._id}</p>
             <ColorPicker
                selectedColor={selectedColor}
                onColorChange={(color) => setSelectedColor(color)}
              />
              <button onClick={addToCart} className="bg-gray-900 text-white mt-10 mx-28 w-60 rounded-lg px-4 py-2 cursor-pointer justify-center and items-center property">
                Add to Cart
              </button>
             {addedToCartMessage && (
             <p className="text-green-500 mt-4 mx-24">{addedToCartMessage}</p>
             )}
            </div>
          </div>

       </div>
          ) : (
            <p>Error loading product details.</p>
          )}
         
         <div>
            <h3 className="text-2xl font-semibold mt-8 ml-10">Customer Reviews</h3>
              <ul className="mt-2">
                {reviews.map((review) => (
                  <li key={review._id} className="mb-4 mr-20 ml-20">
                    <div className="review-card p-4 border rounded-lg shadow-lg">
                      <div className="flex">
                        <FaUserCircle className="text-4xl mr-2" /> 
                        <p className="text-gray-600 text-2xl">{review.user}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        {renderRatingStars(review.rating)}
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
     </div>

  );
}
export default ProductDetailPage;

