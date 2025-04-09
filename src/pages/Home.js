import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: '維他命C 1000mg',
    description: '增強免疫力，促進膠原蛋白合成',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 299',
  },
  {
    id: 2,
    name: '魚油膠囊',
    description: '富含omega-3，維護心血管健康',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 399',
  },
  {
    id: 3,
    name: '益生菌',
    description: '改善腸道健康，增強免疫力',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 499',
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                您的健康夥伴
              </Typography>
              <Typography variant="h5" paragraph>
                提供優質醫療保健產品，為您的健康保駕護航
              </Typography>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                立即選購
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          熱門商品
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    加入購物車
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 