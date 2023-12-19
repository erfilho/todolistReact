import Main from "./components/main";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import Page404 from "./components/Page404";
import Nav from "./components/nav";
import AddTarefe from "./components/addTarefa";
import EditTarefa from "./components/editTarefa";
import AllTarefas from "./components/allTarefas";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Main />} />
        <Route path="/tarefas" element={<AllTarefas />} />
        <Route path="/tarefas/add" element={<AddTarefe />} />
        <Route path="/tarefas/remove/:id" element={<h1>Remover tarefa</h1>} />
        <Route path="/tarefas/edit/:id" element={<EditTarefa />} />
      </Routes>
    </>
  );
}

export default App;
