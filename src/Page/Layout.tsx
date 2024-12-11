import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import { Vector3, Mesh } from "three";

const Cube = () => {
  const { camera } = useThree();
  const cubeRef = useRef<Mesh>(null);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!event.face || !event.point || !camera) return;

    // Lấy tọa độ điểm được click
    const clickPosition = new Vector3(
      event.point.x,
      event.point.y,
      event.point.z
    );

    // Lấy hướng pháp tuyến của mặt
    const { x, y, z } = event.face.normal;

    // Tính vị trí camera cách mặt một khoảng cố định
    const offset = 3; // Khoảng cách từ mặt đến camera
    const newCameraPosition = clickPosition
      .clone()
      .add(new Vector3(x * offset, y * offset, z * offset));

    // Camera nhìn vào trung tâm của hình lập phương
    const cubeCenter = new Vector3(0, 0, 0);

    // Di chuyển camera bằng gsap
    gsap.to(camera.position, {
      x: newCameraPosition.x,
      y: newCameraPosition.y,
      z: newCameraPosition.z,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.lookAt(cubeCenter);
      },
    });
  };

  return (
    <mesh
      ref={cubeRef}
      position={[0, 0, 0]}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls />
      <Cube />
      <gridHelper />
    </Canvas>
  );
};

export default Scene;
