import React, { useState, useId, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import type { InputFieldProps } from './InputField.types';
import { cn } from '../../utils/cn';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value = '',
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      showClearButton = false,
      showPasswordToggle = false,
      id,
      name,
      autoComplete,
      maxLength,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const isPassword = type === 'password' || showPasswordToggle;
    const inputType = isPassword && showPassword ? 'text' : type;
    const hasError = invalid || !!errorMessage;
    const hasValue = value && value.length > 0;

    // Size variants
    const sizeClasses = {
      sm: {
        input: 'h-8 px-2 text-sm',
        label: 'text-xs',
        icon: 'h-3 w-3',
        padding: 'pr-8'
      },
      md: {
        input: 'h-10 px-3 text-sm',
        label: 'text-sm',
        icon: 'h-4 w-4',
        padding: 'pr-10'
      },
      lg: {
        input: 'h-12 px-4 text-base',
        label: 'text-base',
        icon: 'h-5 w-5',
        padding: 'pr-12'
      }
    };

    // Variant styles
    const getVariantClasses = () => {
      const baseClasses = 'w-full rounded-md border transition-all duration-200 focus:outline-none focus:ring-2';
      
      switch (variant) {
        case 'filled':
          return cn(
            baseClasses,
            'bg-gray-100 border-transparent dark:bg-gray-800',
            hasError 
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500/20 focus:border-red-500' 
              : 'focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700',
            disabled && 'bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-700/50'
          );
        
        case 'ghost':
          return cn(
            baseClasses,
            'bg-transparent border-transparent',
            hasError
              ? 'border-red-500 focus:ring-red-500/20'
              : 'focus:ring-primary-500/20 focus:border-primary-500',
            disabled && 'text-gray-400 cursor-not-allowed'
          );
        
        case 'outlined':
        default:
          return cn(
            baseClasses,
            'bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-600',
            hasError
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : 'focus:ring-primary-500/20 focus:border-primary-500',
            disabled && 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700'
          );
      }
    };

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const shouldShowClearButton = showClearButton && hasValue && !disabled && !loading;
    const shouldShowPasswordToggle = (isPassword || showPasswordToggle) && !disabled;
    const hasRightIcon = shouldShowClearButton || shouldShowPasswordToggle || loading;

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              'block font-medium mb-1.5 text-gray-700 dark:text-gray-300',
              sizeClasses[size].label,
              disabled && 'text-gray-400 dark:text-gray-500'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              getVariantClasses(),
              sizeClasses[size].input,
              hasRightIcon && sizeClasses[size].padding,
              'dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
            )}
            {...props}
          />

          {/* Right side icons */}
          {hasRightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
              {loading && (
                <Loader2 
                  className={cn(
                    'animate-spin text-gray-400',
                    sizeClasses[size].icon
                  )} 
                />
              )}
              
              {shouldShowClearButton && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={cn(
                    'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors',
                    sizeClasses[size].icon
                  )}
                  aria-label="Clear input"
                >
                  <X className={sizeClasses[size].icon} />
                </button>
              )}
              
              {shouldShowPasswordToggle && !loading && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={cn(
                    'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors',
                    sizeClasses[size].icon
                  )}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className={sizeClasses[size].icon} />
                  ) : (
                    <Eye className={sizeClasses[size].icon} />
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {(helperText || errorMessage) && (
          <p
            id={hasError ? errorId : helperId}
            className={cn(
              'mt-1.5 text-xs',
              hasError 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;