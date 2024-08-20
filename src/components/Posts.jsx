import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/posts';
import withQuery from '../hoc/withQuery';
import { FixedSizeList as List } from 'react-window';
import { Query } from '../constants';
const EmptyArray = Object.freeze([]);

function PostsList({ posts }) {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts;
        if (!posts) return EmptyArray;
        return posts.filter(({ title, }) => title.toLowerCase().includes(searchTerm));
    }, [searchTerm, posts]);

    const Row = ({ index, style }) => {
        const post = filteredPosts[index];
        return (
            <div style={style} className="p-4 border-b border-gray-300 bg-white">
                <Link to={`/posts/${post.id}`} className="text-xl font-bold text-blue-500 hover:underline">
                    {post.title}
                </Link>
                <p className="mt-2 text-gray-700">{post.body}</p>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={updateSearchTerm}
                className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
            />
            <List
                height={600}
                itemCount={filteredPosts.length}
                itemSize={120}
                width="100%"
                className="bg-gray-100 rounded-lg shadow"
            >
                {Row}
            </List>
        </div>
    );
}

const PostsWithQuery = withQuery(PostsList, Query.POSTS);

function Posts() {
    return <PostsWithQuery queryOptions={{ queryKey: [Query.POSTS], queryFn: getPosts }} />;
}

export default Posts;
