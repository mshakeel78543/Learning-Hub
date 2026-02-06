'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Lightbulb as TipIcon,
} from '@mui/icons-material';

interface AlertBoxProps {
  type: 'warning' | 'info' | 'success' | 'error' | 'tip';
  title?: string;
  children: React.ReactNode;
}

const alertConfig = {
  warning: {
    icon: WarningIcon,
    color: '#ff9800',
    bg: '#fff3e0',
    label: 'Warning',
  },
  info: {
    icon: InfoIcon,
    color: '#2196f3',
    bg: '#e3f2fd',
    label: 'Information',
  },
  success: {
    icon: SuccessIcon,
    color: '#00b894',
    bg: '#d4fc79',
    label: 'Success',
  },
  error: {
    icon: ErrorIcon,
    color: '#ff6b6b',
    bg: '#ffebee',
    label: 'Important',
  },
  tip: {
    icon: TipIcon,
    color: '#667eea',
    bg: '#f3e7ff',
    label: 'Tip',
  },
};

export default function AlertBox({ type, title, children }: AlertBoxProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: config.bg,
        borderLeft: `5px solid ${config.color}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Icon sx={{ color: config.color, fontSize: 32, mt: 0.5 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: config.color, fontWeight: 600, mb: 1 }}
            >
              {title || config.label}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {children}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
