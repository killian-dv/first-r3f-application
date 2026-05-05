import { useEffect, useMemo, useRef } from "react";
import { DoubleSide, type BufferGeometry } from "three";

export const CustomObject = () => {
  const verticesCount = 10 * 3;
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) {
      // eslint-disable-next-line react-hooks/purity
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, [verticesCount]);

  const geometry = useRef<BufferGeometry>(null);
  // compute the normals
  useEffect(() => {
    if (geometry.current) {
      geometry.current.computeVertexNormals();
    }
  }, [geometry]);

  return (
    <mesh>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
};
