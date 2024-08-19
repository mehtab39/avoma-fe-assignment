import { useQuery, } from '@tanstack/react-query';

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
        <div>
            <h1 className="text-lg text-black-600 text-center pb-6">Posts</h1>
            <ul>{posts.map((post) => <li className="border-b pb-4"  key={post.id}>{post.title}</li>)}</ul>
        </div>
    )
}

export default Posts;