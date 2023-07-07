import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNamePokemon, getPokemon } from "../../Redux/actions";
import style from "./navBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSearchInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(getNamePokemon(name));
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemon());
  }

  return (
    <div className={style.navbar}>
      <div className={style.navbar2}>
      <div>
      <h1>Pokemon</h1>
      </div>
      
      <div>
        <ul>
          <li className={style.linknavli}>
            <Link to="/Create">Crear Pokemon</Link>
          </li>
        </ul>
        <div>
          <input
           className={style.navinput} 
            type="text"
            value={name}
            onChange={handleSearchInputChange}
            placeholder="Search..."
          />
          <button className={style.buttonnav} onClick={handleSearchButtonClick}>
            <span>Buscar</span>
          </button>
        </div>
        <ul>
          <li className={style.linknavli}>
            <Link to="/home"  onClick={e=> {handleClick(e)}}>Home</Link>
          </li>
        </ul>
      </div></div>
    </div>
  );
};

export default NavBar;
