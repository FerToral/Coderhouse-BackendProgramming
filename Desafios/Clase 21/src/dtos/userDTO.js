export class UserDTO {
    constructor(data) {
      this._id = data._id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;
      this.age = data.age;
      this.rol = data.rol;
    }
  }
  