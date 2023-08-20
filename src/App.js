
import React from "react";
import Navbar from '../../inotebook1/src/component/Navbar'
import Home from '../../inotebook1/src/component/Home'
import About from '../../inotebook1/src/component/About'
import NoteState from "./context/notes/NoteState";
import {
  BrowserRouter as Router,

  Route,
  Routes
} from "react-router-dom";
import { Alert } from "./component/Alert";
function App() {
  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Alert message="This is amazing React course" />
          {/* <i class="fa-solid fa-trash"><s */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
