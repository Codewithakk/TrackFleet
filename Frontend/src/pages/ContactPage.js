import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  CardMedia,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Fade,
  Slide,
  Zoom,
  alpha,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import BusinessIcon from '@mui/icons-material/Business';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const contactReasons = [
  'General Inquiry',
  'Shipment Issue',
  'Technical Support',
  'Billing Question',
  'Partnership Opportunity',
  'Other'
];

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
  borderRadius: '20px',
  padding: theme.spacing(5, 4),
  marginBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
    borderColor: theme.palette.primary.main,
  },
}));

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for contact';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message is too short (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSnackbar({
        open: true,
        message: '✅ Your message has been sent successfully! We will get back to you soon.',
        severity: 'success'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
        message: ''
      });
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email Us',
      detail: 'support@trackfleet.com',
      subtitle: 'We reply within 24 hours',
    },
    {
      icon: <PhoneIcon />,
      title: 'Call Us',
      detail: '+91 9658741230',
      subtitle: 'Mon-Fri, 9AM - 6PM EST',
    },
    {
      icon: <SupportAgentIcon />,
      title: 'Live Chat',
      detail: '24/7 Support Available',
      subtitle: 'Instant assistance',
    },
    {
      icon: <BusinessIcon />,
      title: 'Visit Us',
      detail: '123 Abcd, DG, CD 965874',
      subtitle: 'Book an appointment',
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in={true} timeout={800}>
          <HeroSection>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Chip
                  label="📬 Get in Touch"
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
                  Let's Talk
                </Typography>
                <Typography
                  variant="body1"
                  color="grey.400"
                  sx={{
                    maxWidth: 500,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  Have questions about your shipment or need assistance?
                  Our team is here to help you every step of the way.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    label="⚡ Quick Response"
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.08),
                      color: 'common.white',
                      borderColor: alpha(theme.palette.common.white, 0.1),
                    }}
                    variant="outlined"
                  />
                  <Chip
                    label="🎯 Expert Support"
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.08),
                      color: 'common.white',
                      borderColor: alpha(theme.palette.common.white, 0.1),
                    }}
                    variant="outlined"
                  />
                  <Chip
                    label="🤝 24/7 Available"
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.08),
                      color: 'common.white',
                      borderColor: alpha(theme.palette.common.white, 0.1),
                    }}
                    variant="outlined"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <SupportAgentIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                  </Avatar>
                </Box>
              </Grid>
            </Grid>
          </HeroSection>
        </Fade>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Slide direction="right" in={true} timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: '20px',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  Send Us a Message
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        variant="outlined"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        variant="outlined"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number (Optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Reason for Contact"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        error={!!errors.reason}
                        helperText={errors.reason}
                        required
                        variant="outlined"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      >
                        {contactReasons.map((reason) => (
                          <MenuItem key={reason} value={reason}>
                            {reason}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                        variant="outlined"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={<SendIcon />}
                        sx={{
                          px: 4,
                          py: 1.2,
                          borderRadius: '12px',
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Slide>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Slide direction="left" in={true} timeout={800}>
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: '20px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    bgcolor: theme.palette.background.paper,
                    mb: 3,
                  }}
                >
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    Get In Touch
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    We're always happy to hear from you. Reach out to us using any of these channels:
                  </Typography>

                  <Stack spacing={2}>
                    {contactInfo.map((item, index) => (
                      <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                        <InfoCard elevation={0}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                width: 44,
                                height: 44,
                              }}
                            >
                              {item.icon}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                {item.title}
                              </Typography>
                              <Typography variant="body1" fontWeight="600">
                                {item.detail}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.subtitle}
                              </Typography>
                            </Box>
                          </Box>
                        </InfoCard>
                      </Zoom>
                    ))}
                  </Stack>
                </Paper>

                {/* Office Hours */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '20px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main }}>
                      <AccessTimeIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Office Hours
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        Monday - Friday: 9:00 AM - 6:00 PM EST
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        Saturday - Sunday: Closed
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Location Image */}
                <Box sx={{ mt: 3 }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image="/images/office-location.jpg"
                    alt="Our Office"
                    sx={{
                      borderRadius: '16px',
                      objectFit: 'cover',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" textAlign="center" display="block" sx={{ mt: 1 }}>
                    📍 Our headquarters in Abcd
                  </Typography>
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: '12px',
              '& .MuiAlert-icon': { alignItems: 'center' },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactPage;