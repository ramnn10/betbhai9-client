import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import AuthRoute from './config/Auth'
import { ToastContainer } from 'react-toastify'
import { BalanceProvider } from './global/contextApi/BalanceContext'
import './App.css'
import Login from './views/login/Login'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSportMatchList } from './redux/reducers/sport_reducer'
import settings from './domainConfig'
import TermCondition from './views/term_conditions/TermCondition'
import ResponsibleGaming from './views/responsible_gaming/ResponsibleGaming'
import CustomReactFlipCounter from './component/counter/CustomReactFlipCounter'
import { getUserBalance } from './redux/reducers/user_reducer'




function setMultipleRootCssVariables(colors) {
  for (const [variable, value] of Object.entries(colors)) {
    document.documentElement.style.setProperty(variable, value);
  }
}

function App() {
  const dispatch = useDispatch();
  !localStorage.getItem('dashboardActiveTabKey') && localStorage.setItem('dashboardActiveTabKey', 4)


  

  useEffect(() => {



    if (settings.title) {
      document.title = settings.title;
    }
    if (settings.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }
    if (settings.colors) {
      setMultipleRootCssVariables(settings.colors)
    }
    return () => { clearInterval(sportInterval); }
  }, [dispatch])


  return (
    <>
      <ToastContainer />
      <BalanceProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" name="Login" element={<Login />} />
            <Route path="/term-conditions" element={<TermCondition />} />
            <Route path="*" element={<AuthRoute element={<Layout />} />} />
            <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
          </Routes>
        </BrowserRouter>
      </BalanceProvider>
    </>

  )
}

export default App
