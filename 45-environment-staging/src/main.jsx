import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Canvas} from "@react-three/fiber";
import Experience from "./experience/Experience.jsx";
import {Leva} from "leva";

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <Leva/>
        <Canvas
            shadows>
            <Experience/>
        </Canvas>
    </StrictMode>
)
