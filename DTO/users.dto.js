class CreateUserDTO {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

class UpdateUserDTO {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

class UserDTO {
    constructor(id, name, age, email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }
}


module.exports = { CreateUserDTO, UpdateUserDTO, UserDTO };
