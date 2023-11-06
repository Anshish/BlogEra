import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components/index';

function Post() {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.userData.$id : false;

  useEffect(() => {
    if (slug) {
      const promise = appwriteService.getPost(slug);
      promise.then((p) => {
        if (p) {
          setPost(p);
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.image);
        navigate('/');
      }
    });
  };

  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex flex-col border rounded-xl p-2'>
          <h1 className='text-3xl font-extrabold text-[#cfb194] text-center mb-2'>
            {post.title}
          </h1>
          <img
            src={appwriteService.getFilePreview(post.image)}
            alt={post.title}
            className='rounded-lg mx-auto max-h-96'
          />
          <div className='w-full mt-4 px-20'>
            <div className='browser-css text-xl text-[#ddb996]'>{parse(post.content)}</div>
          </div>
          {isAuthor && (
            <div className='mt-4 text-center'>
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor='bg-[#116466]' className='mr-3'>
                  Edit
                </Button>
              </Link>
              <Button bgColor='bg-[#5d001e]' onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
