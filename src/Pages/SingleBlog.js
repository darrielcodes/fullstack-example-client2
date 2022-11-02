import { useEffect, useState } from "react"

/* 

Instead of a text input handler that we need to copy/paste the blog id into, create an option/select dropdown that will have all of the id's of our blogs as options. And when the select onChange event is triggered, we want to fetch the blog that the user selected. I.E. Create a dropdown menu of blog id's and then when the user selects particular blog id in the dropdown, that blog should display to the page in <SingleBlog/>.

*/

const SingleBlog = (props) => {
	const {urlEndpoint} = props
	const [singleBlog, setSingleBlog] = useState({})
	const [id, setId] = useState("e9f91e77-5b5c-424b-a4d8-39261567423a")

	useEffect(()=>{
		const fetchBlog = async () => {
			console.log(id)
			const result = await fetch(`${urlEndpoint}/blogs/get-one/${id}`)
			const blogPayload = await result.json()
			setSingleBlog(blogPayload.blog)
		}
		fetchBlog()
	}, [id]) // comes into effect when id is changed and caused useEffect to rerun

	return (
		<div>
			Single Blog
			<p>{singleBlog.title}</p>
            <p>{singleBlog.id}</p>
			<p>{singleBlog.text}</p>
            <input type="text" onChange={(e) => {
                setId(e.target.value)
            }}/>
			<hr/>
		</div>
	)
}

export default SingleBlog