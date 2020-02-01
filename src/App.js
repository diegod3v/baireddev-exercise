import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { groupBy, orderBy } from 'lodash';
import styled from 'styled-components';

const ImageContainer = styled.div`
  border: 2px solid ${({ border }) => border};
`

const AlbumImage = ({ src, title, border }) => (
  <ImageContainer border={border}>
    <h3>{title}</h3>
    <img src={src} alt={title} />
  </ImageContainer>
)

function App() {
  const [albums, setAlbums] = useState([]);

  const getRecentAlbums = async () => {
    const allPhotosReq = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const allPhotos = allPhotosReq.data;
    const photosByAlbum = groupBy(allPhotos, 'albumId');
    const albumIds = Object.keys(photosByAlbum);
    const lastAlbumIds = albumIds.slice(-3);
    const lastAlbums = lastAlbumIds.map((k) => photosByAlbum[k]);
    setAlbums(lastAlbums);
  }

  useEffect(() => {
    getRecentAlbums();
  })

  return (
    <div className="App">
      <h1>Album 1:</h1>
      {
        orderBy(albums[0], ['id']).slice(0, 3).map((photo) =>
          (<AlbumImage src={photo.url} title={photo.title} border={'blue'} />)
        )
      }
      <h1>Album 2:</h1>
      {
        orderBy(albums[0], ['id']).slice(0, 3).map((photo) =>
          (<AlbumImage src={photo.url} title={photo.title} border={'green'} />)
        )
      }
      <h1>Album 3:</h1>
      {
        orderBy(albums[0], ['id']).slice(0, 3).map((photo) =>
          (<AlbumImage src={photo.url} title={photo.title} border={'cyan'} />)
        )
      }
    </div>
  );
}

export default App;
