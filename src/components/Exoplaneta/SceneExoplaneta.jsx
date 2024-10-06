// components/Exoplaneta/SceneExoplaneta.jsx

import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import Exoplanet from './Exoplanet';
import InfoCard from './InfoCard';
import exoplanetData from '@/data/dados_exoplanetas.json'; // Importe o arquivo JSON
import {calculateRadius} from '../../utils/planetCalculations';

function AppExoplanet() {
  const { id } = useParams(); // Obtém o 'id' da URL

  // Procura o exoplaneta com o 'id' correspondente no JSON
  const exoplanet = exoplanetData.find((exoplanet) => exoplanet.id === Number(id));

  // Se o exoplaneta não for encontrado, retorna uma mensagem de erro
  if (!exoplanet) {
    return <div>Exoplaneta não encontrado.</div>;
  }
  
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Cena 3D */}
      <Canvas style={{ height: '100%', width: '100%' }}>
        <color attach='background' args={['black']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Passa os dados do exoplaneta para o componente Exoplanet */}
        <Exoplanet data={exoplanet} />
        <Stars />
        <OrbitControls />
      </Canvas>

      {/* Card de informação */}
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <InfoCard
  title={`Exoplaneta ${exoplanet.pl_name}`}
  content={
    <>
      <h2 className="w-8/12 text-xl font-bold mb-6">{exoplanet.pl_name}</h2> {/* Aumentei o margin-bottom */}
      <p className="mb-4 p-2"> {/* Aumentei o margin-bottom */}
        <strong>ID do Planeta:</strong> {exoplanet.id}
      </p>
      <p className="mb-4"> {/* Aumentei o margin-bottom */}
        <strong>Estrela Hospedeira:</strong> {exoplanet.hostname}
      </p>
      <p className="mb-4"> {/* Aumentei o margin-bottom */}
        <strong>Massa (Massas Terrestres):</strong> {exoplanet.pl_masse || 'Desconhecido'}
      </p>
      <p className="mb-4"> {/* Aumentei o margin-bottom */}
        <strong>Raio (Raios Terrestres):</strong> {calculateRadius(exoplanet.pl_masse) || 'Indefinido'}
      </p>
      <p className="mb-4"> {/* Aumentei o margin-bottom */}
        <strong>Distância Orbital (UA):</strong> {exoplanet.pl_orbsmax || 'Desconhecido'}
      </p>
      <p className="mb-4"> {/* Aumentei o margin-bottom */}
        <strong>Temperatura de Equilíbrio (K):</strong> {exoplanet.pl_eqt || 'Desconhecido'}
      </p>
    </>
  }
/>


      </div>
    </div>
  );
}

export default AppExoplanet;
