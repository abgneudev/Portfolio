'use client';

import { useState } from 'react';

const CLOUD_NAME = 'dbvfgfqqh';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

interface CloudinaryMediaProps {
  publicId: string;
  alt: string;
  width?: number;
  aspectRatio?: '16:9' | '9:16' | '4:3' | '3:4' | '1:1' | 'auto';
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'color' | 'none';
  placeholderColor?: string;
  className?: string;
  style?: React.CSSProperties;
  videoOptions?: {
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  };
}

const getAspectRatioValue = (ratio: string): number | null => {
  const ratios: Record<string, number> = {
    '16:9': 16 / 9,
    '9:16': 9 / 16,
    '4:3': 4 / 3,
    '3:4': 3 / 4,
    '1:1': 1,
  };
  return ratios[ratio] || null;
};

const isVideo = (publicId: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi'];
  return videoExtensions.some(ext => publicId.toLowerCase().endsWith(ext));
};

const buildImageUrl = (publicId: string, transforms: string[] = []): string => {
  const defaultTransforms = ['f_auto', 'q_auto'];
  const allTransforms = [...defaultTransforms, ...transforms].join(',');
  return `${BASE_URL}/image/upload/${allTransforms}/${publicId}`;
};

const buildBlurUrl = (publicId: string): string => {
  return `${BASE_URL}/image/upload/f_auto,q_30,w_30,e_blur:1000/${publicId}`;
};

const buildVideoUrl = (publicId: string, transforms: string[] = []): string => {
  const defaultTransforms = ['f_auto', 'q_auto'];
  const allTransforms = [...defaultTransforms, ...transforms].join(',');
  return `${BASE_URL}/video/upload/${allTransforms}/${publicId}`;
};

const buildSrcSet = (publicId: string, widths: number[]): string => {
  return widths
    .map(w => `${buildImageUrl(publicId, [`w_${w}`])} ${w}w`)
    .join(', ');
};

export function CloudinaryMedia({
  publicId,
  alt,
  width,
  aspectRatio = 'auto',
  sizes = '100vw',
  priority = false,
  placeholder = 'blur',
  placeholderColor = '#e5e5e5',
  className = '',
  style,
  videoOptions = {
    autoPlay: true,
    loop: true,
    muted: true,
    controls: false,
  },
}: CloudinaryMediaProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isVideoFile = isVideo(publicId);
  const aspectValue = getAspectRatioValue(aspectRatio);
  const srcSetWidths = [400, 600, 800, 1000, 1200];

  const transforms: string[] = [];
  if (width) transforms.push(`w_${width}`);

  const blurUrl = !isVideoFile ? buildBlurUrl(publicId) : null;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholder === 'color' ? placeholderColor : undefined,
    ...(aspectValue && { aspectRatio: `${aspectValue}` }),
    ...style,
  };

  const blurStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    opacity: loaded ? 0 : 1,
    transition: 'opacity 0.4s ease',
  };

  const mediaStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: aspectValue ? '100%' : 'auto',
    objectFit: 'cover',
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  if (error) {
    return (
      <div
        style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className={className}
      >
        <span style={{ color: '#999', fontSize: '14px' }}>Failed to load media</span>
      </div>
    );
  }

  if (isVideoFile) {
    return (
      <div style={containerStyle} className={className}>
        <video
          src={buildVideoUrl(publicId, transforms)}
          style={mediaStyle}
          autoPlay={videoOptions.autoPlay}
          loop={videoOptions.loop}
          muted={videoOptions.muted}
          controls={videoOptions.controls}
          playsInline
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle} className={className}>
      {placeholder === 'blur' && blurUrl && (
        <img
          src={blurUrl}
          alt=""
          aria-hidden="true"
          style={blurStyle}
        />
      )}
      <img
        src={buildImageUrl(publicId, transforms)}
        srcSet={buildSrcSet(publicId, srcSetWidths)}
        sizes={sizes}
        alt={alt}
        style={mediaStyle}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
