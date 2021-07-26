import Routes from "./Routes"
import './static/css/style.css'
import axios from "axios"


function App() {
  axios.defaults.withCredentials = true
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App;
