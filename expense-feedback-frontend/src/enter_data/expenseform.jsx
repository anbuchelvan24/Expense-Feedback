import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextareaAutosize,
  Box,
  IconButton,
  Button,
  FormHelperText
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@mui/icons-material/Add';

function ExpenseForm() {
  const [formData, setFormData] = useState({
    expenseType: '',
    transactionDate: '',
    businessPurpose: '',
    vendorDescription: '',
    city: '',
    paymentType: '',
    amount: '',
    currency: '',
    taxPostedAmount: '',
    comment: '',
    personalExpense: ""
  });

  const [experType, setExperType] = useState('Dinner');
  const [transactionDate, setTransactionDate] = useState('');
  const [businessPurpose, setBusinessPurpose] = useState('');
  const [vendorDescription, setVendorDescription] = useState('');
  const [city, setCity] = useState('');
  const [paymentType, setPaymentType] = useState('Cash');
  const [amount, setAmount] = useState('150.00');
  const [currency, setCurrency] = useState('Euro (EUR)');
  const [taxAndPostedAmount, setTaxAndPostedAmount] = useState('');
  const [personalExpense, setPersonalExpense] = useState('');
  const [comment, setComment] = useState('');
  const [receiptFiles, setReceiptFiles] = useState([]);

  const paymentOptions = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Other'];

  const currencyOptions = [
    { value: 'Euro (EUR)', label: 'Euro (EUR)' },
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
    // Add more currencies here as needed
  ];

  const onDrop = (acceptedFiles) => {
    setReceiptFiles(acceptedFiles);
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
    const formData = {
      transactionDate,
      businessPurpose,
      vendorDescription,
      city,
      paymentType,
      amount,
      currency,
      taxAndPostedAmount,
      personalExpense,
      comment,
    };
    try {
      // Send formData to backend using Axios
      const response = await axios.post('http://127.0.0.1:5000/submit-expense', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>
    //       Expense Type:
    //       <input type="text" name="expenseType" value={formData.expenseType} onChange={handleChange} />
    //     </label>
    //     <label>
    //       transactionDate:
    //       <input type="text" name="expenseType" value={formData.transactionDate} onChange={handleChange} />
    //     </label>
    //     <label>
    //       vendorDescription:
    //       <input type="text" name="expenseType" value={formData.vendorDescription} onChange={handleChange} />
    //     </label>
    //     <label>
    //       paymentType:
    //       <input type="text" name="expenseType" value={formData.paymentType} onChange={handleChange} />
    //     </label>
    //     <label>
    //       Expense Type:
    //       <input type="text" name="expenseType" value={formData.expenseType} onChange={handleChange} />
    //     </label>
    //     <label>
    //       Expense Type:
    //       <input type="text" name="expenseType" value={formData.expenseType} onChange={handleChange} />
    //     </label>
    //   </div>
    //   {/* Add other input fields for the rest of the expense report data */}
    //   <button type="submit">Submit</button>
    // </form>


    <Container className="App" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ color: 'black' }}>
        Expense Report
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Transaction Date *"
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: 'black' }
            }}
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Business Purpose"
            value={businessPurpose}
            onChange={(e) => setBusinessPurpose(e.target.value)}
            style={{ color: 'black' }}
/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Vendor Description"
            value={vendorDescription}
            onChange={(e) => setVendorDescription(e.target.value)}
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'black' }}>Payment Type *</InputLabel>
            <Select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              style={{ color: 'black' }}
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
            label="Amount *"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel style={{ color: 'black' }}>Currency *</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ color: 'black' }}
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
            value={taxAndPostedAmount}
            onChange={(e) => setTaxAndPostedAmount(e.target.value)}
            type="number"
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Personal Expense"
            value={personalExpense}
            onChange={(e) => setPersonalExpense(e.target.value)}
            type="number"
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={25} lg={20}>
          <TextField
            fullWidth
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ color: 'black' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box border={1} p={2} borderRadius={4} textAlign="center" style={{ backgroundColor: 'white', color: 'black' }}>
            <Typography variant="h6" gutterBottom>
              Upload Receipt
            </Typography>
            <IconButton {...getRootProps()}>
              <AddIcon />
            </IconButton>
            <input {...getInputProps()} />
            <Typography variant="body1">Click or drag files here to upload.</Typography>
            <Typography variant="body2">Valid file types: .png, .jpg, .jpeg, .pdf, .tif, .tiff</Typography>
            <Typography variant="body2">Maximum file size: 5MB</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" type="submit">Submit</Button>
        </Grid>
      </Grid>
      </form>
    </Container>
  );
}

export default ExpenseForm;
