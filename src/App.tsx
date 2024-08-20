import { Route, Routes } from 'react-router-dom';
import Posts from '@/components/Posts';
import PostDetails from '@/components/PostDetails';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Posts />} />
       <Route path="/posts/:id" element={<PostDetails />} />
    </Routes>
  );
}

export default App;
