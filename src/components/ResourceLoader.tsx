import React, { useState, useEffect } from "react"
import axios from "axios"

type ResourceLoaderProps = {
  resourceUrl: string
  resourceName: string
  children: React.ReactNode
}

export const ResourceLoader = ({
  resourceUrl,
  resourceName,
  children,
}: ResourceLoaderProps) => {
  const [resource, setResource] = useState(null)

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(resourceUrl)
      setResource(response.data)
    })()
  }, [resourceUrl])

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            [resourceName]: resource,
          })
        }

        return child
      })}
    </>
  )
}
