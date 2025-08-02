'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({
  end,
  start,
  decimals = 0,
}: {
  end: number | null | undefined
  start?: number | null | undefined
  decimals?: number
}) {
  // ensure valid numbers; fallback to 0 if null/NaN
  const safeEnd = typeof end === 'number' && !isNaN(end) ? end : 0
  const safeStart = typeof start === 'number' && !isNaN(start) ? start : safeEnd / 2

  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const value = useMotionValue(safeStart)
  const spring = useSpring(value, { damping: 10, stiffness: 100 })

  const display = useTransform(spring, (num) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  )

  useEffect(() => {
    value.set(isInView ? safeEnd : safeStart)
  }, [safeEnd, safeStart, isInView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}
