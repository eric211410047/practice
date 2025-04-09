import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Checkbox,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useOrder } from '../contexts/OrderContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getDateNDaysAgo = (n) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};

const Orders = () => {
  const navigate = useNavigate();
  const { getUserOrders, updateOrderStatus } = useOrder();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const orders = getUserOrders();

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

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    switch (orderBy) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'name':
        comparison = a.shippingInfo.name.localeCompare(b.shippingInfo.name);
        break;
      case 'total':
        comparison = parseFloat(a.total) - parseFloat(b.total);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    return order === 'asc' ? comparison : -comparison;
  });

  const paginatedOrders = sortedOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const orderStats = useMemo(() => {
    const stats = {
      total: orders.length,
      totalAmount: orders.reduce((sum, order) => sum + parseFloat(order.total), 0),
      byStatus: {
        '待處理': 0,
        '處理中': 0,
        '已出貨': 0,
        '已完成': 0,
        '已取消': 0,
      },
      averageAmount: 0,
      recentOrders: 0,
    };

    orders.forEach(order => {
      stats.byStatus[order.status] = (stats.byStatus[order.status] || 0) + 1;
    });

    stats.averageAmount = stats.total > 0 ? stats.totalAmount / stats.total : 0;

    const thirtyDaysAgo = getDateNDaysAgo(30);
    stats.recentOrders = orders.filter(order => new Date(order.date) >= thirtyDaysAgo).length;

    return stats;
  }, [orders]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedOrders.map((order) => order.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleOpenStatusDialog = () => {
    setNewStatus('');
    setStatusNote('');
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleConfirmStatusChange = () => {
    selected.forEach(orderId => {
      updateOrderStatus(orderId, newStatus, statusNote);
    });
    setSelected([]);
    setOpenStatusDialog(false);
  };

  const handleExportOrders = () => {

    const headers = ['訂單編號', '訂單日期', '收件人', '電話', '電子郵件', '地址', '總金額', '狀態'];
    const csvData = sortedOrders.map(order => [
      order.id,
      formatDate(order.date),
      order.shippingInfo.name,
      order.shippingInfo.phone,
      order.shippingInfo.email,
      `${order.shippingInfo.address}, ${order.shippingInfo.city} ${order.shippingInfo.postalCode}`,
      `NT$ ${order.total}`,
      order.status
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          我的訂單
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {selected.length > 0 && (
            <>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleOpenStatusDialog}
              >
                批量更新狀態
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  selected.forEach(orderId => {
                    updateOrderStatus(orderId, '已取消', '批量取消訂單');
                  });
                  setSelected([]);
                }}
              >
                批量取消
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportOrders}
            disabled={filteredOrders.length === 0}
          >
            導出訂單
          </Button>
        </Box>
      </Box>

      {}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">總訂單數</Typography>
              </Box>
              <Typography variant="h4">{orderStats.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                最近30天: {orderStats.recentOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">總金額</Typography>
              </Box>
              <Typography variant="h4">NT$ {orderStats.totalAmount.toFixed(2)}</Typography>
              <Typography variant="body2" color="text.secondary">
                平均: NT$ {orderStats.averageAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalShippingIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">處理中訂單</Typography>
              </Box>
              <Typography variant="h4">{orderStats.byStatus['處理中']}</Typography>
              <Typography variant="body2" color="text.secondary">
                待處理: {orderStats.byStatus['待處理']}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">已完成訂單</Typography>
              </Box>
              <Typography variant="h4">{orderStats.byStatus['已完成']}</Typography>
              <Typography variant="body2" color="text.secondary">
                已取消: {orderStats.byStatus['已取消']}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 搜尋和篩選 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="搜尋訂單"
              value={searchTerm}
              onChange={handleSearchChange}
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
              <InputLabel>訂單狀態</InputLabel>
              <Select
                value={statusFilter}
                label="訂單狀態"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="待處理">待處理</MenuItem>
                <MenuItem value="處理中">處理中</MenuItem>
                <MenuItem value="已出貨">已出貨</MenuItem>
                <MenuItem value="已完成">已完成</MenuItem>
                <MenuItem value="已取消">已取消</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* 訂單表格 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < paginatedOrders.length}
                  checked={paginatedOrders.length > 0 && selected.length === paginatedOrders.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  訂單編號
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleRequestSort('date')}
                >
                  訂單日期
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  收件人
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'total'}
                  direction={orderBy === 'total' ? order : 'asc'}
                  onClick={() => handleRequestSort('total')}
                >
                  總金額
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  狀態
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => {
              const isItemSelected = isSelected(order.id);
              return (
                <TableRow
                  hover
                  key={order.id}
                  selected={isItemSelected}
                  onClick={(event) => handleClick(event, order.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell>{order.shippingInfo.name}</TableCell>
                  <TableCell>NT$ {order.total}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<VisibilityIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewOrder(order.id);
                      }}
                    >
                      查看詳情
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">
                    沒有找到符合條件的訂單
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={sortedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每頁顯示"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count}`}
        />
      </TableContainer>

      <Dialog
        open={openStatusDialog}
        onClose={handleCloseStatusDialog}
      >
        <DialogTitle>批量更新訂單狀態</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            已選擇 {selected.length} 個訂單
          </DialogContentText>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>新狀態</InputLabel>
            <Select
              value={newStatus}
              label="新狀態"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="待處理">待處理</MenuItem>
              <MenuItem value="處理中">處理中</MenuItem>
              <MenuItem value="已出貨">已出貨</MenuItem>
              <MenuItem value="已完成">已完成</MenuItem>
              <MenuItem value="已取消">已取消</MenuItem>
            </Select>
          </FormControl>
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

export default Orders; 