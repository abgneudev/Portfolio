/**
 * Glyph Atlas Utility
 *
 * Creates a texture atlas of ASCII characters for GPU-accelerated text rendering.
 * The atlas is rendered to an offscreen canvas then uploaded to WebGL.
 */

export interface GlyphAtlasConfig {
  chars: string;
  fontSize: number;
  fontFamily?: string;
}

export interface GlyphAtlas {
  texture: WebGLTexture;
  charWidth: number;
  charHeight: number;
  charCount: number;
}

/**
 * Creates a glyph atlas texture for ASCII rendering
 *
 * @param gl - WebGL context
 * @param config - Atlas configuration
 * @param textureUnit - Which texture unit to bind to (default: gl.TEXTURE1)
 */
export function createGlyphAtlas(
  gl: WebGLRenderingContext,
  config: GlyphAtlasConfig,
  textureUnit: number = gl.TEXTURE1
): GlyphAtlas | null {
  const { chars, fontSize, fontFamily = 'monospace' } = config;

  // Calculate character cell dimensions
  const charWidth = Math.round(fontSize * 0.6);
  const charHeight = Math.round(fontSize * 1.2);
  const atlasWidth = charWidth * chars.length;

  // Create offscreen canvas for rendering glyphs
  const canvas = document.createElement('canvas');
  canvas.width = atlasWidth;
  canvas.height = charHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Render each character
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#fff';

  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], i * charWidth, 0);
  }

  // Create and configure WebGL texture
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.activeTexture(textureUnit);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Use NEAREST filtering for crisp text
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload canvas to texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);

  return {
    texture,
    charWidth,
    charHeight,
    charCount: chars.length,
  };
}
