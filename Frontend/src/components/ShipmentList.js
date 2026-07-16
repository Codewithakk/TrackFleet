import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { shipmentService } from '../services/api';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Pagination,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Skeleton,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Badge,
  Divider,
  Collapse,
  alpha,
  Zoom,
  Slide,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Fab,
  LinearProgress,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShipmentMapAll from './ShipmentMapAll';

// Animations
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Styled Components
const StyledCard = styled(Card)(({ theme, status, viewMode }) => ({
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  borderLeft: `4px solid ${status === 'DELIVERED' ? theme.palette.success.main :
      status === 'IN_TRANSIT' ? theme.palette.info.main :
        status === 'PENDING' ? theme.palette.warning.main :
          status === 'DELAYED' ? theme.palette.error.main :
            status === 'OUT_FOR_DELIVERY' ? theme.palette.primary.main :
              theme.palette.grey[400]
    }`,
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 100% 0%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: viewMode === 'list' ? 'translateX(8px)' : 'translateY(-8px)',
    boxShadow: theme.shadows[12],
    '& .action-buttons': {
      opacity: 1,
      transform: 'translateX(0)',
    },
    '& .card-overlay': {
      opacity: 1,
    },
  },
  '& .action-buttons': {
    opacity: 0,
    transform: 'translateX(10px)',
    transition: 'all 0.3s ease',
  },
  '& .card-overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(180deg, transparent 60%, ${alpha(theme.palette.common.black, 0.02)} 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    borderRadius: theme.spacing(2),
  },
  ...(viewMode === 'list' && {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& .MuiCardContent-root': {
      flex: 1,
      padding: theme.spacing(1, 2),
    },
    '& .card-actions': {
      paddingRight: theme.spacing(2),
    },
  }),
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  background: `linear-gradient(135deg, 
    ${status === 'DELIVERED' ? theme.palette.success.main :
      status === 'IN_TRANSIT' ? theme.palette.info.main :
        status === 'PENDING' ? theme.palette.warning.main :
          status === 'DELAYED' ? theme.palette.error.main :
            status === 'OUT_FOR_DELIVERY' ? theme.palette.primary.main :
              theme.palette.grey[400]} 0%,
    ${status === 'DELIVERED' ? theme.palette.success.dark :
      status === 'IN_TRANSIT' ? theme.palette.info.dark :
        status === 'PENDING' ? theme.palette.warning.dark :
          status === 'DELAYED' ? theme.palette.error.dark :
            status === 'OUT_FOR_DELIVERY' ? theme.palette.primary.dark :
              theme.palette.grey[600]} 100%
  )`,
  color: '#fff',
  padding: theme.spacing(0.5, 1.5),
  height: 28,
  '& .MuiChip-icon': {
    color: '#fff',
    fontSize: 16,
  },
  '&:hover': {
    animation: `${pulseAnimation} 1s ease infinite`,
  },
}));

const StatsCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(2.5),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(color || theme.palette.primary.main, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: theme.shadows[8],
    '& .stat-icon': {
      transform: 'scale(1.2) rotate(10deg)',
    },
  },
  '& .stat-icon': {
    transition: 'all 0.3s ease',
    fontSize: 32,
    marginBottom: theme.spacing(1),
    color: color || theme.palette.primary.main,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle, ${alpha(color || theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
}));

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 320,
    padding: theme.spacing(3),
    background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
    borderRadius: '0',
  },
}));

const ITEMS_PER_PAGE = 6;

