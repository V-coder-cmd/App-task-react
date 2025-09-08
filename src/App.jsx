import { useState } from 'react'

import style from './App.module.css'
import Header from './components/Header/Header'
import Clock from './components/Clock/Clock'
import TaskList from './components/TaskList/TaskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Clock />
      <TaskList />
    </div>
  )
}

export default App
