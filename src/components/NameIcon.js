import React from "react";

function stringToColor(str, prc = -10) {
  const hash = function(word) {
    let h = 0;
    for (let i = 0; i < word.length; i++) {
      h = word.charCodeAt(i) + ((h << 5) - h);
    }
    return h;
  };

  const shade = function(color, prc) {
    const num = parseInt(color, 16),
      amt = Math.round(2.55 * prc),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1);
  };

  const intToRgba = function(i) {
    const color =
      ((i >> 24) & 0xff).toString(16) +
      ((i >> 16) & 0xff).toString(16) +
      ((i >> 8) & 0xff).toString(16) +
      (i & 0xff).toString(16);
    return color;
  };

  return shade(intToRgba(hash(str)), prc);
}

const NameIcon = ({ name }) => (
  <div
    className="nameIcon"
    style={{ backgroundColor: `#${stringToColor(name)}` }}
  >
    {name[0]}
  </div>
);

export default NameIcon;
