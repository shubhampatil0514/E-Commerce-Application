const Image = require('../model/Image');


exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const maxFileSize = 2 * 1024 * 1024;
    if (req.file.size > maxFileSize) {
        return res.status(400).json({ error: 'Image size exceeds' });
      }
    const img = new Image({
      filename: req.file.originalname,
      path: req.file.path,
    });

    await img.save();
    res.status(201).json({ message: 'Image uploaded successfully', img });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
