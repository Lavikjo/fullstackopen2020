import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { waitFor } from "@testing-library/dom"
import BlogForm from "./BlogForm"
import nock from "nock"
import axios from "axios"
import httpAdapter from "axios/lib/adapters/http"
import { act } from "react-dom/test-utils"
import MutationObserver from "mutation-observer"
global.MutationObserver = MutationObserver

axios.defaults.adapter = httpAdapter

test("Writing to form fields", async () => {
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
  const mockHandler = jest.fn()
  const notificationHandler = jest.fn()
  let component
  // Wrapping this in act(() => ... doesn't fix warning for some reason
  act(() => {component = render(
    <BlogForm onSubmit={mockHandler} update={jest.fn()} setNotification={notificationHandler}/>
  )})
  const title = component.container.querySelector("#title")
  const author = component.container.querySelector("#author")
  const url = component.container.querySelector("#url")
  const form = component.container.querySelector("form")

  nock("http://localhost:80")
    .persist()
    .post("/api/blogs")
    .reply(200, (uri, requestBody) => requestBody)

  fireEvent.change(title, {
    target: { value: blog.title }
  })

  fireEvent.change(author, {
    target: { value: blog.author }
  })

  fireEvent.change(url, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)

  // Content is tested from notificationHandler due to the internal implementation of the BlogForm component
  // However the data it receives is directly from response of POST-request
  await waitFor(() => {
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(notificationHandler).toHaveBeenCalledTimes(1)
    expect(notificationHandler.mock.calls[0][0].data.author).toBe(blog.author)
    expect(notificationHandler.mock.calls[0][0].data.title).toBe(blog.title)
    expect(notificationHandler.mock.calls[0][0].data.url).toBe(blog.url)
  })
})