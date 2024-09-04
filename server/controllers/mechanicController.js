const Mechanic = require('../models/Mechanic');
const Car = require('../models/Car');
const User = require('../models/User');


exports.getAssignedJobs = async (req, res) => {
  try {
    const mechanic = await Mechanic.findOne({ user: req.user });
    if (!mechanic) return res.status(404).json({ msg: 'Mechanic not found' });

    const jobs = await Car.find({ status: 'in-progress' }).populate('user', ['name', 'email']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.updateMechanicAvailability = async (req, res) => {
  const { availability } = req.body;
  try {
    const mechanic = await Mechanic.findOne({ user: req.user });
    if (!mechanic) return res.status(404).json({ msg: 'Mechanic not found' });

    mechanic.availability = availability;
    await mechanic.save();
    res.json(mechanic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.provideFeedback = async (req, res) => {
  const { rating } = req.body;
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) return res.status(404).json({ msg: 'Mechanic not found' });

    mechanic.rating = (mechanic.rating + rating) / 2; 
    await mechanic.save();
    res.json(mechanic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
