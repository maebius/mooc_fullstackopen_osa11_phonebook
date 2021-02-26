import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => axios
  .get(baseUrl)
  .then((response) => response.data);

const create = (newObject) => axios
  .post(baseUrl, newObject)
  .then((response) => response.data);

const remove = (id) => axios
  .delete(`${baseUrl}/${id}`)
  .then((response) => response);

const update = (id, changed) => axios
  .put(`${baseUrl}/${id}`, changed)
  .then((response) => response.data);


const personService = {
  getAll, create, remove, update,
};

export default personService;
