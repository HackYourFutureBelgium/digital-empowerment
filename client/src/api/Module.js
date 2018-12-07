import API from './API';

class ModuleAPI extends API {
  ENDPOINT = `${this.BASE_URL}/module`

  get = () => fetch(this.ENDPOINT, this.getOptions('get')).then(response => response.json());

  create = (pathId, body) => (
    fetch(`${this.BASE_URL}/path/${pathId}/module`, this.getOptions('post', true, body))
      .then(response => response.json())
  );

  update = (id, module) => (
    fetch(`${this.ENDPOINT}/${id}`, this.getOptions('patch', true, module))
      .then(response => response.json())
  );

  delete = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('delete', true));
}

export default ModuleAPI;
