import { useState } from "react";


const CreateBlogForm = (props) => {

    const {urlEndpoint, setShouldRefetch} = props;

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccess] = useState("")

    const handlePostBlog = async () => {
        setShouldRefetch(true)
      const response = await fetch(`${urlEndpoint}/blogs/create-one`, {
            method: "POST",
            body: JSON.stringify({
                title,
                text,
                author,
                categories
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setShouldRefetch(false)
        //if something is wrong with request
        if (response.ok !== true){
            setSuccess("There was a network problem creating the blog.")
            return;
        }
        const payload = await response.json();
        //payload is success in App.js 
        if(payload.success !== true){
            setSuccess("There was a server problem creating blog.")
        return;
        }
        setSuccess("Successfully created blog.")
        console.log(response)
    };

    return (
        <div>
            <h1>Create Blog Form</h1>
            <br/>
            {successMessage}
            <br/>
            <label>Title: </label>
            <input type="text" onChange={(e) => {
                setTitle(e.target.value)
            }}></input>
            <br/>
            <label>Author: </label>
            <input type="text" onChange={(e) => {
                setAuthor(e.target.value)
            }}></input>
            <br/>
            <label>Text: </label>
            <input type="text" onChange={(e) => {
                setText(e.target.value)
            }}></input>
            <br/>
            <label>Category: </label>
            <input type="text" onChange={(e) => {
                setCategory(e.target.value)
            }}></input>
            <button onClick={(e) => {
               const newCategories = [...categories, category] // make copy of array so we dont lose 
               setCategories(newCategories)
            }}>Add Category</button>
            <br/>
            <button onClick={() => {
                handlePostBlog()
            }}>Create blog</button>
            <hr/>
        </div>
    )
};

export default CreateBlogForm;