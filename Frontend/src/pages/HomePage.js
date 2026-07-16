import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useShipment } from '../context/ShipmentContext';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Fade,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SpeedIcon from '@mui/icons-material/Speed';
import ShipmentList from '../components/ShipmentList';

// Enhanced Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  background: `url('/images/hero-bg.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(12, 2, 8, 2),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
}));

// Darker gradient overlay to make text pop
const GradientOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(135deg, 
    rgba(15, 23, 42, 0.9) 0%, 
    rgba(15, 23, 42, 0.6) 50%, 
    rgba(30, 58, 138, 0.8) 100%)`,
  zIndex: 0,
}));

// Refined Feature Card with modern hover
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: `0 20px 40px -10px ${theme.palette.primary.main}30`,
    borderColor: theme.palette.primary.light,
  },
}));

// Floating Icon styling
const FeatureIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}15`,
  color: theme.palette.primary.main,
  borderRadius: '16px',
  padding: theme.spacing(2.5),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '.MuiCard-root:hover &': {
    transform: 'scale(1.1) rotate(5deg)',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access URL query parameters
  const { error, clearShipment } = useShipment();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingError, setTrackingError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to read tracking number from URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const trackingFromUrl = queryParams.get('tracking');
    if (trackingFromUrl) {
      setTrackingNumber(trackingFromUrl);
      // Optionally, auto-submit the form if you want instant tracking
      // handleSubmit(new Event('submit')); // Uncomment for auto-submit
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber || trackingNumber.trim() === '') {
      setTrackingError('Please enter a valid tracking number');
      return;
    }

    try {
      setIsSubmitting(true);
      setTrackingError(null);
      clearShipment();
      navigate(`/tracking/${trackingNumber.trim()}`);
    } catch (err) {
      setTrackingError(err.message || 'Unable to locate shipment at this time.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced Features Content
  const features = [
    {
      title: 'Pinpoint Tracking',
      description: 'Monitor your cargo down to the mile with live GPS updates and milestone notifications.',
      icon: <MapIcon fontSize="large" />,
      image: '/images/feature-tracking.jpg'
    },
    {
      title: 'Global Network',
      description: 'From local drops to international freight, our logistics network spans the globe effortlessly.',
      icon: <PublicIcon fontSize="large" />,
      image: '/images/feature-delivery.jpg'
    },
    {
      title: 'Vault-Level Security',
      description: 'Your assets are protected with industry-leading packaging standards and transit insurance.',
      icon: <InventoryIcon fontSize="large" />,
      image: '/images/feature-packaging.jpg'
    },
  ];

  // New Stats Data
  const stats = [
    { icon: <SpeedIcon />, label: '99.9%', subtext: 'On-Time Delivery' },
    { icon: <LocalShippingIcon />, label: '5M+', subtext: 'Packages Shipped' },
    { icon: <SupportAgentIcon />, label: '24/7', subtext: 'Live Support' },
  ];

  return (
    <Box sx={{ pb: 8, bgcolor: 'background.default' }}>
      <HeroSection>
        <GradientOverlay />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={1200}>
            <Box>
              <DeliveryDiningIcon sx={{
                fontSize: 72,
                mb: 2,
                color: theme.palette.primary.light,
                filter: `drop-shadow(0 0 12px ${theme.palette.primary.main})`,
              }} />
              <Typography variant="h2" component="h1" gutterBottom fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
                Track Your <Box component="span" sx={{ color: theme.palette.primary.light }}>Shipment</Box>
              </Typography>
              <Typography variant="h6" component="p" sx={{ maxWidth: '650px', mx: 'auto', mb: 5, color: 'grey.300', fontWeight: 400 }}>
                Experience seamless logistics. Enter your tracking ID below to get instant, real-time updates on your cargo's journey.
              </Typography>

              {/* Enhanced Search Input Box */}
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 1.5,
                  p: 1.5,
                  maxWidth: 650,
                  mx: 'auto',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid rgba(255, 255, 255, 0.2)`,
                  borderRadius: 3,
                  boxShadow: `0 12px 30px rgba(0, 0, 0, 0.3)`,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="e.g. TRK-987654321"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'grey.500' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      '& fieldset': { border: 'none' },
                      '&:focus-within': {
                        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
                      },
                    }
                  }}
                  required
                  disabled={isSubmitting}
                  error={!!trackingError}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    height: 56,
                    borderRadius: 2,
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: theme.shadows[4],
                  }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Track Package'}
                </Button>
              </Paper>

              {trackingError && (
                <Typography color="error.light" sx={{ mt: 2, fontWeight: 500 }}>
                  {trackingError}
                </Typography>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 3, maxWidth: 650, mx: 'auto', borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* New Trust Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
        <Paper elevation={4} sx={{ borderRadius: 3, py: 4, px: 2, bgcolor: 'background.paper' }}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <Box sx={{ color: theme.palette.primary.main, '& svg': { fontSize: 40 } }}>
                    {stat.icon}
                  </Box>
                  <Box textAlign="left">
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="500" textTransform="uppercase">
                      {stat.subtext}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Services Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Why Choose Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            We deliver more than just packages. We deliver promises, ensuring peace of mind every step of the way.
          </Typography>
          <Divider sx={{ width: '60px', mx: 'auto', mb: 6, borderColor: theme.palette.primary.main, borderWidth: 3, borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 10 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                <FeatureCard elevation={0}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={feature.image}
                    alt={feature.title}
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                  />
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <FeatureIconWrapper>
                      {feature.icon}
                    </FeatureIconWrapper>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced Call to Action */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('/images/cta-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          mb: 8,
          position: 'relative'
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h3" component="h2" color="common.white" fontWeight="bold">
              Ready to streamline your logistics?
            </Typography>
            <Typography variant="h6" sx={{ color: 'grey.300', maxWidth: '700px', fontWeight: 400 }}>
              Create a new shipment today and experience lightning-fast delivery equipped with our cutting-edge tracking ecosystem.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/create')}
              sx={{
                mt: 4,
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 8 // Pill shape for CTA
              }}
            >
              Create New Shipment
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Shipment List Section */}
      <Container maxWidth="lg">
        <ShipmentList />
      </Container>
    </Box>
  );
};

export default HomePage;
