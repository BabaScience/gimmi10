import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
// Import the pushup detector helper from the utils folder. Adjust the relative path as needed.
import { initDetector, updatePushupCount, PoseDetectorState } from '../../utils/pushupDetector';

export default function WorkoutWithDetection() {
  const [pushupCount, setPushupCount] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [detectorReady, setDetectorReady] = useState(false);

  // Hold the MoveNet detector and algorithm state between frames.
  const detectorRef = useRef<any>(null);
  const stateRef = useRef<PoseDetectorState>({ wasDown: false, count: 0 });

  // Wrap expo-camera with TensorFlow to get image tensors.
  const TensorCamera = useMemo(() => cameraWithTensors(Camera), []);

  // Initialise TensorFlow and MoveNet once.
  useEffect(() => {
    (async () => {
      await tf.ready();
      const detector = await initDetector();
      detectorRef.current = detector;
      setDetectorReady(true);
    })();
  }, []);

  // Process each frame from the camera.
  const handleCameraStream = useCallback(
    (images: IterableIterator<tf.Tensor3D>) => {
      const loop = async () => {
        const imageTensor = images.next().value as tf.Tensor3D | undefined;
        if (imageTensor && detectorRef.current && isSessionActive) {
          await updatePushupCount(detectorRef.current, imageTensor, stateRef.current);
          setPushupCount(stateRef.current.count);
        }
        // Dispose of the tensor to free memory.
        if (imageTensor) imageTensor.dispose();
        requestAnimationFrame(loop);
      };
      loop();
    },
    [isSessionActive]
  );

  // Ask for camera permissions if needed.
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const startSession = () => {
    stateRef.current.count = 0;
    stateRef.current.wasDown = false;
    setPushupCount(0);
    setIsSessionActive(true);
  };
  const stopSession = () => setIsSessionActive(false);

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Camera permission is required.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {detectorReady ? (
        <TensorCamera
          type={Camera.Constants.Type.front}
          resizeWidth={224}
          resizeHeight={224}
          resizeDepth={3}
          autorender
          style={styles.camera}
          onReady={handleCameraStream}
        />
      ) : (
        <Text style={styles.info}>Loading pose detector…</Text>
      )}
      <View style={styles.overlay}>
        <Text style={styles.counter}>{pushupCount}</Text>
        {isSessionActive ? (
          <TouchableOpacity onPress={stopSession} style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startSession} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  overlay: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    alignItems: 'center',
  },
  counter: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
