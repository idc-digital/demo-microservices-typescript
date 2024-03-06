
const usersModel = require('../model/users.model');
const { CreateUserDTO, UpdateUserDTO, UserDTO,  } = require('../dto/users.dto');

const getAllUsers =  async (req, res) => {
    try {
      const Users = await usersModel.find()
      const userDTOs = Users.map(user => new UserDTO(Users._id, Users.name, Users.age, Users.email));
      res.status(200).json({message: "Successfully fetched the details",Users})
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  };

  const getUsersById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await usersModel.findById(userId);
      if (!user) {` `
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const createNewUser = async (req, res) => {
    try {
      const { name, age, email } = req.body;
        if (!name || !age || !email) {
        return res.status(400).json({ message: 'Name, email, and age are required fields' });
      }
      const createUserDTO = new CreateUserDTO(name, age, email)
      const newUser = await usersModel.create({ name, age, email });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const updateUserById = async (req, res) => {
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
        const updatedUserDTO = new UserDTO(user._id, user.name, user.age, user.email);
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const deleteAll = async (req, res) => {
    try {
        await usersModel.deleteMany({});
        res.status(200).json({ message: 'All users deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteById = async (req, res) => {
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
}

module.exports = { getAllUsers, getUsersById, createNewUser, updateUserById, deleteAll, deleteById };
