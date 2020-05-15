import './main.scss';
import { Renderer } from './webgl/renderer';
import vertexShaderSource from './@shaders/base-vertex.glsl';
import fragmentShaderSource from './@shaders/base-fragment.glsl';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const renderer = new Renderer(canvas);

const vertexShader = renderer.createShader(WebGLRenderingContext.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = renderer.createShader(WebGLRenderingContext.FRAGMENT_SHADER, fragmentShaderSource);

const program = renderer.createProgram(vertexShader, fragmentShader);


const positionBuffer = renderer.createBuffer();
renderer.bindBuffer(positionBuffer);

const positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
];

renderer.setBufferData(positions);
renderer.resizeCanvasToDisplaySize();
renderer.setViewport();
renderer.clearCanvas();

renderer.useProgram(program);

const positionAttributeLocation = renderer.getAttributeLocation(program, 'a_position');
const resolutionUniformLocation = renderer.getUniformLocation(program, 'u_resolution');
const colorUniformLocation = renderer.getUniformLocation(program, 'u_color');

renderer.updateResolution(resolutionUniformLocation);
renderer.updateColor(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
renderer.enableVertexAttribArray(positionAttributeLocation);
renderer.setVertexAttributePointer(
    positionAttributeLocation,
    2,
    WebGLRenderingContext.FLOAT,
    false,
    0,
    0);
renderer.drawArrays(
    WebGLRenderingContext.TRIANGLES,
    0,
    6);


