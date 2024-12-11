import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";

const Cube = () => {
  const { camera } = useThree();
  const cameraPosition = useRef([5, 5, 5]); // Dùng useRef để lưu trữ vị trí camera

  const handleKeyDown = (event: KeyboardEvent) => {
    const step = 1; // Khoảng cách di chuyển mỗi lần nhấn phím
    const newPosition = [...cameraPosition.current];
    console.log(1);
    switch (event.key) {
      case "ArrowUp":
        newPosition[1] += step; // Di chuyển lên (trục Y)
        break;
      case "ArrowDown":
        newPosition[1] -= step; // Di chuyển xuống (trục Y)
        break;
      case "ArrowLeft":
        newPosition[0] -= step; // Di chuyển sang trái (trục X)
        break;
      case "ArrowRight":
        newPosition[0] += step; // Di chuyển sang phải (trục X)
        break;
      default:
        return;
    }

    cameraPosition.current = newPosition; // Cập nhật vị trí mới của camera

    // Di chuyển camera với hiệu ứng mượt mà
    gsap.to(camera.position, {
      x: newPosition[0],
      y: newPosition[1],
      z: newPosition[2],
      duration: 0.1,
      ease: "power3.inOut",
    });
  };

  // Lắng nghe sự kiện keydown
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeyDown);
  }
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};
// Component Scene chứa logic di chuyển camera
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
