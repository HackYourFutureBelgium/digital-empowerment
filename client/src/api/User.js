import API from './API';

class UserAPI extends API {
  ENDPOINT = `${this.BASE_URL}/user`

  get = () => fetch(this.ENDPOINT, this.getOptions('get', true)).then(this.handleResponse);

  login = (email, password) => (
    fetch(`${this.ENDPOINT}/login`, this.getOptions('post', false, { email, password })).then(this.handleResponse)
  );

  requestPasswordReset = email => (
    fetch(`${this.ENDPOINT}/password`, this.getOptions('put', false, { email })).then(this.handleResponse)
  );

  confirmPasswordReset = (token, password) => (
    fetch(`${this.ENDPOINT}/password`, this.getOptions('put', false, { token, password })).then(this.handleResponse)
  );

  create = body => (
    // TODO secure after initial deploy
    fetch(this.ENDPOINT, this.getOptions('post', true, body)).then(this.handleResponse)
  );

  update = (id, user) => (
    fetch(`${this.ENDPOINT}/${id}`, this.getOptions('patch', true, user)).then(this.handleResponse)
  );

  delete = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('delete', true)).then(this.handleResponse);
}

export default UserAPI;
