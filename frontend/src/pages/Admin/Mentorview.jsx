import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axiosInstance from '../../axiosinterceptor';
import Addmentor from './Addmentor';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Mentorview = () => {
  const [mentors, setMentors] = useState([]);
  var [update, setUpdate] = useState(false);
  var [singleValue, setSingleValue] = useState([])

  useEffect(() => {
    fetchPost();
  }, [update]);


  async function fetchPost() {
    try {
      const response = await axiosInstance.get('http://localhost:3000/mentor/view');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  }
  const updateBlog = (val) => {
    console.log("update clicked", val);
    // Check if val is not null or undefined
    if (val) {
      // Log the properties of val
      console.log("val._id:", val._id);
      console.log("val.name:", val.name); // or any other property you expect

      setUpdate(true);
      setSingleValue(val);
    } else {
      console.error("Received null or undefined value for updateBlog");
    }
  }

  function deletePost(id) {
    axiosInstance.delete(`http://localhost:3000/mentor/delete/${id}`)
      .then((res) => {
        alert(res.data);
        setUpdate((prevUpdate) => !prevUpdate); // Trigger an update after deletion
        fetchPost();
        window.location.reload(false);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };
  let finalJSX = (
    <main className='main-container'>
      <div className="table-container">
        <TableContainer className="mentor-table" component={Paper} sx={{ maxHeight: 600 }}>
          <Table >
            <TableHead id='thead' >
              <TableRow >
                <TableCell className="table-cell" align="center" >Name</TableCell>
                <TableCell className="table-cell" align="center">Email</TableCell>
                <TableCell className="table-cell" align="center">Phone Number</TableCell>
                <TableCell className="table-cell" align="center">Password</TableCell>
                <TableCell className="table-cell" align="center">Project Title</TableCell>
                <TableCell className="table-cell" align="center"> </TableCell>
                <TableCell className="table-cell" align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mentors.map((mentor) => (
                <TableRow key={mentor._id}>
                  <TableCell className="table-cell" align="center">{mentor.name}</TableCell>
                  <TableCell className="table-cell" align="center">{mentor.email}</TableCell>
                  <TableCell className="table-cell" align="center">{mentor.phoneNumber}</TableCell>
                  <TableCell className="table-cell" align="center">{mentor.password}</TableCell>
                  {/* Check if mentor.projectTitle exists before accessing its title property */}
                  <TableCell className="table-cell" align="center">
                    {mentor.projectTitle && mentor.projectTitle.length > 0 ? (
                      <ul>
                        {mentor.projectTitle.map((project) => (
                          <li key={project.id}>{project.title}</li>
                        ))}
                      </ul>
                    ) : (
                      'No Project Assigned'
                    )}
                  </TableCell>

                  <TableCell className="table-cell" align="center">
                    <EditIcon
                      className="action-button"
                      onClick={() => updateBlog(mentor)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <DeleteIcon
                      className="action-button"
                      onClick={() => deletePost(mentor._id)}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  )
  if (update && singleValue && singleValue._id) {
    finalJSX = <Addmentor method="put" data={singleValue} />
  }
  return (


    finalJSX




  )

}
export default Mentorview;
