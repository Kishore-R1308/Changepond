import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../components/day4/redux/apiSlice";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DataListComp = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.api.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteData(id));
    }
  };

  return (
    <div>
      <h2>This is Data List</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.pname}</td>
              <td>{item.pprice}</td>
              <td>{item.pcompany}</td>
              <td>
                <Link
                  to={`/dashboard/updateproduct/${item.id}`}
                  className="btn btn-outline-success btn-sm me-2"
                > Edit
                  <EditIcon />
                </Link>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                > Delete
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataListComp;
