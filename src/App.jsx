import ToDoList from "./ToDoList.jsx";
import Particles from './components/Particles'
import "./index.css"


function App() {
  return (
    <div className="app-container">
      <Particles />
      <div className="content">
        <h1>Particles Background</h1>
        <p>Explore the mesmerizing world of particle animations!</p>
        <ToDoList/>
      </div>
    </div>
  )
}

export default App