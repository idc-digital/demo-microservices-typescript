const express = require('express')
const router = express.Router()
const usersModel = require('../model/usersModel')
const bodyParser = require('body-parser');




router.use(express.json());
router.use(bodyParser.json());


// Getting all
  router.get('/', async (req, res) => {
    try {
      const Users = await usersModel.find()
      res.status(200).json({ message: "Successfully fetched the details",Users})
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  

  //Get By ID 

  router.get('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await usersModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  //Create

  router.post('/newusers/create', async (req, res) => {
    try {
      const { name, age, email } = req.body;
        if (!name || !age || !email) {
        return res.status(400).json({ message: 'Name, email, and age are required fields' });
      }
      const newUser = await usersModel.create({ name, age, email });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //update

    router.put('/update/:id', async (req, res) => {
      try {
        const userId = req.params.id;
        const {name, age, email } = req.body;

        if (!name || !email || !age) {
          return res.status(400).json({ message: 'Name, email, and age are required fields' });
        }
        let user = await usersModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        else
        {
          user.name = name;
          user.age = age;
          user.email = email;

          await usersModel.create(user);   
          res.status(200).json(user);
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    //delete by id 

    router.delete('/delete/:id', async (req, res) => {
      try {
        const userId = req.params.id;
        const user = await usersModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        await usersModel.deleteMany(user);
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    //delete all api
    router.delete('/deleteAll', async (req, res) => {
      try {
        await usersModel.deleteMany({});
        res.status(200).json({ message: 'All users deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  

module.exports = router;