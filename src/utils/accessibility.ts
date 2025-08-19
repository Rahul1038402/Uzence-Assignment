export const getAriaProps = (props: Record<string, any>) => {
  const ariaProps: Record<string, any> = {};
  
  Object.keys(props).forEach(key => {
    if (key.startsWith('aria-') || key.startsWith('data-')) {
      ariaProps[key] = props[key];
    }
  });
  
  return ariaProps;
};

export const generateId = (prefix: string = 'component') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};