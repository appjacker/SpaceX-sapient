import Home from './components/Home'
import { fetchMissions } from './api'

const routes =  [
  {
    path: '/',
    component: Home,
    fetchInitialData: (params = '') => fetchMissions(params)
  },
]

export default routes