import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Usercontext from "./context/Usercontext.jsx";
import CaptainContext from "./context/Captaincontext.jsx";
import SocketProvider from "./context/SocketContext.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <CaptainContext>
      <Usercontext>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Usercontext>
    </CaptainContext>
  </BrowserRouter>
</StrictMode>
)
