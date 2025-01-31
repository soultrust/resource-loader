import React from "react"
import axios from "axios"
import { BookInfo } from "./components/BookInfo"
import { CurrentUserLoader } from "./components/CurrentUserLoader"
import { DataSource } from "./components/DataSource"
import { UserInfo } from "./components/UserInfo"
import { UserLoader } from "./components/UserLoader"
import { ResourceLoader } from "./components/ResourceLoader"
import { DataSourceWithRender } from "./components/DataSourceWithRender"

const getServerData = (url: string) => async () => {
  const response = await axios.get(url)
  return response.data
}

const getLocalStorageData = (key: string) => () => {
  return localStorage.getItem(key)
}

const Text = ({ message }: { message: string }) => <h1>{message}</h1>

function App() {
  return (
    <>
      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>
      <UserLoader userId={3}>
        <UserInfo />
      </UserLoader>
      <ResourceLoader resourceUrl="/users/1" resourceName="user">
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl="/books/2" resourceName="book">
        <BookInfo />
      </ResourceLoader>
      <DataSource getDataFunc={getServerData("users/2")} resourceName="user">
        <UserInfo />
      </DataSource>
      <DataSource
        getDataFunc={getLocalStorageData("message")}
        resourceName="message"
      >
        <Text />
      </DataSource>
      <DataSourceWithRender
        getDataFunc={() => getServerData("users/2")}
        render={(resource) => <UserInfo user={resource} />}
      ></DataSourceWithRender>
    </>
  )
}

export default App
