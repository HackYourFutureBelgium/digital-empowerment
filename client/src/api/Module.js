import API from './API';

class ModuleAPI extends API {
  ENDPOINT = `${this.BASE_URL}/module`

  get = () => fetch(this.ENDPOINT, this.getOptions('get')).then(this.handleResponse);

  create = (pathId, body) => (
    fetch(`${this.BASE_URL}/path/${pathId}/module`, this.getOptions('post', true, body))
      .then(this.handleResponse)
  );

  update = (id, module) => (
    fetch(`${this.ENDPOINT}/${id}`, this.getOptions('patch', true, module))
      .then(this.handleResponse)
  );

  delete = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('delete', true))
    .then(this.handleResponse);
}

export default ModuleAPI;
