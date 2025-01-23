import React ,{useEffect, useState}from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config.service'
import { useNavigate, useParams } from 'react-router-dom'

function Editpost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate

    useEffect((slug) => {
        if(slug){
            service.getPosts(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div>
        <Container>
            <PostForm post = {post}/>
        </Container>
    </div>
  ) : null
}

export default Editpost