'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

interface ProgressCardProps {
  completedLessons: number;
  totalLessons: number;
  timeSpent: string;
  streak: number;
}

export default function ProgressCard({
  completedLessons,
  totalLessons,
  timeSpent,
  streak
}: ProgressCardProps) {
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <Card
      sx={{
        mb: 2,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={700}>
          📊 Your Progress
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
              {completedLessons} / {totalLessons} completed
            </Typography>
            <Typography variant="caption" fontWeight={700} sx={{ fontSize: '0.8rem' }}>
              {progress.toFixed(0)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#00b894',
                borderRadius: 3,
              }
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} justifyContent="space-around">
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <TimerIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" fontWeight={600}>{timeSpent}</Typography>
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>Time</Typography>
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <TrophyIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" fontWeight={600}>{streak}d</Typography>
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>Streak</Typography>
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <TrendingUpIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" fontWeight={600}>L{Math.floor(completedLessons / 10) + 1}</Typography>
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>Level</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
