import API from './API';

class PathAPI extends API {
  ENDPOINT = `${this.BASE_URL}/path`

  get = () => fetch(this.ENDPOINT, this.getOptions('get'))
    .then(this.handleResponse);

  getWithModules = (fields = null) => {
    const queryString = this.toQueryString({ fields });
    return fetch(`${this.ENDPOINT}/module${queryString}`, this.getOptions('get')).then(this.handleResponse);
  }

  getOne = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('get')).then(this.handleResponse);

  create = body => (
    fetch(this.ENDPOINT, this.getOptions('post', true, body)).then(this.handleResponse)
  );

  update = (id, path) => (
    fetch(`${this.ENDPOINT}/${id}`, this.getOptions('patch', true, path))
      .then(this.handleResponse)
  );

  delete = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('delete', true))
    .then(this.handleResponse);
}

export default PathAPI;
