// Fake API service for Home Page

export async function getDailyGoal() {
  return 50;
}

export async function getCurrentPushups() {
  return 33;
}

export async function getTodaysRank() {
  return 3;
}

export async function getActiveChallenge() {
  return {
    name: 'Weekly Warrior',
    participants: 24,
    daysLeft: 3,
    progress: 68,
  };
}

export async function getFriendsActivity() {
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=96',
      pushups: 45,
      time: '10 min ago',
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=96',
      pushups: 60,
      time: '32 min ago',
    },
  ];
}

export async function getUserProfile() {
  return {
    name: 'Bamba',
    lastName: 'Ba',
    email: 'lebabamath@gmail.com',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHtMZgj1NTL7Q/profile-displayphoto-shrink_800_800/B4DZVWvr1QGkAk-/0/1740917096640?e=1752105600&v=beta&t=_r4gyBpQ4ZiRAsOwQdkVzzRooIYSwGVV8qOo2rfcvfw',
  };
} 