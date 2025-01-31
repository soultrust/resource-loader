import { useEffect, useState } from "react"

type DataSourceWithRenderProps = {
  getDataFunc: Function
  render: Function
}

export const DataSourceWithRender = ({
  getDataFunc = () => {},
  render,
}: DataSourceWithRenderProps) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    ;(async () => {
      const data = await getDataFunc()
      setState(data)
    })()
  }, [getDataFunc])

  return render(state)
}
