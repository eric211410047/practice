import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          訂單提交成功！
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          感謝您的訂購，我們會盡快處理您的訂單。
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          訂單確認郵件已發送至您的電子郵箱。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/orders')}
          >
            查看訂單
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ ml: 2 }}
          >
            繼續購物
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccess; 