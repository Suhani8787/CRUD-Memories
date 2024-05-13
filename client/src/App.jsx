import 'bootstrap/dist/css/bootstrap.min.css';
import Memories from './Memories';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getMemories } from './redux/memoriesSlice';
import CreateMemory from './CreateMemory';
import UpdateMemory from './UpdateMemory';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001');
        dispatch(getMemories(response.data));
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="App" style={{ backgroundColor: '#ADD8E6', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Memories />} />
          <Route path='/create' element={<CreateMemory />} />
          <Route path='/edit/:id' element={<UpdateMemory />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;