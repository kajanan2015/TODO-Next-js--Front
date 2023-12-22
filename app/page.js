'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const fetchEmployees = async () => {
    try {
      const apiResponse = await fetch('http://localhost:3000/api/employees');
      const data = await apiResponse.json();

      // Ensure that the data is an array before updating the state
      if (Array.isArray(data)) {
        setDetails(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const handleSubmit = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      if (editIndex !== null) {
        // If editing, update the existing detail
        const updatedDetails = [...details];
        updatedDetails[editIndex] = { title, description };
        setDetails(updatedDetails);
        setEditIndex(null);
      } else {
        // If not editing, add a new detail
        setDetails([...details, { title, description }]);
      }
      setTitle('');
      setDescription('');
    } else {
      alert('Please enter both title and description.');
      
    }
  };

  const handleEdit = (index) => {
    // Set the title and description for editing
    setTitle(details[index].title);
    setDescription(details[index].description);
    // Set the index to mark that we are editing this detail
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    // Remove the detail at the specified index
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f0f0f0',
      }}
    >
      <div>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Todo List
        </Typography>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={handleSubmit}
        >
          {editIndex !== null ? 'Update' : 'Submit'}
        </Button>

        <div>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Submitted Details:
          </Typography>
          <ul>
            {details.map((detail, index) => (
              <li key={index}>
                <strong>{detail.title}</strong>: {detail.description}
                <Button
                  onClick={() => handleEdit(index)}
                  startIcon={<EditIcon />}
                  size="small"
                  color="primary"
                  sx={{ mx: 1 }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
                  startIcon={<DeleteIcon />}
                  size="small"
                  color="secondary"
                  sx={{ mx: 1 }}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
