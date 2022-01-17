import React from "react";

function Post({ id, title }) {
  React.useEffect(() => {
    console.log("Post ID is: ", id);
  }, [id]);

  return <div>Viewing post: {title}</div>;
}

function MyPost(props) {
  const [post, setPost] = React.useState({
    id: 1,
    title: "First post",
  });

  React.useEffect(() => {
    // We update only the title after one second
    setTimeout(() => {
      setPost((old) => ({ ...old, title: "Updated First Post" }));
    }, 1000);

    // We update the hold post after 3 seconds
    setTimeout(() => {
      setPost((old) => ({ id: 2, title: "Second Post" }));
    }, 3000);
  }, []); // this effect runs only once because the dependency array is [] empty

  return <Post {...post}></Post>;
}

export default MyPost;
