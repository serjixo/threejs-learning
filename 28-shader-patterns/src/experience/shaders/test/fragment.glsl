/**
varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv, 1.0,1.0);
}*/

varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv.yx, 1.0, 1.0);
}