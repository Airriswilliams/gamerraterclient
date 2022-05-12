import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createGame, getCategories } from "./GameManager";

export const GameForm = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    title: "",
    designer: "",
    year_released: 0,
    number_of_players: 0,
    estimated_time_to_play: 0,
    recommended_age: 1,
    category: 0,
  });

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  // Object.assign copies all properties from one source object to a target object and returns the modified target object.
  // Object.assign adds new properties to an existing object
  // A way to do a shallow copy of an Object or merge multiple objects
  // Object.assign({}, currentGame)...we have an empty object{}, then anything we place after the empty Object, the
  // properties and values from "currentGame" are going to be put inside the empty Object{}
  const changeGameState = (domEvent) => {
    const newGame = Object.assign({}, currentGame);
    newGame[domEvent.target.name] = domEvent.target.value;
    setCurrentGame(newGame);
  };
  // domEvent.target.name is targeting the name on LN's 46, 61 ...etc.
  // Ln 45 onchange(is a change event) is saying do something, onchange is a listener, you are instructing it to call changeGameState
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="designer">Designer: </label>
          <input
            type="text"
            name="designer"
            required
            className="form-control"
            value={currentGame.designer}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor=" year_released">Release Year: </label>
          <input
            type="number"
            name=" year_released"
            required
            className="form-control"
            value={currentGame.year_released}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Players Needed: </label>
          <input
            type="number"
            name="number_of_players"
            required
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="estimated_time_to_play">Time: </label>
          <input
            type="number"
            name="estimated_time_to_play"
            required
            className="form-control"
            value={currentGame.estimated_time_to_play}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="recommended_age">Age: </label>
          <input
            type="text"
            name="recommended_age"
            required
            className="form-control"
            value={currentGame.recommended_age}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <select
            name="category"
            required
            className="form-control"
            value={currentGame.category}
            placeholder="Select Category..."
            onChange={changeGameState}
          >
            <option value="0">Choose Category..</option>
            {categories.map((type, index) => {
              return (
                <option key={index} value={type.id} name="category">
                  {type.category}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            title: currentGame.title,
            designer: currentGame.designer,
            year_released: parseInt(currentGame.year_released),
            number_of_players: parseInt(currentGame.number_of_players),
            estimated_time_to_play: parseInt(
              currentGame.estimated_time_to_play
            ),
            recommended_age: parseInt(currentGame.recommended_age),
            category: parseInt(currentGame.category),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
