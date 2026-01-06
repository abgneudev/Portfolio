/**
 * WebGL Shaders for ASCII Video Effect
 *
 * GPU-accelerated ASCII art rendering from video input.
 * All processing happens in the fragment shader for maximum performance.
 */

export const ASCII_VERTEX_SHADER = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
}`;

export const ASCII_FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D u_video;
uniform sampler2D u_glyphs;
uniform vec2 u_gridSize;
uniform float u_glyphCount;
varying vec2 v_uv;

void main() {
  vec2 cell = floor(v_uv * u_gridSize);
  vec2 cellUV = (cell + 0.5) / u_gridSize;
  vec3 col = texture2D(u_video, cellUV).rgb;

  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float idx = floor(lum * (u_glyphCount - 0.001));

  vec2 inCell = fract(v_uv * u_gridSize);
  float glyphU = (idx + inCell.x) / u_glyphCount;
  float alpha = texture2D(u_glyphs, vec2(glyphU, inCell.y)).a;

  // Boost brightness by 1.5x and increase saturation
  vec3 boosted = pow(col, vec3(0.7)) * 1.5;
  vec3 qCol = floor(clamp(boosted, 0.0, 1.0) * 16.0) / 16.0;
  vec3 bg = vec3(0.01);

  gl_FragColor = vec4(mix(bg, qCol, alpha), 1.0);
}`;

/** ASCII character set ordered by visual density (dark to light) */
export const ASCII_CHARS = ' .:-=+*#%@';
