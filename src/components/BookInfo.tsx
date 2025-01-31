import React from "react"

type BookInfoProps = {
  book: {
    name: string
    price: number
    title: string
    pages: number
  }
}

export const BookInfo = ({ book }: BookInfoProps) => {
  const { name, price, title, pages } = book || { book: {} }

  return book ? (
    <>
      <h3>{name}</h3>
      <p>{price}</p>
      <h3>Title: {title}</h3>
      <p>Number of Pages: {pages}</p>
    </>
  ) : (
    <h1>Loading</h1>
  )
}
