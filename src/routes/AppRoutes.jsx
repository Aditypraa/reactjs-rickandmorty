import { Route, Routes } from "react-router-dom";
import Characters from "../pages/characters";
import Episodes from "../pages/episodes";
import Locations from "../pages/locations";
import CardDetails from "../components/Cards/CardDetails";
import ErrorPage from "../pages/errorPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/:id" element={<CardDetails />} />

      <Route path="/episodes" element={<Episodes />} />
      <Route path="/episodes/:id" element={<CardDetails />} />

      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/:id" element={<CardDetails />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
