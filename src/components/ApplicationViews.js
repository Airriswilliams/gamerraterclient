import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList";
import { GameForm } from "./game/GameForm";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <Route exact path="/">
          <GameList />
        </Route>

        <Route exact path="/games">
          <GameList />
        </Route>

        <Route exact path="/games/new">
          <GameForm />
        </Route>

        {/* <Route exact path="/games/:gameId(\d+)">
          <GameEdit />
        </Route> */}
      </main>
    </>
  );
};
