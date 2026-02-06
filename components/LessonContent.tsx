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
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
  PlayArrow as PlayIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

interface LessonContentProps {
  htmlContent: string;
}

interface ParsedSection {
  type: 'intro' | 'concept' | 'example' | 'scenario' | 'idor' | 'impact' | 'prevention' | 'regular';
  heading: string;
  content: string;
  items?: Array<{
    title: string;
    description: string;
    code?: string[];
  }>;
}

export default function LessonContent({ htmlContent }: LessonContentProps) {
  const [mounted, setMounted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Loading...</Typography>
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
        bgcolor: '#f8f9fa',
      }}
    >
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)'
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
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: 'rgba(255,255,255,0.05)',
            transform: 'skewX(-15deg)',
            transformOrigin: 'top',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #00b894 0%, #00cec9 50%, #0984e3 100%)',
          }
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <SecurityIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
            <Chip
              label="Security Lesson"
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.25)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
              }}
            />
          </Stack>
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            fontWeight={800} 
            gutterBottom
            sx={{ 
              textShadow: '2px 2px 12px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant={isMobile ? 'body1' : 'h6'} 
              sx={{ 
                opacity: 0.95, 
                fontWeight: 300,
                maxWidth: '800px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Container>
      </Paper>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            py: 1.5,
            px: { xs: 2, md: 4 },
            bgcolor: 'white',
            borderBottom: '1px solid #e0e0e0',
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
                    color: idx === breadcrumbs.length - 1 ? '#667eea' : 'text.primary',
                  }}
                >
                  {crumb}
                </Link>
              ))}
            </Breadcrumbs>
          </Container>
        </Paper>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            '& .intro-section': {
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a237e 0%, #311b92 100%)'
                : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              borderLeft: '6px solid #ff9800',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(255, 152, 0, 0.2)'
                : '0 4px 20px rgba(0,0,0,0.08)',
              position: 'relative',
              '&::before': {
                content: '"ℹ️"',
                position: 'absolute',
                top: 20,
                right: 20,
                fontSize: '3rem',
                opacity: 0.1,
              }
            },
            '& .intro-section h2': {
              color: (theme) => theme.palette.mode === 'dark' ? '#ffb74d' : '#e65100',
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            },
            '& .intro-section p': {
              lineHeight: 1.9,
              mb: 2,
              fontSize: { xs: '1rem', md: '1.05rem' },
              color: (theme) => theme.palette.mode === 'dark' ? '#e0e0e0' : 'inherit',
            },
            
            '& .section': {
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: 4,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: '5px solid #667eea',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 4px 16px rgba(102, 126, 234, 0.3)'
                  : '0 4px 16px rgba(102, 126, 234, 0.15)',
                transform: 'translateY(-2px)',
              }
            },
            '& .section h2': {
              color: 'primary.main',
              fontSize: { xs: '1.6rem', md: '1.9rem' },
              fontWeight: 700,
              mb: 3,
              pb: 2,
              borderBottom: '3px solid',
              borderImage: 'linear-gradient(90deg, #667eea 0%, transparent 100%) 1',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            },
            '& .section h3': {
              color: '#764ba2',
              fontSize: { xs: '1.2rem', md: '1.3rem' },
              fontWeight: 600,
              mt: 3,
              mb: 1.5,
            },
            '& .section p': {
              lineHeight: 1.8,
              mb: 2,
              fontSize: { xs: '0.95rem', md: '1rem' },
              color: '#2d3436',
            },
            
            '& .concept-box': {
              bgcolor: '#f3e5f5',
              border: '2px solid #9c27b0',
              borderRadius: 2,
              p: { xs: 2, md: 2.5 },
              mb: 2,
            },
            '& .concept-box h4': {
              color: '#6a1b9a',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              fontWeight: 600,
              mb: 1,
            },
            
            '& .example-box': {
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1b5e20' : '#e8f5e9',
              border: (theme) => theme.palette.mode === 'dark' ? '2px solid #2e7d32' : '2px solid #4caf50',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 3,
              position: 'relative',
              boxShadow: '0 3px 10px rgba(76, 175, 80, 0.2)',
              '&::before': {
                content: '"✓"',
                position: 'absolute',
                top: 15,
                right: 15,
                fontSize: '2rem',
                color: '#4caf50',
                opacity: 0.2,
                fontWeight: 'bold',
              }
            },
            '& .example-box h4': {
              color: (theme) => theme.palette.mode === 'dark' ? '#81c784' : '#2e7d32',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            },
            '& .example-box code': {
              display: 'block',
              bgcolor: '#1e1e1e',
              color: '#4caf50',
              p: { xs: 1.5, md: 2 },
              borderRadius: 1,
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              mb: 1,
              overflowX: 'auto',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            },
            
            '& .scenario-card': {
              bgcolor: 'background.paper',
              border: (theme) => theme.palette.mode === 'dark' ? '1px solid #0288d1' : '1px solid #e0e0e0',
              borderLeft: '5px solid #00bcd4',
              borderRadius: 2,
              p: { xs: 2.5, md: 3 },
              mb: 3,
              boxShadow: '0 3px 8px rgba(0,188,212,0.15)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(0,188,212,0.1) 0%, transparent 70%)',
              },
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0,188,212,0.25)',
                transform: 'translateX(8px)',
                borderLeftWidth: '8px',
              }
            },
            '& .scenario-card h3': {
              color: (theme) => theme.palette.mode === 'dark' ? '#4dd0e1' : '#00838f',
              fontSize: { xs: '1.2rem', md: '1.35rem' },
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            },
            
            '& .idor-section': {
              background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 3,
              borderLeft: '5px solid #f57c00',
            },
            '& .idor-section h2': {
              color: '#e65100',
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              fontWeight: 700,
              mb: 2,
            },
            
            '& .idor-card': {
              bgcolor: 'white',
              borderLeft: '4px solid #ff6f00',
              borderRadius: 1,
              p: { xs: 2, md: 2.5 },
              mb: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
            '& .idor-card h3': {
              color: '#ef6c00',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              fontWeight: 600,
              mb: 1.5,
            },
            
            '& .scenarios-section': {
              background: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 3,
              borderLeft: '5px solid #0288d1',
            },
            '& .scenarios-section h2': {
              color: '#01579b',
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              fontWeight: 700,
              mb: 2,
            },
            
            '& .impact-section': {
              background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 3,
              borderLeft: '5px solid #d32f2f',
            },
            '& .impact-section h2': {
              color: '#c62828',
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              fontWeight: 700,
              mb: 2,
            },
            
            '& .impact-card': {
              bgcolor: 'white',
              borderLeft: '4px solid #f44336',
              borderRadius: 1,
              p: { xs: 2, md: 2.5 },
              mb: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
            
            '& .prevention-section': {
              background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 3,
              borderLeft: '5px solid #388e3c',
            },
            '& .prevention-section h2': {
              color: '#2e7d32',
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              fontWeight: 700,
              mb: 2,
            },
            
            '& .prevention-card': {
              bgcolor: 'white',
              borderLeft: '4px solid #4caf50',
              borderRadius: 1,
              p: { xs: 2, md: 2.5 },
              mb: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
            
            '& code': {
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
              color: (theme) => theme.palette.mode === 'dark' ? '#ff6b6b' : '#d63031',
              px: { xs: 0.75, md: 1.25 },
              py: 0.5,
              borderRadius: 0.75,
              fontFamily: 'Consolas, Monaco, Courier New, monospace',
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              fontWeight: 500,
              wordBreak: 'break-word',
              border: (theme) => theme.palette.mode === 'dark' ? '1px solid #424242' : '1px solid #e0e0e0',
            },
            
            '& pre': {
              bgcolor: '#1e1e1e',
              color: '#d4d4d4',
              p: { xs: 2, md: 2.5 },
              borderRadius: 2,
              overflow: 'auto',
              fontFamily: 'Consolas, Monaco, Courier New, monospace',
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              lineHeight: 1.7,
              mb: 3,
              border: '1px solid #333',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
              position: 'relative',
              '&::before': {
                content: '"Code"',
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: '0.7rem',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }
            },
            '& pre code': {
              bgcolor: 'transparent',
              color: '#d4d4d4',
              p: 0,
            },
            
            '& h2': {
              color: 'primary.main',
              fontSize: { xs: '1.6rem', md: '2rem' },
              fontWeight: 700,
              mt: 5,
              mb: 3,
              pb: 2,
              borderBottom: '4px solid',
              borderImage: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%) 1',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -4,
                width: '60px',
                height: '4px',
                background: '#00b894',
              }
            },
            '& h3': {
              color: 'secondary.main',
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              fontWeight: 600,
              mt: 4,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            },
            '& h4': {
              color: 'primary.main',
              fontSize: { xs: '1.15rem', md: '1.25rem' },
              fontWeight: 500,
              mt: 3,
              mb: 1.5,
            },
            
            '& p': {
              lineHeight: 1.9,
              mb: 2.5,
              fontSize: { xs: '1rem', md: '1.05rem' },
              color: 'text.primary',
              textAlign: 'justify',
            },
            
            '& ul, & ol': {
              ml: { xs: 2, md: 3 },
              mb: 3,
              pl: 2,
            },
            '& li': {
              mb: 1.5,
              lineHeight: 1.9,
              fontSize: { xs: '1rem', md: '1.05rem' },
              position: 'relative',
              paddingLeft: '8px',
            },
            '& ul li::marker': {
              color: 'primary.main',
              fontSize: '1.2em',
            },
            
            '& strong': {
              color: 'primary.main',
              fontWeight: 700,
            },
            
            '& table': {
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              mb: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
              fontSize: { xs: '0.9rem', md: '1rem' },
            },
            '& th': {
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              letterSpacing: 0.5,
            },
            '& tr:nth-of-type(even)': {
              bgcolor: 'action.hover',
            },
            '& tr:hover': {
              bgcolor: 'action.selected',
              transition: 'background-color 0.2s',
            },
            
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600,
              borderBottom: '2px solid transparent',
              transition: 'all 0.2s',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: -2,
                left: 0,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.3s ease',
              },
              '&:hover': {
                color: 'secondary.main',
                '&::after': {
                  width: '100%',
                }
              }
            },
            
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'block',
              my: 4,
              border: '3px solid',
              borderColor: 'divider',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }
            },
            
            '& .icon': {
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mr: 1,
            }
          }}
        >
          <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Box>
      </Container>

      {/* Scroll to Top Button */}
      <Zoom in={showScroll}>
        <Fab
          size={isMobile ? 'small' : 'medium'}
          color="primary"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
          }}
        >
          <UpIcon />
        </Fab>
      </Zoom>

      {/* Global Styles */}
      <style jsx global>{`
        @media (max-width: 600px) {
          .LessonContent .content {
            padding: 16px !important;
          }
        }
      `}</style>
    </Box>
  );
}
