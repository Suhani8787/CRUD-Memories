import axios from "axios";
import { useState } from "react";
import { addMemory } from "./redux/memoriesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateMemory() {

    const [memory, setMemory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/create', { memory, description, date })
        .then(res => {
            dispatch(addMemory(res.data));
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
              <h4>Add Memory</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                <button className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMemory;