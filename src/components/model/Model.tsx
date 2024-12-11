import { useGLTF } from "@react-three/drei";
import { MeshProps, ThreeEvent } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";
interface ModelProps extends MeshProps {
  positionTemp: number[];
  handlClick: (event: ThreeEvent<MouseEvent>) => void;
}
const Model = (props: ModelProps) => {
  const { scene } = useGLTF("/models/demo.glb");
  // Tạo một bản sao của scene
  const clonedScene: any = useMemo(() => scene.clone(), [scene]);
  const temPosition = new Vector3(
    props.positionTemp[0],
    props.positionTemp[1],
    props.positionTemp[2]
  );
  return (
    <mesh position={temPosition} onClick={(event) => props.handlClick(event)}>
      <primitive {...props} object={clonedScene} frustumCulled={true} />
    </mesh>
  );
};

export default Model;
