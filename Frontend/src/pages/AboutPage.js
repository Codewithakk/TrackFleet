import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  Fade,
  Slide,
  Zoom,
  Stack,
  Button,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import InsightsIcon from '@mui/icons-material/Insights';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldIcon from '@mui/icons-material/Shield';
import DevicesIcon from '@mui/icons-material/Devices';

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components - Clean Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
  borderRadius: '20px',
  padding: theme.spacing(6, 4),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  minHeight: '320px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2),
    minHeight: '280px',
  },
}));

const HeroIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  borderRadius: '16px',
  padding: theme.spacing(1.5),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  animation: `${floatAnimation} 3s ease-in-out infinite`,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  borderRadius: '16px',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    borderColor: theme.palette.primary.main,
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '16px',
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
  },
}));

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <LocalShippingIcon />,
      title: 'Global Coverage',
      description: 'Track shipments across 100+ countries with our extensive logistics network.',
      image: '/images/global-coverage.jpg',
    },
    {
      icon: <TrackChangesIcon />,
      title: 'Real-Time Tracking',
      description: 'Monitor your shipments with precision GPS tracking and instant updates.',
      image: '/images/real-time.jpg',
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure Platform',
      description: 'Advanced encryption and security protocols protect your data.',
      image: '/images/security.jpg',
    },
    {
      icon: <SupportAgentIcon />,
      title: '24/7 Support',
      description: 'Our dedicated team is available around the clock to assist you.',
      image: '/images/support.jpg',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '1M+', label: 'Shipments Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9★', label: 'User Rating' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Clean Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box>
                <Chip
                  label="Trusted by 10,000+ users"
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
                  About Our Shipment Tracking
                </Typography>
                <Typography
                  variant="body1"
                  color="grey.400"
                  sx={{
                    maxWidth: 550,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  We're revolutionizing logistics with real-time tracking and transparency
                  for businesses and individuals worldwide.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="/create"
                    sx={{
                      borderRadius: '12px',
                      px: 4,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    href="/track"
                    sx={{
                      borderRadius: '12px',
                      px: 4,
                      color: 'common.white',
                      borderColor: alpha(theme.palette.common.white, 0.2),
                      '&:hover': {
                        borderColor: theme.palette.common.white,
                        bgcolor: alpha(theme.palette.common.white, 0.05),
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Track Now
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <HeroIconWrapper>
                  <LocalShippingIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                </HeroIconWrapper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Zoom in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
              <StatsCard>
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </StatsCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Our Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 600, letterSpacing: 2 }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
            >
              Making Logistics Simple & Transparent
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary' }}
            >
              Our mission is to simplify logistics and provide unprecedented transparency in the shipping process.
              We believe that everyone deserves to know exactly where their packages are at all times.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary' }}
            >
              Founded in 2023, our tracking platform has quickly become a trusted solution for businesses
              and individuals who need reliable shipment tracking services.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                overflow: 'hidden',
                borderRadius: '16px',
                height: 300,
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image="/images/mission-image.jpg"
                alt="Logistics mission"
                sx={{ objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 3,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                }}
              >
                <Typography
                  variant="body1"
                  color="common.white"
                  align="center"
                  sx={{ fontStyle: 'italic', fontWeight: 500 }}
                >
                  "Delivering visibility and peace of mind with every shipment tracked."
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 600, letterSpacing: 2 }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
          >
            Powerful Features for Every Need
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <FeatureCard elevation={0}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={feature.image}
                    alt={feature.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Technology Section */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                overflow: 'hidden',
                borderRadius: '16px',
                height: 280,
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image="/images/technology.jpg"
                alt="Technology"
                sx={{ objectFit: 'cover' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 600, letterSpacing: 2 }}
            >
              Technology
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
            >
              Built for Scale & Performance
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary' }}
            >
              We use cutting-edge technology to provide the most accurate and reliable tracking information.
              Our platform is built on a modern tech stack designed to handle millions of requests daily.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 6 }} />

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Join thousands of satisfied users who trust our platform.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            href="/create"
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Create Shipment
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="/track"
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Track Now
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AboutPage;