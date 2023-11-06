# Where is Waldo?

[Live Demo](https://where-is-waldo-emmk.onrender.com)

A photo-tagging application in the form of the popular memory game Where's waldo built using React for frontend and Express+Node for backend as part of [The Odin Project's](https://www.theodinproject.com) NodeJs course.

_The Project was initially built during my first run of The Odin Project and can be viewed in the [old](https://github.com/Ashish-Krishna-K/where-is-waldo/tree/old) branch. During my second run, I'm revisiting previous projects and this time I have chose to use TypeScript as a practice._

_Notably the previous version as seen in the [old](https://github.com/Ashish-Krishna-K/where-is-waldo/tree/old) branch used [Firebase](https://firebase.google.com/) as the backend._

## The Project Structure

The Project is split into a backend and frontend portion, however the backend Express app will serve the frontend React app directly as such, the frontend directory is part of the root directory and there is no separate backend directory.

### The Backend Express+Node App

The Backend app is a simple Express+Nodejs server. The server will serve both the frontend(if the user visits the base route and any route that is not part of the _/api_ route) and handles the API (through the _/api_ route) which is called by the react app for the necessary data. If the browser sends a request to the server to any route other than _/api_ the server will just send back the **index.html** file allowing the client side navigation to take over.

### The Frontend React App

The frontend is a react app using [react-router](https://reactrouter.com/en/main) library for client side navigation. When the user visits the site, the backend server will serve the index.html file from the frontend sub-directory which once loaded, hydrates the react scripts and takes over all navigation. The home page will immediately redirect the user the the _/play_ route which will give the user an option to select one of the three game modes. Once the user selects a game mode a disclaimer about the timer and a start game button. Once the game starts, the user will have to find the characters shown in the sidebar(displayed at top in mobile devices) in the game Image. Once all the characters is found and correctly identified the game ends and the user is prompted to input a display name which will be displayed in the leader board.

### The API Endpoints

1. **api/ (GET):** The Home route to the api, it will return a list of all the game image's ids

1. **api/:gameId/ (GET):** This route will return all the details of a single game image(identified using the gameId parameter) except for the leader board.

1. **api/:gameId/leaderboard (GET):** This route will return the leader board for the game identified using the gameId parameter.

1. **api/:gameId/leaderboard (POST):** This will add a new entry to the leader board for the gameId.
