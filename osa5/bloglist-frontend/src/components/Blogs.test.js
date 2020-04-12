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

test("clicking show button expands blog details", async () => {
  const blog = {
    author: "tester",
    title: "testtitle ",
    user: { username:"testuser",
      id: "5e9260a1a421553c649c7f73",
      name: "testname"
    },
    url: "www.test.com",
    likes: 3
  }

  // This needs to be added because of the check in component
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(blog.user))

  const { container, getByText } = render(
    <Blog blog={blog}/>
  )

  const button = getByText("view")
  fireEvent.click(button)
  expect(container).toHaveTextContent(blog.user.name)
  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(3)
  expect(container).toHaveTextContent("hide")
  expect(container).toHaveTextContent("Delete")
})