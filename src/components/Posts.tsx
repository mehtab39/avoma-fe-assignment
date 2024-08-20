import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '@/api/posts';
import withQuery from '@/hoc/withQuery';
import { FixedSizeList as List } from 'react-window';
import { Query } from '@/constants';
import { Post } from '@/api/types';

const EmptyArray = Object.freeze([]);

interface IPostList{
    posts: Post[]
}
function PostsList({ posts }: IPostList) {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts;
        if (!posts) return EmptyArray;
        return posts.filter(({ title, }) => title.toLowerCase().includes(searchTerm));
    }, [searchTerm, posts]);

    const Row = ({ index, style }: {index: number, style: React.CSSProperties}) => {
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
            {filteredPosts.length  ? <List
                height={600}
                itemCount={filteredPosts.length}
                itemSize={120}
                width="100%"
                className="bg-gray-100 rounded-lg shadow"
            >
                {Row}
            </List> : <NoPostAvailable/>}
        </div>
    );
}

const PostsWithQuery = withQuery(PostsList, Query.POSTS);

function Posts() {
    return <PostsWithQuery queryOptions={{ queryKey: [Query.POSTS], queryFn: getPosts }} />;
}


const NoPostAvailable = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <h1 className="text-lg text-gray-600">No posts available.</h1>
        </div>
    );
}
export default Posts;
