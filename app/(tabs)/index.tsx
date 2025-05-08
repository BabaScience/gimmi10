import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Play, Users, Trophy, Calendar } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { PushupCounter } from '@/components/PushupCounter';

// Mock data for the home screen
const DAILY_GOAL = 50;
const CURRENT_PUSHUPS = 32;
const TODAYS_RANK = 3;
const ACTIVE_CHALLENGE = {
  name: "Weekly Warrior",
  participants: 24,
  daysLeft: 3,
  progress: 68
};
const FRIENDS_ACTIVITY = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 45,
    time: '10 min ago'
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 60,
    time: '32 min ago'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  
  const startWorkout = () => {
    router.push('/workout');
  };
  
  const viewLeaderboard = () => {
    router.push('/leaderboard');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['rgba(0, 102, 204, 0.1)', 'rgba(0, 102, 204, 0)']}
          style={styles.header}
        >
          <View style={styles.welcomeSection}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.nameText}>Bamba</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image
                source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQHtMZgj1NTL7Q/profile-displayphoto-shrink_800_800/B4DZVWvr1QGkAk-/0/1740917096640?e=1752105600&v=beta&t=_r4gyBpQ4ZiRAsOwQdkVzzRooIYSwGVV8qOo2rfcvfw' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's Rank</Text>
              <View style={styles.statValueContainer}>
                <Trophy size={18} color={Theme.colors.secondary} />
                <Text style={styles.statValue}>{TODAYS_RANK}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Active Streak</Text>
              <View style={styles.statValueContainer}>
                <Calendar size={18} color={Theme.colors.secondary} />
                <Text style={styles.statValue}>5 days</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.dailyGoalCard}>
            <View style={styles.dailyGoalHeader}>
              <Text style={styles.dailyGoalTitle}>Today's Goal</Text>
              <Text style={styles.dailyGoalSubtitle}>12 hours left</Text>
            </View>
            
            <PushupCounter count={CURRENT_PUSHUPS} maxCount={DAILY_GOAL} showAnimation={false} />
            
            <Button
              title="Start Pushup Challenge"
              variant="primary"
              size="lg"
              leftIcon={<Play size={20} color="white" />}
              style={styles.startButton}
              onPress={startWorkout}
            />
          </View>
        </LinearGradient>
        
        <View style={styles.content}>
          <Card 
            title="Active Challenge" 
            subtitle={`${ACTIVE_CHALLENGE.daysLeft} days remaining`}
            style={styles.challengeCard}
          >
            <View style={styles.challengeContent}>
              <Text style={styles.challengeName}>{ACTIVE_CHALLENGE.name}</Text>
              <View style={styles.challengeStats}>
                <View style={styles.challengeStat}>
                  <Users size={18} color={Theme.colors.primary} />
                  <Text style={styles.challengeStatText}>
                    {ACTIVE_CHALLENGE.participants} participants
                  </Text>
                </View>
                <View style={styles.challengeProgress}>
                  <View style={styles.progressTrack}>
                    <View 
                      style={[
                        styles.progressBar,
                        { width: `${ACTIVE_CHALLENGE.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {ACTIVE_CHALLENGE.progress}% complete
                  </Text>
                </View>
              </View>
            </View>
          </Card>
          
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friend Activity</Text>
            <TouchableOpacity 
              style={styles.sectionButton}
              onPress={viewLeaderboard}
            >
              <Text style={styles.sectionButtonText}>View all</Text>
              <ChevronRight size={16} color={Theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          {FRIENDS_ACTIVITY.map(friend => (
            <View key={friend.id} style={styles.activityItem}>
              <Image source={{ uri: friend.avatar }} style={styles.activityAvatar} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>{friend.name}</Text>
                <Text style={styles.activityDetail}>
                  Completed <Text style={styles.activityHighlight}>{friend.pushups} pushups</Text>
                </Text>
              </View>
              <Text style={styles.activityTime}>{friend.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  welcomeText: {
    ...Theme.typography.body1,
    color: Theme.colors.textSecondary,
  },
  nameText: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.xs,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Theme.colors.border,
    marginHorizontal: Theme.spacing.md,
  },
  dailyGoalCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    alignItems: 'center',
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  dailyGoalTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  dailyGoalSubtitle: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  startButton: {
    marginTop: Theme.spacing.lg,
    width: '100%',
  },
  content: {
    padding: Theme.spacing.lg,
  },
  challengeCard: {
    marginBottom: Theme.spacing.xl,
  },
  challengeContent: {
    paddingVertical: Theme.spacing.xs,
  },
  challengeName: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  challengeStats: {
    gap: Theme.spacing.md,
  },
  challengeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  challengeStatText: {
    ...Theme.typography.body2,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.sm,
  },
  challengeProgress: {
    marginTop: Theme.spacing.xs,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: Theme.spacing.xs,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
  },
  progressText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.primary,
    fontSize: 14,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Theme.spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    ...Theme.typography.body1,
    color: Theme.colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  activityDetail: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  activityHighlight: {
    fontFamily: 'Inter-SemiBold',
    color: Theme.colors.primary,
  },
  activityTime: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
});