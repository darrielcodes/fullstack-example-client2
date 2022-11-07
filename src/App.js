import { useState, useEffect } from "react";
import SingleBlog from "./Pages/SingleBlog";
import CreateBlogForm from "./Pages/CreateBlogForm";
import './App.css';
import UpdateBlogForm from "./Pages/UpdateBlogForm";

const urlEndpoint = "http://localhost:4000"

function App() {
	const [blogs, setBlogs] = useState([])
	const [shouldRefetch, setShouldRefetch] = useState(false)

	useEffect(()=>{
		const fetchBlogs = async () => {
			const response = await fetch(`${urlEndpoint}/blogs/all`)
			// console.log(response)
			const fetchedBlogsPayload = await response.json()
			// console.log(fetchedBlogsPayload)
			setBlogs(fetchedBlogsPayload.blogs)
		}
		fetchBlogs()
	}, [shouldRefetch]) // if this changes, useEffect triggers again

  return (
    <div className="App">
      <header className="App-header">
		  <h2>{shouldRefetch && "Please wait, we are refetching the data"}</h2>
	  		<UpdateBlogForm urlEndpoint={urlEndpoint} blogs={blogs} setShouldRefetch={setShouldRefetch}/>
			  <CreateBlogForm  urlEndpoint={urlEndpoint} setShouldRefetch={setShouldRefetch}/>
			<SingleBlog urlEndpoint={urlEndpoint} blogs={blogs}
				/>
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
