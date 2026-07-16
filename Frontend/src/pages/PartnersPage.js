import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Paper,
    Chip,
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
    Divider,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Badge,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
    Business,
    People,
    LocationOn,
    Phone,
    Email,
    Language,
    Star,
    StarBorder,
    Verified,
    TrendingUp,
    Security,
    Support,
    Analytics,
    IntegrationInstructions,
    CloudSync,
    Api,
    WhatsApp,
    LinkedIn,
    Twitter,
    Facebook,
    Share,
    Favorite,
    FavoriteBorder,
    Add,
    CheckCircle,
    ArrowForward,
    Download,
    Send,
    ContactSupport,
    WorkspacePremium,
    Public,
    AttachMoney,
    Speed,
    Shield,
    HeadsetMic,
} from '@mui/icons-material';

// Animations
const floatAnimation = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;

const shimmerAnimation = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
    borderRadius: '20px',
    padding: theme.spacing(6, 4),
    marginBottom: theme.spacing(6),
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4, 2),
    },
}));

const PartnerCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: '16px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        borderColor: theme.palette.primary.main,
    },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    textAlign: 'center',
    height: '100%',
    transition: 'all 0.3s ease',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
    },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    height: '100%',
    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    },
}));

// Mock Partners Data
const partners = [
    {
        id: 1,
        name: 'Global Logistics Inc.',
        description: 'Leading logistics provider with operations in 50+ countries',
        category: 'Logistics',
        location: 'New York, USA',
        rating: 4.8,
        reviews: 234,
        image: '/images/partner-1.jpg',
        website: 'https://globallogistics.com',
        email: 'partner@globallogistics.com',
        phone: '+1 (555) 123-4567',
        specialties: ['International Shipping', 'Warehousing', 'Supply Chain'],
        since: '2023',
        verified: true,
        featured: true,
    },
    {
        id: 2,
        name: 'TechShip Solutions',
        description: 'Innovative shipping technology platform for e-commerce',
        category: 'Technology',
        location: 'San Francisco, USA',
        rating: 4.9,
        reviews: 189,
        image: '/images/partner-2.jpg',
        website: 'https://techship.com',
        email: 'hello@techship.com',
        phone: '+1 (555) 987-6543',
        specialties: ['API Integration', 'Automation', 'Analytics'],
        since: '2023',
        verified: true,
        featured: true,
    },
    {
        id: 3,
        name: 'Express Delivery Co.',
        description: 'Fast and reliable last-mile delivery services',
        category: 'Delivery',
        location: 'London, UK',
        rating: 4.7,
        reviews: 156,
        image: '/images/partner-3.jpg',
        website: 'https://expressdelivery.com',
        email: 'info@expressdelivery.com',
        phone: '+44 20 1234 5678',
        specialties: ['Same-Day Delivery', 'Route Optimization', 'Fleet Management'],
        since: '2024',
        verified: true,
        featured: false,
    },
    {
        id: 4,
        name: 'SmartTrack Systems',
        description: 'Advanced tracking and monitoring solutions',
        category: 'Technology',
        location: 'Singapore',
        rating: 4.6,
        reviews: 98,
        image: '/images/partner-4.jpg',
        website: 'https://smarttrack.com',
        email: 'contact@smarttrack.com',
        phone: '+65 1234 5678',
        specialties: ['IoT Tracking', 'Real-Time Monitoring', 'Data Analytics'],
        since: '2023',
        verified: true,
        featured: false,
    },
    {
        id: 5,
        name: 'Green Logistics',
        description: 'Eco-friendly shipping solutions with carbon offset',
        category: 'Logistics',
        location: 'Berlin, Germany',
        rating: 4.5,
        reviews: 76,
        image: '/images/partner-5.jpg',
        website: 'https://greenlogistics.com',
        email: 'eco@greenlogistics.com',
        phone: '+49 30 1234 5678',
        specialties: ['Eco-Friendly Shipping', 'Carbon Offset', 'Sustainable Packaging'],
        since: '2024',
        verified: false,
        featured: false,
    },
    {
        id: 6,
        name: 'CrossBorder Logistics',
        description: 'Specialized in cross-border shipping and customs clearance',
        category: 'Logistics',
        location: 'Dubai, UAE',
        rating: 4.4,
        reviews: 54,
        image: '/images/partner-6.jpg',
        website: 'https://crossborder.com',
        email: 'info@crossborder.com',
        phone: '+971 4 123 4567',
        specialties: ['Customs Clearance', 'Cross-Border Shipping', 'Trade Compliance'],
        since: '2024',
        verified: false,
        featured: false,
    },
];

