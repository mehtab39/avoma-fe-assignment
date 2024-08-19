import { useQuery, } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

function Posts() {

    const { data: posts, isLoading, error } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <h1 className="text-lg text-gray-600">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <h1 className="text-lg text-red-500">Something went terribly wrong</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="border-b pb-4">
                        <Link to={`/posts/${post.id}`} className="text-xl font-bold text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                        <p className="mt-2 text-gray-700">{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Posts;