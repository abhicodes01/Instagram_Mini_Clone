import bcrypt from "bcryptjs"
import User from "../models/User.model.js"
import generateToken from "../utils/generateToken.js"

export const signup = async(req,res)=>{
    const{name, email, password} = req.body

    if(!name || !email || !password)
        return res.status(400).json({message: " All fields required"})

    const userExists = await User.findOne({email})
    if(userExists)
        return res.status(400).json({message: "User already Exists"})

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    res.status(201).json({
        token: generateToken(user._id),
        user: {id: user._id, name: user.name, email: user.email}
    })
}

export const login = async(req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})
    if(!user)
        return res.status(400).json({message: "Invalid email or password"})

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
        return res.status(400).json({message: " Invalid email or password"})

    res.json({
        token: generateToken(user._id),
        user: {id: user._id, name: user.name, email: user.email}
    })
}