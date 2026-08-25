import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import Dashboard from "./app/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MetaPixel from "./lib/metaPixel";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MetaPixel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
);
