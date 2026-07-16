import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Chip,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Card,
    CardContent,
    Avatar,
    useTheme,
    useMediaQuery,
    Fade,
    Slide,
    Zoom,
    Stack,
    alpha,
    Divider,
    Tabs,
    Tab,
    Badge,
    Tooltip,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
    ExpandMore,
    Search,
    Help,
    LocalShipping,
    Payment,
    Security,
    Support,
    AccountCircle,
    Business,
    Api,
    IntegrationInstructions,
    Settings,
    ContactSupport,
    ArrowForward,
    CheckCircle,
    Warning,
    Info,
    Star,
    Feedback,
    WhatsApp,
    Phone,
    Email,
    Chat,
    Bookmark,
    BookmarkBorder,
    ThumbUp,
    ThumbDown,
    Share,
} from '@mui/icons-material';

// Animations
const floatAnimation = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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

const FAQCard = styled(Paper)(({ theme }) => ({
    borderRadius: '16px',
    overflow: 'hidden',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    borderRadius: '12px !important',
    marginBottom: theme.spacing(1.5),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    },
    '& .MuiAccordionSummary-root': {
        borderRadius: '12px',
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.02),
        },
    },
    '& .MuiAccordionSummary-content': {
        alignItems: 'center',
    },
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '16px',
    textAlign: 'center',
    height: '100%',
    transition: 'all 0.3s ease',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        borderColor: theme.palette.primary.main,
    },
}));

// FAQ Data
const faqData = {
    general: [
        {
            id: 1,
            question: 'What is ShipmentTracker?',
            answer: 'ShipmentTracker is a comprehensive shipping and logistics platform that provides real-time tracking, shipment management, and analytics for businesses and individuals. We help you track your packages, manage deliveries, and optimize your shipping operations.',
            category: 'General',
            helpful: 234,
        },
        {
            id: 2,
            question: 'How does ShipmentTracker work?',
            answer: 'ShipmentTracker works by integrating with major shipping carriers and logistics providers. When you create a shipment, you receive a unique tracking number. You can track your package in real-time, receive notifications, and access detailed analytics about your shipping operations.',
            category: 'General',
            helpful: 189,
        },
        {
            id: 3,
            question: 'Is ShipmentTracker free to use?',
            answer: 'We offer both free and paid plans. The free plan includes basic tracking features and limited shipments per month. Our paid plans offer advanced features like real-time analytics, API access, bulk shipments, and priority support.',
            category: 'General',
            helpful: 156,
        },
    ],
    shipping: [
        {
            id: 4,
            question: 'How do I create a shipment?',
            answer: 'To create a shipment, log in to your account and click on "Create Shipment". Fill in the origin and destination addresses, add package details, select shipping options, and confirm. You\'ll receive a tracking number immediately.',
            category: 'Shipping',
            helpful: 278,
        },
        {
            id: 5,
            question: 'What carriers do you support?',
            answer: 'We support major carriers including UPS, FedEx, DHL, USPS, and many regional carriers. Our platform integrates with over 50 carriers worldwide, providing comprehensive tracking coverage.',
            category: 'Shipping',
            helpful: 201,
        },
        {
            id: 6,
            question: 'How long does shipping take?',
            answer: 'Shipping times vary based on the service selected and destination. Standard shipping typically takes 3-5 business days, while express shipping can deliver in 1-2 business days. You can see estimated delivery times during the shipping process.',
            category: 'Shipping',
            helpful: 167,
        },
    ],
    tracking: [
        {
            id: 7,
            question: 'How do I track my shipment?',
            answer: 'You can track your shipment by entering your tracking number on our homepage or in the "Track" section. You\'ll see real-time updates including location, status, and estimated delivery time.',
            category: 'Tracking',
            helpful: 312,
        },
        {
            id: 8,
            question: 'Why is my tracking number not working?',
            answer: 'If your tracking number is not working, please verify that you entered it correctly. Tracking numbers are case-sensitive. If the issue persists, the carrier may not have scanned the package yet, or there might be a delay in system updates.',
            category: 'Tracking',
            helpful: 198,
        },
        {
            id: 9,
            question: 'Can I track multiple shipments at once?',
            answer: 'Yes! You can track multiple shipments simultaneously from your dashboard. You can also create custom views, set up notifications, and export tracking data for analysis.',
            category: 'Tracking',
            helpful: 145,
        },
    ],
    payment: [
        {
            id: 10,
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For enterprise customers, we offer invoice-based payment options.',
            category: 'Payment',
            helpful: 234,
        },
        {
            id: 11,
            question: 'How do I update my billing information?',
            answer: 'You can update your billing information in the "Settings" > "Billing" section of your account. You can add new payment methods, update your billing address, and view your payment history.',
            category: 'Payment',
            helpful: 156,
        },
        {
            id: 12,
            question: 'Do you offer refunds?',
            answer: 'Yes, we offer refunds for unused services within 30 days of purchase. Please contact our support team with your order details, and we\'ll process your refund promptly.',
            category: 'Payment',
            helpful: 123,
        },
    ],
    account: [
        {
            id: 13,
            question: 'How do I create an account?',
            answer: 'You can create an account by clicking the "Sign Up" button on our homepage. Fill in your name, email, password, and business details. You\'ll receive a confirmation email to verify your account.',
            category: 'Account',
            helpful: 267,
        },
        {
            id: 14,
            question: 'How do I reset my password?',
            answer: 'To reset your password, click on "Forgot Password" on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the link to create a new password.',
            category: 'Account',
            helpful: 189,
        },
        {
            id: 15,
            question: 'Can I change my account email?',
            answer: 'Yes, you can change your account email in the "Settings" > "Profile" section. You\'ll need to verify your new email address before the change is complete.',
            category: 'Account',
            helpful: 98,
        },
    ],
};

