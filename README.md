# Travel-Share
Travel Share, is a social platform designed for travelers to document and share their journeys with a global community. Users can create posts with photos and tag specific countries, creating a unique travel log that others can explore. Each country has its own feed, allowing users to discover destinations and experiences tagged by fellow travelers. With features for liking, commenting, and sharing posts, Travel Share aims to connect adventurers worldwide, fostering inspiration and community through shared travel experiences.

 https://travel-share-gc6z.onrender.com

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

Photo Management: Upload and manage photos up to 10mb.

Likes, Comments, and Replies: Engage with posts through likes, comments, and replies.

Explore by Country: Browse posts by specific countries to discover new travel experiences.

Personal Profile: View user-specific pages showing their posts and photos.

Edit Account page: Editing names, username, email.

Responsive Design: Optimized for both mobile and desktop.

🛠 Tech Stack

Frontend: React, Vite, CSS

Backend: Node.js, Express.js

Database: PostgreSQL

Authentication: JWT tokens

File Management: Multer for file uploads.

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
```
git clone https://github.com/your-username/travel-share.git
```
```
cd travel-share
```
Backend Setup:
Navigate to the backend folder:
bash
Copy code
```
cd backend
```
Install dependencies:
bash
Copy code
```
npm install
```
Start the backend server:
bash
Copy code
```
npm start
```
Frontend Setup:

Navigate to the frontend folder:
bash
```
cd frontend
```
Install dependencies:
bash
```
npm install
```
Start the frontend server:
bash
```
npm run dev
```
Database Setup:

Connect to PostgreSQL and create a database:
sql
Copy code
```
CREATE DATABASE travel_share;
```
Run migrations or manually create tables using SQL scripts provided.
Navigate to http://localhost:5173 to access the frontend.

🔐 Environment Variables
Create a .env file in the backend directory and add the following variables:

env
Copy code
```
DATABASE_URL=postgresql://user:password@localhost:5432/travel_share
JWT_SECRET=your_jwt_secret
```
Ensure the values match your PostgreSQL setup and JWT configurations.



🔮 Future Enhancements

Adding users: Allow users to add other users to a friens list.
Direct Messaging: Enable users to message each other directly.
Notifications: Real-time notifications for likes, comments, and replies.
Advanced Search: Add search options for users and locations.
Saved Posts: Allow users to save posts to revisit later.
Real-Time Updates: Websockets for live post updates without refreshing.


