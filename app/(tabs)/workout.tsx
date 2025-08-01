import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { CameraType } from 'expo-camera';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ArrowLeft, Camera as CameraIcon, RotateCcw, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Button } from '@/components/ui/Button';
import { PushupCounter } from '@/components/PushupCounter';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function WorkoutScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(true);
  const [facing, setFacing] = useState<CameraType>('front');
  const [isPushupSessionActive, setIsPushupSessionActive] = useState(false);
  const [pushupCount, setPushupCount] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    isMounted.current = true;
    
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }, 1500);
    
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, []);
  
  useEffect(() => {
    let pushupInterval: number | null = null;
    
    if (isPushupSessionActive && !isSessionComplete && isMounted.current) {
      pushupInterval = setInterval(() => {
        if (Math.random() > 0.6 && isMounted.current) {
          setPushupCount(prev => prev + 1);
        }
      }, 2000)
    }
    
    return () => {
      if (pushupInterval) {
        clearInterval(pushupInterval);
      }
    };
  }, [isPushupSessionActive, isSessionComplete]);
  
  useEffect(() => {
    if (isTimerActive && isMounted.current) {
      timerRef.current = setInterval(() => {
        if (isMounted.current) {
          setSeconds(prev => prev + 1);
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive]);
  
  const startPushupSession = () => {
    if (!isMounted.current) return;
    setPushupCount(0);
    setSeconds(0);
    setIsPushupSessionActive(true);
    setIsTimerActive(true);
    setIsSessionComplete(false);
  };
  
  const endPushupSession = () => {
    if (!isMounted.current) return;
    setIsPushupSessionActive(false);
    setIsTimerActive(false);
    setIsSessionComplete(true);
  };
  
  const resetSession = () => {
    if (!isMounted.current) return;
    setPushupCount(0);
    setSeconds(0);
    setIsSessionComplete(false);
  };
  
  const toggleCameraFacing = () => {
    if (!isMounted.current) return;
    setFacing(current => (current === 'front' ? 'back' : 'front'));
  };
  
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <CameraIcon size={64} color={Theme.colors.primary} />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to count your pushups. Your videos are never stored or sent anywhere.
          </Text>
          <Button 
            title="Grant Camera Permission" 
            onPress={requestPermission} 
            variant="primary"
            style={styles.permissionButton}
          />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  if (isSessionComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.resultsContainer}>
          <CheckCircle2 size={64} color={Theme.colors.success} />
          <Text style={styles.resultsTitle}>Great Job!</Text>
          
          <View style={styles.resultsStats}>
            <View style={styles.resultsStat}>
              <Text style={styles.resultsStatValue}>{pushupCount}</Text>
              <Text style={styles.resultsStatLabel}>Pushups</Text>
            </View>
            
            <View style={styles.resultsDivider} />
            
            <View style={styles.resultsStat}>
              <Text style={styles.resultsStatValue}>{formatTime(seconds)}</Text>
              <Text style={styles.resultsStatLabel}>Duration</Text>
            </View>
          </View>
          
          <Button
            title="Share With Friends"
            variant="primary"
            style={styles.resultsButton}
          />
          
          <Button
            title="Try Again"
            variant="outline"
            style={styles.tryAgainButton}
            onPress={resetSession}
            leftIcon={<RotateCcw size={18} color={Theme.colors.primary} />}
          />
          
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => router.back()}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {Platform.OS !== 'web' ? (
        <CameraView 
          style={styles.camera}
          facing={facing}
        >
          {renderCameraContent()}
        </CameraView>
      ) : (
        <View style={styles.webFallback}>
          <CameraIcon size={64} color={Theme.colors.primary} />
          <Text style={styles.webFallbackTitle}>Camera Preview</Text>
          <Text style={styles.webFallbackText}>
            Camera functionality is limited on web.
            {isPushupSessionActive ? ' Counting pushups...' : ' Start a session to count pushups.'}
          </Text>
          {renderCameraContent()}
        </View>
      )}
    </View>
  );
  
  function renderCameraContent() {
    return (
      <>
        <SafeAreaView style={styles.cameraOverlay}>
          <View style={styles.topControls}>
            {!isPushupSessionActive && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color="white" />
              </TouchableOpacity>
            )}
            
            {!isLoading && !isPushupSessionActive && (
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <RotateCcw size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
          
          {isLoading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="white" />
              <Text style={styles.loadingOverlayText}>Preparing camera...</Text>
            </View>
          ) : (
            <>
              {isPushupSessionActive && (
                <View style={styles.counterContainer}>
                  <PushupCounter count={pushupCount} />
                  <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                </View>
              )}
              
              <View style={styles.bottomControls}>
                {!isPushupSessionActive ? (
                  <Button
                    title="Start Counting Pushups"
                    variant="primary"
                    size="lg"
                    style={styles.startButton}
                    onPress={startPushupSession}
                  />
                ) : (
                  <Button
                    title="End Session"
                    variant="secondary"
                    size="lg"
                    style={styles.endButton}
                    onPress={endPushupSession}
                  />
                )}
              </View>
            </>
          )}
        </SafeAreaView>
        
        {isPushupSessionActive && (
          <View style={styles.positionGuide}>
            <View style={styles.positionGuideBoxes}>
              <View style={styles.positionGuideBox} />
            </View>
            <Text style={styles.positionGuideText}>Position your body within the frame</Text>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.05,
  },
  timerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    marginTop: Theme.spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bottomControls: {
    paddingHorizontal: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xl + (Platform.OS === 'ios' ? 12 : 0),
  },
  startButton: {
    backgroundColor: Theme.colors.primary,
  },
  endButton: {
    backgroundColor: Theme.colors.error,
  },
  positionGuide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'none',
  },
  positionGuideBoxes: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.5,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
  },
  positionGuideBox: {
    flex: 1,
  },
  positionGuideText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
    marginTop: Theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.background,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.md,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingOverlayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'white',
    marginTop: Theme.spacing.md,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  permissionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
  permissionTitle: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    ...Theme.typography.body1,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  permissionButton: {
    width: '100%',
    marginBottom: Theme.spacing.lg,
  },
  cancelText: {
    ...Theme.typography.button,
    color: Theme.colors.textSecondary,
  },
  webFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: Theme.spacing.xl,
  },
  webFallbackTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: 'white',
    marginTop: Theme.spacing.lg,
  },
  webFallbackText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginVertical: Theme.spacing.xl,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
  },
  resultsTitle: {
    ...Theme.typography.h1,
    color: Theme.colors.text,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  resultsStats: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  resultsStat: {
    flex: 1,
    alignItems: 'center',
  },
  resultsStatValue: {
    ...Theme.typography.h2,
    color: Theme.colors.primary,
  },
  resultsStatLabel: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  resultsDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Theme.colors.border,
    marginHorizontal: Theme.spacing.md,
  },
  resultsButton: {
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  tryAgainButton: {
    width: '100%',
    marginBottom: Theme.spacing.xl,
  },
  doneButton: {
    padding: Theme.spacing.md,
  },
  doneButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.textSecondary,
  },
});