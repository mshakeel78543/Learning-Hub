'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Menu, 
  Input, 
  Card, 
  Button, 
  Progress, 
  Badge, 
  Avatar, 
  Typography, 
  Space, 
  Drawer,
  Tabs,
  Select,
  Alert,
  Spin,
  theme,
  ConfigProvider,
  Switch,
  FloatButton,
} from 'antd';
import {
  MenuOutlined,
  SearchOutlined,
  BookOutlined,
  CodeOutlined,
  ApiOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FireOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  LockOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import { contentStructure, Topic } from '@/lib/contentStructure';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export default function LearningPlatform() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [contentHtml, setContentHtml] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [code, setCode] = useState('// Write your API security code here\n\nconst apiUrl = "https://jsonplaceholder.typicode.com/users";\n\nfetch(apiUrl)\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error("Error:", error));');
  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/users');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiHeaders, setApiHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [apiBody, setApiBody] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { token } = theme.useToken();

  const allTopics: Topic[] = [];
  contentStructure.forEach(section => {
    section.categories.forEach(category => {
      allTopics.push(...category.topics);
    });
  });

  const filteredContent = contentStructure.map(section => ({
    ...section,
    categories: section.categories.map(category => ({
      ...category,
      topics: category.topics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.topics.length > 0)
  })).filter(section => section.categories.length > 0);

  useEffect(() => {
    if (contentStructure[0]?.categories[0]?.topics[0]) {
      loadContent(contentStructure[0].categories[0].topics[0]);
    }
  }, []);

  const loadContent = async (topic: Topic) => {
    setSelectedTopic(topic);
    try {
      const response = await fetch(`/api/content?file=${encodeURIComponent(topic.file)}`);
      if (response.ok) {
        const html = await response.text();
        setContentHtml(html);
      } else {
        setContentHtml('<div class="error"><h2>Content not found</h2><p>Unable to load the lesson content.</p></div>');
      }
    } catch (error) {
      setContentHtml('<div class="error"><h2>Error loading content</h2><p>Please try again later.</p></div>');
    }
  };

  const handleApiRequest = async () => {
    setLoading(true);
    try {
      const headers = JSON.parse(apiHeaders);
      const response = await axios({
        method: apiMethod,
        url: '/api/proxy',
        data: {
          targetUrl: apiUrl,
          method: apiMethod,
          headers: headers,
          body: apiMethod !== 'GET' ? apiBody : undefined
        }
      });
      setApiResponse(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      setApiResponse(JSON.stringify({ error: error.message, details: error.response?.data }, null, 2));
    }
    setLoading(false);
  };

  const menuItems = filteredContent.map(section => ({
    key: section.id,
    icon: <FolderOutlined />,
    label: section.title,
    children: section.categories.map(category => ({
      key: category.id,
      icon: <span style={{ fontSize: '16px' }}>{category.icon}</span>,
      label: category.title,
      children: category.topics.map(topic => ({
        key: topic.id,
        label: topic.title,
        onClick: () => {
          loadContent(topic);
          setMobileOpen(false);
        }
      }))
    }))
  }));

  const sidebarContent = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sidebar Header */}
      <div style={{ 
        padding: '24px 16px', 
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
        color: 'white'
      }}>
        <Title level={4} style={{ color: 'white', margin: 0, marginBottom: 8 }}>
          📚 API Security Academy
        </Title>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>
          Master API Hacking Step by Step
        </Text>
      </div>

      {/* Progress Card */}
      <Card size="small" style={{ margin: 16, borderRadius: 8 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong>Your Progress</Text>
            <Badge count={completedLessons} style={{ backgroundColor: '#52c41a' }} />
          </div>
          <Progress 
            percent={Math.round((completedLessons / allTopics.length) * 100)} 
            strokeColor={{ '0%': '#1890ff', '100%': '#52c41a' }}
            size="small"
          />
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8 }}>
            <div style={{ textAlign: 'center' }}>
              <ClockCircleOutlined style={{ fontSize: 16, color: '#1890ff' }} />
              <div><Text type="secondary" style={{ fontSize: 11 }}>2h 15m</Text></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FireOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />
              <div><Text type="secondary" style={{ fontSize: 11 }}>5 days</Text></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 16, color: '#faad14' }} />
              <div><Text type="secondary" style={{ fontSize: 11 }}>Level {Math.floor(completedLessons / 10) + 1}</Text></div>
            </div>
          </div>
        </Space>
      </Card>

      {/* Search */}
      <div style={{ padding: '0 16px 16px' }}>
        <Input
          placeholder="Search lessons..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </div>

      {/* Menu */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedTopic?.id || '']}
          defaultOpenKeys={contentStructure.map(s => s.id)}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {/* Desktop Sidebar */}
        <Sider
          width={280}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: token.colorBgContainer,
          }}
          trigger={null}
        >
          {sidebarContent}
        </Sider>

        {/* Mobile Drawer */}
        <Drawer
          placement="left"
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          width={280}
          bodyStyle={{ padding: 0 }}
        >
          {sidebarContent}
        </Drawer>

        <Layout style={{ marginLeft: collapsed ? 0 : 280, transition: 'margin-left 0.2s' }}>
          {/* Header */}
          <Header style={{ 
            padding: '0 24px', 
            background: token.colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Button 
                type="text" 
                icon={<MenuOutlined />} 
                onClick={() => window.innerWidth < 992 ? setMobileOpen(true) : setCollapsed(!collapsed)}
              />
              <BookOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
              <Title level={5} style={{ margin: 0 }}>
                {selectedTopic?.title || 'API Security Learning Platform'}
              </Title>
            </div>
            
            <Space>
              <Switch 
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<BgColorsOutlined />}
                checked={isDarkMode}
                onChange={setIsDarkMode}
              />
              <Badge count={3}>
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
              <Button type="text" icon={<SettingOutlined />} />
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimary }} />
            </Space>
          </Header>

          {/* Main Content */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
              <TabPane tab={<span><BookOutlined />Lesson</span>} key="1">
                <Card bordered={false}>
                  <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </Card>
              </TabPane>

              <TabPane tab={<span><CodeOutlined />Practice</span>} key="2">
                <Card title="💻 Code Practice Lab" bordered={false}>
                  <Paragraph type="secondary">
                    Practice your API security code here. Test different attack vectors and defensive techniques.
                  </Paragraph>
                  <div style={{ height: 500, border: `1px solid ${token.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      theme={isDarkMode ? "vs-dark" : "light"}
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                      }}
                    />
                  </div>
                </Card>
              </TabPane>

              <TabPane tab={<span><ApiOutlined />API Lab</span>} key="3">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                  <Card title="🔧 API Request Builder" bordered={false}>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                      <Input
                        placeholder="API URL"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                      />
                      <Select value={apiMethod} onChange={setApiMethod} style={{ width: '100%' }}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                        <Option value="PUT">PUT</Option>
                        <Option value="PATCH">PATCH</Option>
                        <Option value="DELETE">DELETE</Option>
                      </Select>
                      <div>
                        <Text strong>Headers (JSON)</Text>
                        <div style={{ height: 120, marginTop: 8, border: `1px solid ${token.colorBorder}`, borderRadius: 8 }}>
                          <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme={isDarkMode ? "vs-dark" : "light"}
                            value={apiHeaders}
                            onChange={(value) => setApiHeaders(value || '')}
                            options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'off' }}
                          />
                        </div>
                      </div>
                      {apiMethod !== 'GET' && (
                        <div>
                          <Text strong>Request Body (JSON)</Text>
                          <div style={{ height: 120, marginTop: 8, border: `1px solid ${token.colorBorder}`, borderRadius: 8 }}>
                            <Editor
                              height="100%"
                              defaultLanguage="json"
                              theme={isDarkMode ? "vs-dark" : "light"}
                              value={apiBody}
                              onChange={(value) => setApiBody(value || '')}
                              options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'off' }}
                            />
                          </div>
                        </div>
                      )}
                      <Button 
                        type="primary" 
                        block 
                        icon={<RocketOutlined />}
                        onClick={handleApiRequest}
                        loading={loading}
                        size="large"
                      >
                        {loading ? 'Sending...' : 'Send Request'}
                      </Button>
                    </Space>
                  </Card>

                  <Card title="📊 Response" bordered={false}>
                    <div style={{ height: 500, border: `1px solid ${token.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
                      <Editor
                        height="100%"
                        defaultLanguage="json"
                        theme={isDarkMode ? "vs-dark" : "light"}
                        value={apiResponse || '// Response will appear here...'}
                        options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13 }}
                      />
                    </div>
                  </Card>
                </div>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>

        {/* Float Button */}
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
}

// Missing import
import { FolderOutlined } from '@ant-design/icons';
