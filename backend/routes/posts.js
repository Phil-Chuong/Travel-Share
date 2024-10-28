const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../DB/db');
//const { authenticateToken } = require('../services/authenticateToken');

//const BASE_URL = 'http://localhost:4000';
//const BASE_URL = 'https://travel-share-backend-11c4.onrender.com';

///////////////////////////////////////////////////
//MULTER SETUP
//UPLOAD PHOTOS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split(' ').join('-')) // Replace spaces with hyphens
    }
  })

// Initialize multer upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 1MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });
  
  
  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }


// POST route to upload multiple photos
router.post('/photos/upload', upload.array('photos', 6), (req, res) => {
    console.log(req.body);
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No photos were uploaded.');
    }

    // Return details of uploaded files
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    res.json({
        message: 'Photos uploaded successfully',
        // files: req.files
        files: imagePaths,
    });
});


// Route to delete a specific photo from a post
router.delete('/:post_id/photos/:filename', async (req, res) => {
    const { post_id, filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename); // Path to the file

    try {
        // Fetch the post by ID
        const post = await Post.getPostById(post_id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Ensure image_path is an array, in case it's stored as a comma-separated string
        const imagePaths = Array.isArray(post.image_path) ? post.image_path : post.image_path.split(',').map(path => path.trim());

        // Check if the image exists in the post's images array
        const imageIndex = imagePaths.findIndex(image => image === `/uploads/${filename}`);
        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image not found in post' });
        }

        // Remove the image from the array
        imagePaths.splice(imageIndex, 1);

        // Update the post in the database
        await Post.updatePostImages(post_id, imagePaths.join(', ')); // Assuming your DB stores paths as comma-separated strings

        // Delete the physical file (optional)
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ error: 'Error deleting the image file' });
            }
        });

        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ error: 'Error deleting photo' });
    }
});
///////////////////////////////////////////////

//GET routes
router.get('/', async (req, res) => {
    console.log('Fetching posts....');
    try {
        const posts = await Post.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ error: 'Error fetching users' }); 
    }
});

router.get('/date', async (req, res) => {
    const { created } = req.query;
    console.log(`Fetching posts by created date: ${created}`);
    try {
        const posts = await Post.getAllPostByDate(created);
        if (posts.length > 0) {
            res.json(posts);
        } else {
            res.status(404).send({ error: 'No posts found for this date' });
        }
    } catch (error) {
        console.error('Error fetching post by created', error);
        res.status(500).send({error: 'Error fetching post by created date'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching posts by ID: ${id}`);
    try {
        const post = await Post.getPostById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error fetching post by ID', error);
        res.status(500).send({error: 'Error fetching post by ID'});
    }
});

router.get('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(`Fetching posts by user ID: ${user_id}`);

    try {
        const posts = await Post.getPostByUserId(user_id);
        
        if (posts.length > 0) {
            // If posts are found, send them back as JSON
            return res.json(posts);
        } else {
            // If no posts found, return a 404 error with a clear message
            console.log(`No posts found for user ID: ${user_id}`);
            return res.status(404).json({ error: 'No posts found for this user' });
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching posts by user ID:', error);
        // Return a 500 error to the client if something goes wrong
        return res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
});


router.get('/country/:country_id', async (req, res) => {
    const { country_id } = req.params;
    console.log(`Fetching posts by users ID: ${country_id}`);

    try {
        const posts = await Post.getPostByCountryId(country_id);

        // Check if no posts are found and return an empty array
        if (posts.length > 0) {
            return res.json(posts || []);
        } else {
            console.log(`No posts found for country: ${country_id}`);
            return res.status(404).json({ error: 'No posts for this country is found'}); // Return an empty array if no posts found
        }
    } catch (error) {
        console.error('Error fetching post by country ID', error);
        res.status(500).send({error: 'Error fetching post by country ID'});
    }
});

//POST routes
router.post('/', upload.array('images', 6), async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { user_id, content, country_id, title } = req.body;

    // Validate required fields
    if (!user_id || !content || !country_id || !title) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process uploaded files (if any)
    let image_paths = null;
    if (req.files && req.files.length > 0) {
        image_paths = req.files.map(file => `/uploads/${file.filename}`).join(','); // Store image paths as a comma-separated string
    }

    try {
        // Create the new post
        const post = await Post.createPost(user_id, content, image_paths, country_id, title);  // Assuming image_paths is stored as an array
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating new post', error);
        res.status(500).send({ error: 'Error creating new post' });
    }
});

router.post('/:id/like', async (req, res) => {
    const postId = req.params.id;

    try {
        const updatedPost = await Post.addLike(postId); // Replace with your model class name
        res.json(updatedPost); // Send back the updated post
    } catch (error) {
        res.status(500).json({ message: 'Failed to add like' });
    }
});

//DELETE routes
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const result = await Post.deletePostById(postId);
        
        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error deleting post by ID:', error);
        res.status(500).json({ error: 'Error deleting post by ID' });
    }
});


module.exports = router;
