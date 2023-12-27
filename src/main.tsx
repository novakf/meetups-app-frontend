import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.scss'
import { Provider } from 'react-redux'
import { store, persistor } from './app/store/store'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
