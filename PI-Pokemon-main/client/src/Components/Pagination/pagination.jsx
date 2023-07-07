import React from "react";

export default function Pagination({ pokemonPerPage, allPokemon, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemon / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        { pageNumbers &&
          pageNumbers.map(number =>(
            <li key={number}>
              <a onClick={() => paginado(number)}>{number}</a> 
            </li>
          ))}
      </ul>
    </nav>
  );
}
