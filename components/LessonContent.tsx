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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
          borderRadius: 0,
        }}
      >
        <Container maxWidth="lg">
          <Chip
            label="Security Lesson"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.25)',
              color: 'white',
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            fontWeight={800} 
            gutterBottom
            sx={{ 
              textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant={isMobile ? 'body1' : 'h6'} 
              sx={{ opacity: 0.95, fontWeight: 300 }}
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
              background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 4,
              borderLeft: '5px solid #ff9800',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            },
            '& .intro-section h2': {
              color: '#e65100',
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              fontWeight: 700,
              mb: 2,
            },
            '& .intro-section p': {
              lineHeight: 1.8,
              mb: 1.5,
              fontSize: { xs: '0.95rem', md: '1rem' },
            },
            
            '& .section': {
              bgcolor: 'white',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              mb: 3,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #667eea',
            },
            '& .section h2': {
              color: '#667eea',
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              fontWeight: 700,
              mb: 2,
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
              bgcolor: '#e8f5e9',
              border: '2px solid #4caf50',
              borderRadius: 2,
              p: { xs: 2, md: 2.5 },
              mb: 2,
              position: 'relative',
            },
            '& .example-box h4': {
              color: '#2e7d32',
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            },
            '& .example-box code': {
              display: 'block',
              bgcolor: '#1e1e1e',
              color: '#4caf50',
              p: 1,
              borderRadius: 1,
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              mb: 0.5,
              overflowX: 'auto',
            },
            
            '& .scenario-card': {
              bgcolor: 'white',
              border: '1px solid #e0e0e0',
              borderLeft: '4px solid #00bcd4',
              borderRadius: 2,
              p: { xs: 2, md: 2.5 },
              mb: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
              }
            },
            '& .scenario-card h3': {
              color: '#00838f',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              fontWeight: 600,
              mb: 1.5,
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
              bgcolor: '#f5f5f5',
              color: '#d63031',
              px: { xs: 0.5, md: 1 },
              py: 0.5,
              borderRadius: 0.5,
              fontFamily: 'Consolas, Monaco, Courier New, monospace',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              fontWeight: 500,
              wordBreak: 'break-word',
            },
            
            '& pre': {
              bgcolor: '#1e1e1e',
              color: '#d4d4d4',
              p: { xs: 1.5, md: 2 },
              borderRadius: 1,
              overflow: 'auto',
              fontFamily: 'Consolas, Monaco, Courier New, monospace',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              lineHeight: 1.6,
              mb: 2,
            },
            '& pre code': {
              bgcolor: 'transparent',
              color: '#d4d4d4',
              p: 0,
            },
            
            '& h2': {
              color: '#667eea',
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              fontWeight: 700,
              mt: 4,
              mb: 2,
              pb: 1,
              borderBottom: '3px solid #667eea',
            },
            '& h3': {
              color: '#764ba2',
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              fontWeight: 600,
              mt: 3,
              mb: 1.5,
            },
            '& h4': {
              color: '#667eea',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              fontWeight: 500,
              mt: 2,
              mb: 1,
            },
            
            '& p': {
              lineHeight: 1.8,
              mb: 2,
              fontSize: { xs: '0.95rem', md: '1rem' },
              color: '#2d3436',
            },
            
            '& ul, & ol': {
              ml: { xs: 2, md: 3 },
              mb: 2,
            },
            '& li': {
              mb: 1,
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1rem' },
            },
            
            '& strong': {
              color: '#667eea',
              fontWeight: 700,
            },
            
            '& table': {
              width: '100%',
              borderCollapse: 'collapse',
              mb: 3,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: { xs: 'block', md: 'table' },
              overflowX: { xs: 'auto', md: 'visible' },
            },
            '& th, & td': {
              border: '1px solid #dee2e6',
              p: { xs: 1, md: 1.5 },
              textAlign: 'left',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
            },
            '& th': {
              bgcolor: '#667eea',
              color: 'white',
              fontWeight: 600,
            },
            '& tr:nth-of-type(even)': {
              bgcolor: '#f8f9fa',
            },
            
            '& a': {
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid transparent',
              transition: 'all 0.2s',
              '&:hover': {
                color: '#764ba2',
                borderBottom: '1px solid #764ba2',
              }
            },
            
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'block',
              my: 2,
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
