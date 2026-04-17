
'use client';
import Link from 'next/link';



const LoadingSpinner = () => (
  <svg 
    className="animate-spin h-5 w-5" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function Button({
  // Button Content
  children,
  
  type = 'button',
  href,                     
  external = false,          
  
  // Styling Variants
  variant = 'primary',       
  size = 'md',               
  
  // Layout
  fullWidth = false,      
  
  // Icon
  icon,                 
  iconPosition = 'left',   
  iconOnly = false,         
  
  // States
  loading = false,          
  disabled = false,       
  
  // Handlers
  onClick,               
  
  // Additional Props
  className = '',           
  ariaLabel,                 
  ...rest                  
}) {
  

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-200
    outline-none focus:ring-4
    disabled:opacity-50 disabled:cursor-not-allowed
    ${loading ? 'cursor-wait' : ''}
    ${disabled ? 'pointer-events-none' : ''}
  `.trim();

  // Size variants
  const sizeStyles = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  // Icon-only sizes (circular buttons)
  const iconOnlySizes = {
    xs: 'w-7 h-7 p-1.5',
    sm: 'w-8 h-8 p-2',
    md: 'w-10 h-10 p-2.5',
    lg: 'w-12 h-12 p-3',
    xl: 'w-16 h-16 p-4',
  };

  // Variant styles
  const variantStyles = {
    primary: `
      bg-primary text-white
      hover:bg-primary-light active:bg-primary-dark
      focus:ring-primary/30
      shadow-lg shadow-primary/20
      hover:shadow-xl hover:shadow-primary/30
    `,
    secondary: `
      bg-secondary text-white
      hover:bg-secondary-light active:bg-secondary-dark
      focus:ring-secondary/30
      shadow-lg shadow-secondary/20
      hover:shadow-xl hover:shadow-secondary/30
    `,
    outline: `
      bg-transparent border-2 border-primary text-primary
      hover:bg-primary hover:text-white
      active:bg-primary-dark active:text-white
      focus:ring-primary/30
    `,
    ghost: `
      bg-transparent text-primary
      hover:bg-primary/10
      active:bg-primary/20
      focus:ring-primary/30
    `,
    danger: `
      bg-error text-white
      hover:bg-red-600 active:bg-red-700
      focus:ring-error/30
      shadow-lg shadow-error/20
      hover:shadow-xl hover:shadow-error/30
    `,
    success: `
      bg-success text-white
      hover:bg-green-600 active:bg-green-700
      focus:ring-success/30
      shadow-lg shadow-success/20
      hover:shadow-xl hover:shadow-success/30
    `,
    link: `
      bg-transparent text-primary
      hover:text-primary-light
      underline-offset-4 hover:underline
      focus:ring-0 p-0
    `,
  };

  // Width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${iconOnly ? iconOnlySizes[size] : sizeStyles[size]}
    ${variantStyles[variant]}
    ${widthClass}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  // ========================================
  // RENDER BUTTON CONTENT (JSX)
  // ========================================
  
  const renderContent = () => (
    <>
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}
      
      {/* Icon - Left Position */}
      {!loading && icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      
      {/* Button Text */}
      {!iconOnly && children && (
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
      )}
      
      {/* Icon - Right Position */}
      {!loading && icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      
      {/* Icon Only Mode */}
      {iconOnly && icon && !loading && (
        <span className="inline-flex">{icon}</span>
      )}
    </>
  );

  // ========================================
  // RENDER LOGIC
  // ========================================

  // If href is provided, render as Link (internal navigation)
  if (href && !external) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={onClick}
        aria-label={ariaLabel || (iconOnly ? 'Button' : undefined)}
        {...rest}
      >
        {renderContent()}
      </Link>
    );
  }

  // If href + external, render as <a> tag
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        onClick={onClick}
        aria-label={ariaLabel || (iconOnly ? 'Button' : undefined)}
        {...rest}
      >
        {renderContent()}
      </a>
    );
  }

  // Default: render as <button>
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-busy={loading}
      aria-label={ariaLabel || (iconOnly ? 'Button' : undefined)}
      {...rest}
    >
      {renderContent()}
    </button>
  );
}