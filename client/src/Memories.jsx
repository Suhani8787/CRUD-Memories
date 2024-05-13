import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMemory } from "./redux/memoriesSlice";

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function Memories() {

    const memories = useSelector(state => state.memories.memories);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteMemory/'+id)
        .then(res => {
            dispatch(deleteMemory({ id }));
        }).catch(err => console.log(err));
    }
    
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4>Memories</h4>
              <Link to="/create" className="btn btn-success">Add Memory</Link>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Memory</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      memories.map(memory => {
                          return <tr key={memory.id}>
                              <td>{memory.memory}</td>
                              <td>{memory.description}</td>
                              <td>{formatDate(memory.date)}</td>
                              <td>
                                  <Link to={`/edit/${memory.id}`} className="btn btn-sm btn-primary me-2">Update</Link>
                                  <button onClick={() => handleDelete(memory.id)} className="btn btn-sm btn-danger">Delete</button>
                              </td>
                          </tr>
                      })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Memories;