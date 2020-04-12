import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
//import { prettyDOM } from '@testing-library/dom'
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
    author: "tester",
    title: "testtitle ",
    user: "testuser",
    url: "www.test.com",
    likes: 3

  }

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    blog.author
  )
  expect(component.container).toHaveTextContent(blog.title)

  expect(component.container).not.toHaveTextContent(blog.user)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(3)
})
/*
test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = getByText("make not important")
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)

})*/