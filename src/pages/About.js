import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          關於我們
        </Typography>

        { }
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            公司簡介
          </Typography>
          <Typography paragraph>
            我們是一家專注於醫療保健產品的專業供應商，致力於為客戶提供優質、安全的健康產品。
            自成立以來，我們一直秉持「以客為尊，品質至上」的經營理念，為廣大消費者提供最優質的醫療保健產品。
          </Typography>
        </Box>

        { }
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            我們的價值觀
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    品質保證
                  </Typography>
                  <Typography>
                    所有產品均經過嚴格品質控管，確保安全性和有效性。
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    專業服務
                  </Typography>
                  <Typography>
                    擁有專業的醫療保健團隊，為客戶提供最專業的建議和服務。
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    客戶至上
                  </Typography>
                  <Typography>
                    以客戶需求為導向，提供貼心的售前售後服務。
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        { }
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            我們的團隊
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/200x200"
                  alt="團隊成員"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    張醫師
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    醫療顧問
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/200x200"
                  alt="團隊成員"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    李藥師
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    產品研發
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/200x200"
                  alt="團隊成員"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    王營養師
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    營養顧問
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/200x200"
                  alt="團隊成員"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    陳客服
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    客戶服務
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About; 