const User= require('../model/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb';
const multer = require('multer');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { signupValidation, validate } = require('../validators/userValidator');
const { OAuth2Client } = require('google-auth-library');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


exports.signup = async (req, res) => {
    try {
        validate(req, res); 
        const { username, email, password} = req.body;
        const profilePicture = req.file.path;
        if ( !username || !email || !password) {
          return res.status(400).json({ error: 'All fields are required.' });
        }

        console.log(req.body)
        if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
         }

         const hashedPassword = await bcrypt.hash(password, 10);

         const user = new User({
          username,
          email,
          password:hashedPassword,
          profilePicture: req.file.path,
        });
    
        await user.save();
        res.json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 11000) {
          return res.status(400).json({ error: 'Email is already registered.' });
        }
        res.status(500).json({ error: 'An error occurred during registration.' });
      }
 }

 exports.profile= async (req, res) => {
  try {
     const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
}
 
  
exports.login=async (req,res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const tokenPayload = {
      userId: user._id, 
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '10d' });
    res.json({ message: 'Login successful.', token });
    }catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  }


exports.updateUser=async (req, res)=>  {
    const userId  = req.params.id;
    const { username, email } = req.body;

    try {
      const us = await user.findById(userId);
      if (!us) {
        return res.status(404).json({ error: 'User not found' });
      }

      us.username = username || user.username;
      us.email = email || user.email;

      await us.save();

      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
/*
exports.requestPasswordReset=async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

    
  
      const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      const resetLink = `https://users/reset-password?token=${resetToken}`;

      const transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'patilshubham0514@gmail.com',
          pass: 'ruukmzoepqheqrek',
        },
      });


      const mailOptions = {
        from: 'patilshubham0514@gmail.com',
        to: user.email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetLink }`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'An error occurred while sending the email.' });
        }
        res.json({ message: 'Password reset email sent successfully' });
      });
    } catch (error) {
      console.error('Password reset request error:', error);
      res.status(500).json({ error: 'An error occurred during password reset request.' });
    }
  },

exports.resetPassword=async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      const decodedToken = jwt.verify(token, JWT_SECRET);

      const user = await User.findOne({ email: decodedToken.email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'An error occurred during password reset.' });
    }
  }
*/

exports.requestPasswordReset=async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      user.passwordResetOTP = otp;
      await user.save();
  
      const transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'patilshubham0514@gmail.com',
          pass: 'ruukmzoepqheqrek',
        },
      });


      const mailOptions = {
        from: 'patilshubham0514@gmail.com',
        to: user.email,
        subject: 'Password Reset OTP ',
        text: `Your OTP for password reset is: ${otp }`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'An error occurred while sending the email.' });
        }
        res.json({ message: 'Password reset email sent successfully' });
      });
    } catch (error) {
      console.error('Password reset request error:', error);
      res.status(500).json({ error: 'An error occurred during password reset request.' });
    }
  },

exports.resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (parseInt(otp) !== parseInt(user.passwordResetOTP)) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      user.passwordResetOTP = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'An error occurred during password reset.' });
    }
  };
  

/*
  passport.use(
    new GoogleStrategy(
      {
        clientID: 'YOUR_GOOGLE_CLIENT_ID',
        clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
        callbackURL: 'http://localhost:3005/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Check if the user already exists in your database
        user.findOne({ googleId: email}, (err, existingUser) => {
          if (err) {
            return done(err);
          }
  
          if (existingUser) {
            // User already exists, return the user
            return done(null, existingUser);
          }
  
          // User doesn't exist, create a new user
          const newUser = new user({
            googleId: email,
            displayName: profile.displayName,
            
          });
  
          newUser.save((err) => {
            if (err) {
              return done(err);
            }
  
            return done(null, newUser);
          });
        });
      }
    )
  );

  module.exports = passport; */
