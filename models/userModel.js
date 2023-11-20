
class User {
  constructor(id, name, lastName, phone, email, dob, civilState, profesion, address, isBaptized) {
      (this.id = id),
      (this.name = name),
      (this.lastName = lastName),
      (this.phone = phone),
      (this.email = email),
      (this.dob = dob),
      (this.civilState = civilState),
      (this.profesion = profesion),
      (this.address = address),
      (this.isBaptized = isBaptized);
  }
}

export { 
  User
};
