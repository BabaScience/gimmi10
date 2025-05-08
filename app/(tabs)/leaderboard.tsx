import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ChevronRight, Plus } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Card } from '@/components/ui/Card';
import { LeaderboardItem } from '@/components/LeaderboardItem';
import type { LeaderboardUser } from '@/components/LeaderboardItem';

// Mock data for leaderboards
const LEADERBOARD_TYPES = ['Friends', 'Groups', 'Global'];

const FRIENDS_LEADERBOARD: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 78,
    rank: 1,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 65,
    rank: 2,
  },
  {
    id: '3',
    name: 'Bamba Ba',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHtMZgj1NTL7Q/profile-displayphoto-shrink_800_800/B4DZVWvr1QGkAk-/0/1740917096640?e=1752105600&v=beta&t=_r4gyBpQ4ZiRAsOwQdkVzzRooIYSwGVV8qOo2rfcvfw',
    pushups: 42,
    rank: 3,
    isCurrentUser: true,
  },
  {
    id: '4',
    name: 'Jessica Williams',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 37,
    rank: 4,
  },
  {
    id: '5',
    name: 'Tyler Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 31,
    rank: 5,
  },
];

const GROUPS_LEADERBOARD: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Work Warriors',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 342,
    rank: 1,
  },
  {
    id: '2',
    name: 'Fitness Club',
    avatar: 'https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 289,
    rank: 2,
    isCurrentUser: true,
  },
  {
    id: '3',
    name: 'Weekend Warriors',
    avatar: 'https://images.pexels.com/photos/6456209/pexels-photo-6456209.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 215,
    rank: 3,
  },
];

const GLOBAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: '1',
    name: 'PushupKing99',
    avatar: 'https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 156,
    rank: 1,
  },
  {
    id: '2',
    name: 'FitnessQueen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 142,
    rank: 2,
  },
  {
    id: '3',
    name: 'GymBeast',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 137,
    rank: 3,
  },
  {
    id: '100',
    name: 'Bamba B',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=96',
    pushups: 42,
    rank: 100,
    isCurrentUser: true,
  },
];

// Active challenges
const ACTIVE_CHALLENGES = [
  {
    id: '1',
    name: 'Weekly Warrior',
    participants: 24,
    daysLeft: 3,
  },
  {
    id: '2',
    name: '100 Pushups Club',
    participants: 56,
    daysLeft: 5,
  },
];

export default function LeaderboardScreen() {
  const [selectedType, setSelectedType] = useState(LEADERBOARD_TYPES[0]);
  const [timeRange, setTimeRange] = useState('Today');
  
  // Get the appropriate leaderboard data based on selected type
  const getLeaderboardData = () => {
    switch (selectedType) {
      case 'Friends':
        return FRIENDS_LEADERBOARD;
      case 'Groups':
        return GROUPS_LEADERBOARD;
      case 'Global':
        return GLOBAL_LEADERBOARD;
      default:
        return FRIENDS_LEADERBOARD;
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.tabs}>
          {LEADERBOARD_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.tab,
                selectedType === type && styles.selectedTab,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedType === type && styles.selectedTabText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.timeSelector}>
          <Text style={styles.timeSelectorLabel}>Time Range:</Text>
          <TouchableOpacity style={styles.timeDropdown}>
            <Text style={styles.timeDropdownText}>{timeRange}</Text>
            <ChevronRight size={16} color={Theme.colors.primary} style={{ transform: [{ rotate: '90deg' }] }} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Only show challenges section for Friends tab */}
        {selectedType === 'Friends' && (
          <View style={styles.challengesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Challenges</Text>
              <TouchableOpacity style={styles.addButton}>
                <Plus size={16} color={Theme.colors.primary} />
                <Text style={styles.addButtonText}>New</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.challengesContainer}
            >
              {ACTIVE_CHALLENGES.map((challenge) => (
                <Card
                  key={challenge.id}
                  style={styles.challengeCard}
                >
                  <View style={styles.challengeContent}>
                    <Text style={styles.challengeName}>{challenge.name}</Text>
                    <View style={styles.challengeDetails}>
                      <Text style={styles.challengeParticipants}>
                        {challenge.participants} participants
                      </Text>
                      <Text style={styles.challengeDaysLeft}>
                        {challenge.daysLeft} days left
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.joinButton}>
                      <Check size={14} color="white" />
                      <Text style={styles.joinButtonText}>Joined</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
              
              <TouchableOpacity style={styles.discoverCard}>
                <Text style={styles.discoverTitle}>Discover More</Text>
                <Text style={styles.discoverText}>Find new challenges to join</Text>
                <ChevronRight size={20} color={Theme.colors.primary} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        
        <View style={styles.leaderboardContainer}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardTitle}>
              {selectedType === 'Friends' 
                ? 'Friend Rankings' 
                : selectedType === 'Groups' 
                  ? 'Group Rankings' 
                  : 'Global Rankings'}
            </Text>
            <Text style={styles.leaderboardSubtitle}>
              {timeRange === 'Today' ? 'Resets at midnight' : ''}
            </Text>
          </View>
          
          {getLeaderboardData().map((user) => (
            <LeaderboardItem 
              key={user.id} 
              user={user} 
              showMedal={user.rank <= 3} 
            />
          ))}
          
          {selectedType === 'Global' && (
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View all rankings</Text>
              <ChevronRight size={16} color={Theme.colors.primary} />
            </TouchableOpacity>
          )}
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
  header: {
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    backgroundColor: Theme.colors.background,
  },
  title: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.full,
  },
  selectedTab: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  selectedTabText: {
    color: 'white',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeSelectorLabel: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
    marginRight: Theme.spacing.sm,
  },
  timeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  timeDropdownText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: Theme.colors.primary,
    marginRight: Theme.spacing.xs,
  },
  container: {
    flex: 1,
  },
  challengesSection: {
    padding: Theme.spacing.lg,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  addButtonText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: Theme.colors.primary,
    marginLeft: Theme.spacing.xs,
  },
  challengesContainer: {
    paddingBottom: Theme.spacing.md,
  },
  challengeCard: {
    width: 220,
    marginRight: Theme.spacing.md,
  },
  challengeContent: {
    paddingVertical: Theme.spacing.xs,
  },
  challengeName: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  challengeDetails: {
    marginBottom: Theme.spacing.md,
  },
  challengeParticipants: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  challengeDaysLeft: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.success,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.lg,
  },
  joinButtonText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: 'white',
    marginLeft: Theme.spacing.xs,
  },
  discoverCard: {
    width: 220,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoverTitle: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  discoverText: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  leaderboardContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxxl,
  },
  leaderboardHeader: {
    marginBottom: Theme.spacing.md,
  },
  leaderboardTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  leaderboardSubtitle: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  viewMoreText: {
    ...Theme.typography.button,
    color: Theme.colors.primary,
    marginRight: Theme.spacing.xs,
  },
});