// Quick Actions Data
const quickActions = [
    {
        icon: <LocalShipping />,
        title: 'Track Shipment',
        description: 'Enter tracking number for real-time updates',
        color: '#2196F3',
        link: '/track',
    },
    {
        icon: <Business />,
        title: 'Create Shipment',
        description: 'Start a new shipment instantly',
        color: '#4CAF50',
        link: '/create',
    },
    {
        icon: <ContactSupport />,
        title: 'Contact Support',
        description: 'Get help from our team 24/7',
        color: '#FF9800',
        link: '/contact',
    },
    {
        icon: <IntegrationInstructions />,
        title: 'API Integration',
        description: 'Connect your systems with our API',
        color: '#9C27B0',
        link: '/api-docs',
    },
];

// Categories for tabs
const categories = [
    { label: 'All', value: 'all', icon: <Help /> },
    { label: 'General', value: 'general', icon: <Info /> },
    { label: 'Shipping', value: 'shipping', icon: <LocalShipping /> },
    { label: 'Tracking', value: 'tracking', icon: <Search /> },
    { label: 'Payment', value: 'payment', icon: <Payment /> },
    { label: 'Account', value: 'account', icon: <AccountCircle /> },
];

const FAQPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [helpfulVotes, setHelpfulVotes] = useState({});
    const [savedItems, setSavedItems] = useState([]);

    // Get all FAQs as a flat array
    const allFaqs = Object.values(faqData).flat();

    // Filter FAQs based on search and category
    const filteredFaqs = allFaqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.category.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Group FAQs by category for display
    const groupedFaqs = filteredFaqs.reduce((groups, faq) => {
        const category = faq.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(faq);
        return groups;
    }, {});

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : null);
    };

    const handleHelpful = (faqId, isHelpful) => {
        setHelpfulVotes(prev => ({
            ...prev,
            [faqId]: isHelpful ? 'up' : 'down',
        }));
    };

    const handleSave = (faqId) => {
        setSavedItems(prev =>
            prev.includes(faqId)
                ? prev.filter(id => id !== faqId)
                : [...prev, faqId]
        );
    };

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setExpandedAccordion(null);
    };

    const getCategoryCount = (category) => {
        if (category === 'all') return allFaqs.length;
        return allFaqs.filter(faq => faq.category.toLowerCase() === category).length;
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
                                        label="❓ Frequently Asked Questions"
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
                                        How Can We <Box component="span" sx={{ color: theme.palette.primary.light }}>
                                            Help You?
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
                                        Find answers to common questions about our platform, shipping, tracking,
                                        and more. Can't find what you're looking for? Contact our support team.
                                    </Typography>
                                    <Box sx={{ mt: 3 }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Search for answers..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search sx={{ color: 'grey.400' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    borderRadius: '12px',
                                                    bgcolor: 'rgba(255,255,255,0.05)',
                                                    '& .MuiInputBase-input': {
                                                        color: 'common.white',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(255,255,255,0.1)',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(255,255,255,0.2)',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={5} sx={{ display: { xs: 'none', lg: 'block' } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                                            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            animation: `${floatAnimation} 3s ease-in-out infinite`,
                                        }}
                                    >
                                        <Help sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                                    </Avatar>
                                </Box>
                            </Grid>
                        </Grid>
                    </HeroSection>
                </Slide>

                {/* Quick Actions */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {quickActions.map((action, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                            <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                                <QuickActionCard onClick={() => window.location.href = action.link}>
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(action.color, 0.1),
                                            color: action.color,
                                            width: 48,
                                            height: 48,
                                            mx: 'auto',
                                            mb: 1,
                                        }}
                                    >
                                        {action.icon}
                                    </Avatar>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {action.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {action.description}
                                    </Typography>
                                </QuickActionCard>
                            </Zoom>
                        </Grid>
                    ))}
                </Grid>

                {/* Category Tabs */}
                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant={isMobile ? 'scrollable' : 'standard'}
                        scrollButtons={isMobile ? 'auto' : false}
                        sx={{
                            '& .MuiTab-root': {
                                borderRadius: '12px',
                                minHeight: 48,
                                textTransform: 'none',
                                fontWeight: 600,
                                '&.Mui-selected': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                },
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Tab
                                key={category.value}
                                value={category.value}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {category.icon}
                                        <span>{category.label}</span>
                                        <Chip
                                            label={getCategoryCount(category.value)}
                                            size="small"
                                            sx={{
                                                ml: 0.5,
                                                height: 20,
                                                fontSize: '0.65rem',
                                                bgcolor: selectedCategory === category.value
                                                    ? 'primary.main'
                                                    : alpha(theme.palette.primary.main, 0.1),
                                                color: selectedCategory === category.value
                                                    ? 'common.white'
                                                    : 'text.secondary',
                                            }}
                                        />
                                    </Box>
                                }
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* FAQ Accordions */}
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={8}>
                        <Fade in={true} timeout={500}>
                            <FAQCard elevation={0}>
                                <Box sx={{ p: 3 }}>
                                    {Object.keys(groupedFaqs).length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 6 }}>
                                            <Typography variant="h6" color="text.secondary">
                                                No results found
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                Try adjusting your search or filter criteria
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                                sx={{ mt: 2, borderRadius: '12px' }}
                                            >
                                                Clear Filters
                                            </Button>
                                        </Box>
                                    ) : (
                                        Object.keys(groupedFaqs).map((category, index) => (
                                            <Box key={category}>
                                                {index > 0 && <Divider sx={{ my: 3 }} />}
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                                                >
                                                    <Badge
                                                        badgeContent={groupedFaqs[category].length}
                                                        color="primary"
                                                        sx={{ '& .MuiBadge-badge': { position: 'static', ml: 1 } }}
                                                    >
                                                        <span>{category}</span>
                                                    </Badge>
                                                </Typography>
                                                {groupedFaqs[category].map((faq) => (
                                                    <StyledAccordion
                                                        key={faq.id}
                                                        expanded={expandedAccordion === faq.id}
                                                        onChange={handleAccordionChange(faq.id)}
                                                        elevation={0}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMore />}
                                                            sx={{
                                                                '& .MuiAccordionSummary-content': {
                                                                    alignItems: 'center',
                                                                },
                                                            }}
                                                        >
                                                            <Typography variant="subtitle1" fontWeight="500">
                                                                {faq.question}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                                {faq.answer}
                                                            </Typography>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap',
                                                                gap: 1,
                                                                mt: 2,
                                                                pt: 2,
                                                                borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                                            }}>
                                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                                    <Tooltip title="Helpful">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleHelpful(faq.id, true)}
                                                                            sx={{
                                                                                color: helpfulVotes[faq.id] === 'up'
                                                                                    ? 'success.main'
                                                                                    : 'text.secondary',
                                                                            }}
                                                                        >
                                                                            <ThumbUp fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="Not Helpful">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleHelpful(faq.id, false)}
                                                                            sx={{
                                                                                color: helpfulVotes[faq.id] === 'down'
                                                                                    ? 'error.main'
                                                                                    : 'text.secondary',
                                                                            }}
                                                                        >
                                                                            <ThumbDown fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="Save for Later">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleSave(faq.id)}
                                                                            sx={{
                                                                                color: savedItems.includes(faq.id)
                                                                                    ? 'primary.main'
                                                                                    : 'text.secondary',
                                                                            }}
                                                                        >
                                                                            {savedItems.includes(faq.id)
                                                                                ? <Bookmark fontSize="small" />
                                                                                : <BookmarkBorder fontSize="small" />
                                                                            }
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Chip
                                                                        label={`${faq.helpful} people found this helpful`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        sx={{ borderRadius: '12px' }}
                                                                    />
                                                                    <Tooltip title="Share">
                                                                        <IconButton size="small">
                                                                            <Share fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </StyledAccordion>
                                                ))}
                                            </Box>
                                        ))
                                    )}
                                </Box>
                            </FAQCard>
                        </Fade>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={3}>
                            {/* Need More Help Card */}
                            <Card sx={{
                                borderRadius: '16px',
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                                bgcolor: alpha(theme.palette.primary.main, 0.02),
                            }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            color: theme.palette.primary.main,
                                            width: 56,
                                            height: 56,
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        <Support />
                                    </Avatar>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        Need More Help?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Our support team is here to assist you with any questions or issues.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={<ContactSupport />}
                                        href="/contact"
                                        sx={{ borderRadius: '12px', textTransform: 'none' }}
                                    >
                                        Contact Support
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card sx={{ borderRadius: '16px', border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}` }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        Quick Links
                                    </Typography>
                                    <Stack spacing={1}>
                                        {[
                                            { label: 'Track Shipment', icon: <LocalShipping />, link: '/track' },
                                            { label: 'Create Shipment', icon: <Business />, link: '/create' },
                                            { label: 'API Documentation', icon: <Api />, link: '/api-docs' },
                                            { label: 'Terms of Service', icon: <Settings />, link: '/terms' },
                                            { label: 'Privacy Policy', icon: <Security />, link: '/privacy' },
                                        ].map((item) => (
                                            <Button
                                                key={item.label}
                                                fullWidth
                                                startIcon={item.icon}
                                                href={item.link}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    borderRadius: '12px',
                                                    textTransform: 'none',
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                    },
                                                }}
                                            >
                                                {item.label}
                                            </Button>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Contact Options */}
                            <Card sx={{ borderRadius: '16px', border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}` }}>
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        Contact Options
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: alpha('#25D366', 0.1), color: '#25D366' }}>
                                                <WhatsApp fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    WhatsApp
                                                </Typography>
                                                <Typography variant="body2" fontWeight="500">
                                                    +1 (555) 123-4567
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: alpha('#2196F3', 0.1), color: '#2196F3' }}>
                                                <Phone fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Phone
                                                </Typography>
                                                <Typography variant="body2" fontWeight="500">
                                                    +1 (555) 987-6543
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: alpha('#EA4335', 0.1), color: '#EA4335' }}>
                                                <Email fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Email
                                                </Typography>
                                                <Typography variant="body2" fontWeight="500">
                                                    support@shipmenttracker.com
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<Chat />}
                                            href="/contact"
                                            sx={{ borderRadius: '12px', textTransform: 'none', mt: 1 }}
                                        >
                                            Live Chat
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Still Have Questions CTA */}
                <Box sx={{ mt: 6 }}>
                    <Paper
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: '20px',
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                        }}
                    >
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Still Have Questions?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
                            Can't find the answer you're looking for? Our team is ready to help.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<ContactSupport />}
                                href="/contact"
                                sx={{
                                    borderRadius: '12px',
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Contact Support
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<Feedback />}
                                sx={{
                                    borderRadius: '12px',
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Send Feedback
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default FAQPage;