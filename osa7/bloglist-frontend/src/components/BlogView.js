import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { like, addComment } from "../reducers/blogReducer"
import { Button, Textarea, Heading, Text, List, ListItem, Divider } from "@chakra-ui/core"


const BlogView = () => {
  const dispatch = useDispatch()
  const [ comment, setComment ] = useState("")
  const { id } = useParams()
  let blog = useSelector(state => state.blogs).filter(blog => blog.id === id)
  if (!blog.length) {
    return null
  } else {
    blog = blog[0]
  }
  const handleComment =  async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment("")
  }

  return (
    <div>
      <Divider/>
      <Heading as="h2" size="x1">{blog.title}</Heading>
      <Text>{blog.url}</Text>
      <Text>{blog.likes} likes</Text>
      <Button className="likeButton"
        onClick={() => dispatch(like(blog))
        }>
              Like
      </Button>
      <Text>Added by {blog.user.name}</Text>
      <Divider/>
      <Heading as="h2" size="x1">Comments</Heading>
      <form onSubmit={handleComment}>
        <Textarea value={comment} onChange={({ target }) => setComment(target.value)}></Textarea>
        <Button type="submit"> Add comment</Button>
      </form>
      <List styleType="disc">
        {blog.comments.map(comment => <ListItem key={comment}>{comment}</ListItem>)}
      </List>
    </div>
  )

}

export default BlogView