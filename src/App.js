import { useState, useEffect } from "react";
import SingleBlog from "./Pages/SingleBlog";
import './App.css';

const urlEndpoint = "http://localhost:4000"

function App() {
	const [blogs, setBlogs] = useState([])

	useEffect(()=>{
		const fetchBlogs = async () => {
			const response = await fetch(`${urlEndpoint}/blogs/all`)
			// console.log(response)
			const fetchedBlogsPayload = await response.json()
			// console.log(fetchedBlogsPayload)
			setBlogs(fetchedBlogsPayload.blogs)
		}
		fetchBlogs()
	}, [])

  return (
    <div className="App">
      <header className="App-header">
				<SingleBlog urlEndpoint={urlEndpoint}/>
				{/* {blogs} */}
				{blogs.map((blog, index)=>{
					return (
						<div key={index}>
							<p>Title: {blog.title}</p>
							<p>ID: {blog.id}</p>
							<br/>
						</div>
					)
				})}
      </header>
    </div>
  );
}

export default App;
