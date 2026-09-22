/**
 * Generates the raster brand assets browsers and social crawlers need:
 *
 *   public/apple-touch-icon.png   180x180   (iOS home screen / PWA)
 *   public/og-image.jpg          1200x630   (Open Graph + Twitter card)
 *
 * Run with:  npm run icons
 *
 * `sharp` already arrives as a dependency of vite-imagetools, so there is
 * nothing extra to install. Text is rendered with the system sans-serif font
 * because librsvg cannot see the web font loaded by index.html — that keeps the
 * script free of any font setup. Re-run it after editing the copy below.
 */
import { mkdir } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, 'public')

const MAGENTA = '#B600A8'
const VIOLET = '#7621B0'
const EMBER = '#BE4C00'
const SANS = 'Arial, Helvetica, sans-serif'

/** iOS home-screen icon, rasterised from the SVG the browser already uses. */
async function appleTouchIcon() {
  const out = resolve(publicDir, 'apple-touch-icon.png')
  await sharp(resolve(publicDir, 'favicon.svg')).resize(180, 180).png().toFile(out)
  return out
}

/** 1200x630 social card: brand glow, name lockup and the hero portrait. */
async function ogImage() {
  const width = 1200
  const height = 630
  const portraitWidth = 480
  const portraitLeft = width - portraitWidth - 30

  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${MAGENTA}"/>
          <stop offset="0.6" stop-color="${VIOLET}"/>
          <stop offset="1" stop-color="${EMBER}"/>
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stop-color="${MAGENTA}" stop-opacity="0.45"/>
          <stop offset="1" stop-color="${MAGENTA}" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="${width}" height="${height}" fill="#0C0C0C"/>
      <ellipse cx="${portraitLeft + portraitWidth / 2}" cy="440" rx="340" ry="310" fill="url(#glow)"/>

      <text x="72" y="208" font-family="${SANS}" font-size="22" font-weight="700"
            letter-spacing="9" fill="#D7E2EA" fill-opacity="0.5">PORTFOLIO</text>

      <text x="66" y="330" font-family="${SANS}" font-size="88" font-weight="900"
            letter-spacing="-2" fill="#E1E0CC">PATCHARA</text>
      <text x="66" y="424" font-family="${SANS}" font-size="88" font-weight="900"
            letter-spacing="-2" fill="#E1E0CC">AL-UMAREE</text>

      <rect x="72" y="456" width="150" height="6" rx="3" fill="url(#bar)"/>

      <text x="72" y="522" font-family="${SANS}" font-size="29" font-weight="600"
            fill="#D7E2EA" fill-opacity="0.82">Computer Engineer &#215; Sports Scientist</text>
      <text x="72" y="574" font-family="${SANS}" font-size="21" font-weight="400"
            fill="#D7E2EA" fill-opacity="0.45">Award-winning AI &#38; IoT projects &#183; 45+ certifications</text>
    </svg>`,
  )

  const cutout = await sharp(resolve(root, 'src', 'pic1-cutout.png'))
    .resize({ width: portraitWidth })
    .png()
    .toBuffer()

  const cutoutHeight = (await sharp(cutout).metadata()).height ?? 0

  const out = resolve(publicDir, 'og-image.jpg')
  await sharp(background)
    .composite([{ input: cutout, left: portraitLeft, top: Math.max(0, height - cutoutHeight) }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out)

  return out
}

async function main() {
  await mkdir(publicDir, { recursive: true })
  const files = await Promise.all([appleTouchIcon(), ogImage()])
  for (const file of files) {
    console.log('wrote', relative(root, file).replace(/\\/g, '/'))
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
