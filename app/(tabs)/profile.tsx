import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  UserPlus,
  LogOut,
  ChevronRight,
  Bell,
  Lock,
  CreditCard,
  Gift,
  CircleHelp as HelpCircle,
} from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SUBSCRIPTION_PLANS } from '@/types/subscriptions';
import type { SubscriptionPlan } from '@/types/subscriptions';

export default function ProfileScreen() {
  const [currentSubscription, setCurrentSubscription] =
    useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[1]); // Basic tier
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSubscriptionChange = (subscription: SubscriptionPlan) => {
    // This would normally show a confirmation dialog and payment flow
    setCurrentSubscription(subscription);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{
                uri: 'https://media.licdn.com/dms/image/v2/D4D03AQHtMZgj1NTL7Q/profile-displayphoto-shrink_800_800/B4DZVWvr1QGkAk-/0/1740917096640?e=1752105600&v=beta&t=_r4gyBpQ4ZiRAsOwQdkVzzRooIYSwGVV8qOo2rfcvfw',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>Bamba Ba</Text>
              <Text style={styles.profileEmail}>lebabamath@gmail.com</Text>
              <View
                style={[
                  styles.subscriptionBadge,
                  {
                    backgroundColor:
                      currentSubscription.tier === 'free'
                        ? Theme.colors.textSecondary
                        : currentSubscription.tier === 'basic'
                          ? Theme.colors.primary
                          : currentSubscription.tier === 'pro'
                            ? Theme.colors.secondary
                            : Theme.colors.success,
                  },
                ]}
              >
                <Text style={styles.subscriptionBadgeText}>
                  {currentSubscription.name}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Settings size={20} color={Theme.colors.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Pushups</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>75</Text>
            <Text style={styles.statLabel}>Competition Pts</Text>
          </View>
        </View>

        <View style={styles.friendsCard}>
          <View style={styles.friendsHeader}>
            <Text style={styles.friendsTitle}>Friends</Text>
            <View style={styles.friendsCount}>
              <Text style={styles.friendsCountText}>23</Text>
            </View>
          </View>

          <View style={styles.friendsGrid}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Image
                  key={index}
                  source={{
                    uri: `https://images.pexels.com/photos/${600 + index}/pexels-photo-${600 + index}.jpeg?auto=compress&cs=tinysrgb&w=64`,
                  }}
                  style={styles.friendAvatar}
                />
              ))}
            <TouchableOpacity style={styles.addFriendButton}>
              <UserPlus size={24} color={Theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <Card title="Subscription" style={styles.subscriptionCard}>
          <View style={styles.subscriptionContent}>
            <Text style={styles.currentPlanText}>Current Plan:</Text>
            <View style={styles.currentPlan}>
              <View>
                <Text style={styles.currentPlanName}>
                  {currentSubscription.name}
                </Text>
                <Text style={styles.currentPlanPrice}>
                  ${currentSubscription.priceMonthly.toFixed(2)}/month
                </Text>
              </View>

              <TouchableOpacity style={styles.changePlanButton}>
                <Text style={styles.changePlanButtonText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.planFeatures}>
              {currentSubscription.features.map((feature, index) => (
                <View key={index} style={styles.planFeature}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.planFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {currentSubscription.tier !== 'elite' && (
              <Button
                title={`Upgrade to ${
                  currentSubscription.tier === 'free'
                    ? 'Basic'
                    : currentSubscription.tier === 'basic'
                      ? 'Pro'
                      : 'Elite'
                }`}
                variant="primary"
                style={styles.upgradeButton}
                onPress={() => {
                  const nextTierIndex =
                    SUBSCRIPTION_PLANS.findIndex(
                      (plan) => plan.id === currentSubscription.id,
                    ) + 1;
                  if (nextTierIndex < SUBSCRIPTION_PLANS.length) {
                    handleSubscriptionChange(SUBSCRIPTION_PLANS[nextTierIndex]);
                  }
                }}
              />
            )}
          </View>
        </Card>

        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Settings</Text>

          <Card style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Bell size={20} color={Theme.colors.text} />
                <Text style={styles.settingsItemText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D1D5DB', true: Theme.colors.primary }}
                thumbColor="white"
              />
            </TouchableOpacity>

            <View style={styles.settingsDivider} />

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Lock size={20} color={Theme.colors.text} />
                <Text style={styles.settingsItemText}>Privacy</Text>
              </View>
              <ChevronRight size={20} color={Theme.colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.settingsDivider} />

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <CreditCard size={20} color={Theme.colors.text} />
                <Text style={styles.settingsItemText}>Payment Methods</Text>
              </View>
              <ChevronRight size={20} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
          </Card>

          <Card style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Gift size={20} color={Theme.colors.text} />
                <Text style={styles.settingsItemText}>Invite Friends</Text>
              </View>
              <ChevronRight size={20} color={Theme.colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.settingsDivider} />

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <HelpCircle size={20} color={Theme.colors.text} />
                <Text style={styles.settingsItemText}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
          </Card>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={Theme.colors.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Theme.spacing.lg,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
  },
  profileEmail: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  subscriptionBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  subscriptionBadgeText: {
    ...Theme.typography.caption,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: Theme.spacing.sm,
  },
  editButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.primary,
    marginLeft: Theme.spacing.xs,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
    padding: Theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
    backgroundColor: Theme.colors.border,
  },
  friendsCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
  },
  friendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  friendsTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  friendsCount: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    marginLeft: Theme.spacing.sm,
  },
  friendsCountText: {
    ...Theme.typography.caption,
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  friendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  friendAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  addFriendButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderStyle: 'dashed',
  },
  subscriptionCard: {
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  subscriptionContent: {
    paddingVertical: Theme.spacing.xs,
  },
  currentPlanText: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  currentPlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  currentPlanName: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
  },
  currentPlanPrice: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  changePlanButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
  },
  changePlanButtonText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: Theme.colors.primary,
  },
  planFeatures: {
    marginBottom: Theme.spacing.lg,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  checkmark: {
    ...Theme.typography.body1,
    color: Theme.colors.success,
    marginRight: Theme.spacing.sm,
  },
  planFeatureText: {
    ...Theme.typography.body1,
    color: Theme.colors.text,
  },
  upgradeButton: {
    width: '100%',
  },
  settingsSection: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxxl,
  },
  settingsSectionTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  settingsCard: {
    marginBottom: Theme.spacing.md,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.md,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemText: {
    ...Theme.typography.body1,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.md,
  },
  settingsDivider: {
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
  },
  logoutText: {
    ...Theme.typography.button,
    color: Theme.colors.error,
    marginLeft: Theme.spacing.sm,
  },
  versionText: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: Theme.spacing.md,
  },
});
