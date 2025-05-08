import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import './ThreeSlider.scss';

const IMAGES = [
  '/products/designers/Designer_01.png',
  '/products/designers/Designer_02.png',
  '/products/designers/Designer_03.png',
  '/products/designers/Designer_04.png',
  '/products/designers/Designer_05.png',
  '/products/designers/Designer_06.png',
];

export default function ThreeSlider({ onAddToCartClick }) {
  const mountRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    const { clientWidth: W, clientHeight: H } = mount;
    const aspect = W / H;

    // 1) Scene, Perspective Camera, Renderer
    const scene = new THREE.Scene();
    const fov = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    // 2) Compute slide layout on a cylinder
    const num = IMAGES.length;
    const theta = (2 * Math.PI) / num;

    // Compute the visible width in world units at z=1
    const frustumHeight = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2));
    const frustumWidth = frustumHeight * aspect;

    // We'll make each slide one-third of the viewport width
    const slideWidth = frustumWidth / 3;
    const slideHeight = slideWidth * (H / W);

    // Radius so the slides just touch
    const radius = slideWidth / (2 * Math.tan(theta / 2));

    camera.position.set(0, 0, radius * 1.2);
    camera.lookAt(0, 0, 0);

    // 3) Group of slides
    const group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.TextureLoader();
    IMAGES.forEach((src, i) => {
      loader.load(src, (texture) => {
        const geo = new THREE.PlaneGeometry(slideWidth, slideHeight);
        const mat = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geo, mat);

        // Position around circle:
        const ang = i * theta;
        mesh.position.x = radius * Math.sin(ang);
        mesh.position.z = radius * Math.cos(ang);
        mesh.rotation.y = ang;

        // Mark the “center” slide for CTA:
        if (i === Math.floor(num / 2)) mesh.userData.isCTA = true;

        group.add(mesh);
      });
    });

    // 4) Scroll to rotate
    let index = Math.floor(num / 2);
    const min = 0,
          max = num - 1;

    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0 && index < max) index++;
      else if (e.deltaY < 0 && index > min) index--;

      gsap.to(group.rotation, {
        y: -index * theta,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          const slide = group.children[index];
          if (slide.userData.isCTA) onAddToCartClick?.();
        },
      });
    };

    mount.addEventListener('wheel', onWheel, { passive: false });

    // 5) Render loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 6) Cleanup
    const handleResize = () => {
      const w = mount.clientWidth,
            h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onAddToCartClick]);

  return <div className="three-slider-container" ref={mountRef} />;
}
