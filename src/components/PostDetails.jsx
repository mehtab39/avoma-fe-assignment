import { useNavigate, useParams } from 'react-router-dom';
import { getComments, getPostDetails } from '../api/posts';
import withQuery from '../hoc/withQuery';
import { useEffect } from 'react';

function PostDetails() {
    const { id: postId } = useParams();

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <button
                onClick={handleBackClick}
                className="mb-4 text-blue-500 hover:underline"
            >
                &larr; Back to Posts
            </button>
            <PostDescription queryOptions={{
                queryKey: ['post', postId],
                queryFn: () => getPostDetails(postId)
            }} />
            <PostComments queryOptions={{
                queryKey: ['comments', postId],
                queryFn: () => getComments(postId)
            }} />
        </div>
    );
}

const CommentsList = ({ comments }) => {
    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
            <ul className="space-y-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="border-b pb-4">
                        <p className="text-blue-500 font-semibold">{comment.email}</p>
                        <p className="text-gray-700 mt-2">{comment.body}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

const Description = ({ post }) => {
    return (<>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{post.title}</h1>
        <p className="text-gray-700 mb-8">{post.body}</p>
    </>)
}

const PostComments = withQuery(CommentsList, 'comments');
const PostDescription = withQuery(Description, 'post');

export default PostDetails;