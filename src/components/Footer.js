import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              關於我們
            </Typography>
            <Typography variant="body2" color="text.secondary">
              我們致力於為提供優質的醫療保健產品，為您的健康把關護航。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              聯絡資訊
            </Typography>
            <Typography variant="body2" color="text.secondary">
              電話：(02) 1234-5678
            </Typography>
            <Typography variant="body2" color="text.secondary">
              電子郵件：service@healthcare.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              地址：台北市信義區忠孝路100號
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              快速連結
            </Typography>
            <Box sx={{ '& > a': { color: 'text.secondary', textDecoration: 'none', display: 'block', mb: 1, '&:hover': { color: 'primary.main' } } }}>
              <Link to="/products">產品列表</Link>
              <Link to="/about">關於我們</Link>
              <Link to="/contact">聯絡我們</Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, borderTop: 1, borderColor: 'divider', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Copyright © 醫療保健商城 {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 