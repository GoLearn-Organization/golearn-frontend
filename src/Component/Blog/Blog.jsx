import React from 'react';
import BlogHead from './BlogHead/BlogHead';
import BlogPost from './BlogPost/BlogPost';

const Blog = () => {
    return(
        <>
            <BlogHead 
                title="Blog"
                nav1="Home"
                nav2=" Blog"
                link="/blog"
                link2="/"
            />
            <BlogPost />
        </>
    )
}

export default Blog;