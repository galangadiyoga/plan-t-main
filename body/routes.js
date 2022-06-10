const {
  postPlantHandler,
  getPlantHandler,
  getDetailPlantHandler,
  putPlantHandler,
  deletePlantHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/plants',
    handler: postPlantHandler,
  },
  {
    method: 'GET',
    path: '/plants',
    handler: getPlantHandler,
  },
  {
    method: 'GET',
    path: '/plants/{id}',
    handler: getDetailPlantHandler,
  },
  {
    method: 'PUT',
    path: '/plants/{id}',
    handler: putPlantHandler,
  },
  {
    method: 'DELETE',
    path: '/plants/{id}',
    handler: deletePlantHandler,
  },
];

module.exports = routes;
