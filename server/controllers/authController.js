const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async(req, res) => {
    const {name, email, password} = req.body
    try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg: 'User already exist'})
        }
        user = new User({name, email, password: await bcrypt.hash(password, 10)})
        await user.save()

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

exports.loginUser = async(req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({ msg: 'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials'})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error')
    }
}