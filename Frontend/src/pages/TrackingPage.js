import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShipment } from '../context/ShipmentContext';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  Divider,
  Fade,
  Grow,
  Zoom,
  Slide,
  Skeleton,
  useTheme,
  alpha,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TimelineIcon from '@mui/icons-material/Timeline';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ShipmentMap from '../components/ShipmentMap';
import ShipmentDetails from '../components/ShipmentDetails';

const TrackingPage = () => {
  const { trackingNumber } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const fetchedRef = useRef(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  const {
    shipment,
    loading,
    error,
    getShipment,
    updateShipmentLocation,
    getRouteDistance,
  } = useShipment();

  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Check location permission on mount
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(result => {
          setLocationPermission(result.state);
          result.onchange = () => setLocationPermission(result.state);
        })
        .catch(() => setLocationPermission('prompt'));
    }
  }, []);

  // Get current location with enhanced error handling
  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      // Check if we already have permission
      if (locationPermission === 'denied') {
        reject(new Error('Location access was permanently denied. Please enable location services in your browser settings.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve your location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access was denied. Please allow location access to update your shipment status.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable. Please try again or check your GPS.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again in an area with better GPS signal.';
              break;
            default:
              errorMessage = 'An unknown error occurred. Please try again.';
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 30000,
        }
      );
    });
  }, [locationPermission]);

  // Update location with current position
  const handleUpdateLocation = async () => {
    try {
      setUpdatingLocation(true);
      setLocationError(null);

      // Get current location with retry logic
      let position;
      let retries = 0;
      const maxRetries = 2;

      while (retries <= maxRetries) {
        try {
          position = await getCurrentLocation();
          break;
        } catch (error) {
          if (retries === maxRetries) throw error;
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000 * retries));
        }
      }

      // Get address from coordinates using reverse geocoding
      const address = await getAddressFromCoordinates(
        position.latitude,
        position.longitude
      );

      // Update shipment location with more detailed data
      await updateShipmentLocation(trackingNumber, {
        coordinates: [position.longitude, position.latitude],
        address,
        status: 'in_transit',
        description: `Location updated: ${address}`,
        accuracy: position.accuracy,
        updatedAt: new Date().toISOString(),
      });

      // Show success animation
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 3000);

      // Refresh shipment data
      await getShipment(trackingNumber);
      await getRouteDistance(trackingNumber);

      setLastUpdateTime(new Date());

    } catch (error) {
      console.error('Error updating location:', error);
      setLocationError(error.message);
    } finally {
      setUpdatingLocation(false);
    }
  };

  // Reverse geocoding function (mock implementation)
  const getAddressFromCoordinates = async (lat, lng) => {
    // In a real implementation, you'd use a geocoding service like Google Maps, OpenStreetMap, etc.
    // This is a mock implementation for demonstration
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        return data.display_name;
      }
    } catch (error) {
      console.warn('Reverse geocoding failed, using coordinates instead');
    }
    return `📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  // Fetch shipment data on component mount
  useEffect(() => {
    if (!trackingNumber || fetchedRef.current) return;

    const fetchShipmentData = async () => {
      try {
        fetchedRef.current = true;
        await getShipment(trackingNumber);
        await getRouteDistance(trackingNumber);
        setLastUpdateTime(new Date());
      } catch (error) {
        console.error('Error fetching shipment:', error);
      }
    };

    fetchShipmentData();

    return () => {
      fetchedRef.current = false;
    };
  }, [trackingNumber, getShipment, getRouteDistance]);

  // Loading skeleton
  if (loading && !shipment) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box mb={4}>
          <Skeleton variant="text" width={120} height={40} />
          <Skeleton variant="text" width={300} height={60} sx={{ mt: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  // Error state with enhanced UI
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Fade in timeout={500}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              background: alpha(theme.palette.error.main, 0.05),
            }}
          >
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              icon={<LocationOnIcon />}
            >
              <Typography variant="h6" gutterBottom>
                Shipment Not Found
              </Typography>
              <Typography variant="body2">
                {error}
              </Typography>
            </Alert>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ borderRadius: 2 }}
            >
              Return to Dashboard
            </Button>
          </Paper>
        </Fade>
      </Container>
    );
  }

  if (!shipment) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Box>
          {/* Header Section */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                Back
              </Button>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Track Your Shipment
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={shipment.trackingNumber}
                    size="small"
                    color="primary"
                    variant="outlined"
                    icon={<LocalShippingIcon />}
                  />
                  {lastUpdateTime && (
                    <Chip
                      label={`Updated: ${lastUpdateTime.toLocaleTimeString()}`}
                      size="small"
                      variant="outlined"
                      sx={{ opacity: 0.7 }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => getShipment(trackingNumber)}
                disabled={loading}
                sx={{ borderRadius: 2 }}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={updatingLocation ? <CircularProgress size={20} color="inherit" /> : <MyLocationIcon />}
                onClick={handleUpdateLocation}
                disabled={updatingLocation || locationPermission === 'denied'}
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  }
                }}
              >
                {updatingLocation ? 'Updating...' : 'Update Location'}
              </Button>
            </Box>
          </Box>

          {/* Success Animation */}
          {showSuccessAnimation && (
            <Grow in timeout={500}>
              <Alert
                severity="success"
                icon={<CheckCircleIcon />}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: theme.shadows[3],
                }}
              >
                Location updated successfully!
              </Alert>
            </Grow>
          )}

          {/* Location Permission Warning */}
          {locationPermission === 'denied' && (
            <Alert
              severity="warning"
              sx={{ mb: 2, borderRadius: 2 }}
              action={
                <Button color="warning" size="small" onClick={() => {
                  // Open browser settings or show instructions
                  alert('Please enable location services in your browser settings to update your shipment location.');
                }}>
                  Learn More
                </Button>
              }
            >
              Location access is blocked. Please enable location services to update your shipment status.
            </Alert>
          )}

          {/* Location Error */}
          {locationError && (
            <Slide direction="down" in>
              <Alert
                severity="error"
                sx={{ mb: 2, borderRadius: 2 }}
                onClose={() => setLocationError(null)}
              >
                {locationError}
              </Alert>
            </Slide>
          )}

          {/* Main Content */}
          <Grid container spacing={3}>
            {/* Map Section */}
            <Grid item xs={12} md={8}>
              <Zoom in timeout={500}>
                <Paper
                  elevation={3}
                  sx={{
                    height: { xs: 400, md: 600 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    background: theme.palette.background.default,
                  }}
                >
                  <ShipmentMap shipment={shipment} />
                </Paper>
              </Zoom>
            </Grid>

            {/* Shipment Details Section */}
            <Grid item xs={12} md={4}>
              <Slide direction="left" in timeout={500}>
                <Paper
                  elevation={3}
                  sx={{
                    height: { xs: 'auto', md: 600 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(180deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.02)})`,
                  }}
                >
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="600">
                      Shipment Details
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <ShipmentDetails
                      shipment={shipment}
                      onUpdateLocation={handleUpdateLocation}
                      updatingLocation={updatingLocation}
                      locationError={locationError}
                    />
                  </Box>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default TrackingPage;