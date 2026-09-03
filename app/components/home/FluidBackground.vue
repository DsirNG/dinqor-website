<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId = 0
let gl: WebGLRenderingContext | null = null

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  // Generic noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec3 color1 = vec3(0.9, 0.94, 1.0);     // Very light blue
    vec3 color2 = vec3(0.96, 0.92, 1.0);    // Very light purple
    vec3 color3 = vec3(0.85, 0.9, 1.0);     // Light blue
    vec3 color4 = vec3(1.0, 1.0, 1.0);      // White

    float t = u_time * 0.2;
    vec2 pos = st * 1.5;
    
    // Add multiple layers of noise for complex fluid movement
    float q = snoise(pos + t);
    vec2 noisePos = vec2(pos.x + q, pos.y + q);
    float n = snoise(noisePos + t * 0.8);
    float n2 = snoise(noisePos - t * 0.6);

    // Mix colors based on noise
    vec3 color = mix(color1, color2, n);
    color = mix(color, color3, n2);
    color = mix(color, color4, smoothstep(0.2, 0.8, n * n2));

    gl_FragColor = vec4(color, 1.0);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function initWebGL(canvas: HTMLCanvasElement) {
  gl = canvas.getContext('webgl')
  if (!gl) return false

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  
  if (!vertexShader || !fragmentShader) return false

  const program = gl.createProgram()
  if (!program) return false

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    return false
  }

  gl.useProgram(program)

  // Setup rectangle covering entire canvas
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const positions = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0,
  ])
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  const timeLocation = gl.getUniformLocation(program, 'u_time')

  const startTime = Date.now()

  function render() {
    if (!gl || !canvas) return

    // Resize canvas to match display size
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth
      canvas.height = displayHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
    animationFrameId = requestAnimationFrame(render)
  }

  render()
  return true
}

onMounted(() => {
  if (canvasRef.value) {
    initWebGL(canvasRef.value)
  }
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <canvas ref="canvasRef" class="fluid-canvas"></canvas>
</template>

<style scoped>
.fluid-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
