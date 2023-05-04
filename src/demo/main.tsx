// import React from 'react'
import ReactDOM from 'react-dom/client'

// import AppDev from './AppDev'
import AppProd from './AppProd'

import './styles.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AppProd />,
  // </React.StrictMode>,
)
