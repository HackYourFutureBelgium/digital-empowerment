import API from './API';

class UserAPI extends API {
  ENDPOINT = `${this.BASE_URL}/user`

  get = () => fetch(this.ENDPOINT, this.getOptions('get', true)).then(response => response.json());

  login = (email, password) => (
    fetch(`${this.ENDPOINT}/login`, this.getOptions('post', false, { email, password })).then(response => response.json())
  );

  requestPasswordReset = email => (
    fetch(`${this.ENDPOINT}/password`, this.getOptions('put', false, { email }))
  );

  confirmPasswordReset = (token, password) => (
    fetch(`${this.ENDPOINT}/password`, this.getOptions('put', false, { token, password }))
  );

  create = body => (
    // TODO secure after initial deploy
    fetch(this.ENDPOINT, this.getOptions('post', true, body)).then(response => response.json())
  );

  update = (id, user) => (
    fetch(`${this.ENDPOINT}/${id}`, this.getOptions('patch', true, user)).then(response => response.json())
  );

  delete = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('delete', true));
}

export default UserAPI;
