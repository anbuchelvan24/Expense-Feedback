import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Typography, TextField, FormControl, InputLabel, 
  Select, MenuItem, Grid, Box, IconButton, Button, Checkbox, FormControlLabel, CircularProgress 
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { PermMedia } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './ExpenseForm.css';
import Navbar from '../Navbar/Navbar';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { GrPowerReset } from "react-icons/gr";




function ExpenseForm() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.firstName : ''
  const email = user ? user.email : ''
  
  const [formData, setFormData] = useState({
    transactionDate: '',
    businessPurpose: '',
    vendorDescription: '',
    city: '',
    paymentType: '',
    amount: '',
    currency: '',
    taxAndPostedAmount: '',
    personalExpense: false,
    comment: '',
    name: name,
    email: email,
  });
  const [receiptFile, setReceiptFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState('');


  const paymentOptions = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Other'];
  const currencyOptions = [
    { value: 'Euro (EUR)', label: 'Euro (EUR)' },
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
  ];

  const onDrop = (acceptedFiles) => {
    setReceiptFile(acceptedFiles[0]);
    setFilename(acceptedFiles[0].name);
    setFileError('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tif', '.tiff'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 5 * 1024 * 1024,
    onDrop,
  });


  useEffect(()=>{
    const authStatus = JSON.parse(localStorage.getItem("isAuthenticated"));
    setIsAuthenticated(authStatus);
  },[]);

  const handleChange = (e) => {
    const { name, value, type,checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () =>{
    setFeedback('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');
    setIsLoading(true);

    if (!receiptFile) {
      setFileError('Please upload a receipt file.'); // Set file error if no file is uploaded
      setIsLoading(false);
      return;
    }

    const expenseData = {
      ...formData
    };

    console.log(expenseData);
    console.log(name);

    try {
      const user=JSON.parse(localStorage.getItem("user"));
      const email=user.email;
      const formData = new FormData();
      formData.append('file', receiptFile);
      formData.append('email',email);
      const uploadResponse = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      expenseData.receiptFileId = uploadResponse.data;
    
    
    const response = await fetch('http://127.0.0.1:5000/submit-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData)
    });
    

      setIsLoading(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value);
          setFeedback(result);
      }

      setIsLoading(false);

  } 
  catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
  }
};


  return (
    isAuthenticated ? (
      <>
        <div className="navbar-fixed">
          <Navbar />
        </div>
        <div className='container-scrollable'>
        <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '1px' }}>
        <Typography variant="h4" align="center" style={{ fontFamily: 'Poppins', color: '#042a2f',fontFamily: 'Josefin Sans' }}>
        EXPENSE REPORT
        </Typography>
      <div className='overall-container'>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins', color: '#042a2f', marginTop: '2vh', marginBottom: '3vh' }}>
            Enter Expense Details
            {/* <hr style={{height: '2px', backgroundColor: '#042a2f', borderRadius: '3px', width: '14vh'}}></hr> */}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField className='label-required'
                fullWidth
                label={<span>Transaction Date</span>}
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
              ),
              style: {
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
              }
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Business Purpose"
                name="businessPurpose"
                value={formData.businessPurpose}
                onChange={handleChange}
                InputProps={{
                  style: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Example shadow effect
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vendor Description"
                name="vendorDescription"
                value={formData.vendorDescription}
                onChange={handleChange}
                InputProps={{
                  style: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Example shadow effect
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location/ Destination"
                name="city"
                value={formData.city}
                onChange={handleChange}
                InputProps={{
                  style: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Example shadow effect
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
                <InputLabel style={{backgroundColor: 'white'}}>Payment Type <span style={{ color: 'red' }}>*</span></InputLabel>
                <Select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  required
                >
                  {paymentOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className='label-required'
                fullWidth
                label={<span>Total Amount ( including tax )</span>}
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                InputProps={{
                  style: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Example shadow effect
                  }
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
                <InputLabel style={{backgroundColor:'white'}}>Currency <span style={{ color: 'red' }}>*</span></InputLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                >
                  {currencyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tax"
                name="taxAndPostedAmount"
                value={formData.taxAndPostedAmount}
                onChange={handleChange}
                type="number"
                InputProps={{
                  style: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Example shadow effect
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth >
              <FormControlLabel
                control={                  
                  <Checkbox
                    value={formData.personalExpense}
                    checked={formData.personalExpense}
                    onChange={handleChange}
                    name="personalExpense"
                    color="primary"
                  />}
                  label = "Personal Expense"
                  style = {{color: 'black'}}
                  />
              </FormControl>  
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Why was this expense made?"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                InputProps={{
                  style: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Example shadow effect
                  }
                }}
              />
            </Grid>
            <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins', color: '#042a2f', marginLeft: '2vh', marginTop: '2vh' }}>
              Upload Your Receipt
              {/* <hr style={{height: '2px', backgroundColor: '#042a2f', borderRadius: '3px', width: '14vh'}}></hr> */}
            </Typography>
            <Grid item xs={12}>
              <Box textAlign="center" style={{ border: '1px solid #042a2f', padding: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', backdropFilter: 'blur(50px)', backgroundColor: 'white', color: '#042a2f', borderColor: '#b0b0b0' }}>
                <IconButton {...getRootProps()}>
                  <PermMedia sx={{ height: '6vh', width: '6vh', color: '#042a2f' }} />
                </IconButton>
                <input {...getInputProps()} />
                <Typography variant="body1" style={{ fontFamily: 'Poppins', color: '#042a2f' }}>{filename ? `File uploaded: ${filename}` : 'Upload or drag files here.'}</Typography>
                <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#042a2f', opacity: 0.6 }}>Supports: .png, .jpg, .jpeg, .pdf, .tif, .tiff</Typography>
                {fileError && <Typography variant="body2" style={{ fontFamily:'poppins', color: 'red', marginTop: '10px' }}>{fileError}</Typography>}
              </Box>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" style={{ marginTop: '20px', backgroundColor: '#042a2f', color: 'white' }}>
                Generate Feedback ✨
              </Button>
              <Button onClick={handleReset} variant="contained" style={{marginLeft:'6px', marginTop: '20px', backgroundColor: 'black', color: 'white' }}>
                <GrPowerReset/>
              </Button>
            </Grid>
          </Grid>
        </form>
        <div style={{ marginLeft: '20px', marginTop: '45px' }}>
          <Grid item xs={12}>
          <Box className="feedback" border={1} p={2} borderRadius={1} textAlign="center" style={{ marginTop: '3vh', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', height: '73vh', width: '25vw', backgroundColor: 'white', color: '#042a2f', overflowY: 'scroll', borderColor: '#b0b0b0' }}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins', color: '#042a2f' }}>
                Feedback
                {/* <hr style={{height: '2px', backgroundColor: '#042a2f', borderRadius: '3px', width: '8vh', marginLeft: '20vh'}}></hr> */}
              </Typography>

              {feedback==='' ? (!isLoading ? (
                <div style={{ opacity: 0.8, marginTop: '32vh' }}>
                  <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#042a2f', opacity: 0.6 }}>Your feedback will be accessible here.</Typography>
                </div>):(
                  <CircularProgress style={{ marginTop: '32vh', color: '#042a2f' }} />
                )
              ):(feedback.split('\n').map((point, index) => (
                <Typography key={index} variant="body1" style={{ fontFamily: 'Poppins', color: '#042a2f' }}>
                  <div style={{ marginBottom: '30px' }}></div>
                  {point}
                </Typography>
              )))}
              
            </Box>
          </Grid>
        </div>
      </div>
    </Container>
        </div>
      </>
    ) : (
      <Typography variant="h6" align="center" style={{ fontFamily: 'Poppins', color: '#042a2f' }}>
        Please log in to access this page.
      </Typography>
    )
  );
}

export default ExpenseForm;
