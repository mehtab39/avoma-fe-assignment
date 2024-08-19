import { useParams } from "react-router-dom";

function PostDetails(){
    const { id } = useParams();

    return <h1>Post Details Page for {id}</h1>
}

export default PostDetails;