import { Post, Comment } from '@/api/types';
import { Query } from "@/constants";

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POST_BASE_URL = `${BASE_URL}/${Query.POSTS}`;
const COMMENTS_BASE_URL = `${BASE_URL}/${Query.COMMENTS}`;

const fetchResponse = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}`);
    }
    return response.json();
}

export const getPostDetails = async (postId: string) => {
    return fetchResponse<Post>(`${POST_BASE_URL}/${postId}`);
};

export const getComments = async (postId: string) => {
    return fetchResponse<Comment[]>(`${COMMENTS_BASE_URL}?postId=${postId}`);
};

export const getPosts = async () => {
    return fetchResponse<Post[]>(POST_BASE_URL);
}
