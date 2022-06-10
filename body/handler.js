const plants = require('./plant');

const postPlantHandler = (request, h) => {
  const {
    name,
    description,
    latinname,
    howtocare,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth,
    ninth,
    tenth,
  } = request.payload;

  const id = name.replace(/\s+/g, '').toLowerCase();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const NewPlant = {
    id,
    name,
    description,
    latinname,
    howtocare,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth,
    ninth,
    tenth,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan data. Mohon isi nama data',
    });
    response.code(400);
    return response;
  }

  plants.push(NewPlant);

  const isSuccess = plants.filter((plant) => plant.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'data berhasil ditambahkan',
      data: {
        plantId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'data gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getPlantHandler = (request, h) => {
  const foodTemp = plants;
  const { name } = request.query;

  if (name !== undefined) {
    const plant = plants.filter((plant) =>
      plant.name.toLowerCase().includes(name.toLowerCase())
    );

    const response = h.response({
      status: 'success',
      data: {
        plants: plant.map((plant) => ({
          id: plant.id,
          name: plant.name,
          description: plant.description,
          latinname: plant.ingredients,
          howtocare: plant.howtocook,
          first: plant.first,
          second: plant.second,
          third: plant.third,
          fourth: plant.fourth,
          fifth: plant.fifth,
          sixth: plant.sixth,
          seventh: plant.seventh,
          eighth: plant.eighth,
          ninth: plant.ninth,
          tenth: plant.tenth,
        })),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      plants: plantTemp.map((plant) => ({
        id: plant.id,
        name: plant.name,
        description: plant.description,
        latinname: plant.ingredients,
        howtocare: plant.howtocook,
        first: plant.first,
        second: plant.second,
        third: plant.third,
        fourth: plant.fourth,
        fifth: plant.fifth,
        sixth: plant.sixth,
        seventh: plant.seventh,
        eighth: plant.eighth,
        ninth: plant.ninth,
        tenth: plant.tenth,
      })),
    },
  });
  response.code(200);
  return response;
};

const getDetailPlantHandler = (request, h) => {
  const { id } = request.params;

  const plant = plants.filter((plantTemp) => plantTemp.id === id)[0];
  if (plant !== undefined) {
    return {
      status: 'success',
      data: {
        plant,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'data tidak ditemukan',
  });
  response.code(404);
  return response;
};

// EDIT food DATA
const putPlantHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    description,
    latinname,
    howtocare,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth,
    ninth,
    tenth,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui data. Mohon isi nama data',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = plants.findIndex((plant) => plant.id === id);

  if (index !== -1) {
    plants[index] = {
      ...plants[index],
      name,
      description,
      latinname,
      howtocare,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
      tenth,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'data berhasil diperbarui',
      data: {
        plants,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui data. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deletePlantHandler = (request, h) => {
  const { id } = request.params;

  const index = plants.findIndex((idplant) => idplant.id === id);

  if (index !== -1) {
    plants.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'data berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'data gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  postPlantHandler,
  getPlantHandler,
  getDetailPlantHandler,
  putPlantHandler,
  deletePlantHandler,
};
