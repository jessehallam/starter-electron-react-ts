import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'

import App from './components/App'

ReactDOM.render(
    <MemoryRouter>
        <App />
    </MemoryRouter>,
    document.getElementById('app')
)
