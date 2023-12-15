import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import axiosInstance from '../../axiosinterceptor';
import Addproject from './Addproject';



const Projectview = () => {

  const [cardData, setData] = useState([]);
  var [update, setUpdate] = useState(false);
  var [singleValue, setSingleValue] = useState([])
  useEffect(() => {
    fetchPost();
  }, []);

  function fetchPost() {
    axiosInstance.get('http://localhost:3000/project/view').then((res) => {
      setData(res.data);
    })
  }
  const updateBlog = (val) => {
    setUpdate(true);
    setSingleValue(val)
  }

  function deletePost(id) {
    axiosInstance.delete(`http://localhost:3000/project/delete/${id}`)
      .then((res) => {
        alert(res.data);
        fetchPost();
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };
  let finalJSX = (
    <main className='main-container'>
      <Container maxWidth="lg" id="card-containerp"> {/* Added Container with maxWidth and id */}
        <Grid container spacing={3}>
          {cardData.map((val, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card className="cardp">
                <CardMedia className="card-mediap" image={val.imageUrl} title={val.title} style={{ height: '140px', overflow: 'hidden' }} />
                <CardContent className="card-contentp">
                  <Typography gutterBottom variant="h5" component="div">
                    {val.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {val.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Reference Material URL:</strong> {val.referenceUrl}
                  </Typography>
                </CardContent>
                <CardActions className="card-actionsp">
                  <Button size="small" variant="contained" color="error" onClick={() => deletePost(val._id)}>
                    Delete
                  </Button>
                  <Button size="small" id='update' variant="contained" color="primary" onClick={() => updateBlog(val)}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );

  if (update) finalJSX = <Addproject method="put" data={singleValue} />
  return (


    finalJSX


  )
}

export default Projectview;
