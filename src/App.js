import './App.css';
import Home from './Components/Home/Home';
import SplashLogo from './Components/Splash/SplashLogo';
import {useEffect,useState} from 'react'

function App() {
  const [splash, setSplash] = useState(true);
  const [exiting,setExiting] = useState(false)
  useEffect(() => {
    setTimeout(()=>{
      setSplash(false)
    },1000)
    setTimeout(() => {
      setExiting(true)
    }, 500);
  }, []);
  return (
    <div className="App">
      {splash ?
       <SplashLogo exiting={exiting}/> :
        <Home/>
        }
    </div>
  );
}

export default App;
