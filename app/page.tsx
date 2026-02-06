'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Grid,
  Tab,
  Tabs,
  Button,
  Avatar,
  Stack,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Code as CodeIcon,
  Book as BookIcon,
  Terminal as TerminalIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { ThemeProvider, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/lib/theme';
import { contentStructure, Topic } from '@/lib/contentStructure';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ProgressCard from '@/components/ProgressCard';
import LessonCard from '@/components/LessonCard';
import LessonContent from '@/components/LessonContent';

const drawerWidth = 320;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function ContentViewer({ html }: { html: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading content...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        p: 4,
        '& .header': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4,
        },
        '& .header h1': {
          fontSize: '2.5rem',
          fontWeight: 700,
          margin: 0,
        },
        '& .content': {
          maxWidth: 900,
          margin: '0 auto',
        },
        '& h2': {
          color: '#667eea',
          fontSize: '1.8rem',
          fontWeight: 600,
          mt: 4,
          mb: 2,
        },
        '& p': {
          lineHeight: 1.8,
          mb: 2,
          fontSize: '1.05rem',
        },
        '& code': {
          backgroundColor: '#f5f5f5',
          padding: '3px 8px',
          borderRadius: 1,
          fontFamily: 'Consolas, Monaco, monospace',
          color: '#d63031',
          fontSize: '0.9em',
        },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function LearningPlatform() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [contentHtml, setContentHtml] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [code, setCode] = useState('// Write your API security code here\n\nconst apiUrl = "https://jsonplaceholder.typicode.com/users";\n\nfetch(apiUrl)\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error("Error:", error));');
  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/users');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiHeaders, setApiHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [apiBody, setApiBody] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const initialOpen: { [key: string]: boolean } = {};
    contentStructure.forEach(section => {
      section.categories.forEach(category => {
        initialOpen[category.id] = true;
      });
    });
    setOpenCategories(initialOpen);

    if (contentStructure[0]?.categories[0]?.topics[0]) {
      loadContent(contentStructure[0].categories[0].topics[0]);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const loadContent = async (topic: Topic) => {
    setSelectedTopic(topic);
    try {
      const response = await axios.get(`/api/content?file=${encodeURIComponent(topic.file)}`);
      setContentHtml(response.data.content);
    } catch (error) {
      console.error('Error loading content:', error);
      setContentHtml('<h2>Error: Could not load file</h2><p>Please try again.</p>');
    }
  };

  const handleApiRequest = async () => {
    setLoading(true);
    setApiResponse('');
    try {
      let headers = {};
      try {
        headers = JSON.parse(apiHeaders);
      } catch (e) {
        headers = {};
      }

      const response = await axios.post('/api/proxy', {
        url: apiUrl,
        method: apiMethod,
        headers: headers,
        body: apiBody || undefined,
      });

      const formattedResponse = JSON.stringify({
        status: response.data.status,
        statusText: response.data.statusText,
        headers: response.data.headers,
        body: JSON.parse(response.data.body),
      }, null, 2);

      setApiResponse(formattedResponse);
    } catch (error: any) {
      setApiResponse(JSON.stringify({
        error: error.message || 'Request failed',
        details: error.response?.data || error.toString()
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = contentStructure.map(section => ({
    ...section,
    categories: section.categories.map(category => ({
      ...category,
      topics: category.topics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.topics.length > 0)
  })).filter(section => section.categories.length > 0);

  const allTopics = contentStructure.flatMap(s => 
    s.categories.flatMap(c => c.topics)
  );

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      {/* Sidebar Header */}
      <Box sx={{ 
        p: 2.5, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          📚 API Security Academy
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Master API Hacking Step by Step
        </Typography>
      </Box>

      {/* Progress Card */}
      <Box sx={{ p: 2, bgcolor: mode === 'light' ? '#f8f9fa' : 'background.default' }}>
        <ProgressCard
          completedLessons={completedLessons}
          totalLessons={allTopics.length}
          timeSpent="2h 15m"
          streak={5}
        />
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, pb: 2, bgcolor: mode === 'light' ? '#f8f9fa' : 'background.default' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: 'background.paper',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
      </Box>

      <Divider />

      {/* Lessons List */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 2, bgcolor: 'background.paper' }}>
        {filteredContent.map((section) => (
          <Box key={section.id} sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#667eea',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: 1,
                display: 'block',
                mb: 1,
              }}
            >
              {section.title}
            </Typography>
            
            {section.categories.map((category) => (
              <Box key={category.id} sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: openCategories[category.id] ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.08)',
                    }
                  }}
                >
                  <Typography sx={{ mr: 1, fontSize: '1.2rem' }}>{category.icon}</Typography>
                  <ListItemText
                    primary={category.title}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  />
                  {openCategories[category.id] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </ListItemButton>
                
                <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 1, mt: 0.5 }}>
                    {category.topics.map((topic, index) => (
                      <LessonCard
                        key={topic.id}
                        title={topic.title}
                        duration={`${5 + index * 2} min`}
                        completed={false}
                        current={selectedTopic?.id === topic.id}
                        onClick={() => loadContent(topic)}
                      />
                    ))}
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Top Bar */}
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }}>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <BookIcon sx={{ mr: 1, color: '#667eea', fontSize: { xs: 20, md: 24 } }} />
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 600,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              {selectedTopic?.title || 'API Security Learning Platform'}
            </Typography>

            <Stack direction="row" spacing={{ xs: 0.5, md: 1 }}>
              <IconButton onClick={toggleColorMode} size="small" title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
              <IconButton size="small">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton size="small">
                <SettingsIcon fontSize="small" />
              </IconButton>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
                <PersonIcon fontSize="small" />
              </Avatar>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Toolbar />
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              sx={{ px: { xs: 1, md: 2 } }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<BookIcon />} label="Lesson" iconPosition="start" sx={{ minWidth: { xs: 'auto', md: 120 } }} />
              <Tab icon={<CodeIcon />} label="Practice" iconPosition="start" sx={{ minWidth: { xs: 'auto', md: 120 } }} />
              <Tab icon={<TerminalIcon />} label="API Lab" iconPosition="start" sx={{ minWidth: { xs: 'auto', md: 120 } }} />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <LessonContent htmlContent={contentHtml} />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Paper sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom fontWeight={600} sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                  💻 Code Practice Lab
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Practice your API security code here. Test different attack vectors and defensive techniques.
                </Typography>

                <Box sx={{ height: { xs: 300, md: 500 }, border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 1400, mx: 'auto' }}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
                    <Typography variant="h6" gutterBottom fontWeight={600} sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                      🔧 API Request Builder
                    </Typography>
                    
                    <TextField
                      fullWidth
                      label="API URL"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      margin="normal"
                      size="small"
                    />
                    
                    <TextField
                      fullWidth
                      select
                      label="Method"
                      value={apiMethod}
                      onChange={(e) => setApiMethod(e.target.value)}
                      margin="normal"
                      size="small"
                      SelectProps={{ native: true }}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </TextField>
                    
                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                      Headers (JSON)
                    </Typography>
                    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                      <Editor
                        height="120px"
                        defaultLanguage="json"
                        theme="vs-dark"
                        value={apiHeaders}
                        onChange={(value) => setApiHeaders(value || '')}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 13,
                          lineNumbers: 'off',
                        }}
                      />
                    </Box>
                    
                    {apiMethod !== 'GET' && (
                      <>
                        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                          Request Body (JSON)
                        </Typography>
                        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                          <Editor
                            height="120px"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={apiBody}
                            onChange={(value) => setApiBody(value || '')}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 13,
                              lineNumbers: 'off',
                            }}
                          />
                        </Box>
                      </>
                    )}
                    
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleApiRequest}
                      disabled={loading}
                      sx={{ mt: 3, py: 1.5 }}
                    >
                      {loading ? 'Sending Request...' : 'Send Request'}
                    </Button>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: { xs: 2, md: 3 }, height: { xs: 400, md: '100%' } }}>
                    <Typography variant="h6" gutterBottom fontWeight={600} sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                      📊 Response
                    </Typography>
                    <Box sx={{ height: { xs: 300, md: 'calc(100% - 50px)' }, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                      <Editor
                        height="100%"
                        defaultLanguage="json"
                        theme="vs-dark"
                        value={apiResponse || '// Response will appear here...'}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 13,
                          lineNumbers: 'on',
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
