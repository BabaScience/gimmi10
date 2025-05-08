import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '@/constants/Theme';

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  pushups: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface LeaderboardItemProps {
  user: LeaderboardUser;
  showMedal?: boolean;
}

export function LeaderboardItem({ user, showMedal = true }: LeaderboardItemProps) {
  const getMedalColor = (rank: number) => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return 'transparent';
  };

  return (
    <View style={[
      styles.container,
      user.isCurrentUser && styles.currentUserContainer
    ]}>
      <View style={styles.rankContainer}>
        {showMedal && user.rank <= 3 ? (
          <View style={[styles.medal, { backgroundColor: getMedalColor(user.rank) }]}>
            <Text style={styles.medalText}>{user.rank}</Text>
          </View>
        ) : (
          <Text style={styles.rankText}>{user.rank}</Text>
        )}
      </View>
      
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        {user.isCurrentUser && <Text style={styles.youTag}>You</Text>}
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{user.pushups}</Text>
        <Text style={styles.scoreLabel}>pushups</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  currentUserContainer: {
    backgroundColor: 'rgba(0, 102, 204, 0.05)',
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.primaryLight,
    borderBottomWidth: 1,
  },
  rankContainer: {
    width: 36,
    alignItems: 'center',
  },
  rankText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  medal: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: Theme.spacing.md,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Theme.colors.text,
    marginRight: Theme.spacing.sm,
  },
  youTag: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Theme.colors.primary,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: Theme.colors.primary,
  },
  scoreLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
});