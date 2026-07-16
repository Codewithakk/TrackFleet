import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { styled } from '@mui/material/styles';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
  { name: 'Create Shipment', path: '/create', icon: <AddIcon fontSize="small" /> },
  { name: 'About', path: '/about', icon: <InfoIcon fontSize="small" /> },
  { name: 'Contact', path: '/contact', icon: <ContactSupportIcon fontSize="small" /> },
];

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.2s ease, opacity 0.2s ease',
  '&:hover': {
    opacity: 0.9,
    transform: 'scale(1.02)',
  },
}));

// Using transient prop ($active) to eliminate DOM attribute pollution warnings
const NavButton = styled(Button, { shouldForwardProp: (prop) => prop !== '$active' })(
  ({ theme, $active }) => ({
    color: $active ? theme.palette.primary.main : theme.palette.text.primary,
    margin: theme.spacing(0, 0.75),
    padding: theme.spacing(1, 2),
    fontWeight: $active ? 600 : 500,
    textTransform: 'none',
    fontSize: '0.925rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    '&:hover': {
      backgroundColor: $active ? `${theme.palette.primary.main}08` : theme.palette.action.hover,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: $active ? '40%' : '0%',
      height: '3px',
      bottom: '2px',
      left: '30%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px',
      transition: 'width 0.2s ease-in-out, left 0.2s ease-in-out',
    },
    '&:hover::after': {
      width: '40%',
      left: '30%',
      backgroundColor: $active ? theme.palette.primary.main : theme.palette.text.disabled,
    }
  })
);

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(16px)',
        zIndex: theme.zIndex.appBar + 1,
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar disableGutters>

          {/* Unified Corporate Logo - Desktop Layout */}
          <LogoContainer component={RouterLink} to="/" sx={{ textDecoration: 'none', display: { xs: 'none', md: 'flex' } }}>
            <Avatar sx={{
              bgcolor: 'primary.main',
              width: 38,
              height: 38,
              mr: 1.5,
              boxShadow: `0 4px 10px -2px ${theme.palette.primary.main}50`
            }}>
              <LocalShippingIcon sx={{ fontSize: '1.3rem' }} />
            </Avatar>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.3px',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Track<Box component="span" sx={{ color: 'primary.main' }}>Fleet</Box>
            </Typography>
          </LogoContainer>

          {/* Mobile Drawer Menu Triggers */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1.5, minWidth: 200, borderRadius: 2 }
              }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => {
                const isPageActive = location.pathname === page.path;
                return (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                    selected={isPageActive}
                    sx={{
                      py: 1.25,
                      mx: 1,
                      my: 0.5,
                      borderRadius: 1,
                      color: isPageActive ? 'primary.main' : 'text.primary',
                      fontWeight: isPageActive ? 600 : 400,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {page.icon}
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 'inherit' }}>
                        {page.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Cohesive Corporate Logo - Mobile Breakpoint Layout */}
          <LogoContainer
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              justifyContent: { xs: 'flex-start', sm: 'center' }
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>
              <LocalShippingIcon sx={{ fontSize: '1.1rem' }} />
            </Avatar>
            <Typography variant="h6" noWrap sx={{ fontWeight: 800, letterSpacing: '-0.3px', color: 'text.primary' }}>
              Track<Box component="span" sx={{ color: 'primary.main' }}>Fleet</Box>
            </Typography>
          </LogoContainer>

          {/* Desktop Navigation Link Hub */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <NavButton
                key={page.name}
                component={RouterLink}
                to={page.path}
                $active={location.pathname === page.path}
                onClick={handleCloseNavMenu}
                startIcon={page.icon}
              >
                {page.name}
              </NavButton>
            ))}
          </Box>

          {/* Global Utility Quick Action CTA */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Track an existing cargo asset" arrow>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/"
                startIcon={<SearchIcon />}
                disableElevation
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  px: 2.5,
                  py: 0.75,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Track Cargo
              </Button>
            </Tooltip>
          </Box>

        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Header;