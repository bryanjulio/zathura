import useGravity from '../hooks/useGravity'
import { CameraProvider } from '../context/Camera'

import { TrailProvider } from '../context/Trails'

import Sun from './Sun'
import Earth from './Earth'
import Stars from './Stars'

const Scene = () => {
    useGravity()
    return (    
        <CameraProvider>
                <Sun />
                <TrailProvider>
                    <Earth />    
                </TrailProvider> 
                <Stars />
        </CameraProvider>
    )
}

export default Scene
