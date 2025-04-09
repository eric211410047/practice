import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';

const steps = ['運送資訊', '付款方式', '確認訂單'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [error, setError] = useState('');

  const handleShippingInfoChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateShippingInfo = () => {
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'postalCode'];
    for (const field of requiredFields) {
      if (!shippingInfo[field]) {
        setError(`請填寫${field === 'name' ? '姓名' : 
          field === 'email' ? '電子郵件' : 
          field === 'phone' ? '電話' : 
          field === 'address' ? '地址' : 
          field === 'city' ? '城市' : '郵遞區號'}`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateShippingInfo()) {
      return;
    }
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePlaceOrder = () => {
    try {
      const orderData = {
        items: cart,
        total: getCartTotal(),
        shippingInfo,
        paymentMethod,
      };
      const order = createOrder(orderData);
      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (error) {
      setError('創建訂單時發生錯誤，請稍後再試');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="姓名"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="電子郵件"
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={handleShippingInfoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="電話"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingInfoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="地址"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="城市"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="郵遞區號"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingInfoChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">選擇付款方式</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="credit" control={<Radio />} label="信用卡" />
              <FormControlLabel value="line" control={<Radio />} label="Line Pay" />
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              訂單摘要
            </Typography>
            {cart.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>
                  NT$ {item.price}
                </Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h6">總計</Typography>
              <Typography variant="h6">NT$ {getCartTotal()}</Typography>
            </Box>
          </Box>
        );
      default:
        return '未知步驟';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          結帳
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              上一步
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={cart.length === 0}
          >
            {activeStep === steps.length - 1 ? '確認訂購' : '下一步'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 