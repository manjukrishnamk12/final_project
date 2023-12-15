import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosinterceptor';
import { Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Evaluate from './Evaluate';



const Viewtopic = () => {
  const [submissions, setSubmissions] = useState([]);
  var [update, setUpdate] = useState(false);
  var [singleValue, setSingleValue] = useState([])
  const [selectedBatchOrProject, setSelectedBatchOrProject] = useState('BatchProject');
  const mentorId = localStorage.getItem('userid');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch submissions based on batch or project
    axiosInstance.get(`http://localhost:3000/sub/mentor/submissions?id=${mentorId}&batchOrProjectId=${selectedBatchOrProject}`)
      .then((res) => setSubmissions(res.data))
      .catch((error) => console.error('Error fetching submissions:', error));
  }, [selectedBatchOrProject]);

  const handleBatchOrProjectChange = (event) => {
    // Clear submissions when changing the selection
    setSelectedBatchOrProject(event.target.value);
  };

  const handleEvaluate = (submissionId) => {
    navigate(`/Evaluate/${submissionId}`);
  };

  const updatesub = (val) => {
    navigate(`/Evaluate/${val._id}?edit=T`);
    // Check if val has the expected properties
    if (val && val._id) {
      setUpdate(true);
      setSingleValue(val);
    } else {
      console.error("Received invalid value for updatesub");
    }
  };

  function deletePost(submissionId) {
    axiosInstance.delete(`http://localhost:3000/sub/submissions/delete/${submissionId}`)
      .then((res) => {
        alert(res.data);
        axiosInstance.get(`http://localhost:3000/sub/mentor/submissions?id=${mentorId}&batchOrProjectId=${selectedBatchOrProject}`)
          .then((res) => setSubmissions(res.data))
          .catch((error) => console.error('Error fetching submissions:', error));

      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };
  let finalJSX = (
    <main className='main-container'>
      <div>
        <h1 className='sub'>Submissions</h1>
        <div className="containerview">
          <div className="selection-container">
            <label htmlFor="selection" className="selection-label">Select Batch or Project:</label>
            <Select value={selectedBatchOrProject} onChange={handleBatchOrProjectChange} id='selection' defaultValue="BatchProject">
              <MenuItem value="BatchProject">Select Batch or Project</MenuItem>
              <MenuItem value="batch">Batch</MenuItem>
              <MenuItem value="project">Project</MenuItem>
            </Select>
          </div>
          <div className="tableContainer">
            <TableContainer className="mentor-table" component={Paper} sx={{ maxHeight: 600, width: '100%' }}>
              <Table sx={{ width: '100%' }}>
                <TableHead id='thead' >
                  <TableRow style={{ background: 'gray', color: 'white' }}>
                    <TableCell className="table-cell" align="center">Student Name</TableCell>
                    <TableCell className="table-cell" align="center">Batch</TableCell>
                    <TableCell className="table-cell" align="center">Email</TableCell>
                    <TableCell className="table-cell" align="center">Project Title</TableCell>
                    <TableCell className="table-cell" align="center">Submission Url</TableCell>
                    <TableCell className="table-cell" align="center">Status</TableCell>
                    <TableCell className="table-cell" align="center"> </TableCell>
                    <TableCell className="table-cell" align="center"> </TableCell>
                    <TableCell className="table-cell" align="center"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell className="table-cell" align="center">{submission.student.name}</TableCell>
                      <TableCell className="table-cell" align="center">{submission.student.batch}</TableCell>
                      <TableCell className="table-cell" align="center">{submission.student.email}</TableCell>
                      <TableCell className="table-cell" align="center">{submission.project.title}</TableCell>
                      <TableCell className="table-cell" align="center">{submission.submissionUrl}</TableCell>
                      <TableCell className="table-cell" align="center">{submission.status}</TableCell>
                      <TableCell className="table-cell" align="center">
                        <Button id="submit" variant="contained" onClick={() => handleEvaluate(submission._id)} disabled={submission.status === 'completed'}>Evaluate</Button>
                      </TableCell>
                      <TableCell className="table-cell" align="center">
                        <EditIcon
                          className="action-button"
                          onClick={() => updatesub(submission)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell className="table-cell" align="center">
                        <DeleteIcon
                          className="action-button"
                          onClick={() => deletePost(submission._id)}
                          color="primary"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </main>
  );
  if (update && singleValue && singleValue._id) {
    finalJSX = <Evaluate method="put" data={singleValue} />
  }

  return (

    finalJSX

  )

};


export default Viewtopic;
