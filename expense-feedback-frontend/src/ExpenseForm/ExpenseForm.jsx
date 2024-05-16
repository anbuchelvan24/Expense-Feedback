
import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, Typography, TextField, FormControl, InputLabel, 
  Select, MenuItem, Grid, Box, IconButton, Button 
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@mui/icons-material/Add';
import './ExpenseForm.css'
import { Check, Collections, DriveFolderUpload, FactCheck, PermMedia } from '@mui/icons-material';

function ExpenseForm() {
  const [formData, setFormData] = useState({
    transactionDate: '',
    businessPurpose: '',
    vendorDescription: '',
    city: '',
    paymentType: 'Cash',
    amount: '150.00',
    currency: 'Euro (EUR)',
    taxAndPostedAmount: '',
    personalExpense: '',
    comment: '',
  });
  const [receiptFile, setReceiptFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [feedback, setFeedback] = useState('');

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
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.png, .jpg, .jpeg, .pdf, .tif, .tiff',
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      ...formData
    };

    try {
      if (receiptFile) {
        const formData = new FormData();
        formData.append('file', receiptFile); // Append the file to FormData
        const uploadResponse = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        expenseData.receiptFileId = uploadResponse.data; // Access the uploaded file ID
      }

      const response = await axios.post('http://127.0.0.1:5000/submit-expense', expenseData);
      console.log(response.data);

      // Update state to display the response in the feedback box
      setFeedback(response.data);

  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontFamily: 'Poppins', color: '#042a2f  ' }}>
        EXPENSE REPORT
      </Typography>

      <div className='overall-container'>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins', color: '#042a2f ', marginTop: '2vh', marginBottom: '3vh' }}>
            Enter Expense Details
            <hr style={{height: '2px', backgroundColor: '#042a2f  ', borderRadius: '3px', width: '14vh'}}></hr>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transaction Date"
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Vendor Description"
              name="vendorDescription"
              value={formData.vendorDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel style={{backgroundColor:'white'}}>Payment Type *</InputLabel>
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
            <TextField
              fullWidth
              label="Amounts"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel style={{backgroundColor:'white'}}>Currency *</InputLabel>
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
              label="Tax & Posted Amount"
              name="taxAndPostedAmount"
              value={formData.taxAndPostedAmount}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Personal Expense"
              name="personalExpense"
              value={formData.personalExpense}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </Grid>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins', color: '#042a2f ', marginLeft: '2vh', marginTop: '2vh' }}>
               Upload Your Receipt
               <hr style={{height: '2px', backgroundColor: '#042a2f ', borderRadius: '3px', width: '14vh'}}></hr>
          </Typography>
          <Grid item xs={12}>
            <Box textAlign="center" style={{border: '1px solid #042a2f  ', padding: '10px' ,boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius: '30px', backdropFilter: 'blur(50px)', backgroundColor: 'white', color: '#042a2f  ' }}>
              <IconButton {...getRootProps()}>
                <PermMedia sx={{height: '6vh', width: '6vh', color: '#042a2f'}} />
              </IconButton>
              <input {...getInputProps()} />
              <Typography variant="body1" style={{ fontFamily: 'Poppins', color: '#042a2f ' }}>{filename ? `File uploaded: ${filename}` : 'Click or drag files here to upload.'}</Typography> {/* Updated to display filename */}
              <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#042a2f ', opacity: 0.6 }}>Supports: .png, .jpg, .jpeg, .pdf, .tif, .tiff</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button id='submit-button' variant="contained" type="submit" sx={{width: '618px', borderRadius: '16px', backgroundColor: '#042a2f  ', color: 'white'}}>Submit</Button>
        </Grid>
      </Grid>
      </form>
      <div style={{marginLeft:'20px'}}>
      <Grid item xs={12}>
      <Box className="feedback" border={1} p={2} borderRadius={4} textAlign="center" style={{marginTop: '3vh' , boxShadow: '2px 2px 2px', height: '73vh', width: '25vw', backgroundColor: 'white', color: '#042a2f  ', overflowY: 'scroll' }}>
        <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins', color: '#042a2f ' }}>
          FEEDBACK
        <hr style={{height: '2px', backgroundColor: '#042a2f  ', borderRadius: '3px', width: '8vh', marginLeft: '20vh'}}></hr>
        </Typography>

        {feedback === '' && (
          <div style={{opacity: 0.8, marginTop: '32vh'}}>
            {/* <Check sx={{height: '6vh', width: '6vh', color: '#042a2f'}} /> */}
            <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#042a2f', opacity: 0.6 }}>Your receipt feedback will be accessible here.</Typography>
          </div>
        )}

        {feedback.split('\n').map((point, index) => (
          <Typography key={index} variant="body1" style={{ fontFamily: 'Poppins', color: '#042a2f ' }}>
            <div style={{marginBottom: '30px'}}></div>
            {point}
          </Typography>
        ))}
    </Box>

      </Grid>
      </div>
      </div>
    </Container>
  );
}

export default ExpenseForm;
