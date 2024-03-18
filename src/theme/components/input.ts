export const inputTheme = {
  defaultProps: {
    focusBorderColor: 'brand.500',
  },
  variants: {
    outline: () => {
      return {
        field: {
          bg: 'white',
          borderColor: 'gray.200',
          boxShadow: 'sm',
          _dark: {
            bg: 'whiteAlpha.50',
            borderColor: 'whiteAlpha.100',
          },
        },
      };
    },
  },
  sizes: {
    sm: {
      field: {
        borderRadius: 'md',
      },
    },
  },
};
