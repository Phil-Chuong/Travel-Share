# Travel-Share
 Travel Share, is a social platform designed for travelers to document and share their journeys with a global community. Users can create posts with photos and tag specific countries, creating a unique travel log that others can explore. Each country has its own feed, allowing users to discover destinations and experiences tagged by fellow travelers. With features for liking, commenting, and sharing posts, Travel Share aims to connect adventurers worldwide, fostering inspiration and community through shared travel experiences.

📋 Table of Contents
Features
Tech Stack
Getting Started
Environment Variables
API Endpoints
Testing
Future Enhancements
License

✨ Features
User Authentication: Secure signup and login, with JWT-based token authentication.

Post Sharing: Create posts with multiple photos (up to 6) and tag locations by country.

Photo Management: Upload and manage photos (compressed for efficiency).

Likes, Comments, and Replies: Engage with posts through likes, comments, and replies.
Explore by Country: Browse posts by specific countries to discover new travel experiences.
Personal Profile: View user-specific pages showing their posts and photos.
Responsive Design: Optimized for both mobile and desktop.
🛠 Tech Stack
Frontend: React, Vite, CSS
Backend: Node.js, Express.js
Database: PostgreSQL
Authentication: JWT tokens
File Management: Multer for file uploads, Sharp for image resizing
Testing: Jest, Supertest
Deployment: Render

🚀 Getting Started
Prerequisites
Ensure you have the following installed:

Node.js
PostgreSQL
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/travel-share.git
cd travel-share
Backend Setup:

Navigate to the backend folder:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Start the backend server:
bash
Copy code
npm start
Frontend Setup:

Navigate to the frontend folder:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Start the frontend server:
bash
Copy code
npm run dev
Database Setup:

Connect to PostgreSQL and create a database:
sql
Copy code
CREATE DATABASE travel_share;
Run migrations or manually create tables using SQL scripts provided.
Navigate to http://localhost:5173 to access the frontend.

🔐 Environment Variables
Create a .env file in the backend directory and add the following variables:

env
Copy code
DATABASE_URL=postgresql://user:password@localhost:5432/travel_share
JWT_SECRET=your_jwt_secret
Ensure the values match your PostgreSQL setup and JWT configurations.

🔗 API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login and obtain a token
Posts
POST /api/posts - Create a new post
GET /api/posts - Get all posts
GET /api/posts/:id - Get a post by ID
DELETE /api/posts/:id - Delete a post by ID
Photos
POST /api/photos/upload - Upload photos for a post (up to 6 per post)
DELETE /api/:post_id/photos/:filename - Delete a photo from a post
Likes & Comments
POST /api/posts/:id/like - Like or unlike a post
POST /api/posts/:post_id/comments - Add a comment to a post
User Profiles
GET /api/users/:user_id/posts - Get posts by a specific user
GET /api/country/:country_id/posts - Get posts by a specific country
🧪 Testing
Run tests to verify the codebase integrity.

Install Jest and Supertest:

bash
Copy code
npm install --save-dev jest supertest
Run Tests:

bash
Copy code
npm test
Tests include unit and integration tests for image uploads, post creation, and user interactions (like and comment functionality).

🔮 Future Enhancements
Direct Messaging: Enable users to message each other directly.
Notifications: Real-time notifications for likes, comments, and replies.
Advanced Search: Add search options for users and locations.
Saved Posts: Allow users to save posts to revisit later.
Real-Time Updates: Websockets for live post updates without refreshing.
📄 License
This project is licensed under the MIT License.

