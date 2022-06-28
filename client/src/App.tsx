import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Match from "./components/pages/Match/Match";
import About from "./components/pages/About/About";
import Stream from "./components/pages/Stream/Stream";
import Create from "./components/pages/Create/Create";

export const App = () => {
  return (
      <BrowserRouter>
            <NavigationDesktop />
            <div className={"w-10/12 mx-auto"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/match/:hash/:secret/:player" element={<Match />} />
                    <Route path="/match/:hash" element={<Match />} />
                    <Route path="/stream/:hash" element={<Stream />} />
                </Routes>
            </div>
            <div className={"text-center p-3 uppercase text-sm text-white font-semibold my-6"}>
                &copy; Qrindr 2020 - Created by GNiK.
            </div>
      </BrowserRouter>
  );
};