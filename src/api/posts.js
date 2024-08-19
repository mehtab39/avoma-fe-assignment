const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POST_BASE_URL = `${BASE_URL}/posts`;
const COMMENTS_BASE_URL = `${BASE_URL}/posts`;

const fetchResponse = async (endpoint) => {
    const response = await fetch(endpoint);
    return response.json();
}
export const getPostDetails = async (id) => {
    return fetchResponse(`${POST_BASE_URL}/${id}`)
};

export const getComments = async (id) => {
    return fetchResponse(`${COMMENTS_BASE_URL}?postId=${id}`);
};

export const getPosts = async () => {
    return fetchResponse(POST_BASE_URL);
}