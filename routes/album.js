const { Router } = require('express');
const connection = require('../connection');
const router = Router();
const unqfy = connection.getUNQfy('database');

router.get('/:id', (req, res) => {
  const id  = req.params.id;
  try {
      const album = unqfy.getAlbumById(id);
      res.status(200).json(album);
  }
  catch {
      res.status(404).json({status:404, errorCode:"RESOURCE_NOT_FOUND"});
  }
}); 

router.post('/', (req, res) => {
  const data = req.body;
  try {
    const album = unqfy.addAlbum(data.artistId, data);
    const artist = unqfy.getArtistById(data.artistId);
    
    res.status(200).send(album);
    
  } catch (error) {
    res.status(404).json({status:404, errorCode:'RELATED_RESOURCE_NOT_FOUND', message: error.message });
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const album = unqfy.getAlbumById(id);
    unqfy.removeAlbum(album.id);
    res.status(204).json({status:204});
  } catch (error) {
    res.status(404).json({status:404, errorCode:"RESOURCE_NOT_FOUND"});
  }
});

router.get('/', (req, res) => {
  const albums = unqfy.searchAlbums(req.query.name);
  res.status(200).send(albums);
});

// function editYear (req, res) {

// }

module.exports = router;