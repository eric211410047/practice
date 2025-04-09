import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('請填寫所有必填欄位');
      return;
    }

    try {
      login({
        id: 1,
        name: '測試用戶',
        email: formData.email,
      });
      navigate('/');
    } catch (err) {
      setError('登入失敗，請檢查您的帳號密碼');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              登入
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="電子郵件"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="密碼"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    登入
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link component={RouterLink} to="/register" variant="body2">
                      還沒有帳號？立即註冊
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link component={RouterLink} to="/forgot-password" variant="body2">
                      忘記密碼？
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login; 