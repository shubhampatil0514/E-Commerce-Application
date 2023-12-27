const product= require('../model/Product')
const url = require('url');
const { validationResult } = require('express-validator');
const { productValidation, validate } = require('../validators/productValidator');
const { ac } = require('../middleware/auth');

exports.createProduct = async (req, res) =>{
  try {
    validate(req, res); 

    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Permission denied. Only admin users can create a product.' });
    }

    console.log(req.body)
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
      const { name,description,price,stockQuantity,categories, rating } = req.body;
      const img = req.file.path;
      const newProduct = await product.create({ name,
          description,
          img,
          categories,
          stockQuantity,
          price ,
          rating });
       res.status(201).json({ message: ' Product added successfully.' });
    } catch (error) {
      console.error(' error:', error);
    }  
}

exports.updateProduct=async (req, res)=>  {
    const productId = req.params.id;
    const { name, price } = req.body;

    try {
      const pro = await product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      pro.name = name || product.name;
      pro.price = price || product.price;

      await pro.save();

      res.json({ message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
}

exports.getProductById=async (req, res) =>{
    const productId = req.params.id;

    try {
      const pro = await product.findById(productId);
      if (!pro) {
        return res.status(404).json({ error: 'Product not found' });
      }
      console.log(pro);
      res.json(pro);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve product' });
    }
  }

exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const perPage = parseInt(req.query.perPage) || 9; 
    
    const filters = {};
    const sort = {};

    if (req.query.category) {
      const categoriesArray = req.query.category.split(',');
      filters.categories = { $in: categoriesArray };
    }

    if (req.query.minPrice && req.query.maxPrice) {
      filters.price = {
        $gte: parseFloat(req.query.minPrice), 
        $lte: parseFloat(req.query.maxPrice), 
      };
    }

    if(req.query.sortBy && req.query.OrderBy){
      sort[req.query.sortBy]= req.query.OrderBy === 'desc' ? -1 : 1
  }

  if (req.query.search) {
    filters.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  
    try {
      const totalCount = await product.countDocuments(filters); 
      const totalPages = Math.ceil(totalCount / perPage); 
  
      
      if (page < 1 || page > totalPages) {
        return res.status(400).json({ error: 'Invalid page number' });
      }
      const skip = (page - 1) * perPage;
      const products = await product
        .find(filters)
        .skip(skip)
        .limit(perPage)
        .sort(sort);
  
      res.json({
        products,
        page,
        totalPages,
        totalCount,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve products' });
    }
  };
