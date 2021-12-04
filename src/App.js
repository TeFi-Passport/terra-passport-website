import {HomePage} from "./pages/HomePage";
import React from "react";
import {Route, Routes} from 'react-router-dom';
import {PassportPage} from "./pages/PassportPage";

function App() {
  return (
      <Routes>
        <Route path="/passport" element={<PassportPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
  );
}

export default App;
