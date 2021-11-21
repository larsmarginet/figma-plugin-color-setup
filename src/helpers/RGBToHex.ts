const RGBToHex = (r: any, g: any, b: any) => {
  r = Math.round(r * 255).toString(16);
  g = Math.round(g * 255).toString(16);
  b = Math.round(b * 255).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return '#' + r + g + b;
};

export default RGBToHex;
