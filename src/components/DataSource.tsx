import React, { useEffect, useState } from "react"

type DataSourceProps = {
  getDataFunc: Function
  resourceName: string
  children: React.ReactNode
}

export const DataSource = ({
  getDataFunc = () => {},
  resourceName,
  children,
}: DataSourceProps) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    ;(async () => {
      const data = await getDataFunc()
      setState(data)
    })()
  }, [getDataFunc])

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            [resourceName]: state,
          })
        }
        return child
      })}
    </>
  )
}
