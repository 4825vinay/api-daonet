import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';

//auth route
import authRoute from './routes/authRoute.js';

//importing routes starts from here
import bookMarkRoute from './routes/bookMarkRoute.js';
import commentRoute from './routes/commentRoute.js';
import communityRoute from './routes/communityRoute.js';
import followerRoute from './routes/followerRoute.js';
import memberRoute from './routes/memberRoute.js';
import postRoute from './routes/postRoute.js';
import topicRoute from './routes/topicRoute.js';
import userRoute from './routes/userRoute.js';

//upload route
import uploadRoute from './routes/uploadRoute.js';

//admin routes starts from here
//import route from './routes/route.js';

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();
connectDb();

//upload route
//app.use('/api/upload', uploadRoute);

//admin routes
//app.use('/admin/users', adminUserRoute);

//route for user login & registration
app.use('/auth', authRoute);

//api endpoints
app.use('/api/bookmarks', bookMarkRoute);
app.use('/api/comments', commentRoute);
app.use('/api/communities', communityRoute);
app.use('/api/followers', followerRoute);
app.use('/api/members', memberRoute);
app.use('/api/posts', postRoute);
app.use('/api/topics', topicRoute);
app.use('/api/users', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on Port: ${port}`));
