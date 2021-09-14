function main() {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  /*
   * Definisikan vertex
   * WebGL hanya sampai 0-1
   * (0.0, 0.5), B (0.5, -0.5), C (-0.5, -0.5)
   */

  const vertices = [0.0, 0.5, 0.5, -0.5, -0.5, -0.5];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const vertexShaderCode = `
        attribute vec2 a_Position;
        void main() {
        gl_Position = vec4(a_Position, 0.0, 1.0);
            gl_PointSize = 20.0;
        }
    `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  const fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        }
    `;

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(1.0, 1.0, 1.0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
