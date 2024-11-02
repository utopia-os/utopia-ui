const goldenRatioConjugate = 0.618033988749895

export const randomColor = () => {
  return hsvToHex((Math.random() + goldenRatioConjugate) % 1, 0.8, 0.7)
}

function hsvToHex(h, s, v) {
  let r, g, b
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }

  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))
}

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')
