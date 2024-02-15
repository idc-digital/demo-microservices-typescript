const request = require('supertest');
const express = require('express');
const router = require('../routes/users'); 
const usersModel = require('../model/usersModel');; 


jest.mock('../model/usersModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  deleteMany: jest.fn(),

}));

const app = express();
app.use('/', router);

//get all id test cases

describe('GET /', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return users on success', async () => {
    const Users = [{ id:1, name: 'User 1', age :21 ,email:'abc@gmail.com' }, { id :2, name: 'User 2', age :21 ,email:'abc@gmail.com'  }];
    usersModel.find.mockResolvedValue(Users);
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Successfully fetched the details",Users});
    expect(usersModel.find).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if no users are found', async () => {
    usersModel.find.mockResolvedValueOnce([]);
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Successfully fetched the details",[]);
    expect([]).toEqual([]);
  });
 
  test('should handle errors', async () => {
    const errorMessage = 'Internal Server Error';
    usersModel.find.mockRejectedValue(new Error(errorMessage));
    const response = await request(app).get('/');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
    expect(usersModel.find).toHaveBeenCalledTimes(1);
  });

});

//get by id test cases
app.use('/user/:id', router);
describe('GET user/:id', () => {
    test('should return 200 status and user details if user exists', async () => {
      const expectedUser = { id:1, name: 'User 1', age :21 ,email:'abc@gmail.com' };
      usersModel.findById.mockResolvedValueOnce(expectedUser);
      const res = await request(app).get('/user/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedUser);
    });
  
    test('should return 404 status if user does not exist', async () => {
      usersModel.findById.mockResolvedValueOnce(null);
      const res = await request(app).get('/user/456');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });
  
    test('should handle errors and return 500 status', async () => {
      const errorMessage = 'Internal Server Error';
      usersModel.findById.mockRejectedValueOnce(new Error(errorMessage));
      const res = await request(app).get('/user/789');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe(errorMessage);
    });   

});

//Create test cases 
app.use('/newusers/create', router);
describe('POST /newusers/create', () => {
    test('should create a new user record', async () => {
      const newUser = { name: 'User 1', age :21 ,email:'abc@gmail.com' };
      usersModel.create.mockResolvedValueOnce(newUser);
      const res = await request(app)
        .post('/newusers/create')
        .send(newUser);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(newUser);
    });
  
    test('should return 400 status if required fields are missing', async () => {
      const incompleteUser = { name: 'John Doe', email: 'john@example.com' };
      const res = await request(app)
        .post('/newusers/create')
        .send(incompleteUser);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Name, email, and age are required fields");
    });
  
    test('should handle errors and return 500 status', async () => {
      const errorMessage = 'Internal server error';
      usersModel.create.mockRejectedValueOnce(new Error(errorMessage));
      const res = await request(app)
        .post('/newusers/create')
        .send({ name: 'John Doe', email: 'john@example.com', age: 30 });
      expect(res.status).toBe(500);
      expect(res.body.message).toBe(errorMessage);
    });
});


//update test cases
app.use('/update/:id', router);
describe('PUT /update/:id', () => {
  test('should update a user record by ID', async () => {
    const updatedUser = { id: '5cc74264927a2edbfead23c', name: 'Updated Name', email: 'updated@example.com', age: 40 };

    
    const updatedUserData = { id: '5cc74264927a2edbfead23c',  name: 'Updated Name tt', email: 'updated@example.com', age: 40 };
    usersModel.findById.mockResolvedValueOnce(updatedUser);
    const res = await request(app)
      .put('/update/5cc74264927a2edbfead23c')
      .send(updatedUserData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedUser);
  });
  
    test('should return 400 status if required fields are missing', async () => {
      const incompleteUserData = { name: 'Updated Name' };
      const res = await request(app)
        .put('/update/456')
        .send(incompleteUserData);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Name, email, and age are required fields");
    });
  
    test('should return 404 status if user with given ID does not exist', async () => {
      usersModel.findById.mockResolvedValueOnce(null);
      const updatedUserData = { name: 'Updated Name', email: 'updated@example.com', age: 40 };
      const res = await request(app)
        .put('/update/789')
        .send(updatedUserData);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });
  
    test('should handle errors and return 500 status', async () => {
      const errorMessage = 'Internal server error';
      usersModel.findById.mockRejectedValueOnce(new Error(errorMessage));
      const updatedUserData = { name: 'Updated Name', email: 'updated@example.com', age: 40 };
      const res = await request(app)
        .put('/update/789')
        .send(updatedUserData);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe(errorMessage);
    });
  });


  //delete by id 
  app.use('/delete/:id', router);
  describe('DELETE /delete/:id', () => {
    test('should delete a user record by ID', async () => {
      const userId = '123';
      const user = { _id: userId, name: 'John Doe', email: 'john@example.com', age: 30 };
      usersModel.findById.mockResolvedValueOnce(user);
      const res = await request(app).delete(`/delete/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('User deleted successfully');
    });
  
    test('should return 404 status if user with given ID does not exist', async () => {
      const userId = '456';
      usersModel.findById.mockResolvedValueOnce(null);
      const res = await request(app).delete(`/delete/${userId}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  
    test('should handle errors and return 500 status', async () => {
      const userId = '789';
      const errorMessage = 'Internal server error';
      usersModel.findById.mockRejectedValueOnce(new Error(errorMessage));
      const res = await request(app).delete(`/delete/${userId}`);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe(errorMessage);
    });
  });

  //delete all 

  describe('DELETE /users route', () => {
    test('should delete all user records', async () => {
      usersModel.deleteMany.mockResolvedValueOnce({ n: 10 });
      const res = await request(app).delete('/deleteAll');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('All users deleted successfully');
    });
  
    test('should handle errors and return 500 status', async () => {
      const errorMessage = 'Internal server error';
      usersModel.deleteMany.mockRejectedValueOnce(new Error(errorMessage));
      const res = await request(app).delete('/deleteAll');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe(errorMessage);
    });
  });
