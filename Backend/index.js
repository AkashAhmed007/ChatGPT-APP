import express from 'express'
import cors from 'cors'
import ImageKit from 'imagekit'
import mongoose from 'mongoose'
import Chat from './models/chat.js'
import UserChats from './models/userChats.js'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
const app = express()
const port = process.env.PORT || 3000
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true, 
}))
app.use(express.json())
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KEY_POINT,
    publicKey: process.env.IMAGE_PUBLIC_KEY,
    privateKey:process.env.IMAGE_PRIVATE_KEY
  });
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/upload',(req,res)=>{
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
})
app.post("/api/chats", ClerkExpressRequireAuth(), async(req, res) => {
    const userId = req.auth.userId;
    const {text} = req.body;
    try {
      // CREATE A NEW CHAT
      const newChat = new Chat({
        userId: userId,
        history: [{ role: "user", parts: [{ text }] }],
      });
  
      const savedChat = await newChat.save();
  
      // CHECK IF THE USERCHATS EXISTS
      const userChats = await UserChats.find({ userId: userId });
  
      // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
      if (!userChats.length) {
        const newUserChats = new UserChats({
          userId: userId,
          chats: [
            {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          ],
        });
  
        await newUserChats.save();
      } else {
        // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
        await UserChats.updateOne(
          { userId: userId },
          {
            $push: {
              chats: {
                _id: savedChat._id,
                title: text.substring(0, 40),
              },
            },
          }
        );
  
        res.status(201).send(newChat._id);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error creating chat!");
    }
  });

  app.use('/api/userchats',ClerkExpressRequireAuth(),async(req,res)=>{
    const userId = req.auth.userId;
    try {
      const userChats = await UserChats.find({userId})
      res.status(200).send(userChats[0].chats)
    } catch (error) {
      console.log(err);
      res.status(500).send("Error creating chat!");
    }
  })

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
  })

app.listen(port, () => {
  connect()
  console.log(`Example app listening on port ${port}`)
})