import { connection } from "./DB/connection.js"
import userRouter from"./modules/user/user.router.js"
import postRouter from "./modules/post/post.router.js"
import { globalError } from "./utils/asyncHandelar.js"
const bootstrap=(app,express)=>{
    app.use(express.json())
    app.use("/user",userRouter)
    app.use("/post",postRouter)
    connection()
    app.use(globalError)
}

export default bootstrap