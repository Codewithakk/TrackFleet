import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShipment } from '../context/ShipmentContext';
import { useSnackbar } from 'notistack';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Slide,
  Chip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { throttle } from 'lodash';
import LocationIcon from '@mui/icons-material/LocationOn';
import RouteIcon from '@mui/icons-material/Route';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import PackageIcon from '@mui/icons-material/Inventory';
import TimelineIcon from '@mui/icons-material/Timeline';
import FlagIcon from '@mui/icons-material/Flag';

// Use Mapbox for geocoding with environment variable
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Common country codes for phone numbers
const countryCodes = [
  { code: '+1', country: 'US/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
];

// Use Mapbox for geocoding
const searchAddress = async (query) => {
  if (!query || query.length < 3) return [];

  try {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
    const params = new URLSearchParams({
      access_token: MAPBOX_TOKEN,
      autocomplete: true,
      country: 'us,in',
      limit: 8
    });

    const response = await fetch(`${endpoint}?${params}`);
    const data = await response.json();

    return data.features.map(feature => ({
      id: feature.id,
      place_id: feature.id,
      description: feature.place_name,
      coordinates: feature.center,
      address: feature.place_name,
      country: feature.context?.find(c => c.id.startsWith('country'))?.text || 'Unknown'
    }));
  } catch (error) {
    console.error('Error searching address:', error);
    return [];
  }
};

const steps = ['Shipment Details', 'Customer Information', 'Items'];

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex
const phoneRegex = /^[0-9\s\-()]{5,15}$/;

// Step icons
const stepIcons = {
  0: <LocationIcon />,
  1: <PersonIcon />,
  2: <PackageIcon />,
};

const CreateShipmentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { createShipment } = useShipment();

  const [formData, setFormData] = useState({
    origin: {
      address: '',
      coordinates: [0, 0],
      addressDetails: '',
    },
    destination: {
      address: '',
      coordinates: [0, 0],
      addressDetails: '',
    },
    checkpoints: [],
    customer: {
      name: '',
      email: '',
      phone: '',
      phoneCountryCode: '+1',
    },
    items: [
      {
        description: '',
        quantity: 1,
        weight: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
        },
      },
    ],
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [originPredictions, setOriginPredictions] = useState([]);
  const [destinationPredictions, setDestinationPredictions] = useState([]);
  const [checkpointPredictions, setCheckpointPredictions] = useState([]);
  const [activeCheckpointIndex, setActiveCheckpointIndex] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // Throttled function to fetch place predictions
  const fetchPredictions = useMemo(
    () =>
      throttle(async (query, field) => {
        if (query.length < 3) return;

        const predictions = await searchAddress(query);

        if (field === 'origin') {
          setOriginPredictions(predictions);
        } else if (field === 'destination') {
          setDestinationPredictions(predictions);
        } else if (field === 'checkpoint') {
          setCheckpointPredictions(predictions);
        }
      }, 300),
    []
  );

  // Handle address input change with autocomplete
  const handleAddressChange = (field, value, index = null) => {
    if (field === 'checkpoint' && index !== null) {
      setFormData(prev => {
        const updatedCheckpoints = [...prev.checkpoints];
        updatedCheckpoints[index] = {
          ...updatedCheckpoints[index],
          location: {
            ...updatedCheckpoints[index].location,
            address: value
          }
        };
        return {
          ...prev,
          checkpoints: updatedCheckpoints
        };
      });

      setActiveCheckpointIndex(index);

      if (!value.trim()) {
        setCheckpointPredictions([]);
        return;
      }

      fetchPredictions(value, 'checkpoint');
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        address: value
      }
    }));

    if (!value.trim()) {
      if (field === 'origin') setOriginPredictions([]);
      else if (field === 'destination') setDestinationPredictions([]);
      return;
    }

    fetchPredictions(value, field);
  };

  // Handle place selection
  const handlePlaceSelect = (field, place, index = null) => {
    if (field === 'checkpoint' && index !== null) {
      setFormData(prev => {
        const updatedCheckpoints = [...prev.checkpoints];
        updatedCheckpoints[index] = {
          ...updatedCheckpoints[index],
          location: {
            ...updatedCheckpoints[index].location,
            address: place.description,
            coordinates: place.coordinates
          }
        };
        return {
          ...prev,
          checkpoints: updatedCheckpoints
        };
      });

      setCheckpointPredictions([]);
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        address: place.description,
        coordinates: place.coordinates
      }
    }));

    if (field === 'origin') setOriginPredictions([]);
    else if (field === 'destination') setDestinationPredictions([]);
  };

  const formatAddressDisplay = (place) => {
    const isIndian = place.country === 'India';
    return (
      <Box>
        <Typography variant="body2" fontWeight={500}>
          {place.description}
        </Typography>
        <Typography
          variant="caption"
          color={isIndian ? 'primary.main' : 'text.secondary'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: isIndian ? 500 : 400
          }}
        >
          {place.country}
        </Typography>
      </Box>
    );
  };

  const handleCountryCodeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        phoneCountryCode: e.target.value
      }
    }));
  };

  const getFullPhoneNumber = () => {
    if (!formData.customer.phone) return '';
    return `${formData.customer.phoneCountryCode} ${formData.customer.phone}`;
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.origin.address) {
        newErrors.origin = 'Origin address is required';
      } else if (formData.origin.coordinates[0] === 0 && formData.origin.coordinates[1] === 0) {
        newErrors.origin = 'Please select a valid origin address from the suggestions';
      }

      if (!formData.destination.address) {
        newErrors.destination = 'Destination address is required';
      } else if (formData.destination.coordinates[0] === 0 && formData.destination.coordinates[1] === 0) {
        newErrors.destination = 'Please select a valid destination address from the suggestions';
      }

      const checkpointErrors = [];
      formData.checkpoints.forEach((checkpoint, index) => {
        const cpErrors = {};

        if (!checkpoint.name) {
          cpErrors.name = 'Checkpoint name is required';
        }

        if (!checkpoint.location.address) {
          cpErrors.address = 'Checkpoint address is required';
        } else if (checkpoint.location.coordinates[0] === 0 && checkpoint.location.coordinates[1] === 0) {
          cpErrors.address = 'Please select a valid checkpoint address from the suggestions';
        }

        if (Object.keys(cpErrors).length > 0) {
          checkpointErrors[index] = cpErrors;
        }
      });

      if (checkpointErrors.length > 0) {
        newErrors.checkpoints = checkpointErrors;
      }
    } else if (step === 2) {
      if (!formData.customer.name.trim()) {
        newErrors.customerName = 'Customer name is required';
      }

      if (!formData.customer.email.trim()) {
        newErrors.customerEmail = 'Email is required';
      } else if (!emailRegex.test(formData.customer.email)) {
        newErrors.customerEmail = 'Please enter a valid email address';
      }

      if (formData.customer.phone.trim() && !phoneRegex.test(formData.customer.phone)) {
        newErrors.customerPhone = 'Please enter a valid phone number (digits, spaces, and dashes only)';
      }
    } else if (step === 3) {
      if (Array.isArray(formData.items)) {
        formData.items.forEach((item, index) => {
          if (!item.description.trim()) {
            newErrors[`item-${index}-description`] = 'Item description is required';
          }
          if (item.quantity <= 0) {
            newErrors[`item-${index}-quantity`] = 'Quantity must be greater than 0';
          }
        });
      } else {
        newErrors.items = 'Items data is invalid';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const parts = name.split('.');

      if (parts[0] === 'items') {
        const index = parseInt(parts[1]);
        const field = parts[2];

        const updatedItems = Array.isArray(formData.items)
          ? [...formData.items]
          : [{
            description: '',
            quantity: 1,
            weight: 0,
            dimensions: { length: 0, width: 0, height: 0 },
          }];

        if (!updatedItems[index]) {
          updatedItems[index] = {
            description: '',
            quantity: 1,
            weight: 0,
            dimensions: { length: 0, width: 0, height: 0 },
          };
        }

        if (field === 'dimensions.length' || field === 'dimensions.width' || field === 'dimensions.height') {
          const dimField = field.split('.')[1];
          updatedItems[index].dimensions = {
            ...updatedItems[index].dimensions,
            [dimField]: parseFloat(value) || 0,
          };
        } else {
          updatedItems[index][field] = field === 'quantity' || field === 'weight'
            ? parseFloat(value) || 0
            : value;
        }

        setFormData(prev => ({
          ...prev,
          items: updatedItems,
        }));

        return;
      }

      const [parent, child] = parts;
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));

      if (errors[`${parent}${child.charAt(0).toUpperCase() + child.slice(1)}`]) {
        setErrors(prev => ({
          ...prev,
          [`${parent}${child.charAt(0).toUpperCase() + child.slice(1)}`]: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddItem = () => {
    setFormData(prev => {
      const currentItems = Array.isArray(prev.items) ? prev.items : [];

      return {
        ...prev,
        items: [
          ...currentItems,
          {
            description: '',
            quantity: 1,
            weight: 0,
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
            },
          },
        ],
      };
    });
  };

  const handleRemoveItem = (index) => {
    if (formData.items.length === 1) return;

    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleAddCheckpoint = () => {
    setFormData(prev => ({
      ...prev,
      checkpoints: [
        ...prev.checkpoints,
        {
          name: `Checkpoint ${prev.checkpoints.length + 1}`,
          location: {
            address: '',
            coordinates: [0, 0],
            addressDetails: ''
          },
          estimatedArrival: null,
          notes: ''
        }
      ]
    }));
  };

  const handleRemoveCheckpoint = (index) => {
    setFormData(prev => {
      const updatedCheckpoints = [...prev.checkpoints];
      updatedCheckpoints.splice(index, 1);

      const renamedCheckpoints = updatedCheckpoints.map((cp, i) => ({
        ...cp,
        name: `Checkpoint ${i + 1}`
      }));

      return {
        ...prev,
        checkpoints: renamedCheckpoints
      };
    });
  };

  const handleCheckpointChange = (index, field, value) => {
    setFormData(prev => {
      const updatedCheckpoints = [...prev.checkpoints];

      if (field === 'name' || field === 'notes') {
        updatedCheckpoints[index] = {
          ...updatedCheckpoints[index],
          [field]: value
        };
      } else if (field === 'estimatedArrival') {
        updatedCheckpoints[index] = {
          ...updatedCheckpoints[index],
          [field]: value
        };
      } else if (field === 'location.addressDetails') {
        updatedCheckpoints[index] = {
          ...updatedCheckpoints[index],
          location: {
            ...updatedCheckpoints[index].location,
            addressDetails: value
          }
        };
      }

      return {
        ...prev,
        checkpoints: updatedCheckpoints
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    for (let step = 1; step <= steps.length; step++) {
      if (!validateStep(step)) {
        isValid = false;
        setCurrentStep(step);
        break;
      }
    }

    if (!isValid) {
      enqueueSnackbar('Please correct the errors before submitting', { variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      const shipmentData = {
        origin: {
          coordinates: formData.origin.coordinates,
          address: formData.origin.address + (formData.origin.addressDetails ? `, ${formData.origin.addressDetails}` : '')
        },
        destination: {
          coordinates: formData.destination.coordinates,
          address: formData.destination.address + (formData.destination.addressDetails ? `, ${formData.destination.addressDetails}` : '')
        },
        checkpoints: formData.checkpoints.map(checkpoint => ({
          name: checkpoint.name,
          location: {
            coordinates: checkpoint.location.coordinates,
            address: checkpoint.location.address + (checkpoint.location.addressDetails ? `, ${checkpoint.location.addressDetails}` : '')
          },
          estimatedArrival: checkpoint.estimatedArrival,
          notes: checkpoint.notes
        })),
        customer: {
          name: formData.customer.name,
          email: formData.customer.email,
          phone: getFullPhoneNumber()
        },
        items: formData.items.map(item => ({
          description: item.description,
          quantity: parseInt(item.quantity, 10),
          weight: parseFloat(item.weight),
          dimensions: {
            length: parseFloat(item.dimensions.length),
            width: parseFloat(item.dimensions.width),
            height: parseFloat(item.dimensions.height)
          }
        })),
        estimatedDelivery: formData.estimatedDelivery
      };

      const response = await createShipment(shipmentData);

      enqueueSnackbar('Shipment created successfully!', { variant: 'success' });

      if (response && response.data && response.data.trackingNumber) {
        navigate(`/tracking/${response.data.trackingNumber}`);
      } else if (response && response.trackingNumber) {
        navigate(`/tracking/${response.trackingNumber}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating shipment:', error);
      enqueueSnackbar(error.message || 'Failed to create shipment', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const renderStep2 = () => (
    <Fade in={true} timeout={500}>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 3,
            color: 'primary.main',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PersonIcon />
          Customer Information
        </Typography>

        <Card elevation={0} sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.primary.light}30`,
          bgcolor: 'background.default',
        }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
            Contact Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customer.name"
                value={formData.customer.name}
                onChange={handleInputChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="customer.email"
                value={formData.customer.email}
                onChange={handleInputChange}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail || "Format: example@domain.com"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="flex-start" gap={1}>
                <FormControl sx={{ width: '40%', mt: 1 }}>
                  <InputLabel id="country-code-label">Country Code</InputLabel>
                  <Select
                    labelId="country-code-label"
                    value={formData.customer.phoneCountryCode}
                    onChange={handleCountryCodeChange}
                    label="Country Code"
                    sx={{ borderRadius: 2 }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {countryCodes.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                          <Typography variant="caption" color="text.secondary">
                            {country.country}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="customer.phone"
                  value={formData.customer.phone}
                  onChange={handleInputChange}
                  error={!!errors.customerPhone}
                  helperText={errors.customerPhone || "Enter digits, spaces, and dashes only"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Box>

              {!errors.customerPhone && formData.customer.phone && (
                <FormHelperText sx={{ mt: 1 }}>
                  Full number: {getFullPhoneNumber()}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Fade>
  );

  const renderStep3 = () => (
    <Fade in={true} timeout={500}>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 3,
            color: 'primary.main',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PackageIcon />
          Shipment Items
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <AssignmentIcon sx={{ mr: 1, color: 'error.main' }} />
            Items in Shipment
            <Chip
              label={formData.items.length}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            sx={{ borderRadius: 2 }}
          >
            Add Item
          </Button>
        </Box>

        {Array.isArray(formData.items) ? formData.items.map((item, index) => (
          <Slide
            key={index}
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Card
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                position: 'relative',
                borderRadius: 3,
                borderLeft: `4px solid ${theme.palette.error.main}`,
                '&:hover': {
                  boxShadow: theme.shadows[6],
                },
                transition: 'all 0.3s ease',
              }}
            >
              {formData.items.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => handleRemoveItem(index)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'error.main',
                    bgcolor: 'error.light',
                    '&:hover': { bgcolor: 'error.main', color: 'white' },
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              )}

              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Avatar sx={{ bgcolor: 'error.light', color: 'error.main', width: 24, height: 24 }}>
                  {index + 1}
                </Avatar>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  Item {index + 1}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name={`items.${index}.description`}
                    value={item.description}
                    onChange={handleInputChange}
                    error={!!errors[`item-${index}-description`]}
                    helperText={errors[`item-${index}-description`]}
                    required
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    name={`items.${index}.quantity`}
                    value={item.quantity}
                    onChange={handleInputChange}
                    error={!!errors[`item-${index}-quantity`]}
                    helperText={errors[`item-${index}-quantity`]}
                    inputProps={{ min: 1 }}
                    required
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    name={`items.${index}.weight`}
                    value={item.weight}
                    onChange={handleInputChange}
                    inputProps={{ min: 0, step: 0.1 }}
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 1, fontWeight: 'medium' }}>
                    Dimensions (cm)
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Length"
                        type="number"
                        name={`items.${index}.dimensions.length`}
                        value={item.dimensions.length}
                        onChange={handleInputChange}
                        inputProps={{ min: 0, step: 0.1 }}
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Width"
                        type="number"
                        name={`items.${index}.dimensions.width`}
                        value={item.dimensions.width}
                        onChange={handleInputChange}
                        inputProps={{ min: 0, step: 0.1 }}
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Height"
                        type="number"
                        name={`items.${index}.dimensions.height`}
                        value={item.dimensions.height}
                        onChange={handleInputChange}
                        inputProps={{ min: 0, step: 0.1 }}
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Slide>
        )) : (
          <Typography color="error">
            No items available. Please go back and try again.
          </Typography>
        )}
      </Box>
    </Fade>
  );

  const renderStep1 = () => (
    <Fade in={true} timeout={500}>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 3,
            color: 'primary.main',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TimelineIcon />
          Shipment Route
        </Typography>

        {/* Origin Address */}
        <Card elevation={0} sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.primary.light}30`,
          bgcolor: 'background.default',
        }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
            Origin Address
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            label="Search for origin address"
            value={formData.origin.address}
            onChange={(e) => handleAddressChange('origin', e.target.value)}
            error={!!errors.origin}
            helperText={errors.origin}
            onFocus={() => setFocusedField('origin')}
            onBlur={() => setTimeout(() => setFocusedField(null), 200)}
            sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {focusedField === 'origin' && originPredictions.length > 0 && (
            <Paper elevation={3} sx={{ mt: 1, maxHeight: 200, overflow: 'auto', borderRadius: 2 }}>
              <List>
                {originPredictions.map((place) => (
                  <ListItem
                    button
                    key={place.id}
                    onClick={() => handlePlaceSelect('origin', place)}
                    sx={{
                      '&:hover': { bgcolor: 'primary.light' },
                    }}
                  >
                    <ListItemText
                      primary={formatAddressDisplay(place)}
                      secondary={place.country}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          <TextField
            fullWidth
            label="Additional Address Details (optional)"
            name="origin.addressDetails"
            value={formData.origin.addressDetails}
            onChange={handleInputChange}
            placeholder="Apartment, suite, unit, building, floor, etc."
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Card>

        {/* Checkpoints */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <RouteIcon sx={{ mr: 1, color: 'secondary.main' }} />
              Checkpoints (Optional)
              {formData.checkpoints.length > 0 && (
                <Chip
                  label={formData.checkpoints.length}
                  size="small"
                  color="secondary"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>

            <Button
              startIcon={<AddIcon />}
              onClick={handleAddCheckpoint}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Add Checkpoint
            </Button>
          </Box>

          {formData.checkpoints.map((checkpoint, index) => (
            <Slide
              key={index}
              direction="up"
              in={true}
              mountOnEnter
              unmountOnExit
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card
                elevation={2}
                sx={{
                  p: 3,
                  mb: 2,
                  borderRadius: 3,
                  borderLeft: `4px solid ${theme.palette.secondary.main}`,
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 24, height: 24 }}>
                          {index + 1}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          Checkpoint {index + 1}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveCheckpoint(index)}
                        sx={{
                          bgcolor: 'error.light',
                          '&:hover': { bgcolor: 'error.main', color: 'white' },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Checkpoint Name"
                      value={checkpoint.name}
                      onChange={(e) => handleCheckpointChange(index, 'name', e.target.value)}
                      error={!!errors.checkpoints?.[index]?.name}
                      helperText={errors.checkpoints?.[index]?.name}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Estimated Arrival Date"
                      type="date"
                      value={checkpoint.estimatedArrival ? new Date(checkpoint.estimatedArrival).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleCheckpointChange(index, 'estimatedArrival', e.target.value ? new Date(e.target.value) : null)}
                      InputLabelProps={{ shrink: true }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Search for checkpoint address"
                      value={checkpoint.location.address}
                      onChange={(e) => handleAddressChange('checkpoint', e.target.value, index)}
                      error={!!errors.checkpoints?.[index]?.address}
                      helperText={errors.checkpoints?.[index]?.address}
                      onFocus={() => setActiveCheckpointIndex(index)}
                      onBlur={() => setTimeout(() => setActiveCheckpointIndex(null), 200)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    {activeCheckpointIndex === index && checkpointPredictions.length > 0 && (
                      <Paper elevation={3} sx={{ mt: 1, maxHeight: 200, overflow: 'auto', borderRadius: 2 }}>
                        <List>
                          {checkpointPredictions.map((place) => (
                            <ListItem
                              button
                              key={place.id}
                              onClick={() => handlePlaceSelect('checkpoint', place, index)}
                              sx={{
                                '&:hover': { bgcolor: 'secondary.light' },
                              }}
                            >
                              <ListItemText
                                primary={formatAddressDisplay(place)}
                                secondary={place.country}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )}

                    <TextField
                      fullWidth
                      label="Additional Address Details (optional)"
                      value={checkpoint.location.addressDetails || ''}
                      onChange={(e) => handleCheckpointChange(index, 'location.addressDetails', e.target.value)}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      margin="normal"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes (Optional)"
                      value={checkpoint.notes}
                      onChange={(e) => handleCheckpointChange(index, 'notes', e.target.value)}
                      multiline
                      rows={2}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Slide>
          ))}
        </Box>

        {/* Destination Address */}
        <Card elevation={0} sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.success.light}30`,
          bgcolor: 'background.default',
        }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <FlagIcon sx={{ mr: 1, color: 'success.main' }} />
            Destination Address
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            label="Search for destination address"
            value={formData.destination.address}
            onChange={(e) => handleAddressChange('destination', e.target.value)}
            error={!!errors.destination}
            helperText={errors.destination}
            onFocus={() => setFocusedField('destination')}
            onBlur={() => setTimeout(() => setFocusedField(null), 200)}
            sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {focusedField === 'destination' && destinationPredictions.length > 0 && (
            <Paper elevation={3} sx={{ mt: 1, maxHeight: 200, overflow: 'auto', borderRadius: 2 }}>
              <List>
                {destinationPredictions.map((place) => (
                  <ListItem
                    button
                    key={place.id}
                    onClick={() => handlePlaceSelect('destination', place)}
                    sx={{
                      '&:hover': { bgcolor: 'success.light' },
                    }}
                  >
                    <ListItemText
                      primary={formatAddressDisplay(place)}
                      secondary={place.country}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          <TextField
            fullWidth
            label="Additional Address Details (optional)"
            name="destination.addressDetails"
            value={formData.destination.addressDetails}
            onChange={handleInputChange}
            placeholder="Apartment, suite, unit, building, floor, etc."
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Card>

        {/* Estimated Delivery Date */}
        <Card elevation={0} sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.warning.light}30`,
          bgcolor: 'background.default',
        }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <CalendarIcon sx={{ mr: 1, color: 'warning.main' }} />
            Estimated Delivery Date
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            type="date"
            value={formData.estimatedDelivery ? new Date(formData.estimatedDelivery).toISOString().split('T')[0] : ''}
            onChange={(e) => handleInputChange({
              target: {
                name: 'estimatedDelivery',
                value: e.target.value ? new Date(e.target.value) : null
              }
            })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.estimatedDelivery}
            helperText={errors.estimatedDelivery}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Card>
      </Box>
    </Fade>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            bgcolor: 'background.paper',
          }}
        >
          <Box mb={4} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
                sx={{ mr: 2, borderRadius: 2 }}
              >
                Back
              </Button>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Create New Shipment
              </Typography>
            </Box>

            <Tooltip title="Need help?" arrow>
              <Chip
                icon={<InfoIcon />}
                label="Help"
                variant="outlined"
                onClick={() => enqueueSnackbar('Contact support for assistance', { variant: 'info' })}
                sx={{ borderRadius: 2 }}
              />
            </Tooltip>
          </Box>

          {/* Stepper */}
          <Box sx={{ mb: 4 }}>
            <Stepper
              activeStep={currentStep - 1}
              alternativeLabel
              sx={{
                '& .MuiStepIcon-root': {
                  fontSize: isMobile ? 24 : 32,
                },
                '& .MuiStepLabel-label': {
                  fontSize: isMobile ? '0.7rem' : '0.875rem',
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={() => (
                    <Box
                      sx={{
                        width: isMobile ? 32 : 40,
                        height: isMobile ? 32 : 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: currentStep - 1 >= index ? 'primary.main' : 'grey.300',
                        color: currentStep - 1 >= index ? 'white' : 'grey.600',
                        transition: 'all 0.3s ease',
                        transform: currentStep - 1 === index ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: currentStep - 1 === index ? `0 0 0 8px ${theme.palette.primary.light}40` : 'none',
                      }}
                    >
                      {stepIcons[index]}
                    </Box>
                  )}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: currentStep - 1 === index ? 'bold' : 'medium',
                        color: currentStep - 1 >= index ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Step Content */}
            <Box sx={{ minHeight: '50vh' }}>
              {renderStep()}
            </Box>

            {/* Navigation Buttons */}
            <Box mt={4} display="flex" justifyContent="space-between" sx={{ gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentStep === 1 || loading}
                startIcon={<ArrowBackIcon />}
                sx={{ borderRadius: 2, minWidth: isMobile ? 'auto' : 120 }}
              >
                Back
              </Button>

              <Box>
                {currentStep < steps.length ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={loading}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: 2,
                      minWidth: isMobile ? 'auto' : 120,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckIcon />}
                    sx={{
                      borderRadius: 2,
                      minWidth: isMobile ? 'auto' : 160,
                      background: loading ? '' : `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                    }}
                  >
                    {loading ? 'Creating...' : 'Create Shipment'}
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Slide>
    </Container>
  );
};

export default CreateShipmentPage;