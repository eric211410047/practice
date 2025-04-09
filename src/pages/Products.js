import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../contexts/CartContext';

const products = [
  {
    id: 1,
    name: '維他命C 1000mg',
    description: '增強免疫力，促進膠原蛋白合成',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 299',
    category: '維他命',
  },
  {
    id: 2,
    name: '魚油膠囊',
    description: '富含omega-3，維護心血管健康',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 399',
    category: '保健食品',
  },
  {
    id: 3,
    name: '益生菌',
    description: '改善腸道健康，增強免疫力',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 499',
    category: '益生菌',
  },
  {
    id: 4,
    name: '鈣片',
    description: '補充鈣質，維護骨骼健康',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 299',
    category: '礦物質',
  },
  {
    id: 5,
    name: '葉黃素',
    description: '保護眼睛，改善視力',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 599',
    category: '保健食品',
  },
  {
    id: 6,
    name: '維他命B群',
    description: '提供能量，改善疲勞',
    image: 'https://via.placeholder.com/300x200',
    price: 'NT$ 399',
    category: '維他命',
  },
];

const categories = ['全部', '維他命', '保健食品', '益生菌', '礦物質'];

const Products = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product);
    setShowSuccess(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '全部' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          產品列表
        </Typography>

        {}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="搜尋產品"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>分類</InputLabel>
              <Select
                value={selectedCategory}
                label="分類"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    加入購物車
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            {addedProduct?.name} 已加入購物車
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Products; 