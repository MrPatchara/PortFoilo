/**
 * Type declarations for `vite-imagetools` query imports.
 *
 * Examples:
 *   import srcset from './pic.png?w=400;800&format=webp&as=srcset'  // -> string
 *   import pic    from './pic.png?w=400;800&format=webp&as=picture' // -> Picture
 */
declare module '*as=srcset' {
  const srcset: string
  export default srcset
}

declare module '*as=picture' {
  export interface ImagetoolsPicture {
    /** Map of format (`webp`, `avif`, ...) to a ready-to-use `srcset` string. */
    sources: Record<string, string>
    img: {
      src: string
      w: number
      h: number
    }
  }

  const picture: ImagetoolsPicture
  export default picture
}
