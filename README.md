# Travel-Share
Travel Share, is a social platform designed for travelers to document and share their journeys with a global community. Users can create posts with photos and tag specific countries, creating a unique travel log that others can explore. Each country has its own feed, allowing users to discover destinations and experiences tagged by fellow travelers. With features for liking, commenting, and sharing posts, Travel Share aims to connect adventurers worldwide, fostering inspiration and community through shared travel experiences.

 https://travel-share-gc6z.onrender.com

📋 Table of Contents

Features
Tech Stack
Getting Started
Environment Variables
Future Enhancements

✨ Features

User Authentication: Secure signup and Google login , with JWT-based token authentication.

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

🪟 Preview screenshot

![login](https://github.com/user-attachments/assets/c38322e6-47c2-4710-a6d4-d6c540ecf470) ![register](https://github.com/user-attachments/assets/b6e3ce5d-48fd-4c11-ae28-6902c470f7e4)
![main](https://github.com/user-attachments/assets/4d46f9d7-b4b4-46bc-82ee-96bb0b8d9302) ![create](https://github.com/user-attachments/assets/7881d54e-e65f-4a55-9312-2457cbd7bcef)
![accounts](https://github.com/user-attachments/assets/9f4f0161-4d41-4c53-81b6-4ffbfc6cf96a)

🔮 Future Enhancements

Adding users: Allow users to add other users to a friens list.
Direct Messaging: Enable users to message each other directly.
Notifications: Real-time notifications for likes, comments, and replies.
Advanced Search: Add search options for users and locations.
Saved Posts: Allow users to save posts to revisit later.
Real-Time Updates: Websockets for live post updates without refreshing.


