// Import config and services
const config = require('./config');
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { Pool } = require('pg');
//const { pool } = require('./DB/db'); // Ensure this imports the pool directly

// Initialize the app
const app = express();

// Allow requests from specific origins
app.use(cors());
// app.use(cors({
//   origin: ['https://travel-share-gc6z.onrender.com'], // Replace with your frontend URLs
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//   credentials: true, // Allow credentials like cookies to be sent
// }));

//Middleware
app.use(express.json());

// pool.connect()
//     .then(client => {
//         console.log("PostgreSQL connection established");
//         client.release(); // Release the client back to the pool
//     })
//     .catch(err => console.error("Database connection error:", err));


//Import routes
const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const authenticationRouter = require('./routes/authentication');
const repliesRounter = require('./routes/replies');
const googleRouter = require('./routes/googleAuthentication');

//Routes handlers
app.use('/users', usersRouter);
app.use('/countries', countriesRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/replies', repliesRounter);
app.use('/authentication', authenticationRouter);// Register/Login routes
app.use('/posts/photos/upload', postsRouter);
app.use('/googleAuthentication', googleRouter);

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Serve static files from the uploads directory without requiring JWT
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

//TESTING BACKEND CONNECTION
app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend! Am Connected!"
    })
});

//Swagger options
const swaggerOptions = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Travel Share API",
        version: "1.0.0",
        description: "API documentation for Travel Share",
      },
      servers: [
        {
          url: 'https://travel-share-backend-11c4.onrender.com',
        },
      ],
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer', description: 'The user ID' },
              firstname: { type: 'string', description: 'The user\'s first name' },
              lastname: { type: 'string', description: 'The user\'s last name' },
              username: { type: 'string', description: 'The user\'s username' },
              email: { type: 'string', description: 'The user\'s email address' },
            }
          }
        }
      }
    },
    apis: ['./routes/*.js', './models/*.js'],
};
  
  
// Generate Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
  
// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Catch-all route to serve `index.html` for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//Listen on PORT 4000
app.listen(config.PORT, () => {
console.log(`App listening on port ${config.PORT}`)
});