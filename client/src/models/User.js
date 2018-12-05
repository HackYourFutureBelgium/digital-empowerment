class User {
  constructor(user) {
    this.id = user._id;
    this._id = user._id;
    this.email = user.email;
    this.role = user.role || 'user';
  }

  get isAdmin() {
    return this.role === 'admin';
  }
}

export default User;
