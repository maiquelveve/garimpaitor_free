export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

export const getStyles = (id, network_id, theme) => {
  return {
    fontWeight:
      network_id === id
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular
  };
}
