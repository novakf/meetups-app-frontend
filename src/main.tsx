import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.scss'
import { Provider } from 'react-redux'
import store from './app/store/store'
import axios from 'axios'

axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
