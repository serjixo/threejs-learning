uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
uniform vec2 uFrequency;

uniform float uTime;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;
//uniform vec3 uColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + (uTime * 0.008)) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y + (uTime * 0.004)) * 0.1;
    modelPosition.z += elevation;
    //    modelPosition.z += sin(modelPosition.x * uFrequency.x + (uTime * 0.01)) * 0.1;
    //    modelPosition.z += sin(modelPosition.y * uFrequency.y + (uTime * 0.01)) * 0.1;
    //    modelPosition.y += uTime * 0.001;
    //    modelPosition.z += aRandom * 0.1;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
}
