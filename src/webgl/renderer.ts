export class Renderer {
    private _canvas: HTMLCanvasElement;
    private _context: WebGLRenderingContext;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = this._canvas.getContext('webgl2');
    }

    createShader(type: GLenum, source: string) {
        const shader = this._context.createShader(type);
        this._context.shaderSource(shader, source);
        this._context.compileShader(shader);
        const success = this._context.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS);
        if (success) return shader;
        console.error(this._context.getShaderInfoLog(shader));
        this._context.deleteShader(shader);
    }

    createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = this._context.createProgram();
        this._context.attachShader(program, vertexShader);
        this._context.attachShader(program, fragmentShader);
        this._context.linkProgram(program);
        const success = this._context.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS);
        if (success) return program;
        console.log(this._context.getProgramInfoLog(program));
        this._context.deleteProgram(program);
    }

    useProgram(program: WebGLProgram) {
        this._context.useProgram(program);
    }

    createBuffer() {
        const positionBuffer = this._context.createBuffer();
        this._context.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, positionBuffer);
        return positionBuffer;
    }

    setBufferData(data: Array<number>) {
        this._context.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array(data), WebGLRenderingContext.STATIC_DRAW);
    }

    bindBuffer(buffer: WebGLBuffer) {
        this._context.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer);
    }

    getAttributeLocation(program: WebGLProgram, attributeName: string) {
        return this._context.getAttribLocation(program, attributeName);
    }
    getUniformLocation(program: WebGLProgram, uniformName: string) {
        return this._context.getUniformLocation(program, uniformName);
    }

    enableVertexAttribArray(positionAttributeLocation: GLint) {
        this._context.enableVertexAttribArray(positionAttributeLocation);
    }

    setVertexAttributePointer(positionAttributeLocation: GLint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr) {
        this._context.vertexAttribPointer(positionAttributeLocation, size, type, normalized, stride, offset);
    }

    resizeCanvasToDisplaySize(multiplier = 1) {
        const width = this._canvas.clientWidth * multiplier | 0;
        const height = this._canvas.clientHeight * multiplier | 0;
        if (this._canvas.width !== width || this._canvas.height !== height) {
            this._canvas.width = width;
            this._canvas.height = height;
            return true;
        }
        return false;
    }

    setViewport() {
        this._context.viewport(0, 0, this._canvas.width, this._canvas.height);
    }

    updateResolution(resolutionUniformLocation: WebGLUniformLocation) {
        this._context.uniform2f(resolutionUniformLocation, this._canvas.width, this._canvas.height);
    }

    updateColor(colorUniformLocation: WebGLUniformLocation, ...rgba: [number, number, number, number] ) {
        this._context.uniform4f(colorUniformLocation, ...rgba);
    }

    clearCanvas() {
        this._context.clearColor(0, 0, 0, 0);
        this._context.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
    }


    drawArrays(primitiveType: GLenum, offset: GLint, count: GLsizei) {
        this._context.drawArrays(primitiveType, offset, count);
    }

}