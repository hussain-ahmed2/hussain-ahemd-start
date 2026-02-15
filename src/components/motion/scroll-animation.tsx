import { motion } from 'motion/react'
import type { EasingDefinition } from 'motion/react'

type Variant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeDown' | 'scale'

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  variant?: Variant
  delay?: number
  duration?: number
  ease?: EasingDefinition
}

type Animate = {
  [key: string]: {
    [key: string]: string | number
  }
}

const variants: Record<Variant, Animate> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function ScrollAnimate({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  ease = 'easeIn',
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants[variant]}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
