import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../../views/dashboard/Dashboard'
import AccountSatement from '../../views/accountstatement/AccountStatement'
import ViewMatches from '../../views/viewMatch/ViewMatch'
import CasinoLayout from '../../views/casino_layout/CasinoLayout'
import CasinoScreen from '../../views/casino/CasinoScreen'
import CurrentBet from '../../views/current_bet/CurrentBet'
import CasinoResult from '../../views/current_results/CasinoResult'
import LiveCasino from '../../views/live_casino/LiveCasino'
import ViewMatchRacing from '../../views/viewMatch/ViewMatchRacing'
import ChangePassword from '../../views/changePassword/ChangePassword'
import SecurityAuth from '../../views/securityAuth/SecurityAuth'
import ActiveLog from '../../views/activeLogs/ActiveLogs'
import AviatorList from '../../views/crash/AviatorList'
import ButtonValues from '../../views/buttonvalues/ButtonValues'
import ProfitLossReport from '../../views/profitlossReport/ProfitLossReport'
import BetHistory from '../../views/bethistory/BetHistory'
import UnsettledBets from '../../views/unsettledbets/UnsettledBets'
import RuleModel from '../ruleModal/RuleModal'
import AllGames from '../../views/casino_layout/AllGames'
import InPlayMatch from '../../views/in_play/InPlayMatch'



const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/account-statement' element={<AccountSatement />} />
      <Route path='/bet-history' element={<BetHistory />} />
      <Route path='/rules-page' element={<RuleModel />} />
      <Route path='/unsettled-bets' element={<UnsettledBets />} />
      <Route path='/profitloss-report' element={<ProfitLossReport />} />
      <Route path='/sport-view/:marketId?/:eventId?/:sportId?' element={<ViewMatches />} />
      <Route path='/sport-view-racing/:marketId?/:eventId?/:sportId?' element={<ViewMatchRacing />} />
      <Route path='/casino/:shortName/:eventId' element={<CasinoScreen />} />
      <Route path='/in-play/:gameId?' element={<InPlayMatch />} />
      <Route path='/casino-layout/:casino_id?' element={<CasinoLayout />} />
      <Route path='/current-bet' element={<CurrentBet />} />
      <Route path='/casino-results' element={<CasinoResult />} />
      <Route path='/live-casino/:pageId?/:gameId?' element={<LiveCasino />} />
      <Route path='/change-password' element={<ChangePassword />} />
      <Route path='/button-values' element={<ButtonValues />} />
      <Route path="/security-auth" element={<SecurityAuth />} />
      <Route path="/active-logs" element={<ActiveLog />} />
      <Route path='/aviator-list' element={<AviatorList />} />
      <Route path="/all-games" element={<AllGames />} />
    </Routes>

  )
}

export default React.memo(AppContent)