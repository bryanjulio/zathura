import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Exoplanet from './Exoplanet';
import InfoCard from './InfoCard';
import Stars from '../Stars'
import exoplanetData from '@/data/dados_exoplanetas.json'; 
import {calculateRadius} from '../../utils/planetCalculations';

function  AppExoplanet() {
  const { id } = useParams();

  const exoplanet = exoplanetData.find((exoplanet) => exoplanet.id === Number(id));

  if (!exoplanet) {
    return <div>Exoplaneta não encontrado.</div>;
  }
  
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Canvas style={{ height: '100%', width: '100%' }}>
        <color attach='background' args={['black']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Exoplanet data={exoplanet} />
        <Stars />
        <OrbitControls />
      </Canvas>

      <div style={{ position: 'absolute', top: 20, left: 20 }}>
      <InfoCard
  title={`Exoplaneta ${exoplanet.pl_name}`}
  content={
    <>
      <h2 className="w-8/12 text-xl font-bold mb-6">{exoplanet.pl_name}</h2> 
      <p className="mb-4">
        <strong className='text-sm'>ID do Planeta:</strong> {exoplanet.id}
      </p>
      <p className="mb-4 text-sm"> 
        <strong>Estrela Hospedeira:</strong> {exoplanet.hostname}
      </p>
      <p className="mb-4 text-sm"> 
        <strong>Massa (Massas Terrestres):</strong> {exoplanet.pl_masse || 'Desconhecido'}
      </p>
      <p className="mb-4 text-sm"> 
        <strong>Raio (Raios Terrestres):</strong> {calculateRadius(exoplanet.pl_masse) || 'Indefinido'}
      </p>
      <p className="mb-4 text-sm"> 
        <strong>Distância Orbital (UA):</strong> {exoplanet.pl_orbsmax || 'Desconhecido'}
      </p>
      <p className="mb-4 text-sm"> 
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
