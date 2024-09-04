const Car = require('../models/Car')
const User = require('../models/User')

exports.reportFaultyCar = async(req, res) => {
    const { make, model, issueDescription, location} = req.body

    try{
        const user = await User.findById(req.user)
        if(!user) {
            return res.status(404).json({msg: 'User not found'})
        }

        const newCarReport = new Car({
            user: req.user,
            make,
            model,
            issueDescription,
            location
        })

        const carReport = await newCarReport.save()
        res.json(carReport)
    } catch(err) {
        console.error(err);
        res.status(500).send('server Error')
    }
}

exports.getUserCars = async(req, res) => {
    try{
        const cars = await Car.find({user: req.user}).sort({createdAt: -1})
        res.json(cars)
    } catch(err) {
        console.error(err);
        res.status(500).send('Server error')
    }
}

exports.updateCarStatus = async(req, res) => {
    const { status} = req.body
    try{
        let car = await Car.findById(req.params.id)
        if(!car){
            return res.status(404).json({msg: 'Car report not found'})
        
        if(car.user.toString() !== req.user) {
            return res.status(401).json({msg: 'User not authorized'})
        }    
        }
        car.status = status
        await car.save()
        res.json(car)
    } catch(err){
        console.error(err);
        res.status(500).send('Server not found')
    }
}