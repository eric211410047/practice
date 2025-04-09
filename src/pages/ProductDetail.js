import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Chip,
  Rating,
  Divider,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id,
    name: '醫療產品示例',
    price: 1200,
    description: '這是一個高品質的醫療保健產品，具有優良的效果和安全性。',
    rating: 4.5,
    stock: 50,
    category: '保健用品',
    features: [
      '高品質材料',
      '安全認證',
      '效果持久',
      '適合日常使用'
    ],
    image: 'https://via.placeholder.com/400x400'
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        返回商品列表
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Chip
                label={product.category}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ ml: 2 }}
              />
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              NT$ {product.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                商品特點：
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {product.features.map((feature, index) => (
                  <Typography component="li" key={index}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TextField
                type="number"
                label="數量"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 100, mr: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                庫存：{product.stock} 件
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              fullWidth
            >
              加入購物車
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 