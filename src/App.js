import React from "react"; // Jeśli skorzystamy z Babel nie bedzie potrzeby importowania "react"
import ReactDOM from "react-dom";
import Pet from "./Pet";
import SearchParams from "./SearchParams";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Lunassss",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       name: "Pepper",
//       animal: "Bird",
//       breed: "Cocatiel",
//     }),
//     React.createElement(Pet, {
//       name: "Sudo",
//       animal: "Dog",
//       breed: "Whatever",
//     }),
//   ]);
// };

// Poniższy zapis jest równoważny z powyższym
// const App = () => {
// return (
// <div>
//   <h1>Adopt Me!</h1>
//   <Pet name="Luna" animal="Dog" breed="Havanese"/>
//   <Pet name="Pepper" animal="Bird" breed="Cocatiel"/>
//   <Pet name="Sudo" animal="Dog" breed="Whatever"/>
// </div>
// );};

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
