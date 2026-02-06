'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Stack,
  Avatar,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

interface LessonCardProps {
  title: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
  current?: boolean;
  onClick?: () => void;
}

export default function LessonCard({
  title,
  duration,
  completed = false,
  locked = false,
  current = false,
  onClick
}: LessonCardProps) {
  return (
    <Card
      sx={{
        mb: 1,
        cursor: locked ? 'not-allowed' : 'pointer',
        opacity: locked ? 0.5 : 1,
        border: current ? '2px solid #667eea' : '1px solid #e0e0e0',
        bgcolor: current ? 'rgba(102, 126, 234, 0.05)' : 'white',
        boxShadow: current ? '0 2px 8px rgba(102, 126, 234, 0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: locked ? 'none' : 'translateX(4px)',
          boxShadow: locked ? '0 1px 3px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.1)',
        }
      }}
      onClick={!locked ? onClick : undefined}
    >
      <CardContent sx={{ py: 1, px: 1.5, '&:last-child': { pb: 1 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: completed ? '#00b894' : current ? '#667eea' : '#e0e0e0',
              fontSize: '0.9rem',
            }}
          >
            {locked ? (
              <LockIcon sx={{ fontSize: 14 }} />
            ) : completed ? (
              <CheckCircleIcon sx={{ fontSize: 14 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />
            )}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="body2" 
              fontWeight={current ? 600 : 400}
              sx={{
                fontSize: '0.85rem',
                lineHeight: 1.4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              ⏱️ {duration}
            </Typography>
          </Box>
          {current && (
            <Chip 
              label="Now" 
              size="small" 
              sx={{ 
                height: 20,
                fontSize: '0.7rem',
                bgcolor: '#667eea',
                color: 'white',
              }} 
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