// Benefits Data
const benefits = [
    {
        icon: <TrendingUp />,
        title: 'Grow Your Business',
        description: 'Access new markets and expand your customer base with our global network.',
        color: '#4CAF50',
    },
    {
        icon: <Security />,
        title: 'Secure Platform',
        description: 'Enterprise-grade security and compliance standards to protect your data.',
        color: '#2196F3',
    },
    {
        icon: <Support />,
        title: '24/7 Dedicated Support',
        description: 'Priority support with dedicated account managers for partners.',
        color: '#FF9800',
    },
    {
        icon: <Analytics />,
        title: 'Advanced Analytics',
        description: 'Detailed insights and analytics to optimize your shipping operations.',
        color: '#9C27B0',
    },
    {
        icon: <IntegrationInstructions />,
        title: 'Easy Integration',
        description: 'Seamless API integration with your existing systems and workflows.',
        color: '#E91E63',
    },
    {
        icon: <CloudSync />,
        title: 'Real-Time Sync',
        description: 'Stay updated with real-time synchronization across all platforms.',
        color: '#00BCD4',
    },
];

// Testimonials
const testimonials = [
    {
        id: 1,
        name: 'Michael Chen',
        role: 'CEO, Global Logistics Inc.',
        content: 'Partnering with ShipmentTracker has transformed our business. Their platform is intuitive, reliable, and our customers love the real-time tracking features.',
        avatar: '/images/avatar-1.jpg',
        rating: 5,
        company: 'Global Logistics Inc.',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        role: 'CTO, TechShip Solutions',
        content: 'The API integration was seamless and the support team was exceptional. We\'ve seen a 40% increase in customer satisfaction since integrating their tracking.',
        avatar: '/images/avatar-2.jpg',
        rating: 5,
        company: 'TechShip Solutions',
    },
    {
        id: 3,
        name: 'David Patel',
        role: 'Operations Director, Express Delivery Co.',
        content: 'The analytics dashboard gives us unprecedented visibility into our operations. We\'ve optimized our routes and reduced delivery times by 25%.',
        avatar: '/images/avatar-3.jpg',
        rating: 4,
        company: 'Express Delivery Co.',
    },
];

// Categories for filtering
const categories = ['All', 'Logistics', 'Technology', 'Delivery', 'Supply Chain'];

const PartnersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [tabValue, setTabValue] = useState(0);
    const [hoveredPartner, setHoveredPartner] = useState(null);

    const filteredPartners = partners.filter(partner => {
        const matchesCategory = filter === 'All' || partner.category === filter;
        const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredPartners = partners.filter(p => p.featured);
    const verifiedPartners = partners.filter(p => p.verified);

    const handleFavoriteToggle = (partnerId) => {
        setFavorites(prev =>
            prev.includes(partnerId)
                ? prev.filter(id => id !== partnerId)
                : [...prev, partnerId]
        );
        const isFavorite = favorites.includes(partnerId);
        setSnackbar({
            open: true,
            message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
            severity: 'success',
        });
    };

    const handlePartnerClick = (partner) => {
        setSelectedPartner(partner);
        setDialogOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const renderStars = (rating) => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        sx={{
                            fontSize: 16,
                            color: star <= rating ? '#FFB300' : alpha('#FFB300', 0.3),
                        }}
                    />
                ))}
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                    ({rating})
                </Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="xl">
                {/* Hero Section */}
                <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                    <HeroSection>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} lg={7}>
                                <Box>
                                    <Chip
                                        label="🤝 Partner Program"
                                        size="small"
                                        sx={{
                                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                            mb: 2,
                                            borderRadius: '20px',
                                        }}
                                    />
                                    <Typography
                                        variant="h3"
                                        component="h1"
                                        gutterBottom
                                        color="common.white"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Become a <Box component="span" sx={{ color: theme.palette.primary.light }}>
                                            Trusted Partner
                                        </Box>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="grey.400"
                                        sx={{
                                            maxWidth: 600,
                                            fontSize: '1.1rem',
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Join our global network of shipping partners and grow your business with
                                        advanced tracking solutions, real-time analytics, and dedicated support.
                                    </Typography>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            startIcon={<Add />}
                                            sx={{
                                                borderRadius: '12px',
                                                px: 4,
                                                py: 1.5,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Become a Partner
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            startIcon={<Download />}
                                            sx={{
                                                borderRadius: '12px',
                                                px: 4,
                                                py: 1.5,
                                                color: 'common.white',
                                                borderColor: alpha(theme.palette.common.white, 0.3),
                                                '&:hover': {
                                                    borderColor: theme.palette.common.white,
                                                    bgcolor: alpha(theme.palette.common.white, 0.05),
                                                },
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Partner Guide
                                        </Button>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={5} sx={{ display: { xs: 'none', lg: 'block' } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Box sx={{ animation: `${floatAnimation} 3s ease-in-out infinite` }}>
                                        <Avatar
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                bgcolor: alpha(theme.palette.primary.main, 0.15),
                                                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            }}
                                        >
                                            <Business sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                                        </Avatar>
                                    </Box>
                                    <Box sx={{ animation: `${floatAnimation} 4s ease-in-out infinite` }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: alpha(theme.palette.secondary.main, 0.15),
                                                border: `2px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                            }}
                                        >
                                            <People sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
                                        </Avatar>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </HeroSection>
                </Slide>

                {/* Stats Section */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px' }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                500+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Active Partners
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px' }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                100+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Countries Covered
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px' }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                1M+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Shipments Tracked
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px' }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                4.8★
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Average Rating
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Benefits Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">
                        Why Partner With Us?
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Unlock exclusive benefits and grow your business with our partner program
                    </Typography>
                    <Grid container spacing={3}>
                        {benefits.map((benefit, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <BenefitCard>
                                        <Avatar
                                            sx={{
                                                bgcolor: alpha(benefit.color, 0.1),
                                                color: benefit.color,
                                                width: 56,
                                                height: 56,
                                                mx: 'auto',
                                                mb: 2,
                                            }}
                                        >
                                            {benefit.icon}
                                        </Avatar>
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            {benefit.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {benefit.description}
                                        </Typography>
                                    </BenefitCard>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Search and Filter */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Search partners..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Business />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '12px' },
                                }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {categories.map((cat) => (
                                    <Chip
                                        key={cat}
                                        label={cat}
                                        onClick={() => setFilter(cat)}
                                        color={filter === cat ? 'primary' : 'default'}
                                        sx={{ borderRadius: '20px' }}
                                    />
                                ))}
                                <Chip
                                    icon={<Verified />}
                                    label="Verified Only"
                                    variant="outlined"
                                    onClick={() => setFilter(filter === 'Verified' ? 'All' : 'Verified')}
                                    color={filter === 'Verified' ? 'primary' : 'default'}
                                    sx={{ borderRadius: '20px' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Featured Partners */}
                {featuredPartners.length > 0 && filter === 'All' && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <WorkspacePremium color="primary" />
                            Featured Partners
                        </Typography>
                        <Grid container spacing={3}>
                            {featuredPartners.map((partner, index) => (
                                <Grid item xs={12} md={6} key={partner.id}>
                                    <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                                        <PartnerCard
                                            onMouseEnter={() => setHoveredPartner(partner.id)}
                                            onMouseLeave={() => setHoveredPartner(null)}
                                        >
                                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: { xs: '100%', sm: 200 },
                                                        height: { xs: 200, sm: '100%' },
                                                        objectFit: 'cover',
                                                    }}
                                                    image={partner.image}
                                                    alt={partner.name}
                                                />
                                                <CardContent sx={{ flex: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Box>
                                                            <Typography variant="h6" fontWeight="bold">
                                                                {partner.name}
                                                                {partner.verified && (
                                                                    <Verified sx={{ ml: 0.5, fontSize: 18, color: 'primary.main', verticalAlign: 'middle' }} />
                                                                )}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                                {partner.location}
                                                            </Typography>
                                                        </Box>
                                                        <IconButton
                                                            onClick={() => handleFavoriteToggle(partner.id)}
                                                            sx={{ color: favorites.includes(partner.id) ? 'error.main' : 'text.secondary' }}
                                                        >
                                                            {favorites.includes(partner.id) ? <Favorite /> : <FavoriteBorder />}
                                                        </IconButton>
                                                    </Box>
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        {partner.description}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                                        {partner.specialties.map((specialty) => (
                                                            <Chip
                                                                key={specialty}
                                                                label={specialty}
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{ borderRadius: '12px' }}
                                                            />
                                                        ))}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                                        {renderStars(partner.rating)}
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() => handlePartnerClick(partner)}
                                                            endIcon={<ArrowForward />}
                                                            sx={{ borderRadius: '12px', textTransform: 'none' }}
                                                        >
                                                            Learn More
                                                        </Button>
                                                    </Box>
                                                </CardContent>
                                            </Box>
                                            {hoveredPartner === partner.id && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                                                        pointerEvents: 'none',
                                                        borderRadius: '16px',
                                                    }}
                                                />
                                            )}
                                        </PartnerCard>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* All Partners Grid */}
                <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Business />
                        All Partners
                        <Chip label={filteredPartners.length} size="small" />
                    </Typography>
                    <Grid container spacing={3}>
                        {filteredPartners.map((partner, index) => (
                            <Grid item xs={12} sm={6} md={4} key={partner.id}>
                                <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <PartnerCard>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={partner.image}
                                            alt={partner.name}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold" noWrap>
                                                        {partner.name}
                                                        {partner.verified && (
                                                            <Verified sx={{ ml: 0.5, fontSize: 16, color: 'primary.main', verticalAlign: 'middle' }} />
                                                        )}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {partner.location}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={partner.category}
                                                    size="small"
                                                    sx={{ borderRadius: '12px' }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {partner.description}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                                {partner.specialties.slice(0, 2).map((specialty) => (
                                                    <Chip
                                                        key={specialty}
                                                        label={specialty}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ borderRadius: '12px', fontSize: '0.65rem' }}
                                                    />
                                                ))}
                                                {partner.specialties.length > 2 && (
                                                    <Chip
                                                        label={`+${partner.specialties.length - 2}`}
                                                        size="small"
                                                        sx={{ borderRadius: '12px', fontSize: '0.65rem' }}
                                                    />
                                                )}
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                                {renderStars(partner.rating)}
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handlePartnerClick(partner)}
                                                    sx={{ borderRadius: '12px', textTransform: 'none' }}
                                                >
                                                    Details
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </PartnerCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                    {filteredPartners.length === 0 && (
                        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
                            <Typography variant="h6" color="text.secondary">
                                No partners found matching your criteria
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => { setFilter('All'); setSearchQuery(''); }}
                                sx={{ mt: 2, borderRadius: '12px' }}
                            >
                                Clear Filters
                            </Button>
                        </Paper>
                    )}
                </Box>

                {/* Testimonials Section */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">
                        What Our Partners Say
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Real stories from partners who have grown with us
                    </Typography>
                    <Grid container spacing={3}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={testimonial.id}>
                                <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                                    <TestimonialCard>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Avatar
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                sx={{ width: 48, height: 48 }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {testimonial.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
                                            "{testimonial.content}"
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {renderStars(testimonial.rating)}
                                            <Typography variant="caption" color="text.secondary">
                                                {testimonial.company}
                                            </Typography>
                                        </Box>
                                    </TestimonialCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Paper
                        sx={{
                            p: { xs: 3, sm: 4, md: 6 },
                            borderRadius: '20px',
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                        }}
                    >
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Ready to Become a Partner?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
                            Join our growing network of partners and take your business to the next level.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Add />}
                                sx={{
                                    borderRadius: '12px',
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Apply Now
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<ContactSupport />}
                                sx={{
                                    borderRadius: '12px',
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Contact Sales
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Container>

            {/* Partner Detail Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '16px' },
                }}
            >
                {selectedPartner && (
                    <>
                        <DialogTitle sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {selectedPartner.name}
                                        {selectedPartner.verified && (
                                            <Verified sx={{ ml: 1, fontSize: 20, color: 'primary.main', verticalAlign: 'middle' }} />
                                        )}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {selectedPartner.location}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => handleFavoriteToggle(selectedPartner.id)}
                                    sx={{ color: favorites.includes(selectedPartner.id) ? 'error.main' : 'text.secondary' }}
                                >
                                    {favorites.includes(selectedPartner.id) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" paragraph>
                                        {selectedPartner.description}
                                    </Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                            Specialties
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selectedPartner.specialties.map((specialty) => (
                                                <Chip key={specialty} label={specialty} size="small" />
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        {renderStars(selectedPartner.rating)}
                                        <Typography variant="caption" color="text.secondary">
                                            {selectedPartner.reviews} reviews
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                            Contact Information
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemIcon><Email fontSize="small" /></ListItemIcon>
                                                <ListItemText primary={selectedPartner.email} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><Phone fontSize="small" /></ListItemIcon>
                                                <ListItemText primary={selectedPartner.phone} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><Language fontSize="small" /></ListItemIcon>
                                                <ListItemText primary={selectedPartner.website} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={selectedPartner.image}
                                        alt={selectedPartner.name}
                                        sx={{ borderRadius: '12px', objectFit: 'cover' }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
                                        <Tooltip title="Share on LinkedIn">
                                            <IconButton sx={{ color: '#0A66C2' }}>
                                                <LinkedIn />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Share on Twitter">
                                            <IconButton sx={{ color: '#1DA1F2' }}>
                                                <Twitter />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Share on Facebook">
                                            <IconButton sx={{ color: '#1877F2' }}>
                                                <Facebook />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Share on WhatsApp">
                                            <IconButton sx={{ color: '#25D366' }}>
                                                <WhatsApp />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={() => setDialogOpen(false)} sx={{ borderRadius: '12px' }}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Send />}
                                sx={{ borderRadius: '12px', textTransform: 'none' }}
                            >
                                Contact Partner
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ borderRadius: '12px' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PartnersPage;