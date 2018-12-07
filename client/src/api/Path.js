import API from './API';

class PathAPI extends API {
  ENDPOINT = `${this.BASE_URL}/path`

  get = () => fetch(this.ENDPOINT, this.getOptions('get')).then(response => response.json());

  getOne = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('get')).then(response => response.json());

  create = body => (
    fetch(this.ENDPOINT, this.getOptions('post', true, body)).then(response => response.json())
  );

  update = (id, path) => (
    fetch(`${this.ENDPOINT}/${id}`, this.getOptions('patch', true, path))
      .then(response => response.json())
  );

  delete = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('delete', true));
}

export default PathAPI;
