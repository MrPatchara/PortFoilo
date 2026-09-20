export default function MarqueeRow({
  images,
  direction,
  duration,
  tileClass = 'w-[260px] h-[170px] sm:w-[420px] sm:h-[270px]',
  onSelect,
}: {
  images: string[]
  direction: 'left' | 'right'
  duration: string
  tileClass?: string
  onSelect?: (src: string) => void
}) {
  const halves = [0, 1]
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={{
          animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
          animationDuration: duration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform',
        }}
      >
        {halves.map((half) => (
          <div key={half} className="flex gap-3 pr-3 shrink-0" aria-hidden={half === 1}>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                draggable={false}
                onClick={onSelect ? () => onSelect(src) : undefined}
                className={`rounded-2xl object-cover shrink-0 select-none transition hover:brightness-110 hover:ring-2 hover:ring-white/60 ${tileClass} ${
                  onSelect ? 'cursor-zoom-in' : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
