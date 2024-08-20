import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '@/api/posts';
import withQuery from '@/hoc/withQuery';
import { Query } from '@/constants';
import { Post } from '@/api/types';

const usePostSearch = (posts: Post[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts;
        return posts.filter(({ title }) => title.toLowerCase().includes(searchTerm));
    }, [searchTerm, posts]);

    return [filteredPosts, searchTerm, updateSearchTerm] as const
}


interface IPostList{
    posts: Post[]
}

function PostsList({ posts }: IPostList) {
    const [filteredPosts, searchTerm, updateSearchTerm] = usePostSearch(posts);
    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={updateSearchTerm}
                className="w-full p-2 mb-6 border border-gray-300 rounded-lg text-sm sm:text-base"
            />
            {filteredPosts.length ? (
                <div className="bg-gray-100 rounded-lg shadow overflow-y-auto max-h-[600px]">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="p-4 border-b border-gray-300">
                            <Link to={`/posts/${post.id}`} className="text-lg sm:text-xl font-bold text-blue-500 hover:underline">
                                {post.title}
                            </Link>
                            <p className="mt-2 text-gray-700 text-sm sm:text-base">{post.body}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <NoPostAvailable />
            )}
        </div>
    );
}

const PostsWithQuery = withQuery(PostsList, Query.POSTS);

function Posts() {
    return <PostsWithQuery queryOptions={{ queryKey: [Query.POSTS], queryFn: getPosts }} />;
}


const NoPostAvailable = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 px-4 sm:px-0">
            <h1 className="text-md sm:text-lg text-gray-600 text-center">No posts available.</h1>
        </div>
    );
}
export default Posts;
