import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, type Group } from "three";

export const Experience = () => {
  const cube = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (cube.current) {
      cube.current.rotation.y += delta;
    }
    // if (group.current) {
    //   group.current.rotation.y += delta;
    // }
  });

  return (
    <>
      <group ref={group}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh ref={cube} scale={1.5} position-x={2} position-y={Math.PI / 4}>
          <boxGeometry scale={1.5} />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
};
