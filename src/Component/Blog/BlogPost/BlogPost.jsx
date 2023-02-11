import React from "react";
import "./BlogPost.css";
import BlogPostData from "../Data/BlogPostData";
import Card from "./Card";

const BlogPost = () => {

  return (
    <div className="blogpost">
      <div className="sub-blogpost">
        {BlogPostData.map((item, index) => (
          <Card
            id={item.id}
            title={item.title}
            content={item.content}
            author={item.author}
            date={item.date}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
