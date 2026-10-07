import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only' | 'gov-only';
  inverted?: boolean; // For dark backgrounds (true) or light backgrounds (false)
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPlatformTitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  inverted = true, // Default to inverted as main app theme is dark
  size = 'md',
  showPlatformTitle = true,
}) => {
  const logoSrc = inverted ? '/logo_white.png' : '/logo.png';
  const logoSvgSrc = inverted ? '/logo_white.svg' : '/logo.svg';

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img 
          src="/pwa-512x512.png" 
          alt="Paráverso Ícone Oficial" 
          className="w-full h-full object-contain filter drop-shadow-md rounded-lg"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/apple-touch-icon.png';
          }}
        />
      </div>
    );
  }

  if (variant === 'gov-only') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img 
          src={logoSrc} 
          alt="Secretaria de Cultura - Governo do Pará" 
          className="h-9 sm:h-11 w-auto max-w-full object-contain filter drop-shadow-sm transition-all"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logoSvgSrc;
          }}
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        <img 
          src={logoSrc} 
          alt="Secretaria de Cultura - Governo do Pará" 
          className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logoSvgSrc;
          }}
        />
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Government of Pará / SECULT Logo */}
      <img 
        src={logoSrc} 
        alt="Secretaria de Cultura • Governo do Pará" 
        className="h-8 sm:h-10 md:h-11 w-auto max-w-[280px] sm:max-w-[340px] object-contain filter drop-shadow-md shrink-0 transition-all"
        loading="eager"
        onError={(e) => {
          (e.target as HTMLImageElement).src = logoSvgSrc;
        }}
      />
    </div>
  );
};

export default Logo;
