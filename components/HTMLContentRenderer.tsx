'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Alert,
  Divider,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Collapse,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  BugReport as BugReportIcon,
  ExpandMore as ExpandMoreIcon,
  ContentCopy as ContentCopyIcon,
  PlayArrow as PlayArrowIcon,
  Lightbulb as LightbulbIcon,
  Shield as ShieldIcon,
  VpnKey as VpnKeyIcon,
  LocalHospital as LocalHospitalIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface HTMLContentRendererProps {
  htmlContent: string;
}

export default function HTMLContentRenderer({ htmlContent }: HTMLContentRendererProps) {
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedExamples, setExpandedExamples] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!htmlContent) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const title = doc.querySelector('.header h1')?.textContent || 
                  doc.querySelector('h1')?.textContent || 
                  'Content';
    
    const subtitle = doc.querySelector('.header p')?.textContent || '';
    
    const breadcrumbLinks = Array.from(doc.querySelectorAll('.breadcrumb a')).map(a => ({
      text: a.textContent,
      href: (a as HTMLAnchorElement).href
    }));

    const sections = Array.from(doc.querySelectorAll('.content > *')).map(el => {
      return {
        type: el.tagName.toLowerCase(),
        className: el.className,
        content: el.innerHTML,
        textContent: el.textContent,
        element: el
      };
    });

    setParsedContent({
      title,
      subtitle,
      breadcrumbs: breadcrumbLinks,
      sections
    });
  }, [htmlContent]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleExample = (id: string) => {
    setExpandedExamples(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const extractCodeBlocks = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const codes = Array.from(doc.querySelectorAll('code'));
    return codes.map(code => code.textContent || '');
  };

  const renderSection = (section: any, index: number) => {
    const className = section.className || '';
    const sectionId = `section-${index}`;

    // Intro Section with Animation
    if (className.includes('intro-section')) {
      return (
        <Card 
          key={index}
          sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            borderLeft: '6px solid #f5576c',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
            }
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ fontSize: 40, color: '#d63031', mr: 2 }} />
              <Typography variant="h5" sx={{ color: '#d63031', fontWeight: 600 }}>
                Security Alert
              </Typography>
            </Box>
            <div 
              dangerouslySetInnerHTML={{ __html: section.content }}
              style={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            />
          </CardContent>
        </Card>
      );
    }

    // Concept Box with Icon
    if (className.includes('concept-box')) {
      return (
        <Card 
          key={index}
          elevation={3}
          sx={{ 
            mb: 3, 
            borderLeft: '5px solid #667eea',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
              transform: 'translateX(4px)',
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LightbulbIcon sx={{ fontSize: 32, color: '#667eea', mr: 2, mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      );
    }

    // Example Box with Interactive Code
    if (className.includes('example-box')) {
      const codeBlocks = extractCodeBlocks(section.content);
      const fullCode = codeBlocks.join('\n');
      
      return (
        <Paper
          key={index}
          elevation={3}
          sx={{ 
            mb: 3,
            border: '2px solid #00b894',
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(0, 184, 148, 0.2)',
            }
          }}
        >
          <Box sx={{ 
            bgcolor: '#00b894', 
            color: 'white', 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CodeIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Example Code</Typography>
            </Box>
            <Tooltip title={copiedCode === sectionId ? 'Copied!' : 'Copy Code'}>
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                onClick={() => handleCopyCode(fullCode, sectionId)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ p: 3, bgcolor: '#f8f9fa' }}>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </Box>
        </Paper>
      );
    }

    // Scenario Card with Expandable Content
    if (className.includes('scenario-card')) {
      return (
        <Card
          key={index}
          sx={{ 
            mb: 3,
            borderLeft: '4px solid #00b894',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 184, 148, 0.2)',
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BugReportIcon sx={{ fontSize: 32, color: '#00b894', mr: 2 }} />
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </Box>
          </CardContent>
        </Card>
      );
    }

    // IDOR Card with Special Styling
    if (className.includes('idor-card')) {
      return (
        <Card
          key={index}
          elevation={2}
          sx={{ 
            mb: 3,
            borderLeft: '4px solid #e17055',
            bgcolor: '#ffffff',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(225, 112, 85, 0.2)',
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SearchIcon sx={{ fontSize: 28, color: '#e17055', mr: 2 }} />
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </Box>
          </CardContent>
        </Card>
      );
    }

    // IDOR Section with Gradient
    if (className.includes('idor-section')) {
      return (
        <Paper
          key={index}
          elevation={0}
          sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
            borderRadius: 3,
            borderLeft: '6px solid #e17055',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 4 }}>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </Box>
        </Paper>
      );
    }

    // Scenarios Section
    if (className.includes('scenarios-section')) {
      return (
        <Paper
          key={index}
          elevation={0}
          sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            borderRadius: 3,
            borderLeft: '6px solid #00b894',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 4 }}>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </Box>
        </Paper>
      );
    }

    // Impact Section
    if (className.includes('impact-section')) {
      return (
        <Paper
          key={index}
          elevation={3}
          sx={{ 
            mb: 4,
            borderRadius: 3,
            borderTop: '4px solid #ff6b6b',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <WarningIcon sx={{ fontSize: 40, color: '#ff6b6b', mr: 2 }} />
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </Box>
          </Box>
        </Paper>
      );
    }

    // Impact Card
    if (className.includes('impact-card')) {
      return (
        <Alert 
          key={index}
          severity="error"
          icon={<LocalHospitalIcon />}
          sx={{ mb: 2, fontSize: '1rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Alert>
      );
    }

    // Prevention Section
    if (className.includes('prevention-section')) {
      return (
        <Paper
          key={index}
          elevation={3}
          sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
            borderRadius: 3,
            borderLeft: '6px solid #00b894',
          }}
        >
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ShieldIcon sx={{ fontSize: 40, color: '#00b894', mr: 2 }} />
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </Box>
          </Box>
        </Paper>
      );
    }

    // Prevention Card
    if (className.includes('prevention-card')) {
      return (
        <Card
          key={index}
          elevation={2}
          sx={{ 
            mb: 3,
            borderLeft: '4px solid #00b894',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateX(4px)',
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <CheckCircleIcon sx={{ fontSize: 28, color: '#00b894', mr: 2, mt: 0.5 }} />
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </Box>
          </CardContent>
        </Card>
      );
    }

    // Code Block with Syntax
    if (className.includes('code-block') || section.type === 'pre') {
      return (
        <Paper
          key={index}
          sx={{ 
            mb: 3,
            bgcolor: '#1e1e1e',
            color: '#d4d4d4',
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <Box sx={{ 
            bgcolor: '#2d2d2d', 
            p: 1, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #444'
          }}>
            <Chip label="Code" size="small" sx={{ bgcolor: '#444', color: '#fff' }} />
            <IconButton
              size="small"
              sx={{ color: '#fff' }}
              onClick={() => handleCopyCode(section.textContent, sectionId)}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ p: 2, overflow: 'auto', maxHeight: 400 }}>
            <pre style={{ margin: 0, fontFamily: 'Consolas, Monaco, monospace', whiteSpace: 'pre-wrap' }}>
              {section.textContent}
            </pre>
          </Box>
        </Paper>
      );
    }

    // Warning Box
    if (className.includes('warning-box')) {
      return (
        <Alert 
          key={index}
          severity="error" 
          icon={<WarningIcon />}
          sx={{ mb: 3, fontSize: '1rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Alert>
      );
    }

    // Info Box
    if (className.includes('info-box')) {
      return (
        <Alert 
          key={index}
          severity="info" 
          icon={<InfoIcon />}
          sx={{ mb: 3, fontSize: '1rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Alert>
      );
    }

    // Success Box
    if (className.includes('success-box')) {
      return (
        <Alert 
          key={index}
          severity="success" 
          icon={<CheckCircleIcon />}
          sx={{ mb: 3, fontSize: '1rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Alert>
      );
    }

    // Section with Icon
    if (className.includes('section')) {
      return (
        <Paper
          key={index}
          elevation={2}
          sx={{ 
            mb: 4,
            borderRadius: 3,
            bgcolor: '#f8f9fa',
            borderLeft: '5px solid #667eea',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 4 }}>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </Box>
        </Paper>
      );
    }

    // Table
    if (section.type === 'table') {
      return (
        <TableContainer key={index} component={Paper} sx={{ mb: 3, boxShadow: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </TableContainer>
      );
    }

    // Headings with Gradient
    if (section.type === 'h2') {
      return (
        <Box key={index} sx={{ mt: 5, mb: 3 }}>
          <Typography variant="h3" gutterBottom sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            pb: 2,
            borderBottom: '3px solid #667eea',
          }}>
            {section.textContent}
          </Typography>
        </Box>
      );
    }

    if (section.type === 'h3') {
      return (
        <Typography 
          key={index}
          variant="h4" 
          gutterBottom 
          sx={{ mt: 4, mb: 2, color: '#764ba2', fontWeight: 600 }}
        >
          {section.textContent}
        </Typography>
      );
    }

    if (section.type === 'h4') {
      return (
        <Typography 
          key={index}
          variant="h5" 
          gutterBottom 
          sx={{ mt: 3, mb: 1.5, color: '#667eea', fontWeight: 500 }}
        >
          {section.textContent}
        </Typography>
      );
    }

    // Paragraph
    if (section.type === 'p') {
      return (
        <Typography 
          key={index}
          variant="body1" 
          paragraph
          sx={{ mb: 2, lineHeight: 1.9, fontSize: '1.05rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Typography>
      );
    }

    // Lists
    if (section.type === 'ul' || section.type === 'ol') {
      return (
        <Box key={index} sx={{ mb: 3, ml: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Box>
      );
    }

    // Default
    return (
      <Box key={index} sx={{ mb: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      </Box>
    );
  };

  if (!parsedContent) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography variant="h6" color="text.secondary">Loading content...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }} className="HTMLContentRenderer">
      {/* Header with Gradient and Animation */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 5,
          borderRadius: 0,
          mb: 0,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip 
            label="Security Topic" 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              mb: 2,
              fontWeight: 600
            }} 
          />
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              mb: 2
            }}
          >
            {parsedContent.title}
          </Typography>
          {parsedContent.subtitle && (
            <Typography variant="h5" sx={{ opacity: 0.95, fontWeight: 300 }}>
              {parsedContent.subtitle}
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Breadcrumbs */}
      {parsedContent.breadcrumbs && parsedContent.breadcrumbs.length > 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2.5, 
            bgcolor: '#f8f9fa',
            borderBottom: '2px solid #e9ecef'
          }}
        >
          <Breadcrumbs separator="›">
            {parsedContent.breadcrumbs.map((crumb: any, index: number) => (
              <Link 
                key={index}
                href="#" 
                underline="hover" 
                color="inherit"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#667eea'
                  }
                }}
              >
                {crumb.text}
              </Link>
            ))}
          </Breadcrumbs>
        </Paper>
      )}

      {/* Content with Better Spacing */}
      <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 1200, mx: 'auto' }}>
        {parsedContent.sections.map((section: any, index: number) => 
          renderSection(section, index)
        )}

        {/* Footer Navigation */}
        <Divider sx={{ my: 5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}>
            Previous Topic
          </Button>
          <Button endIcon={<ArrowForwardIcon />} variant="contained">
            Next Topic
          </Button>
        </Box>
      </Box>

      {/* Enhanced Styles */}
      <style jsx global>{`
        .HTMLContentRenderer code {
          background-color: #f5f5f5;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: 'Consolas', 'Monaco', monospace;
          color: #d63031;
          font-size: 0.9em;
          font-weight: 500;
        }
        
        .HTMLContentRenderer pre code {
          background-color: transparent;
          padding: 0;
          color: #d4d4d4;
        }

        .HTMLContentRenderer strong {
          color: #667eea;
          font-weight: 700;
        }

        .HTMLContentRenderer ul, 
        .HTMLContentRenderer ol {
          margin-left: 24px;
          margin-bottom: 20px;
        }

        .HTMLContentRenderer li {
          margin-bottom: 12px;
          line-height: 1.9;
          font-size: 1.05rem;
        }

        .HTMLContentRenderer table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .HTMLContentRenderer th,
        .HTMLContentRenderer td {
          border: 1px solid #dee2e6;
          padding: 14px;
          text-align: left;
        }

        .HTMLContentRenderer th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        .HTMLContentRenderer tr:nth-child(even) {
          background-color: #f8f9fa;
        }

        .HTMLContentRenderer tr:hover {
          background-color: #e9ecef;
          transition: background-color 0.2s ease;
        }

        .HTMLContentRenderer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .HTMLContentRenderer a:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        .HTMLContentRenderer .icon {
          margin-right: 12px;
          font-size: 1.5em;
        }
      `}</style>
    </Box>
  );
}

