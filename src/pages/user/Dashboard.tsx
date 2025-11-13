import { useState } from 'react'

const Dashboard = () => {
  const [user, setUser] = useState("")
  setUser("Mario Estima")
  return (
    <div className='bg-red-500'>Dashboard {user}</div>
  )
}

export default Dashboard