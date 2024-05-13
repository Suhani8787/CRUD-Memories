import axios from "axios";
import { useEffect, useState } from "react";
import { updateMemory } from "./redux/memoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function formatDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

function UpdateMemory() {
    const { id } = useParams();
   
    const [memory, setMemory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    
    const memories = useSelector(state => state.memories.memories);
    
    useEffect(() => {
        const memory = memories.find(memory => memory.id === id);
        setMemory(memory.memory);
        setDescription(memory.description);
        setDate(formatDate(memory.date));
    }, [id, memories]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/update/'+id, { memory, description, date })
        .then(res => {
            dispatch(updateMemory({ id, memory, description, date }));
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return ( 
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Update Memory</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="">Memory</label>
                      <input
                        type="text"
                        className="form-control"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary">Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
     );
}

export default UpdateMemory;