import Routes from "./Routes"
import './static/css/style.css'
import axios from "axios"


function App() {
  axios.defaults.headers.common['authorization'] = `Bearer `+ localStorage.getItem("access_token")
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App;
