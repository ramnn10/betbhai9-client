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
import { getInternationalGroupCasinoList } from './redux/reducers/casino.reducer'
import IframeCasino from './views/casino/IframeCasino/IframeCasino'
import IframeCasinonew from './views/casino/IframeCasino/IframeCasinonew'
import IframeQtech from './views/casino/IframeCasino/IframeQtech'




function setMultipleRootCssVariables(colors) {
  for (const [variable, value] of Object.entries(colors)) {
    document.documentElement.style.setProperty(variable, value);
  }
}

function App() {

  const dispatch = useDispatch();
  !localStorage.getItem('dashboardActiveTabKey') && localStorage.setItem('dashboardActiveTabKey', 0)

  const cosinoGroupList = JSON.parse(localStorage.getItem('cosinoGroupList'))

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
    casinoGroupWise()
    return () => {
      // clearInterval(sportInterval); 
    }
  }, [dispatch]);

  const casinoGroupWise = () => {
    const ReqData = {
      "categoriesList": true,
      "providerList": true,
      "lobbygames": true,
      "trendingGames": true,
      "popularGames": true,
      "liveGames": true
    };
    {
      !cosinoGroupList && (
        dispatch(getInternationalGroupCasinoList(ReqData))
      )
    }

  }


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
            <Route path="/iframe-casino/:gameId?" element={<AuthRoute element={<IframeCasino />} />} />
            <Route path="/iframe-casino-new/:provider?/:gameId?" element={<AuthRoute element={<IframeCasinonew />} />} />
            <Route path="/iframe-qtech-casino/:gameId?" element={<AuthRoute element={<IframeQtech />} />} />
          </Routes>
        </BrowserRouter>
      </BalanceProvider>
    </>

  )
}

export default App
