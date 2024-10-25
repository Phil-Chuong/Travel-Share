// Import config and services
const config = require('./config');
require('dotenv').config();

const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize the app
const app = express();

//DATABASE POSTGRESSQL CONNECTION
const pool = new Pool({
    connectionString: process.env.DB_CONFIG,
    ssl: {
      rejectUnauthorized: true // Change this based on your security needs
  }
});

// async function testConnection() {
//   try {
//       // Configure the PostgreSQL connection
//       const pool = new Pool({
//           connectionString: process.env.DATABASE_URL,
//           ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Remove SSL if not required
//           password: process.env.PGPASSWORD // Ensures password is read as a string
//       });

//       // Test database connection
//       await pool.connect();
//       console.log("Connected to PostgreSQL Database");

//       // Additional query to ensure connection is active (optional)
//       const res = await pool.query("SELECT NOW()");
//       console.log("Database time:", res.rows[0].now);

//   } catch (error) {
//       console.error("Connection error:", error);
//   }
// }



// Allow requests from specific origins
app.use(cors({
  origin: ['https://travel-share-gc6z.onrender.com'], // Replace with your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  credentials: true, // Allow credentials like cookies to be sent
}));

//Middleware
app.use(express.json());

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

//Image upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//TESTING BACKEND CONNECTION
app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
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

//Listen on PORT 4000
app.listen(config.PORT, () => {
console.log(`App listening on port ${config.PORT}`)
// testConnection();
});