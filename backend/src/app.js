import express from "express"
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api", commentRoutes)

app.get("/", (req,res)=>{
    res.send("API running...")
})

export default app;