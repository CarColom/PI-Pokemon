import React, {useState,useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postPokemon, getTypes} from "../../Redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Validate from "../../Components/Validate/Validate"

export default function Create(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors,setErrors] = useState({});
   

    const [input, setInput] = useState({
    name: "",
    img: "",
    hp: 0,
    attack: 0,
     defense: 0,
     height: 0,
     weight: 0,
    speed: 0,
    types: []
    })

    useEffect(()=>{
        dispatch(getTypes());
    }, [dispatch]);

function handleChange(e){
    const { name, value } = e.target;
    
setInput({
    ...input,
    [name] : value
})

setErrors(Validate({
    ...input,
    [name]: value,
  }));
}

function handleSelect(e){
    setInput({
        ...input,
        types: [...input.types,e.target.value]
    })
}

function handleSubmit(e) {
    e.preventDefault();
  
    if (isFormComplete()) {
      dispatch(postPokemon(input))
        .then(() => {
          alert("Pokemon Creado");
          setInput({
            name: "",
            img: "",
            hp: "",
            attack: 0,
            defense: 0,
            height: 0,
            weight: 0,
            speed: 0,
            types: []
          });
          history.push("/home");
        })
        .catch((error) => {
          console.error("Error al crear el Pokémon:", error);
        });
    }
  }
  
  function isFormComplete() {
    const { name, hp, attack, defense, height, weight, speed } = input;
    return (
      name !== "" &&
      hp >= 1 &&
      hp <= 100 &&
      attack >= 20 &&
      attack <= 100 &&
      defense >= 20 &&
      defense <= 100 &&
      height >= 20 &&
      height <= 100 &&
      weight >= 20 &&
      weight <= 100 &&
      speed >= 20 &&
      speed <= 950
    );
  }


function handleDelete(el){
    setInput({
        ...input,
        types: input.types.filter(typ => typ !== el)
    })
}

return(
    <div>
        <Link to= "/home"><button>Volver</button></Link>
        <h1>Crea tu Pokemon</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label>Nombre:</label>
                <input type="text"
                value={input.name}
                name= "name"
                onChange={(e)=>handleChange(e)} />
                {errors.name && (
                    <p>{errors.name}</p>
                )}
            </div>
            <div>
                <label>Imagen:</label>
                <input type="text"
                value={input.img}
                name= "img"
                onChange={(e)=>handleChange(e)} />
                
            </div>
            <div>
                <label>Vida:</label>
                <input type="number"
                value={input.hp} 
                name= "hp"
                min={1}
                max={100}
                onChange={(e)=>handleChange(e)} />
               {errors.hp && (
                    <p>{errors.hp}</p>
                )}
            </div>
            <div>
                <label>Ataque:</label>
                <input type="number"
                value={input.attack} 
                 name= "attack"
                 min={20}
                 max={100}
                onChange={(e)=>handleChange(e)} />
              {errors.attack && (
                    <p>{errors.attack}</p>
                )}
            </div>
            <div>
                <label>Defensa:</label>
                <input type="number"
                value={input.defense}
                name= "defense"
                min={20}
                max={100}
                onChange={(e)=>handleChange(e)} />
                {errors.defense && (
                    <p>{errors.defense}</p>
                )}
            </div>
            <div>
                <label>Velocidad:</label>
                <input type="number"
                value={input.speed}
                name= "speed"
                min={20}
                max={100}
                onChange={(e)=>handleChange(e)} />
                {errors.speed && (
                    <p>{errors.speed}</p>
                )}
            </div>
            <div>
                <label>Altura:</label>
                <input type="number"
                value={input.height}
                name= "height"
                min={20}
                max={100}
                onChange={(e)=>handleChange(e)} />
                {errors.height && (
                    <p>{errors.height}</p>
                )}
            </div>
            <div>
                <label>Peso:</label>
                <input type="number"
                value={input.weight}
                name= "weight"
                min={20}
                max={950}
                onChange={(e)=>handleChange(e)} />
                {errors.weight && (
                    <p>{errors.weight}</p>
                )}
            </div>
            <h3>Types:</h3>
            <select onChange={(e) => handleSelect(e)}>
  {types.map((typ) => (
    <option value={typ.id} key={typ.id}>
      {typ.name}
    </option>
  ))}
</select>


<br />
<br />
{isFormComplete() && (
          <button type="submit">CREAR POKEMON</button>
        )}

        </form>
{input.types.map(el =>
    <div>
  <p>{el}</p>
        <button onClick={()=> handleDelete(el)}>X</button>
    </div>
     )}

    </div>
)

}