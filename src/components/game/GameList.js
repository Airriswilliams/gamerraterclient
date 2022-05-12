import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { getGames } from "./GameManager";

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  return (
    <article className="games">
      <header>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/games/new" });
          }}
        >
          Register New Game
        </button>
      </header>
      <h2>Game List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year Released</th>
            <th>Players Needed</th>
            <th>Recommended age</th>
            <th>Time to play</th>
            <th>Category</th>
          </tr>
        </thead>

        {games.map((game) => {
          return (
            <tbody key={`game--${game.id}`} className="game">
              <tr>
                <td className="game__title">
                  {game.title} by {game.designer}
                </td>
                <td className="game__year_released">{game.year_released}</td>
                <td className="game__players">{game.number_of_players}</td>
                <td className="game__recommended_age">
                  {game.recommended_age}
                </td>
                <td className="game__estimated_time">
                  {game.estimated_time_to_play}
                </td>
                <td className="game__category">{game.category.category}</td>
                <td>
                  {/* <Link to={`/games/${game.id}`}>
                    <FaEdit />
                  </Link> */}
                </td>
                {/* <td>
                  <button onClick={() => deleteHandler(game.id)}>DELETE</button>
                </td> */}
              </tr>
            </tbody>
          );
        })}
      </table>
    </article>
  );
};
