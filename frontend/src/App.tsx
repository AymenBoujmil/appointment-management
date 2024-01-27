import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import EventCalendar from "./pages/appointments/EventCalendar";
import ClientList from "./pages/clients page/ClientsPage";
import StaffTable from "./pages/staff page/StaffPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventCalendar />} />
        <Route path="/Home" element={<EventCalendar />} />
        <Route path="/staff" element={<StaffTable />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/appointments" element={<EventCalendar />} />
        <Route path="/profile" element={<EventCalendar />} />
        <Route path="/account" element={<EventCalendar />} />
        <Route path="/logout" element={<EventCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
