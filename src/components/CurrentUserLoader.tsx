import React, { useState, useEffect, ReactNode } from "react"
import axios from "axios"

type CurrentUserLoaderProps = {
  children: ReactNode
}

export const CurrentUserLoader = ({ children }: CurrentUserLoaderProps) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const response = await axios.get("/current-user")
      setUser(response.data)
    })()
  }, [])

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
