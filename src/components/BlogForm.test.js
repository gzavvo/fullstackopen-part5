import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls submit handler with the right details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleCreateBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  fireEvent.change(author, {
    target: { value: 'author' }
  })

  fireEvent.change(title, {
    target: { value: 'title' }
  })

  fireEvent.change(url, {
    target: { value: 'url' }
  })

  const button = component.getByText('create blog')
  fireEvent.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
  expect(createBlog.mock.calls[0][0].title).toBe('title')
})
