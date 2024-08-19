import { useQuery, } from '@tanstack/react-query';

const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

function Posts() {
    const { data: posts, isLoading, error } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
    if (isLoading) return <h1 className='text-center text-lg'>Loading...</h1>
    if (error) return <h1>Something went terrible</h1>
    return (
        <div>
            <ul>{posts.map((post) => <li className="border-b pb-4"  key={post.id}>{post.title}</li>)}</ul>
        </div>
    )
}

export default Posts;