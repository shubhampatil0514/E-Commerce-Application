import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


function ProductPage() {
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('oldest');
  const { id } = useParams()
  const location = useLocation(); 
  const searchQuery = new URLSearchParams(location.search).get('search'); 
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:3005/product';
    const queryParams = {
      category: categoryFilter, 
      minPrice: minPrice,
      maxPrice: maxPrice,
      page: currentPage,  
    };
    
    axios
      .get(apiUrl, { params: queryParams })
      .then((response) => {
        console.log(response.data);
        const sortedProducts = [...response.data.products];
        if (sortOrder === 'newest') {
          sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortOrder === 'oldest') {
          sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      })
      .finally(() => {
        setIsLoading(false); 
      });

  }, [categoryFilter, minPrice, maxPrice, id, sortOrder, currentPage]);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`http://localhost:3005/product?search=${searchQuery}`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [searchQuery]);


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

  const handleView = (_id) => {

    navigate(`/product/${_id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-gray-950 font-black mb-4 text-4xl">Filters</h2>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-2 py-1 mb-8 border border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          <option value="Electronics"> Electronics</option>
          <option value="Mobile">Mobile</option>
          <option value="Clothes">Clothes</option>
        </select>
        <select
          value={`${minPrice}-${maxPrice}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-');
            setMinPrice(min);
            setMaxPrice(max);
          }}
          className="w-full px-2 py-1 mb-8 border border-gray-300 rounded"
        >
          <option value="">All Prices</option>
          <option value="0-1000">1000 and under</option>
          <option value="1000-2500">2500 and under</option>
          <option value="2500-5000">5000 and under</option>
          <option value="5000-10000">10000 and under</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full px-2 py-1 mb-8 border border-gray-300 rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="w-3/4 ml-16 p-4">
        <h1 className="text-gray-950 font-black mb-2 text-4xl">Product</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap">
            {Array.isArray(products) &&
              products.map((product) => (
                <div key={product._id.$oid} className="w-1/ border-2 mb-4 mr-4">
                    <div className="w-64 h-80  mx-auto flex justify-center items-center">
                      <img
                        src={`http://localhost:3005/${product.img}`}
                        alt={`Product: ${product.name}`}
                      />
                    </div>

                    <div className="ml-4 mr-4 bg-gray-50">
                      <h2 className="text-2xl font-semibold mb-1">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </h2>
                      <div className="flex">{renderRatingStars(product.rating)}</div>
                      <p className="text-green-600 font-semibold">
                        Price: {product.price}Rs
                      </p>
                      <p className="text-blue-600">
                        Stock Quantity: {product.stockQuantity}
                      </p>
                      <p className="text-indigo-600">Category: {product.categories}</p>
                      <p className="text-indigo-600">Product ID: {product._id}</p>
                    </div>
                    <Button
                      label="View"
                      fullWidth="true"
                      variation="secondary"
                      className="mt-2"
                      onClick={() => handleView(product._id)}
                    />
                </div>
              ))}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className="bg-gray-900 text-white mr-4 font-bold py-2 px-4 rounded-l"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-900 ml-4 text-white font-bold py-2 px-4 rounded-r"
            
          >
            <FaArrowRight />
          </button>
        </div>


      </div>
    </div>
  );
}

export default ProductPage;







