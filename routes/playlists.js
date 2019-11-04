const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const id  = parseInt(req.params.id);
  const playlist = unqfy.getPlaylistById(id);
  res.status(200).json(playlist);
}))); 

//FALTA
router.post('/', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const newPlaylist = req.body;
  res.status(201).json();
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  unqfy.removePlayList(parseInt(id));
  res.status(204).json({status:204});
})));

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  const query = req.query;
  const keys = Object.keys(query);
  if(keys.lenght() !== 0) {
    const playlists = searchByParams(keys, unqfy.playlists, query);
    res.status(200).json(playlists);
  } else {
    res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
  }
})));

function searchByParams(params, playlists, query) {
  const reduce = (accumulate, currentValue) => executeFilter(currentValue, accumulate, query);
  return params.reduce(reduce, playlists);
}

const executeFilter = (param, list, query) => {
  return list.filter(e => functionsByFilter[param](e, query[param]));
};

const _byName = (e, value) => {
  return e.name === value;
};

const _byDurationLT = (e, value) => {
  return e.duration <= value;
};

const _byDurationGT = (e, value) => {
  return e.duration >= value;
};

const functionsByFilter = {
  name: _byName,
  durationLT: _byDurationLT,
  durationGT: _byDurationGT,
};

module.exports = router;