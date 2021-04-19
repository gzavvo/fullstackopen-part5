import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'Title of blog',
    author: 'Author of blog',
    url: 'https://blog.url',
    likes: 3,
    id: 'uie',
    user: 'auiers'
  }
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title}`
  )

  expect(component.container).toHaveTextContent(
    `${blog.author}`
  )

  expect(component.container).not.toHaveTextContent(
    `${blog.url}`
  )

  expect(component.container).not.toHaveTextContent(
    `${blog.likes}`
  )
})

test('clicking the button show blog.url and blog.likes', () => {
  const blog = {
    title: 'Title of blog',
    author: 'Author of blog',
    url: 'https://blog.url',
    likes: 3,
    id: 'uie',
    user: 'auiers'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    `${blog.url}`
  )

  expect(component.container).toHaveTextContent(
    `${blog.likes}`
  )
})

test('clicking the like button twice calls the handler function twice', () => {
  const blog = {
    title: 'Title of blog',
    author: 'Author of blog',
    url: 'https://blog.url',
    likes: 3,
    id: 'uie',
    user: 'auiers'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const mockHandler = jest.fn()
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)


  const likeButton = component.getByText('like')
  likeButton.onclick = mockHandler
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
