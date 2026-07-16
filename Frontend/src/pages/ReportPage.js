import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
    Divider,
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
    Fade,
    Slide,
    Zoom,
    Stack,
    alpha,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    CircularProgress,
    Skeleton,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Switch,
    FormControlLabel,
    useScrollTrigger,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Download,
    Refresh,
    FilterList,
    Print,
    Share,
    DateRange,
    LocalShipping,
    CheckCircle,
    Warning,
    Error,
    Schedule,
    Assessment,
    BarChart as BarChartIcon,
    PieChart as PieChartIcon,
    FileDownload,
    Dashboard,
    TableChart,
    Timeline,
    CompareArrows,
    Settings,
    Fullscreen,
    FullscreenExit,
    Close,
    FilterAlt,
    CalendarToday,
    DownloadForOffline,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';

// Animations
const pulseAnimation = keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
`;

const slideInAnimation = keyframes`
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`;

// Mock data for charts
const monthlyData = [
    { month: 'Jan', shipments: 65, delivered: 58, pending: 7, revenue: 4500 },
    { month: 'Feb', shipments: 78, delivered: 70, pending: 8, revenue: 5200 },
    { month: 'Mar', shipments: 90, delivered: 82, pending: 8, revenue: 6100 },
    { month: 'Apr', shipments: 85, delivered: 76, pending: 9, revenue: 5800 },
    { month: 'May', shipments: 95, delivered: 88, pending: 7, revenue: 6700 },
    { month: 'Jun', shipments: 110, delivered: 100, pending: 10, revenue: 7500 },
    { month: 'Jul', shipments: 120, delivered: 108, pending: 12, revenue: 8200 },
    { month: 'Aug', shipments: 115, delivered: 105, pending: 10, revenue: 7900 },
    { month: 'Sep', shipments: 130, delivered: 118, pending: 12, revenue: 8900 },
    { month: 'Oct', shipments: 140, delivered: 128, pending: 12, revenue: 9500 },
    { month: 'Nov', shipments: 150, delivered: 135, pending: 15, revenue: 10200 },
    { month: 'Dec', shipments: 160, delivered: 145, pending: 15, revenue: 11500 },
];

const statusData = [
    { name: 'Delivered', value: 65, color: '#4CAF50' },
    { name: 'In Transit', value: 20, color: '#2196F3' },
    { name: 'Pending', value: 10, color: '#FF9800' },
    { name: 'Delayed', value: 3, color: '#F44336' },
    { name: 'Cancelled', value: 2, color: '#9E9E9E' },
];

const weeklyData = [
    { day: 'Mon', delivered: 45, shipped: 52, revenue: 1200 },
    { day: 'Tue', delivered: 52, shipped: 58, revenue: 1400 },
    { day: 'Wed', delivered: 48, shipped: 55, revenue: 1300 },
    { day: 'Thu', delivered: 55, shipped: 60, revenue: 1500 },
    { day: 'Fri', delivered: 60, shipped: 65, revenue: 1600 },
    { day: 'Sat', delivered: 35, shipped: 40, revenue: 900 },
    { day: 'Sun', delivered: 25, shipped: 30, revenue: 700 },
];

const performanceData = [
    { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
    { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
    { subject: 'Cost', A: 86, B: 130, fullMark: 150 },
    { subject: 'Coverage', A: 99, B: 100, fullMark: 150 },
    { subject: 'Support', A: 85, B: 90, fullMark: 150 },
    { subject: 'Satisfaction', A: 65, B: 85, fullMark: 150 },
];

// Styled Components
const StatCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        '&::before': {
            opacity: 1,
        },
    },
}));

const ChartCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    height: '100%',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    },
}));

const FilterDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: 320,
        padding: theme.spacing(3),
        borderRadius: '16px 0 0 16px',
    },
}));

// Recent Shipments Data
const recentShipments = [
    { id: 1, tracking: 'SHIP-2024-001', customer: 'John Doe', status: 'Delivered', date: '2024-01-15', amount: '$45.00', location: 'New York' },
    { id: 2, tracking: 'SHIP-2024-002', customer: 'Jane Smith', status: 'In Transit', date: '2024-01-14', amount: '$78.50', location: 'Los Angeles' },
    { id: 3, tracking: 'SHIP-2024-003', customer: 'Bob Johnson', status: 'Pending', date: '2024-01-13', amount: '$120.00', location: 'Chicago' },
    { id: 4, tracking: 'SHIP-2024-004', customer: 'Alice Brown', status: 'Delayed', date: '2024-01-12', amount: '$67.25', location: 'Houston' },
    { id: 5, tracking: 'SHIP-2024-005', customer: 'Charlie Wilson', status: 'Delivered', date: '2024-01-11', amount: '$92.00', location: 'Miami' },
    { id: 6, tracking: 'SHIP-2024-006', customer: 'Eva Martinez', status: 'In Transit', date: '2024-01-10', amount: '$150.00', location: 'Seattle' },
    { id: 7, tracking: 'SHIP-2024-007', customer: 'David Lee', status: 'Delivered', date: '2024-01-09', amount: '$34.50', location: 'Boston' },
    { id: 8, tracking: 'SHIP-2024-008', customer: 'Sarah Taylor', status: 'Cancelled', date: '2024-01-08', amount: '$210.00', location: 'Denver' },
];

const getStatusColor = (status) => {
    const colors = {
        'Delivered': '#4CAF50',
        'In Transit': '#2196F3',
        'Pending': '#FF9800',
        'Delayed': '#F44336',
        'Cancelled': '#9E9E9E',
    };
    return colors[status] || '#9E9E9E';
};

const getStatusIcon = (status) => {
    const icons = {
        'Delivered': <CheckCircle sx={{ fontSize: 16 }} />,
        'In Transit': <LocalShipping sx={{ fontSize: 16 }} />,
        'Pending': <Schedule sx={{ fontSize: 16 }} />,
        'Delayed': <Warning sx={{ fontSize: 16 }} />,
        'Cancelled': <Error sx={{ fontSize: 16 }} />,
    };
    return icons[status] || <Schedule sx={{ fontSize: 16 }} />;
};

const ReportPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate = useNavigate();

    const [timeRange, setTimeRange] = useState('year');
    const [chartType, setChartType] = useState('bar');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [showRevenue, setShowRevenue] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // grid, table

    // Stats with animated values
    const stats = [
        {
            title: 'Total Shipments',
            value: '1,234',
            change: '+12.5%',
            trend: 'up',
            icon: <LocalShipping />,
            color: '#2196F3',
            subtitle: 'Last 30 days',
        },
        {
            title: 'Delivered',
            value: '1,080',
            change: '+8.3%',
            trend: 'up',
            icon: <CheckCircle />,
            color: '#4CAF50',
            subtitle: '87.5% success rate',
        },
        {
            title: 'Pending',
            value: '94',
            change: '-2.1%',
            trend: 'down',
            icon: <Schedule />,
            color: '#FF9800',
            subtitle: '7.6% of total',
        },
        {
            title: 'Delayed',
            value: '28',
            change: '+5.7%',
            trend: 'up',
            icon: <Warning />,
            color: '#F44336',
            subtitle: '2.3% of total',
        },
    ];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, [timeRange, chartType]);

    const handleExport = useCallback(() => {
        setExporting(true);
        setTimeout(() => {
            setExporting(false);
            alert('📊 Report exported successfully!');
        }, 1500);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // Custom Tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: 3, minWidth: 150 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                        {label}
                    </Typography>
                    {payload.map((entry, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ color: entry.color }}>
                                {entry.name}:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {entry.value}
                            </Typography>
                        </Box>
                    ))}
                </Paper>
            );
        }
        return null;
    };

    // Skeleton loader for charts
    const ChartSkeleton = () => (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton variant="rectangular" width="100%" height="85%" sx={{ borderRadius: 2 }} />
            <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
        </Box>
    );

    // Mobile view - compact stats
    const renderMobileStats = () => (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {stats.map((stat, index) => (
                <Grid item xs={6} key={index}>
                    <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                        <StatCard>
                            <CardContent sx={{ p: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(stat.color, 0.1), color: stat.color }}>
                                        {stat.icon}
                                    </Avatar>
                                    <Typography variant="caption" color="text.secondary" noWrap>
                                        {stat.title}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {stat.value}
                                </Typography>
                                <Chip
                                    label={stat.change}
                                    size="small"
                                    icon={stat.trend === 'up' ? <TrendingUp sx={{ fontSize: 12 }} /> : <TrendingDown sx={{ fontSize: 12 }} />}
                                    sx={{
                                        mt: 0.5,
                                        height: 20,
                                        fontSize: '0.65rem',
                                        bgcolor: stat.trend === 'up' ? alpha('#4CAF50', 0.1) : alpha('#F44336', 0.1),
                                        color: stat.trend === 'up' ? '#4CAF50' : '#F44336',
                                    }}
                                />
                            </CardContent>
                        </StatCard>
                    </Zoom>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Box sx={{ py: { xs: 2, sm: 3, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                {/* Header */}
                <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                    <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            flexWrap: 'wrap',
                            gap: 2
                        }}>
                            <Box>
                                <Typography
                                    variant={isMobile ? "h5" : "h4"}
                                    component="h1"
                                    fontWeight="bold"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Assessment sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 30 } }} />
                                    Reports & Analytics
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Monitor your shipment performance and track key metrics
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                flexWrap: 'wrap',
                                width: { xs: '100%', sm: 'auto' },
                            }}>
                                <Tooltip title="Export Report">
                                    <Button
                                        variant="outlined"
                                        size={isMobile ? "small" : "medium"}
                                        startIcon={exporting ? <CircularProgress size={20} /> : <FileDownload />}
                                        onClick={handleExport}
                                        disabled={exporting}
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            flex: { xs: 1, sm: 'none' },
                                        }}
                                    >
                                        {exporting ? 'Exporting...' : isMobile ? '' : 'Export'}
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Filter">
                                    <IconButton
                                        onClick={() => setFilterOpen(true)}
                                        sx={{
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            borderRadius: '12px',
                                        }}
                                    >
                                        <Badge color="primary" variant="dot">
                                            <FilterList />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Refresh Data">
                                    <IconButton
                                        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }}
                                        sx={{ border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, borderRadius: '12px' }}
                                    >
                                        <Refresh />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                                    <IconButton
                                        onClick={toggleFullscreen}
                                        sx={{ border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, borderRadius: '12px' }}
                                    >
                                        {fullscreen ? <FullscreenExit /> : <Fullscreen />}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Slide>

                {/* Stats Cards - Responsive */}
                {isMobile ? renderMobileStats() : (
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <StatCard>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {stat.title}
                                                    </Typography>
                                                    <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                                        {stat.value}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                        <Chip
                                                            label={stat.change}
                                                            size="small"
                                                            icon={stat.trend === 'up' ? <TrendingUp sx={{ fontSize: 14 }} /> : <TrendingDown sx={{ fontSize: 14 }} />}
                                                            sx={{
                                                                bgcolor: stat.trend === 'up' ? alpha('#4CAF50', 0.1) : alpha('#F44336', 0.1),
                                                                color: stat.trend === 'up' ? '#4CAF50' : '#F44336',
                                                                fontWeight: 600,
                                                                '& .MuiChip-icon': { color: 'inherit' },
                                                            }}
                                                        />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {stat.subtitle}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: alpha(stat.color, 0.1),
                                                        color: stat.color,
                                                        width: 48,
                                                        height: 48,
                                                    }}
                                                >
                                                    {stat.icon}
                                                </Avatar>
                                            </Box>
                                        </CardContent>
                                    </StatCard>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Filters - Responsive */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}>
                        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
                            <InputLabel>Time Range</InputLabel>
                            <Select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                label="Time Range"
                                sx={{ borderRadius: '12px' }}
                            >
                                <MenuItem value="week">This Week</MenuItem>
                                <MenuItem value="month">This Month</MenuItem>
                                <MenuItem value="quarter">This Quarter</MenuItem>
                                <MenuItem value="year">This Year</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
                            <InputLabel>Chart Type</InputLabel>
                            <Select
                                value={chartType}
                                onChange={(e) => setChartType(e.target.value)}
                                label="Chart Type"
                                sx={{ borderRadius: '12px' }}
                            >
                                <MenuItem value="bar">Bar Chart</MenuItem>
                                <MenuItem value="line">Line Chart</MenuItem>
                                <MenuItem value="area">Area Chart</MenuItem>
                                <MenuItem value="radar">Radar Chart</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showRevenue}
                                    onChange={(e) => setShowRevenue(e.target.checked)}
                                    color="primary"
                                    size="small"
                                />
                            }
                            label="Show Revenue"
                            sx={{ ml: { xs: 0, sm: 1 } }}
                        />
                    </Box>
                    <Chip
                        icon={<DateRange />}
                        label={`Last 12 months`}
                        variant="outlined"
                        sx={{ borderRadius: '12px', alignSelf: { xs: 'flex-start', sm: 'center' } }}
                    />
                </Box>

                {/* Main Charts - Responsive */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Shipment Trends */}
                    <Grid item xs={12} lg={8}>
                        <Fade in={true} timeout={800}>
                            <ChartCard>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'space-between',
                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                    mb: 2,
                                    gap: 1,
                                }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Shipment Trends
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip
                                            size="small"
                                            label={showRevenue ? "With Revenue" : "Shipments Only"}
                                            color={showRevenue ? "primary" : "default"}
                                            onClick={() => setShowRevenue(!showRevenue)}
                                            sx={{ borderRadius: '12px' }}
                                        />
                                        <Tooltip title="View Details">
                                            <IconButton size="small">
                                                <BarChartIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
                                    {loading ? (
                                        <ChartSkeleton />
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            {chartType === 'bar' ? (
                                                <BarChart data={monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                                                    <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                    <Bar dataKey="shipments" fill="#2196F3" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="delivered" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="pending" fill="#FF9800" radius={[4, 4, 0, 0]} />
                                                    {showRevenue && (
                                                        <Bar dataKey="revenue" fill="#9C27B0" radius={[4, 4, 0, 0]} />
                                                    )}
                                                </BarChart>
                                            ) : chartType === 'line' ? (
                                                <LineChart data={monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                                                    <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="shipments" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} />
                                                    <Line type="monotone" dataKey="delivered" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} />
                                                    <Line type="monotone" dataKey="pending" stroke="#FF9800" strokeWidth={2} dot={{ r: 4 }} />
                                                    {showRevenue && (
                                                        <Line type="monotone" dataKey="revenue" stroke="#9C27B0" strokeWidth={2} dot={{ r: 4 }} />
                                                    )}
                                                </LineChart>
                                            ) : chartType === 'radar' ? (
                                                <RadarChart data={performanceData}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                                    <Radar name="Current" dataKey="A" stroke="#2196F3" fill={alpha('#2196F3', 0.3)} />
                                                    <Radar name="Target" dataKey="B" stroke="#4CAF50" fill={alpha('#4CAF50', 0.3)} />
                                                    <Legend />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                </RadarChart>
                                            ) : (
                                                <AreaChart data={monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                                                    <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                    <RechartsTooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                    <Area type="monotone" dataKey="shipments" stackId="1" stroke="#2196F3" fill={alpha('#2196F3', 0.3)} />
                                                    <Area type="monotone" dataKey="delivered" stackId="1" stroke="#4CAF50" fill={alpha('#4CAF50', 0.3)} />
                                                    <Area type="monotone" dataKey="pending" stackId="1" stroke="#FF9800" fill={alpha('#FF9800', 0.3)} />
                                                    {showRevenue && (
                                                        <Area type="monotone" dataKey="revenue" stackId="2" stroke="#9C27B0" fill={alpha('#9C27B0', 0.3)} />
                                                    )}
                                                </AreaChart>
                                            )}
                                        </ResponsiveContainer>
                                    )}
                                </Box>
                            </ChartCard>
                        </Fade>
                    </Grid>

                    {/* Status Distribution */}
                    <Grid item xs={12} md={4}>
                        <Fade in={true} timeout={1000}>
                            <ChartCard>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Status Distribution
                                    </Typography>
                                    <Tooltip title="View Details">
                                        <IconButton size="small">
                                            <PieChartIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
                                    {loading ? (
                                        <ChartSkeleton />
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={statusData}
                                                    cx="50%"
                                                    cy="45%"
                                                    innerRadius={isMobile ? 40 : 60}
                                                    outerRadius={isMobile ? 70 : 100}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                >
                                                    {statusData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <RechartsTooltip content={<CustomTooltip />} />
                                                <Legend
                                                    layout={isMobile ? "horizontal" : "vertical"}
                                                    verticalAlign={isMobile ? "bottom" : "bottom"}
                                                    align={isMobile ? "center" : "center"}
                                                    formatter={(value) => <span style={{ fontSize: isMobile ? 10 : 12 }}>{value}</span>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    )}
                                </Box>
                            </ChartCard>
                        </Fade>
                    </Grid>
                </Grid>

                {/* Weekly Performance */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12}>
                        <Fade in={true} timeout={1200}>
                            <ChartCard>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'space-between',
                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                    mb: 2,
                                    gap: 1,
                                }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Weekly Performance
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip
                                            label="This Week"
                                            size="small"
                                            color="primary"
                                            sx={{ borderRadius: '12px' }}
                                        />
                                        <Chip
                                            label="Compare"
                                            size="small"
                                            variant="outlined"
                                            icon={<CompareArrows />}
                                            sx={{ borderRadius: '12px' }}
                                        />
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ height: { xs: 200, sm: 250, md: 300 } }}>
                                    {loading ? (
                                        <ChartSkeleton />
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={weeklyData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                                                <XAxis dataKey="day" tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                <RechartsTooltip content={<CustomTooltip />} />
                                                <Legend />
                                                <Bar dataKey="delivered" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="shipped" fill="#2196F3" radius={[4, 4, 0, 0]} />
                                                {showRevenue && (
                                                    <Bar dataKey="revenue" fill="#9C27B0" radius={[4, 4, 0, 0]} />
                                                )}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </Box>
                            </ChartCard>
                        </Fade>
                    </Grid>
                </Grid>

                {/* Recent Shipments Table - Responsive */}
                <Fade in={true} timeout={1400}>
                    <Paper
                        sx={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                        }}
                    >
                        <Box sx={{
                            p: { xs: 2, sm: 3 },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            flexWrap: 'wrap',
                            gap: 2
                        }}>
                            <Typography variant="h6" fontWeight="bold">
                                Recent Shipments
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Visibility />}
                                    onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                                    sx={{ borderRadius: '12px', textTransform: 'none' }}
                                >
                                    {viewMode === 'grid' ? 'Table View' : 'Grid View'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => navigate('/track')}
                                    sx={{ borderRadius: '12px', textTransform: 'none' }}
                                >
                                    View All
                                </Button>
                            </Box>
                        </Box>
                        <Divider />

                        {viewMode === 'grid' && isMobile ? (
                            // Mobile Grid View
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {recentShipments
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((shipment) => (
                                            <Grid item xs={12} key={shipment.id}>
                                                <Card
                                                    sx={{
                                                        borderRadius: '12px',
                                                        cursor: 'pointer',
                                                        '&:hover': { boxShadow: 6 },
                                                    }}
                                                    onClick={() => navigate(`/tracking/${shipment.tracking}`)}
                                                >
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                            <Box>
                                                                <Typography variant="body2" fontWeight="bold">
                                                                    {shipment.tracking}
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {shipment.customer}
                                                                </Typography>
                                                            </Box>
                                                            <Chip
                                                                icon={getStatusIcon(shipment.status)}
                                                                label={shipment.status}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: alpha(getStatusColor(shipment.status), 0.1),
                                                                    color: getStatusColor(shipment.status),
                                                                    fontWeight: 600,
                                                                    '& .MuiChip-icon': { color: 'inherit' },
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {shipment.date}
                                                            </Typography>
                                                            <Typography variant="body2" fontWeight="bold">
                                                                {shipment.amount}
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>
                        ) : (
                            // Table View
                            <TableContainer>
                                <Table size={isMobile ? "small" : "medium"}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
                                            <TableCell sx={{ fontWeight: 600 }}>Tracking #</TableCell>
                                            {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>}
                                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                            {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>}
                                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentShipments
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((shipment) => (
                                                <TableRow
                                                    key={shipment.id}
                                                    sx={{
                                                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => navigate(`/tracking/${shipment.tracking}`)}
                                                >
                                                    <TableCell>
                                                        <Typography variant="body2" fontWeight="500" noWrap>
                                                            {shipment.tracking}
                                                        </Typography>
                                                    </TableCell>
                                                    {!isMobile && <TableCell>{shipment.customer}</TableCell>}
                                                    <TableCell>
                                                        <Chip
                                                            icon={getStatusIcon(shipment.status)}
                                                            label={shipment.status}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: alpha(getStatusColor(shipment.status), 0.1),
                                                                color: getStatusColor(shipment.status),
                                                                fontWeight: 600,
                                                                '& .MuiChip-icon': { color: 'inherit' },
                                                                fontSize: isMobile ? '0.65rem' : '0.75rem',
                                                            }}
                                                        />
                                                    </TableCell>
                                                    {!isMobile && <TableCell>{shipment.location}</TableCell>}
                                                    <TableCell>{shipment.date}</TableCell>
                                                    <TableCell align="right" fontWeight="500">
                                                        {shipment.amount}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={recentShipments.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                '& .MuiTablePagination-select': {
                                    fontSize: isMobile ? '0.8rem' : '1rem',
                                },
                                '& .MuiTablePagination-displayedRows': {
                                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                                },
                            }}
                        />
                    </Paper>
                </Fade>
            </Container>

            {/* Filter Drawer */}
            <FilterDrawer
                anchor="right"
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        <FilterAlt sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Filters
                    </Typography>
                    <IconButton onClick={() => setFilterOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <List>
                    <ListItem>
                        <ListItemIcon><CalendarToday /></ListItemIcon>
                        <ListItemText
                            primary="Date Range"
                            secondary={
                                <FormControl size="small" fullWidth sx={{ mt: 1 }}>
                                    <Select
                                        value={timeRange}
                                        onChange={(e) => setTimeRange(e.target.value)}
                                    >
                                        <MenuItem value="week">This Week</MenuItem>
                                        <MenuItem value="month">This Month</MenuItem>
                                        <MenuItem value="quarter">This Quarter</MenuItem>
                                        <MenuItem value="year">This Year</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BarChartIcon /></ListItemIcon>
                        <ListItemText
                            primary="Chart Type"
                            secondary={
                                <FormControl size="small" fullWidth sx={{ mt: 1 }}>
                                    <Select
                                        value={chartType}
                                        onChange={(e) => setChartType(e.target.value)}
                                    >
                                        <MenuItem value="bar">Bar Chart</MenuItem>
                                        <MenuItem value="line">Line Chart</MenuItem>
                                        <MenuItem value="area">Area Chart</MenuItem>
                                        <MenuItem value="radar">Radar Chart</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Visibility /></ListItemIcon>
                        <ListItemText
                            primary="Show Revenue"
                            secondary={
                                <Switch
                                    checked={showRevenue}
                                    onChange={(e) => setShowRevenue(e.target.checked)}
                                    color="primary"
                                    sx={{ mt: 1 }}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><TableChart /></ListItemIcon>
                        <ListItemText
                            primary="View Mode"
                            secondary={
                                <FormControl size="small" fullWidth sx={{ mt: 1 }}>
                                    <Select
                                        value={viewMode}
                                        onChange={(e) => setViewMode(e.target.value)}
                                    >
                                        <MenuItem value="grid">Grid View</MenuItem>
                                        <MenuItem value="table">Table View</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                        />
                    </ListItem>
                </List>

                <Box sx={{ p: 2, mt: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setFilterOpen(false)}
                        sx={{ borderRadius: '12px' }}
                    >
                        Apply Filters
                    </Button>
                </Box>
            </FilterDrawer>
        </Box>
    );
};

export default ReportPage;