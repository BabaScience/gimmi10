import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, ChartBar as BarChart2, Calendar, Medal } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Card } from '@/components/ui/Card';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Mock data for analytics
const DAILY_DATA = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [25, 45, 28, 80, 56, 63, 42],
      color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
      strokeWidth: 2
    }
  ]
};

const WEEKLY_DATA = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      data: [120, 182, 155, 210],
      color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
      strokeWidth: 2
    }
  ]
};

const MONTHLY_DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [520, 610, 750, 690, 820, 950],
      color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
      strokeWidth: 2
    }
  ]
};

// Badge data
const BADGES = [
  {
    id: '1',
    name: '10-Day Streak',
    description: 'Complete pushups for 10 consecutive days',
    icon: '🔥',
    earned: true,
    progress: 100,
  },
  {
    id: '2',
    name: '100 Pushups Club',
    description: 'Complete 100 pushups in a single day',
    icon: '💯',
    earned: true,
    progress: 100,
  },
  {
    id: '3',
    name: 'Early Bird',
    description: 'Complete pushups before 7am for 5 days',
    icon: '🌅',
    earned: false,
    progress: 60,
  },
  {
    id: '4',
    name: 'Consistency King',
    description: 'Complete at least 30 pushups every day for a month',
    icon: '👑',
    earned: false,
    progress: 40,
  },
];

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState('Daily');
  const [activeTab, setActiveTab] = useState('Stats');
  
  const getChartData = () => {
    switch (timeRange) {
      case 'Daily':
        return DAILY_DATA;
      case 'Weekly':
        return WEEKLY_DATA;
      case 'Monthly':
        return MONTHLY_DATA;
      default:
        return DAILY_DATA;
    }
  };
  
  const chartConfig = {
    backgroundGradientFrom: Theme.colors.card,
    backgroundGradientTo: Theme.colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: Theme.colors.primary
    }
  };
  
  const renderStatsTab = () => (
    <>
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Pushup Count</Text>
          <View style={styles.timeRangeSelector}>
            <TouchableOpacity 
              style={[styles.timeButton, timeRange === 'Daily' && styles.activeTimeButton]}
              onPress={() => setTimeRange('Daily')}
            >
              <Text style={[styles.timeButtonText, timeRange === 'Daily' && styles.activeTimeButtonText]}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.timeButton, timeRange === 'Weekly' && styles.activeTimeButton]}
              onPress={() => setTimeRange('Weekly')}
            >
              <Text style={[styles.timeButtonText, timeRange === 'Weekly' && styles.activeTimeButtonText]}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.timeButton, timeRange === 'Monthly' && styles.activeTimeButton]}
              onPress={() => setTimeRange('Monthly')}
            >
              <Text style={[styles.timeButtonText, timeRange === 'Monthly' && styles.activeTimeButtonText]}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <LineChart
          data={getChartData()}
          width={screenWidth - (Theme.spacing.lg * 2)}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.1)' }]}>
            <BarChart2 size={24} color={Theme.colors.primary} />
          </View>
          <Text style={styles.statValue}>1,247</Text>
          <Text style={styles.statLabel}>Total Pushups</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(255, 125, 0, 0.1)' }]}>
            <Calendar size={24} color={Theme.colors.secondary} />
          </View>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <Medal size={24} color={Theme.colors.success} />
          </View>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Competitions Won</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <Text style={styles.statIcon}>🏅</Text>
          </View>
          <Text style={styles.statValue}>2/4</Text>
          <Text style={styles.statLabel}>Badges Earned</Text>
        </View>
      </View>
      
      <Card title="Personal Records" style={styles.recordsCard}>
        <View style={styles.recordsList}>
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>Most pushups in a day</Text>
            <Text style={styles.recordValue}>120</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>Longest streak</Text>
            <Text style={styles.recordValue}>15 days</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>Highest rank achieved</Text>
            <Text style={styles.recordValue}>1st place</Text>
          </View>
        </View>
      </Card>
      
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>Recommendations</Text>
        <View style={styles.recommendation}>
          <BarChart2 size={20} color={Theme.colors.primary} />
          <Text style={styles.recommendationText}>
            You're most consistent on Mondays and Wednesdays. Keep it up!
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Calendar size={20} color={Theme.colors.primary} />
          <Text style={styles.recommendationText}>
            Try to do pushups on weekends to maintain your streak.
          </Text>
        </View>
      </View>
    </>
  );
  
  const renderBadgesTab = () => (
    <View style={styles.badgesContainer}>
      {BADGES.map(badge => (
        <Card key={badge.id} style={styles.badgeCard}>
          <View style={styles.badgeContent}>
            <View style={styles.badgeHeader}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            </View>
            
            <View style={styles.badgeProgressContainer}>
              <View style={styles.badgeProgressTrack}>
                <View 
                  style={[
                    styles.badgeProgressBar, 
                    { width: `${badge.progress}%` },
                    badge.earned && styles.badgeProgressBarComplete
                  ]} 
                />
              </View>
              <Text style={styles.badgeProgressText}>
                {badge.earned ? 'Complete' : `${badge.progress}%`}
              </Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateButton}>
            <ChevronLeft size={20} color={Theme.colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.dateText}>April 2025</Text>
          <TouchableOpacity style={styles.dateButton}>
            <ChevronRight size={20} color={Theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Stats' && styles.activeTab]}
          onPress={() => setActiveTab('Stats')}
        >
          <Text style={[styles.tabText, activeTab === 'Stats' && styles.activeTabText]}>
            Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Badges' && styles.activeTab]}
          onPress={() => setActiveTab('Badges')}
        >
          <Text style={[styles.tabText, activeTab === 'Badges' && styles.activeTabText]}>
            Badges
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {activeTab === 'Stats' ? renderStatsTab() : renderBadgesTab()}
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
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateButton: {
    padding: Theme.spacing.sm,
  },
  dateText: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
    marginHorizontal: Theme.spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Theme.colors.primary,
  },
  tabText: {
    ...Theme.typography.button,
    color: Theme.colors.textSecondary,
  },
  activeTabText: {
    color: Theme.colors.primary,
  },
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  chartCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  chartHeader: {
    marginBottom: Theme.spacing.md,
  },
  chartTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.xs,
  },
  timeButton: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.full,
  },
  activeTimeButton: {
    backgroundColor: Theme.colors.primary,
  },
  timeButtonText: {
    ...Theme.typography.button,
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
  activeTimeButtonText: {
    color: 'white',
  },
  chart: {
    marginVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  recordsCard: {
    marginBottom: Theme.spacing.lg,
  },
  recordsList: {
    paddingVertical: Theme.spacing.xs,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  recordLabel: {
    ...Theme.typography.body1,
    color: Theme.colors.text,
  },
  recordValue: {
    ...Theme.typography.h4,
    color: Theme.colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.xs,
  },
  recommendationsContainer: {
    marginBottom: Theme.spacing.xxxl,
  },
  recommendationsTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  recommendation: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  recommendationText: {
    ...Theme.typography.body1,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  badgesContainer: {
    marginBottom: Theme.spacing.xxxl,
  },
  badgeCard: {
    marginBottom: Theme.spacing.md,
  },
  badgeContent: {
    paddingVertical: Theme.spacing.xs,
  },
  badgeHeader: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  badgeIcon: {
    fontSize: 36,
    marginRight: Theme.spacing.md,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
  },
  badgeDescription: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  badgeProgressContainer: {
    marginTop: Theme.spacing.xs,
  },
  badgeProgressTrack: {
    height: 8,
    backgroundColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: Theme.spacing.xs,
  },
  badgeProgressBar: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
  },
  badgeProgressBarComplete: {
    backgroundColor: Theme.colors.success,
  },
  badgeProgressText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
});