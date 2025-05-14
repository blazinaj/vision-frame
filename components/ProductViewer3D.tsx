import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/theme';

interface ProductViewer3DProps {
  modelUrl?: string;
}

const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ modelUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Platform.OS === 'web' && containerRef.current) {
      // Dynamic import Three.js only on web
      Promise.all([
        import('three'),
        import('three/examples/jsm/controls/OrbitControls'),
        import('three/examples/jsm/loaders/GLTFLoader')
      ]).then(([THREE, { OrbitControls }, { GLTFLoader }]) => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf7f9fc);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current!.clientWidth / containerRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
          containerRef.current!.clientWidth,
          containerRef.current!.clientHeight
        );
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current!.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 3;
        controls.maxDistance = 10;

        // Fallback geometry if no model is provided
        const geometry = new THREE.BoxGeometry(2, 1, 0.5);
        const material = new THREE.MeshPhongMaterial({
          color: 0x3d5a80,
          transparent: true,
          opacity: 0.9,
          shininess: 100
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }

        // Handle window resize
        function handleResize() {
          if (containerRef.current) {
            camera.aspect =
              containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(
              containerRef.current.clientWidth,
              containerRef.current.clientHeight
            );
          }
        }

        window.addEventListener('resize', handleResize);

        // Load model if URL is provided
        if (modelUrl) {
          const loader = new GLTFLoader();
          loader.load(
            modelUrl,
            (gltf) => {
              scene.remove(cube);
              scene.add(gltf.scene);

              // Center and scale the model
              const box = new THREE.Box3().setFromObject(gltf.scene);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());

              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 3 / maxDim;
              gltf.scene.scale.multiplyScalar(scale);

              gltf.scene.position.sub(center.multiplyScalar(scale));
            },
            undefined,
            (error) => {
              console.error('Error loading model:', error);
            }
          );
        }

        animate();

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          renderer.dispose();
          containerRef.current?.removeChild(renderer.domElement);
        };
      });
    }
  }, [modelUrl]);

  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          {/* Show a placeholder or message for native platforms */}
        </View>
      </View>
    );
  }

  return <div ref={containerRef} style={styles.webContainer} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.card,
  },
  webContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: 'hidden',
  } as any,
});

export default ProductViewer3D;