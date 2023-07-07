import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Pokemon from "../../Imagenes/Pokemoncreado.png";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getIdPokemon(id)); 

    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : myPokemon ? (
          <div>
            <h1>{myPokemon.name}</h1>
            {myPokemon.img ? (
              <img src={myPokemon.img} alt="" />
            ) : (
              <img src={Pokemon} alt="Imagen por defecto" />
            )}
            <p>HP: {myPokemon.hp}</p>
            <p>Attack: {myPokemon.attack}</p>
            <p>Defense: {myPokemon.defense}</p>
            <p>Speed: {myPokemon.speed}</p>
            <p>Height: {myPokemon.height}</p>
            <p>Weight: {myPokemon.weight}</p>
            <div>
              {myPokemon.types?.map((t, index) => (
                <span key={index}>
                  {t.name ? (
                    <Link to={`/home/${id}`}>{t.name}</Link>
                  ) : (
                    <span>{t}</span>
                  )}
                  {index < myPokemon.types.length - 1 && <span> - </span>}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p>Pokemon no encontrado</p>
        )}
      </div>
    </div>
  );
}
