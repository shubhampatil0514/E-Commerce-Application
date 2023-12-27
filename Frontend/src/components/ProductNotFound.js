import React from 'react';

function ProductNotFound() {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="p-8 bg-gray-100 rounded-md shadow-md flex flex-col items-center">
        <p className="text-lg font-semibold mt-4">Product not found</p>
        <p className="text-gray-500 mt-2">
          Sorry, we couldn't find any products matching your search.
        </p>
      </div>
    </div>
  );
}

export default ProductNotFound;
