import useGravity from '../hooks/useGravity'
import { CameraProvider } from '../context/Camera'

import { TrailProvider } from '../context/Trails'

import Stars from './Stars'


// Scene component
const Scene = () => {
    // Custom hook for gravity logic
    useGravity()

    return (
        <CameraProvider>

       
            {/* <TrailProvider>
                    <Planets />
                </TrailProvider> */}

            <Stars />

        </CameraProvider>
    )
}

export default Scene
