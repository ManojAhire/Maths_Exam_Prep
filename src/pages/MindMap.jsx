import { useCallback, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import { curriculum } from '../data/curriculum';
import 'reactflow/dist/style.css';

export default function MindMap() {
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    
    nodes.push({
      id: 'root',
      type: 'input',
      data: { label: '🚀 Maths-2 Hopper' },
      position: { x: 0, y: 0 },
      style: { background: '#1a1a1a', color: '#fff', border: '5px solid #000', borderRadius: '15px', fontWeight: '900', padding: '25px', fontSize: '2rem', width: 300, textAlign: 'center', boxShadow: '10px 10px 0px #ccc' }
    });

    curriculum.forEach((mod, modIdx) => {
      const modId = `mod-${modIdx}`;
      const angle = (modIdx / curriculum.length) * 2 * Math.PI;
      const radius = 600;
      const mx = Math.cos(angle) * radius;
      const my = Math.sin(angle) * radius;

      nodes.push({
        id: modId,
        data: { label: `${mod.icon} ${mod.title}` },
        position: { x: mx, y: my },
        style: { background: mod.color, border: '4px solid #1a1a1a', borderRadius: '12px', fontWeight: '800', padding: '20px', width: 280, textAlign: 'center', fontSize: '1.2rem', boxShadow: '8px 8px 0px #000' }
      });

      edges.push({
        id: `e-root-${modId}`,
        source: 'root',
        target: modId,
        animated: true,
        style: { stroke: '#1a1a1a', strokeWidth: 5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#1a1a1a' }
      });

      mod.submodules.forEach((sub, subIdx) => {
        const subId = sub.id;
        const subAngle = angle + (subIdx - mod.submodules.length / 2) * 0.05;
        const subRadius = radius + 500;
        const sx = Math.cos(subAngle) * subRadius;
        const sy = Math.sin(subAngle) * subRadius;

        const diffColors = { easy: '#3b82f6', medium: '#eab308', hard: '#ef4444' };

        nodes.push({
          id: subId,
          data: { label: sub.title },
          position: { x: sx, y: sy },
          style: { 
            background: '#fff', 
            border: `3px solid ${diffColors[sub.difficulty]}`, 
            borderRadius: '10px', 
            fontSize: '0.85rem', 
            padding: '12px', 
            width: 180,
            fontWeight: '700',
            boxShadow: `5px 5px 0px ${diffColors[sub.difficulty]}`
          }
        });

        edges.push({
          id: `e-${modId}-${subId}`,
          source: modId,
          target: subId,
          style: { stroke: mod.color, strokeWidth: 3 },
        });
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8fafc' }}>
      <div style={{ position: 'fixed', top: '110px', left: '30px', zIndex: 100, pointerEvents: 'none' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#000', marginBottom: '5px' }}>Topic Knowledge Graph</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
            <span style={{ color: '#3b82f6', fontWeight: 900 }}>● EASY</span>
            <span style={{ color: '#eab308', fontWeight: 900 }}>● MEDIUM</span>
            <span style={{ color: '#ef4444', fontWeight: 900 }}>● HARD</span>
        </div>
      </div>
      
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          minZoom={0.05}
          maxZoom={1.5}
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable style={{ border: '3px solid #000' }} />
          <Background variant="cross" gap={50} size={1} color="#e2e8f0" />
        </ReactFlow>
      </div>
    </div>
  );
}
