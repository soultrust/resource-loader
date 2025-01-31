import axios from "axios"
import React, { useEffect, useState } from "react"

type UserLoaderProps = {
  userId: number
  children: React.ReactNode
}
export const UserLoader = ({ userId, children }: UserLoaderProps) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(`/users/${userId}`)
      setUser(response.data)
    })()
  }, [userId])

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { user })
        }
        return child
      })}
    </>
  )
}
