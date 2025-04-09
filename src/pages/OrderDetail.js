import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useOrder } from '../contexts/OrderContext';
import { getRandomImage } from '../utils/imageUtils';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getUserOrders, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [orderImage, setOrderImage] = useState('');

  useEffect(() => {
    const orders = getUserOrders();
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setOrderImage(getRandomImage(800, 400));
    } else {
      navigate('/orders');
    }
  }, [orderId, getUserOrders, navigate]);

  const handleBack = () => {
    navigate('/orders');
  };

  const handleOpenCancelDialog = () => {
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleConfirmCancel = () => {
    updateOrderStatus(orderId, '已取消', '用戶取消訂單');
    setOpenCancelDialog(false);
    navigate('/orders');
  };

  const handleOpenStatusDialog = () => {
    setNewStatus('');
    setStatusNote('');
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleConfirmStatusChange = () => {
    updateOrderStatus(orderId, newStatus, statusNote);
    setOpenStatusDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '待處理':
        return 'warning';
      case '處理中':
        return 'info';
      case '已出貨':
        return 'primary';
      case '已完成':
        return 'success';
      case '已取消':
        return 'error';
      default:
        return 'default';
    }
  };

  if (!order) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          返回訂單列表
        </Button>
        <Typography variant="h4" component="h1">
          訂單詳情
        </Typography>
      </Box>

      {}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <img
          src={orderImage}
          alt="訂單圖片"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">訂單信息</Typography>
              <Box>
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleOpenStatusDialog}
                  sx={{ mr: 1 }}
                >
                  更新狀態
                </Button>
                {order.status !== '已取消' && order.status !== '已完成' && (
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={handleOpenCancelDialog}
                  >
                    取消訂單
                  </Button>
                )}
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  訂單編號
                </Typography>
                <Typography variant="body1">{order.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  訂單日期
                </Typography>
                <Typography variant="body1">
                  {formatDate(order.date)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  訂單狀態
                </Typography>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  總金額
                </Typography>
                <Typography variant="body1">NT$ {order.total}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>訂單商品</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>商品</TableCell>
                    <TableCell align="right">單價</TableCell>
                    <TableCell align="right">數量</TableCell>
                    <TableCell align="right">小計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={getRandomImage(50, 50)}
                            alt={item.name}
                            style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 16 }}
                          />
                          {item.name}
                        </Box>
                      </TableCell>
                      <TableCell align="right">NT$ {item.price}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">NT$ {item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>收件信息</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText
                  primary={order.shippingInfo.name}
                  secondary={`${order.shippingInfo.address}, ${order.shippingInfo.city} ${order.shippingInfo.postalCode}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="預計送達時間"
                  secondary={formatDate(order.date)}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>訂單狀態歷史</Typography>
            <List>
              {order.statusHistory?.map((history, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {history.status === '已完成' ? (
                        <CheckCircleIcon color="success" />
                      ) : history.status === '已取消' ? (
                        <CancelIcon color="error" />
                      ) : (
                        <AccessTimeIcon color="info" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={history.status}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {formatDate(history.date)}
                          </Typography>
                          {history.note && (
                            <Typography variant="body2" color="text.secondary">
                              {history.note}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  {index < order.statusHistory.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
      >
        <DialogTitle>確認取消訂單</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您確定要取消此訂單嗎？此操作無法撤銷。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog}>取消</Button>
          <Button onClick={handleConfirmCancel} color="error">
            確認取消
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openStatusDialog}
        onClose={handleCloseStatusDialog}
      >
        <DialogTitle>更新訂單狀態</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="新狀態"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          >
            <MenuItem value="待處理">待處理</MenuItem>
            <MenuItem value="處理中">處理中</MenuItem>
            <MenuItem value="已出貨">已出貨</MenuItem>
            <MenuItem value="已完成">已完成</MenuItem>
            <MenuItem value="已取消">已取消</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="備註"
            multiline
            rows={3}
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>取消</Button>
          <Button onClick={handleConfirmStatusChange} color="primary">
            確認更新
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderDetail; 