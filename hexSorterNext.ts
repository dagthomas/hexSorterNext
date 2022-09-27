export const hexValueSanitize = (color: string) => {
  return color
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => r + r + g + g + b + b
    )
    .replace("#", "")
}
export const hexToDec = (hex: string) => {
  return parseInt((hex + "").replace(/[^a-f0-9]/gi, ""), 16)
}

export const decToHex = (number: number) => {
  return number < 0
    ? 0xffffffff + number + 1
    : parseInt(number.toString(), 10).toString(16)
}
export const hexToRgb = (hex: string) => {
  hex = hexValueSanitize(hex)
  return hex.length == 3
    ? [
        hexToDec(hex[0] + hex[0]),
        hexToDec(hex[1] + hex[1]),
        hexToDec(hex[2] + hex[2]),
      ]
    : [
        hexToDec(hex[0] + hex[1]),
        hexToDec(hex[2] + hex[3]),
        hexToDec(hex[4] + hex[5]),
      ]
}
export const hexBrightness = (hex: string, type: string) => {
  let conversion: object = []
  if (type == "BT601") {
    conversion = [0.299, 0.587, 0.114] //BT601
  } else if (type == "BT709") {
    conversion = [0.2126, 0.7152, 0.0722] //BT709
  } else if (type == "BT2020") {
    conversion = [0.2627, 0.678, 0.0593] //BT2020
  } else {
    conversion = [0.299, 0.587, 0.114] //BT601
  }

  hex = hexValueSanitize(hex)

  return (
    hexToDec(hex[0] + hex[1]) * conversion[0] +
    hexToDec(hex[2] + hex[3]) * conversion[1] +
    hexToDec(hex[4] + hex[5]) * conversion[2]
  )
}
export const rgbToHsv = (color: object) => {
  let r = color[0] / 255
  let g = color[1] / 255
  let b = color[2] / 255

  let h: number = 0,
    s: number = 0,
    min: number = Math.min(r, g, b),
    max: number = Math.max(r, g, b),
    del: number = max - min,
    dR: number,
    dG: number,
    dB: number,
    hsl: object = []

  if (del !== 0) {
    s = del / max

    dR = ((max - r) / 6 + del / 2) / del
    dG = ((max - g) / 6 + del / 2) / del
    dB = ((max - b) / 6 + del / 2) / del

    if (r == max) {
      h = dB - dG
    } else if (g == max) {
      h = 1 / 3 + dR - dB
    } else if (b == max) {
      h = 2 / 3 + dG - dR
    }

    if (h < 0) {
      h++
    }

    if (h > 1) {
      h--
    }
  }

  hsl["h"] = h
  hsl["s"] = s
  hsl["v"] = 0.9

  return hsl
}
export const hexToHsv = (hex: string) => {
  let rgb: object, hsv: object

  hex = hexValueSanitize(hex)

  rgb = hexToRgb(hex)
  hsv = rgbToHsv(rgb)

  return hsv
}
export const mostBrightColor = (colors: any, type: string) => {
  let mostBright = null
  let hex: any

  colors.forEach((color) => {
    hex = hexValueSanitize(color)
    if (
      !mostBright ||
      hexBrightness(hex, type) > hexBrightness(mostBright, type)
    ) {
      mostBright = hex
    }
  })

  return `#${mostBright}`
}
export const mostSaturatedColor = (colors: Array<string>) => {
  let mostSaturated: string = ""
  let hex: string,
    hsv: object = []

  colors.forEach((color) => {
    hex = hexValueSanitize(color)
    hsv = hexToHsv(hex)

    if (!mostSaturated) {
      mostSaturated = hex
    }
  })

  return `#${mostSaturated}`
}
export const colorMixer = (hex1: string, hex2: string, percent: number) => {
  hex1 = hexValueSanitize(hex1)
  hex2 = hexValueSanitize(hex2)

  if (hex1.length == 3) {
    hex1 = hex1[0].repeat(2) + hex1[1].repeat(2) + hex1[2].repeat(2)
  }

  if (hex2.length == 3) {
    hex2 = hex2[0].repeat(2) + hex2[1].repeat(2) + hex2[2].repeat(2)
  }

  let red_hex = decToHex(
    (percent * hexToDec(hex1[0] + hex1[1]) +
      (100 - percent) * hexToDec(hex2[0] + hex2[1])) /
      100
  )
    .toString()
    .padStart(2, "0")
  let green_hex = decToHex(
    (percent * hexToDec(hex1[2] + hex1[3]) +
      (100 - percent) * hexToDec(hex2[2] + hex2[3])) /
      100
  )
    .toString()
    .padStart(2, "0")
  let blue_hex = decToHex(
    (percent * hexToDec(hex1[4] + hex1[5]) +
      (100 - percent) * hexToDec(hex2[4] + hex2[5])) /
      100
  )
    .toString()
    .padStart(2, "0")

  return `#${red_hex + green_hex + blue_hex}`
}
export const sortColors = (colors: any, type: string) => {
  const input = colors.slice(0)
  const output: object[] = []
  while (input.length > 0) {
    const color = eval(type)(input)
    let index = input.indexOf(color)
    if (index > -1) {
      input.splice(index, 1)
    }
    output.push(color)
  }
  return output
}
export const mixSortColors = (
  colors: any,
  type: string,
  mixcolor: string,
  percentage: number
) => {
  const input = colors.slice(0)
  const output: string[] = []

  while (input.length > 0) {
    const color = eval(type)(input)
    let index = input.indexOf(color)
    if (index > -1) {
      input.splice(index, 1)
    }
    output.push(colorMixer(color, mixcolor, percentage))
  }
  return output
}
