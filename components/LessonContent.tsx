'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Fab,
  Zoom,
  Fade,
  Slide,
  Button,
  alpha,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon,
  Security as SecurityIcon,
  BugReport as BugIcon,
  Lightbulb as TipIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  LocalHospital as ImpactIcon,
  Shield as ShieldIcon,
  KeyboardArrowUp as UpIcon,
  NavigateNext as NextIcon,
  Code as CodeIcon,
  AutoAwesome as SparkleIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';

interface LessonContentProps {
  htmlContent: string;
}

export default function LessonContent({ htmlContent }: LessonContentProps) {
  const [mounted, setMounted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    setTimeout(() => {
      document.querySelectorAll('.animated-section').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const extractTitle = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('.header h1')?.textContent || 
           doc.querySelector('h1')?.textContent || 
           'Lesson';
  };

  const extractSubtitle = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('.header p')?.textContent || '';
  };

  const extractBreadcrumbs = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll('.breadcrumb a')).map(a => a.textContent);
  };

  if (!mounted) {
    return (
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 400,
        gap: 2,
      }}>
        <Box sx={{ 
          width: 60, 
          height: 60, 
          borderRadius: '50%',
          border: '4px solid',
          borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main} transparent`,
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          }
        }} />
        <Typography variant="body2" color="text.secondary">Loading lesson...</Typography>
      </Box>
    );
  }

  const title = extractTitle(htmlContent);
  const subtitle = extractSubtitle(htmlContent);
  const breadcrumbs = extractBreadcrumbs(htmlContent);

  return (
    <Box 
      className="LessonContent"
      sx={{ 
        minHeight: '100%',
        bgcolor: 'background.default',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: isDark 
            ? 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(102, 126, 234, 0.03) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      {/* Hero Section with Animation */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            background: isDark
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: { xs: 5, md: 8 },
            px: { xs: 2, md: 4 },
            borderRadius: 0,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '40%',
              height: '200%',
              background: 'rgba(255,255,255,0.05)',
              transform: 'rotate(-15deg)',
              animation: 'shimmer 3s infinite',
              '@keyframes shimmer': {
                '0%, 100%': { transform: 'rotate(-15deg) translateX(-100%)' },
                '50%': { transform: 'rotate(-15deg) translateX(100%)' },
              }
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Fade in timeout={800}>
              <Box>
                <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                  <Chip
                    icon={<SecurityIcon />}
                    label="Security Lesson"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.25)',
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.35)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  />
                  <Chip
                    icon={<SparkleIcon />}
                    label="Interactive"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.25)',
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  />
                </Stack>
              </Box>
            </Fade>

            <Slide direction="up" in timeout={600}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                fontWeight={800} 
                gutterBottom
                sx={{ 
                  textShadow: '2px 2px 12px rgba(0,0,0,0.3)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                  mb: 2,
                }}
              >
                {title}
              </Typography>
            </Slide>

            {subtitle && (
              <Fade in timeout={1000}>
                <Typography 
                  variant={isMobile ? 'body1' : 'h6'} 
                  sx={{ 
                    opacity: 0.95, 
                    fontWeight: 300,
                    maxWidth: '800px',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {subtitle}
                </Typography>
              </Fade>
            )}

            {/* Decorative Elements */}
            <Box sx={{
              position: 'absolute',
              bottom: -20,
              right: { xs: -50, md: 50 },
              width: { xs: 150, md: 200 },
              height: { xs: 150, md: 200 },
              opacity: 0.1,
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-20px) rotate(180deg)' },
              }
            }}>
              <ShieldIcon sx={{ fontSize: '100%', width: '100%', height: '100%' }} />
            </Box>
          </Container>
        </Paper>

        {/* Breadcrumbs with Animation */}
        {breadcrumbs.length > 0 && (
          <Fade in timeout={1200}>
            <Paper 
              elevation={0} 
              sx={{ 
                py: 2,
                px: { xs: 2, md: 4 },
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Container maxWidth="lg">
                <Breadcrumbs 
                  separator={<NextIcon fontSize="small" />}
                  sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                >
                  {breadcrumbs.map((crumb, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      underline="hover"
                      color="inherit"
                      sx={{ 
                        fontWeight: idx === breadcrumbs.length - 1 ? 600 : 400,
                        color: idx === breadcrumbs.length - 1 ? 'primary.main' : 'text.primary',
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateX(2px)',
                        }
                      }}
                    >
                      {crumb}
                    </Link>
                  ))}
                </Breadcrumbs>
              </Container>
            </Paper>
          </Fade>
        )}
      </Box>

      {/* Main Content with Enhanced Styling */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            // Intro Section - Orange Theme
            '& .intro-section': {
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 224, 178, 0.1) 100%)'
                : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              borderLeft: '6px solid #ff9800',
              boxShadow: isDark 
                ? '0 4px 20px rgba(255, 152, 0, 0.1)' 
                : '0 4px 20px rgba(255, 152, 0, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark 
                  ? '0 8px 30px rgba(255, 152, 0, 0.2)' 
                  : '0 8px 30px rgba(255, 152, 0, 0.25)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }
            },
            '& .intro-section h2': {
              color: '#e65100',
              fontSize: { xs: '1.4rem', md: '1.7rem' },
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&::before': {
                content: '"🎯"',
                fontSize: '1.5em',
              }
            },
            '& .intro-section p': {
              lineHeight: 1.9,
              mb: 1.5,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: isDark ? 'rgba(255,255,255,0.9)' : '#424242',
            },
            
            // Regular Section - Purple Theme
            '& .section': {
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              boxShadow: isDark 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : '0 4px 20px rgba(0,0,0,0.06)',
              borderLeft: '6px solid',
              borderColor: 'primary.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark 
                  ? '0 8px 30px rgba(0,0,0,0.4)' 
                  : '0 8px 30px rgba(0,0,0,0.1)',
              }
            },
            '& .section h2': {
              color: 'primary.main',
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 700,
              mb: 3,
              pb: 2,
              borderBottom: '3px solid',
              borderColor: alpha(theme.palette.primary.main, 0.3),
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            },
            '& .section h3': {
              color: 'secondary.main',
              fontSize: { xs: '1.25rem', md: '1.4rem' },
              fontWeight: 600,
              mt: 4,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            },
            '& .section p': {
              lineHeight: 1.9,
              mb: 2.5,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: 'text.primary',
            },
            
            // Concept Box - Purple Theme
            '& .concept-box': {
              bgcolor: isDark 
                ? 'rgba(156, 39, 176, 0.1)' 
                : '#f3e5f5',
              border: '2px solid',
              borderColor: '#9c27b0',
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              mb: 3,
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#7b1fa2',
                bgcolor: isDark 
                  ? 'rgba(156, 39, 176, 0.15)' 
                  : '#e1bee7',
                transform: 'scale(1.01)',
              },
              '&::before': {
                content: '"💡"',
                position: 'absolute',
                top: { xs: 10, md: 15 },
                right: { xs: 10, md: 15 },
                fontSize: { xs: '2rem', md: '2.5rem' },
                opacity: 0.2,
              }
            },
            '& .concept-box h4': {
              color: '#6a1b9a',
              fontSize: { xs: '1.15rem', md: '1.25rem' },
              fontWeight: 600,
              mb: 1.5,
            },
            
            // Example Box - Green Theme
            '& .example-box': {
              bgcolor: isDark 
                ? 'rgba(76, 175, 80, 0.1)' 
                : '#e8f5e9',
              border: '2px solid #4caf50',
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              mb: 3,
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#388e3c',
                bgcolor: isDark 
                  ? 'rgba(76, 175, 80, 0.15)' 
                  : '#c8e6c9',
                transform: 'scale(1.01)',
              }
            },
            '& .example-box h4': {
              color: '#2e7d32',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&::before': {
                content: '"📝"',
                fontSize: '1.3em',
              }
            },
            '& .example-box code': {
              display: 'block',
              bgcolor: isDark ? '#0a0a0a' : '#1e1e1e',
              color: '#4caf50',
              p: { xs: 1.5, md: 2 },
              borderRadius: 2,
              fontFamily: '"Fira Code", "Consolas", Monaco, monospace',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              mb: 1,
              overflowX: 'auto',
              lineHeight: 1.6,
              border: '1px solid',
              borderColor: 'rgba(76, 175, 80, 0.3)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            },
            
            // Scenario Cards - Cyan Theme
            '& .scenario-card': {
              bgcolor: 'background.paper',
              border: '2px solid',
              borderColor: isDark ? 'rgba(0, 188, 212, 0.3)' : '#e0e0e0',
              borderLeft: '6px solid #00bcd4',
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              mb: 3,
              boxShadow: isDark 
                ? '0 4px 15px rgba(0, 188, 212, 0.1)' 
                : '0 4px 15px rgba(0,0,0,0.06)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: isDark 
                  ? '0 8px 25px rgba(0, 188, 212, 0.2)' 
                  : '0 8px 25px rgba(0,0,0,0.12)',
                transform: 'translateY(-6px) scale(1.02)',
                borderColor: '#00bcd4',
              }
            },
            '& .scenario-card h3': {
              color: '#00838f',
              fontSize: { xs: '1.15rem', md: '1.3rem' },
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            },
            
            // IDOR Section - Orange/Yellow Theme
            '& .idor-section': {
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 249, 196, 0.1) 0%, rgba(255, 245, 157, 0.05) 100%)'
                : 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              borderLeft: '6px solid #f57c00',
              boxShadow: isDark 
                ? '0 4px 20px rgba(245, 124, 0, 0.15)' 
                : '0 4px 20px rgba(245, 124, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            },
            '& .idor-section h2': {
              color: '#e65100',
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 700,
              mb: 3,
            },
            
            // Impact Section - Red Theme
            '& .impact-section': {
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 235, 238, 0.1) 0%, rgba(255, 205, 210, 0.05) 100%)'
                : 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              borderLeft: '6px solid #d32f2f',
              boxShadow: isDark 
                ? '0 4px 20px rgba(211, 47, 47, 0.15)' 
                : '0 4px 20px rgba(211, 47, 47, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            },
            '& .impact-section h2': {
              color: '#c62828',
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&::before': {
                content: '"⚠️"',
                fontSize: '1.3em',
              }
            },
            
            // Prevention Section - Green Theme
            '& .prevention-section': {
              background: isDark
                ? 'linear-gradient(135deg, rgba(232, 245, 233, 0.1) 0%, rgba(200, 230, 201, 0.05) 100%)'
                : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              borderLeft: '6px solid #388e3c',
              boxShadow: isDark 
                ? '0 4px 20px rgba(56, 142, 60, 0.15)' 
                : '0 4px 20px rgba(56, 142, 60, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            },
            '& .prevention-section h2': {
              color: '#2e7d32',
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&::before': {
                content: '"🛡️"',
                fontSize: '1.3em',
              }
            },
            
            // Code Styling
            '& code': {
              bgcolor: isDark ? alpha(theme.palette.primary.main, 0.1) : '#f5f5f5',
              color: isDark ? theme.palette.primary.light : '#d63031',
              px: { xs: 0.75, md: 1 },
              py: 0.5,
              borderRadius: 1,
              fontFamily: '"Fira Code", "Consolas", Monaco, monospace',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              fontWeight: 500,
              border: '1px solid',
              borderColor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.1),
              wordBreak: 'break-word',
            },
            
            // Pre & Code Blocks
            '& pre': {
              bgcolor: isDark ? '#0a0a0a' : '#1e1e1e',
              color: '#d4d4d4',
              p: { xs: 2, md: 3 },
              borderRadius: 2,
              overflow: 'auto',
              fontFamily: '"Fira Code", "Consolas", Monaco, monospace',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              lineHeight: 1.7,
              mb: 3,
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
              position: 'relative',
              '&:hover': {
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
              }
            },
            '& pre code': {
              bgcolor: 'transparent',
              color: 'inherit',
              p: 0,
              border: 'none',
            },
            
            // Typography
            '& h2': {
              color: 'primary.main',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              mt: 5,
              mb: 3,
              pb: 2,
              borderBottom: '4px solid',
              borderColor: alpha(theme.palette.primary.main, 0.3),
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: -4,
                left: 0,
                width: '80px',
                height: '4px',
                bgcolor: 'primary.main',
                transition: 'width 0.3s ease',
              },
              '&:hover::before': {
                width: '120px',
              }
            },
            '& h3': {
              color: 'secondary.main',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              mt: 4,
              mb: 2,
            },
            '& h4': {
              color: isDark ? theme.palette.primary.light : 'primary.main',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 600,
              mt: 3,
              mb: 1.5,
            },
            
            '& p': {
              lineHeight: 1.9,
              mb: 2.5,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: 'text.primary',
            },
            
            '& ul, & ol': {
              ml: { xs: 3, md: 4 },
              mb: 3,
            },
            '& li': {
              mb: 1.5,
              lineHeight: 1.9,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              position: 'relative',
              '&::marker': {
                color: 'primary.main',
                fontWeight: 700,
              }
            },
            
            '& strong': {
              color: 'primary.main',
              fontWeight: 700,
            },
            
            // Tables
            '& table': {
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              mb: 4,
              boxShadow: isDark 
                ? '0 4px 15px rgba(0,0,0,0.3)' 
                : '0 4px 15px rgba(0,0,0,0.1)',
              borderRadius: 2,
              overflow: 'hidden',
              display: { xs: 'block', md: 'table' },
              overflowX: { xs: 'auto', md: 'visible' },
            },
            '& th, & td': {
              border: '1px solid',
              borderColor: 'divider',
              p: { xs: 1.5, md: 2 },
              textAlign: 'left',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
            },
            '& th': {
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
            '& tr:nth-of-type(even)': {
              bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            },
            '& tr': {
              transition: 'background-color 0.2s ease',
              '&:hover': {
                bgcolor: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
              }
            },
            
            // Links
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '2px solid transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'secondary.main',
                borderBottomColor: 'secondary.main',
                transform: 'translateY(-1px)',
              }
            },
            
            // Images
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: isDark 
                ? '0 4px 20px rgba(0,0,0,0.4)' 
                : '0 4px 20px rgba(0,0,0,0.15)',
              display: 'block',
              my: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: isDark 
                  ? '0 8px 30px rgba(0,0,0,0.5)' 
                  : '0 8px 30px rgba(0,0,0,0.25)',
              }
            },
          }}
        >
          <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Box>
      </Container>

      {/* Floating Scroll to Top Button */}
      <Zoom in={showScroll}>
        <Fab
          size={isMobile ? 'small' : 'medium'}
          color="primary"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.1)',
              boxShadow: '0 6px 30px rgba(102, 126, 234, 0.6)',
            }
          }}
        >
          <UpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}
