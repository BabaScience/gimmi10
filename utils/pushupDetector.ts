import * as posedetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

/*
 * Push‑up detection helper utilities for React Native/Expo.
 *
 * This module encapsulates loading a MoveNet pose detector and provides a simple
 * counter that increments when the user completes a full push‑up.  A push‑up is
 * considered complete when the elbow angle moves from an extended position to
 * a flexed position (below a down threshold) and then returns to the extended
 * position (above an up threshold).  The thresholds used here are based on
 * guidance from exercise detection literature: a push‑up starts when the
 * elbow angle drops below ~100° and finishes when the elbow angle rises
 * above ~160°【642033057078998†L38-L41】.
 */

export interface PoseDetectorState {
  /** Whether the last detected frame was in the "down" position. */
  wasDown: boolean;
  /** Total number of push‑ups counted so far. */
  count: number;
}

/**
 * Default thresholds for push‑up detection.
 *
 * When the minimum of the left and right elbow angles drops below
 * `downAngleThreshold`, the user is considered to be in the down phase of a
 * push‑up.  When the minimum angle rises above `upAngleThreshold` and the
 * previous state was down, a full push‑up is counted and the state resets.
 */
export const DEFAULT_THRESHOLDS = {
  downAngleThreshold: 100,
  upAngleThreshold: 160,
};

/**
 * Load a MoveNet pose detector.  This function waits for the TensorFlow.js
 * backend to be ready and then instantiates a MoveNet SinglePose Lightning
 * model with smoothing enabled.  See the TensorFlow.js example for
 * instructions on using the pose‑detection API with React Native【666920286907320†L60-L69】.
 */
export async function initDetector(): Promise<posedetection.PoseDetector> {
  await tf.ready();
  const config: posedetection.MoveNetModelConfig = {
    modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableSmoothing: true,
  };
  const detector = await posedetection.createDetector(
    posedetection.SupportedModels.MoveNet,
    config,
  );
  return detector;
}

/**
 * Compute the angle (in degrees) between three keypoints.  The middle
 * keypoint corresponds to the vertex of the angle.  The returned value is
 * constrained to the range [0, 180].
 */
function computeAngle(a: posedetection.Keypoint, b: posedetection.Keypoint, c: posedetection.Keypoint): number {
  const abx = a.x - b.x;
  const aby = a.y - b.y;
  const cbx = c.x - b.x;
  const cby = c.y - b.y;
  const dot = abx * cbx + aby * cby;
  const abDist = Math.hypot(abx, aby);
  const cbDist = Math.hypot(cbx, cby);
  const cosTheta = dot / (abDist * cbDist);
  // Clamp numeric errors.
  const clamped = Math.min(Math.max(cosTheta, -1), 1);
  const angleRad = Math.acos(clamped);
  return (angleRad * 180) / Math.PI;
}

/**
 * Update the push‑up counter based on the current pose.  Given a detector
 * instance and an input tensor, this function estimates the current pose,
 * computes elbow angles and updates the provided state accordingly.  The
 * thresholds may be customised for different body types or motion ranges.
 *
 * @param detector The pose detector returned by {@link initDetector}.
 * @param imageTensor A 3‑D tensor containing image data (height × width × 3).
 * @param state Persistent state containing the current count and whether the
 *        previous frame was in the down position.
 * @param thresholds Optional custom thresholds for down/up detection.
 */
export async function updatePushupCount(
  detector: posedetection.PoseDetector,
  imageTensor: tf.Tensor3D,
  state: PoseDetectorState,
  thresholds: { downAngleThreshold: number; upAngleThreshold: number } = DEFAULT_THRESHOLDS,
): Promise<void> {
  const poses = await detector.estimatePoses(imageTensor, undefined, Date.now());
  if (!poses || poses.length === 0) {
    return;
  }
  const keypoints = poses[0].keypoints;
  // Helper to find a keypoint by name.  Pose detection libraries return
  // keypoints with names like "left_shoulder"; use optional chaining for safety.
  const kp = (name: string) => keypoints.find((k) => k.name === name);
  const leftShoulder = kp('left_shoulder');
  const leftElbow = kp('left_elbow');
  const leftWrist = kp('left_wrist');
  const rightShoulder = kp('right_shoulder');
  const rightElbow = kp('right_elbow');
  const rightWrist = kp('right_wrist');
  if (
    !leftShoulder || !leftElbow || !leftWrist ||
    !rightShoulder || !rightElbow || !rightWrist
  ) {
    return;
  }
  const leftAngle = computeAngle(leftShoulder, leftElbow, leftWrist);
  const rightAngle = computeAngle(rightShoulder, rightElbow, rightWrist);
  const minAngle = Math.min(leftAngle, rightAngle);
  // Determine if the user is currently in the down phase.
  if (minAngle < thresholds.downAngleThreshold) {
    state.wasDown = true;
  }
  // If the arms have re‑extended past the up threshold and the previous state
  // was down, increment the counter and reset the state.
  if (minAngle > thresholds.upAngleThreshold && state.wasDown) {
    state.count += 1;
    state.wasDown = false;
  }
}

/**
 * Example usage:
 *
 * const detector = await initDetector();
 * const state = { wasDown: false, count: 0 };
 * // inside a loop where you receive image tensors:
 * await updatePushupCount(detector, imageTensor, state);
 * console.log(state.count); // push‑ups counted so far
 */
