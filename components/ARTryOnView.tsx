import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Circle as XCircle, Camera, FlipHorizontal } from 'lucide-react-native';
import { colors, radius, spacing } from '@/constants/theme';
import Button from './ui/Button';
import { EyewearProduct } from '@/data/products';

interface ARTryOnViewProps {
  visible: boolean;
  onClose: () => void;
  product?: EyewearProduct;
}

const ARTryOnView = ({ visible, onClose, product }: ARTryOnViewProps) => {
  const [cameraType, setCameraType] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webCameraReady, setWebCameraReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && visible) {
      initWebCamera();
    }
    return () => {
      if (Platform.OS === 'web') {
        stopWebCamera();
      }
    };
  }, [visible]);

  const initWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setWebCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopWebCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setWebCameraReady(false);
  };

  // If permission is null, camera permissions are still loading
  if (!permission && Platform.OS !== 'web') {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </Modal>
    );
  }

  // If permission is not granted, show permission request
  if (!permission?.granted && Platform.OS !== 'web') {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            We need camera permission to enable the AR try-on feature
          </Text>
          <Button 
            title="Grant Permission" 
            onPress={requestPermission} 
            style={styles.permissionButton}
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={onClose}
            style={styles.cancelButton}
          />
        </View>
      </Modal>
    );
  }

  const toggleCameraType = () => {
    if (Platform.OS === 'web') {
      // For web, we'll need to reinitialize the camera with different facingMode
      stopWebCamera();
      setCameraType(current => {
        const newType = current === 'back' ? 'front' : 'back';
        initWebCamera();
        return newType;
      });
    } else {
      setCameraType(current => (current === 'back' ? 'front' : 'back'));
    }
  };

  const handleCapture = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsCaptured(true);
    }, 1500);
  };

  const handleRetry = () => {
    setIsCaptured(false);
  };

  const renderWebCamera = () => (
    <View style={styles.webCameraContainer}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={styles.webVideo as any}
      />
      {product && webCameraReady && (
        <View style={[styles.glassesOverlay, styles.webGlassesOverlay]}>
          <Image 
            source={{ uri: product.imageUrls[0] }} 
            style={styles.glassesImage}
            resizeMode="contain"
          />
        </View>
      )}
      <canvas ref={canvasRef} style={styles.webCanvas as any} />
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {Platform.OS === 'web' ? (
          renderWebCamera()
        ) : (
          <CameraView 
            style={styles.camera} 
            facing={cameraType}
          >
            {!isProcessing && !isCaptured && (
              <>
                {/* Overlay for glasses positioning */}
                <View style={styles.glassesOverlay}>
                  {product && (
                    <Image 
                      source={{ uri: product.imageUrls[0] }} 
                      style={styles.glassesImage}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </>
            )}
          </CameraView>
        )}

        {/* Captured image overlay */}
        {isCaptured && (
          <View style={styles.capturedOverlay}>
            <View style={styles.capturedContent}>
              <Text style={styles.capturedText}>How do they look?</Text>
              
              <View style={styles.capturedActions}>
                <Button
                  title="Try Another"
                  variant="outline"
                  onPress={handleRetry}
                  style={styles.capturedButton}
                />
                <Button
                  title="Add to Cart"
                  onPress={onClose}
                  style={styles.capturedButton}
                />
              </View>
            </View>
          </View>
        )}

        {/* Processing overlay */}
        {isProcessing && (
          <View style={styles.processingOverlay}>
            <ActivityIndicator size="large" color={colors.text.inverted} />
            <Text style={styles.processingText}>Processing...</Text>
          </View>
        )}

        {/* Controls */}
        {!isCaptured && (
          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
            >
              <XCircle size={30} color="#fff" />
            </TouchableOpacity>

            <View style={styles.bottomControls}>
              <TouchableOpacity 
                style={styles.flipButton}
                onPress={toggleCameraType}
              >
                <FlipHorizontal size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.captureButton}
                onPress={handleCapture}
                disabled={isProcessing}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <View style={styles.spacer} />
            </View>
          </View>
        )}

        {/* Product info */}
        {product && !isCaptured && (
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  webCameraContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  webCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  webGlassesOverlay: {
    position: 'absolute',
    zIndex: 10,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  flipButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  spacer: {
    width: 40,
  },
  glassesOverlay: {
    position: 'absolute',
    alignSelf: 'center',
    top: '25%',
    width: '70%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassesImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  productInfo: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: spacing.md,
    alignItems: 'center',
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  productPrice: {
    color: '#fff',
    fontSize: 16,
    marginTop: spacing.xs,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  permissionButton: {
    marginBottom: spacing.md,
  },
  cancelButton: {},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.text.secondary,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  processingText: {
    color: colors.text.inverted,
    fontSize: 18,
    marginTop: spacing.md,
  },
  capturedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  capturedContent: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  capturedText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  capturedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  capturedButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  }
});

export default ARTryOnView;