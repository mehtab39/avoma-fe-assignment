import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/posts';
import withQuery from '../hoc/withQuery';

const EmptyArray = Object.freeze([]);



function PostsList({posts}){
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts;
        if (!posts) return EmptyArray;
        return posts.filter(({ title , body}) => {
            return title.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm)
        })
    }, [searchTerm, posts]);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>
            <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={updateSearchTerm}
                className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
            />
            <ul className="space-y-4">
                {filteredPosts.map((post) => (
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

const PostsWithQuery = withQuery(PostsList, 'posts');

function Posts() {
    return <PostsWithQuery queryOptions={{ queryKey: ['posts'], queryFn: getPosts }} />
}


export default Posts;