const ShipmentList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await shipmentService.getAllShipments();

      let allShipments = [];
      if (Array.isArray(response)) {
        allShipments = response;
      } else if (response && Array.isArray(response.data)) {
        allShipments = response.data;
      } else if (response && typeof response === 'object') {
        allShipments = Array.isArray(response.data) ? response.data : [];
      } else {
        console.error('Unexpected API response format:', response);
        allShipments = [];
      }

      setShipments(allShipments);
      setTotalPages(Math.ceil(allShipments.length / ITEMS_PER_PAGE));
      setPage(1);
    } catch (err) {
      console.error('Error fetching shipments:', err);
      setError(err.message || 'Failed to fetch shipments');
      setShipments([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  // Filter and sort shipments
  const filteredAndSortedShipments = useMemo(() => {
    let result = [...shipments];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(shipment =>
        shipment.trackingNumber?.toLowerCase().includes(term) ||
        shipment.origin?.address?.toLowerCase().includes(term) ||
        shipment.destination?.address?.toLowerCase().includes(term) ||
        shipment.customerName?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'ALL') {
      result = result.filter(shipment => shipment.status === statusFilter);
    }

    result.sort((a, b) => {
      let compareA, compareB;
      switch (sortBy) {
        case 'date':
          compareA = new Date(a.createdAt || a.estimatedDelivery || 0);
          compareB = new Date(b.createdAt || b.estimatedDelivery || 0);
          break;
        case 'status':
          compareA = a.status || '';
          compareB = b.status || '';
          break;
        case 'tracking':
          compareA = a.trackingNumber || '';
          compareB = b.trackingNumber || '';
          break;
        default:
          compareA = a.trackingNumber || '';
          compareB = b.trackingNumber || '';
      }
      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    return result;
  }, [shipments, searchTerm, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredAndSortedShipments.length / ITEMS_PER_PAGE));
    setPage(1);
  }, [filteredAndSortedShipments]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentPageShipments = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedShipments.slice(startIndex, endIndex);
  };

  const handleSeedData = async () => {
    try {
      setSeedLoading(true);
      setSeedSuccess(false);
      await shipmentService.seedDatabase();
      setSeedSuccess(true);
      await fetchShipments();
      setTimeout(() => setSeedSuccess(false), 3000);
    } catch (err) {
      setError('Failed to seed database: ' + (err.message || 'Unknown error'));
    } finally {
      setSeedLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircleIcon />;
      case 'IN_TRANSIT':
        return <LocalShippingIcon />;
      case 'PENDING':
        return <PendingIcon />;
      case 'DELAYED':
        return <CancelIcon />;
      case 'OUT_FOR_DELIVERY':
        return <LocalShippingIcon />;
      default:
        return <InventoryIcon />;
    }
  };

  const getStatusLabel = (status) => {
    return (status || '').replace(/_/g, ' ').toUpperCase();
  };

  const stats = useMemo(() => {
    const total = shipments.length;
    const delivered = shipments.filter(s => s.status === 'DELIVERED').length;
    const inTransit = shipments.filter(s => s.status === 'IN_TRANSIT' || s.status === 'OUT_FOR_DELIVERY').length;
    const pending = shipments.filter(s => s.status === 'PENDING').length;
    const delayed = shipments.filter(s => s.status === 'DELAYED').length;
    const deliveryRate = total > 0 ? Math.round((delivered / total) * 100) : 0;
    return { total, delivered, inTransit, pending, delayed, deliveryRate };
  }, [shipments]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchShipments();
  };

  const handleViewShipment = (shipment) => {
    setSelectedShipment(shipment);
    setDetailDrawerOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setSortBy('date');
    setSortOrder('desc');
  };

  // Loading skeletons
  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="text" width="60%" height={32} sx={{ mt: 2 }} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="70%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Alert
          severity="error"
          sx={{ mb: 2, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={fetchShipments}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!shipments || shipments.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6, md: 8 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 100%)`,
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <InventoryIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
            </Box>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              No Shipments Found
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3, maxWidth: 400 }}>
              Start by creating your first shipment or adding sample data to get started.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ width: '100%', maxWidth: 400 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleSeedData}
                disabled={seedLoading}
                startIcon={seedLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
                sx={{ borderRadius: 2 }}
              >
                {seedLoading ? 'Adding...' : 'Add Sample Shipments'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => navigate('/create')}
                sx={{ borderRadius: 2 }}
              >
                Create New
              </Button>
            </Stack>
            {seedSuccess && (
              <Fade in={seedSuccess}>
                <Alert severity="success" sx={{ mt: 3, maxWidth: 400, borderRadius: 2 }}>
                  Sample shipments added successfully! 🎉
                </Alert>
              </Fade>
            )}
          </Box>
        </Paper>
      </Box>
    );
  }

  const currentShipments = getCurrentPageShipments();

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      {/* Stats Section */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Zoom in={true} timeout={300}>
            <StatsCard color={theme.palette.primary.main}>
              <Box className="stat-icon">📦</Box>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {stats.total}
              </Typography>
              <Typography variant="body2" color="textSecondary">Total Shipments</Typography>
            </StatsCard>
          </Zoom>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Zoom in={true} timeout={400}>
            <StatsCard color={theme.palette.success.main}>
              <Box className="stat-icon">✅</Box>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {stats.delivered}
              </Typography>
              <Typography variant="body2" color="textSecondary">Delivered</Typography>
              <Chip
                label={`${stats.deliveryRate}% Rate`}
                size="small"
                color="success"
                sx={{ mt: 1, fontSize: '0.7rem' }}
              />
            </StatsCard>
          </Zoom>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Zoom in={true} timeout={500}>
            <StatsCard color={theme.palette.info.main}>
              <Box className="stat-icon">🚚</Box>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {stats.inTransit}
              </Typography>
              <Typography variant="body2" color="textSecondary">In Transit</Typography>
            </StatsCard>
          </Zoom>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Zoom in={true} timeout={600}>
            <StatsCard color={theme.palette.warning.main}>
              <Box className="stat-icon">⏳</Box>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {stats.pending}
              </Typography>
              <Typography variant="body2" color="textSecondary">Pending</Typography>
              {stats.delayed > 0 && (
                <Chip
                  label={`${stats.delayed} Delayed`}
                  size="small"
                  color="error"
                  sx={{ mt: 1, fontSize: '0.7rem' }}
                />
              )}
            </StatsCard>
          </Zoom>
        </Grid>
      </Grid>

      {/* Header and Controls */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 1.5 }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
            >
              Shipments
            </Typography>
            <Badge
              badgeContent={filteredAndSortedShipments.length}
              color="primary"
              sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}
            />
            {refreshing && (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            )}
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {!isMobile && (
              <>
                <Tooltip title="Refresh">
                  <IconButton onClick={handleRefresh} color="primary">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Toggle View">
                  <IconButton
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    color="primary"
                  >
                    {viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title="Filters">
              <IconButton
                onClick={() => isMobile ? setFilterDrawerOpen(true) : setShowFilters(!showFilters)}
                color="primary"
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
              sx={{
                whiteSpace: 'nowrap',
                borderRadius: 2,
                flex: { xs: 1, sm: 'none' },
                minWidth: { xs: 'auto', sm: 150 },
              }}
            >
              New Shipment
            </Button>
          </Stack>
        </Stack>

        {/* Filters - Desktop */}
        {!isMobile && (
          <Collapse in={showFilters}>
            <Paper
              sx={{
                p: { xs: 2, md: 3 },
                mt: 2,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by tracking #, address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: searchTerm && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchTerm('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={6} md={2.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="ALL">All Statuses</MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="IN_TRANSIT">In Transit</MenuItem>
                      <MenuItem value="OUT_FOR_DELIVERY">Out for Delivery</MenuItem>
                      <MenuItem value="DELIVERED">Delivered</MenuItem>
                      <MenuItem value="DELAYED">Delayed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={2.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="status">Status</MenuItem>
                      <MenuItem value="tracking">Tracking #</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      sx={{ borderRadius: 2 }}
                    >
                      {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                    </Button>
                    <Button
                      variant="text"
                      onClick={handleClearFilters}
                      sx={{ borderRadius: 2 }}
                    >
                      Clear
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        )}
      </Box>

      {/* Shipments Grid */}
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
        {/* Map Section */}
        {!isMobile && (
          <Grid item xs={12} md={5} sx={{ order: { xs: 2, md: 2 } }}>
            <Paper
              elevation={3}
              sx={{
                height: { xs: 300, sm: 350, md: 450, lg: 500 },
                p: 1,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
              >
                {filteredAndSortedShipments.length} shipments
              </Typography>
              <ShipmentMapAll shipments={filteredAndSortedShipments} />
            </Paper>
          </Grid>
        )}

        {/* Shipment List */}
        <Grid item xs={12} md={isMobile ? 12 : 7} sx={{ order: { xs: 1, md: 1 } }}>
          {currentShipments.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h6" color="textSecondary">
                No shipments match your filters
              </Typography>
              <Button
                variant="text"
                onClick={handleClearFilters}
                sx={{ mt: 1 }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 2 }}>
              {currentShipments.map((shipment, index) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === 'list' ? 12 : 6}
                  key={shipment.trackingNumber || shipment._id || index}
                >
                  <Slide
                    in={true}
                    direction="up"
                    timeout={300 + (index * 50)}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <StyledCard
                      status={shipment.status}
                      viewMode={viewMode}
                      variant="outlined"
                      onClick={() => navigate(`/tracking/${shipment.trackingNumber}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <div className="card-overlay" />

                      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Tracking #
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                color: 'primary.main',
                              }}
                            >
                              {shipment.trackingNumber}
                            </Typography>
                          </Box>
                          <StatusChip
                            icon={getStatusIcon(shipment.status)}
                            label={getStatusLabel(shipment.status)}
                            status={shipment.status}
                            size="small"
                          />
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Stack spacing={0.75}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                            <Typography
                              variant="body2"
                              noWrap
                              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                            >
                              From: {shipment.origin?.address || 'N/A'}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                            <Typography
                              variant="body2"
                              noWrap
                              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                            >
                              To: {shipment.destination?.address || 'N/A'}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                            <Typography
                              variant="body2"
                              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                            >
                              Est: {shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : 'N/A'}
                            </Typography>
                          </Box>
                          {shipment.customerName && (
                            <Typography variant="caption" color="textSecondary">
                              Customer: {shipment.customerName}
                            </Typography>
                          )}
                        </Stack>

                        {/* Quick Action Buttons */}
                        <Box
                          className="action-buttons"
                          sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 0.5,
                          }}
                        >
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewShipment(shipment);
                              }}
                              sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
                              }}
                            >
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Track Now">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/tracking/${shipment.trackingNumber}`);
                              }}
                              sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
                              }}
                            >
                              <ArrowUpwardIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {filteredAndSortedShipments.length > ITEMS_PER_PAGE && (
            <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Typography variant="body2" color="textSecondary">
                Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filteredAndSortedShipments.length)} -{' '}
                {Math.min(page * ITEMS_PER_PAGE, filteredAndSortedShipments.length)} of{' '}
                {filteredAndSortedShipments.length} shipments
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>

      {/* Mobile Floating Action Button */}
      {isMobile && (
        <SpeedDial
          ariaLabel="Shipment Actions"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle="New Shipment"
            onClick={() => navigate('/create')}
          />
          <SpeedDialAction
            icon={<RefreshIcon />}
            tooltipTitle="Refresh"
            onClick={handleRefresh}
          />
          <SpeedDialAction
            icon={viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
            tooltipTitle={`Switch to ${viewMode === 'grid' ? 'List' : 'Grid'} View`}
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          />
          <SpeedDialAction
            icon={<FilterListIcon />}
            tooltipTitle="Filters"
            onClick={() => setFilterDrawerOpen(true)}
          />
        </SpeedDial>
      )}

      {/* Mobile Filter Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        onOpen={() => setFilterDrawerOpen(true)}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 3,
            maxHeight: '80vh',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <TextField
          fullWidth
          size="medium"
          placeholder="Search shipments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth size="medium" sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="ALL">All Statuses</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN_TRANSIT">In Transit</MenuItem>
            <MenuItem value="OUT_FOR_DELIVERY">Out for Delivery</MenuItem>
            <MenuItem value="DELIVERED">Delivered</MenuItem>
            <MenuItem value="DELAYED">Delayed</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="medium" sx={{ mb: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="tracking">Tracking #</MenuItem>
          </Select>
        </FormControl>

        <Button
          fullWidth
          variant="outlined"
          startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          sx={{ mb: 2 }}
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setFilterDrawerOpen(false);
              setShowFilters(false);
            }}
          >
            Apply Filters
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
        </Stack>
      </SwipeableDrawer>

      {/* Shipment Detail Drawer */}
      <Drawer
        anchor="right"
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            padding: 3,
            borderTopLeftRadius: { xs: 0, sm: 20 },
            borderBottomLeftRadius: { xs: 0, sm: 20 },
          },
        }}
      >
        {selectedShipment && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold">Shipment Details</Typography>
              <IconButton onClick={() => setDetailDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box mb={2}>
              <Typography variant="caption" color="textSecondary">Tracking Number</Typography>
              <Typography variant="h6" fontWeight="bold">{selectedShipment.trackingNumber}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="caption" color="textSecondary">Status</Typography>
              <Box mt={0.5}>
                <StatusChip
                  icon={getStatusIcon(selectedShipment.status)}
                  label={getStatusLabel(selectedShipment.status)}
                  status={selectedShipment.status}
                />
              </Box>
            </Box>

            <Box mb={2}>
              <Typography variant="caption" color="textSecondary">Origin</Typography>
              <Typography variant="body1">{selectedShipment.origin?.address || 'N/A'}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="caption" color="textSecondary">Destination</Typography>
              <Typography variant="body1">{selectedShipment.destination?.address || 'N/A'}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="caption" color="textSecondary">Estimated Delivery</Typography>
              <Typography variant="body1">
                {selectedShipment.estimatedDelivery ? new Date(selectedShipment.estimatedDelivery).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>

            {selectedShipment.customerName && (
              <Box mb={2}>
                <Typography variant="caption" color="textSecondary">Customer</Typography>
                <Typography variant="body1">{selectedShipment.customerName}</Typography>
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                setDetailDrawerOpen(false);
                navigate(`/tracking/${selectedShipment.trackingNumber}`);
              }}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Track Shipment
            </Button>
          </>
        )}
      </Drawer>
    </Box>
  );
};

export default ShipmentList;