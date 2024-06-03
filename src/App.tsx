import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RootLayout from './layouts/RootLayouts'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'
import DetailThread from "./pages/DetailThread";
import Follows from './pages/Follows'


const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route path="detail/:threadId" element={<DetailThread />} />
        <Route path='follows' element={<Follows />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App