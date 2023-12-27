const Admin = require('../model/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../model/admin');
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4NjgxMzMsImRhdGWf";

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const admin = new Admin({
      username,
      email,
      password,
    });

    await admin.save();
    res.json({ message: 'Admin created successfully'});
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ error: 'An error occurred during admin creation.' });
  }
};

exports.loginAdmin=async (req,res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const adm = await Admin.findOne({ email });

    if (!adm) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    if (!password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({
      role: adm.role,
      username: adm.name,
      email: adm.email,
    }, JWT_SECRET, { expiresIn: '10d' });
    const result = {
      username: adm.name,
      role: adm.role,
      email: adm.email,
      token,
      expiresIn: '10d' 
    };
    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
    });
    }catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  }

exports.updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { username, email, password } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { username, email, password },
      { new: true } 
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin user not found.' });
    }

    res.json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (error) {
    console.error('Admin update error:', error);
    res.status(500).json({ error: 'An error occurred during admin update.' });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const deletedAdmin = await Admin.findByIdAndRemove(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin user not found.' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Admin deletion error:', error);
    res.status(500).json({ error: 'An error occurred during admin deletion.' });
  }
};

