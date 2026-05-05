import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, type Group } from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CustomObject } from "./components/custom-object";

const OrbitControls = extend(ThreeOrbitControls);

export const Experience = () => {
  const cube = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  const { camera, gl } = useThree();

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
      <OrbitControls args={[camera, gl.domElement]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <group ref={group}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh ref={cube} scale={1.5} position-x={2} rotation-y={Math.PI / 4}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  );
};
