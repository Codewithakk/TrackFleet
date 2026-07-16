import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Divider,
  IconButton,
  useTheme,
  alpha,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FacebookIcon />, label: 'Facebook', color: '#1877f2' },
    { icon: <TwitterIcon />, label: 'Twitter', color: '#1da1f2' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0a66c2' },
    { icon: <InstagramIcon />, label: 'Instagram', color: '#e4405f' },
  ];

  const footerSections = {
    navigation: {
      title: 'Quick Links',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Track Shipment', path: '/track' },
        { label: 'Create Shipment', path: '/create-shipment' },
        { label: 'Pricing', path: '/pricing' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Blog', path: '/blog' },
        { label: 'Partners', path: '/partners' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Contact Support', path: '/contact' },
        { label: 'Report Issue', path: '/report' },
        { label: 'FAQ', path: '/faq' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
        { label: 'GDPR', path: '/gdpr' },
      ],
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        position: 'relative',
      }}
    >
      {/* Back to top button */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
              bgcolor: 'primary.dark',
            },
          }}
          onClick={scrollToTop}
        >
          <KeyboardArrowUpIcon />
        </Paper>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 8, pb: 4 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 2,
                    p: 1,
                    mr: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocalShippingIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" color="text.primary" fontWeight="bold">
                  Track
                  <Box
                    component="span"
                    sx={{
                      color: 'primary.main',
                      ml: 0.5,
                    }}
                  >
                    Fleet
                  </Box>
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.8, maxWidth: 400 }}
              >
                Track your shipments in real-time with our advanced tracking system.
                We provide reliable and fast shipping services worldwide with 24/7 support.
              </Typography>
            </Box>

            {/* Contact Info */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  support@trackfleet.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  +91 974563210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  123 Floor, ABCD, ZG 12345
                </Typography>
              </Box>
            </Stack>

            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <Tooltip title={social.label} key={social.label}>
                  <IconButton
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: alpha(social.color, 0.15),
                        transform: 'translateY(-3px)',
                        color: social.color,
                      },
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Grid>

          {/* Footer Sections */}
          {Object.values(footerSections).map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                gutterBottom
                fontWeight="600"
                sx={{ mb: 2 }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.label} sx={{ py: 0.75 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-block',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Track Fleet. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              component={RouterLink}
              to="/privacy"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.8rem',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.8rem',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/cookies"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.8rem',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Cookie Policy
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
            >
              Version 2.0.1
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;