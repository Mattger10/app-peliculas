import React from 'react';

function MovieForm() {
    return (
      <div>
        <label htmlFor="nameInput">Nombre: </label>
        <input type="text" id="nameInput" />
  
        <label htmlFor="titleInput">Título de la película: </label>
        <input type="text" id="titleInput" />
      </div>
    );
  }
  
  export default MovieForm;
  