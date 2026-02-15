import { Github, Linkedin, Sparkles } from 'lucide-react'
import { ScrollAnimate } from '../motion/scroll-animation'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 max-w-6xl mx-auto"
    >
      {/* Intro greeting */}
      <ScrollAnimate
        variant="fadeUp"
        className="text-neutral-500 font-medium text-lg mb-2 flex items-center gap-1"
      >
        <Sparkles className="size-5" />
        <span>Hello, I&#39;m</span>
      </ScrollAnimate>

      {/* Name */}
      <ScrollAnimate delay={0.2} variant="fadeUp">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
          Hussain Ahmed
        </h1>
      </ScrollAnimate>

      {/* Title */}
      <ScrollAnimate delay={0.4} variant="fadeUp">
        <h2 className="text-2xl sm:text-4xl text-neutral-500 mb-6 font-medium">
          Full-Stack{' '}
          <span className="text-foreground font-bold">Software Engineer</span>
        </h2>
      </ScrollAnimate>

      {/* Brief about */}
      <ScrollAnimate
        delay={0.6}
        variant="fadeUp"
        className="max-w-2xl text-neutral-400 mb-8 text-sm sm:text-base"
      >
        I’m a Full-Stack Software Engineer at{' '}
        <span className="text-foreground font-semibold">Masleap.io</span>,
        passionate about building modern, scalable, and user-friendly web
        applications using{' '}
        <span className="text-foreground font-medium">
          React, Next.js, Node.js,
        </span>{' '}
        and <span className="text-foreground font-medium">MongoDB</span>. I love
        creating clean, maintainable code and delivering seamless user
        experiences that make an impact.
      </ScrollAnimate>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <ScrollAnimate delay={0.7}>
          <Button variant="ghost" size="lg" asChild>
            <a href="/#projects">View My Work</a>
          </Button>
        </ScrollAnimate>
        <ScrollAnimate delay={0.8}>
          <Button variant="outline" size="lg" asChild>
            <a href="/#contact">Get In Touch</a>
          </Button>
        </ScrollAnimate>
        <ScrollAnimate delay={0.9}>
          <Button variant="default" size="lg" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </ScrollAnimate>
      </div>

      {/* Social icons */}
      <div className="flex gap-6 text-2xl mb-4">
        <ScrollAnimate variant="scale" delay={1.0}>
          <Button size="icon" variant="ghost" asChild>
            <a
              href="https://github.com/hussain-ahmed2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github />
            </a>
          </Button>
        </ScrollAnimate>
        <ScrollAnimate variant="scale" delay={1.1}>
          <Button size="icon" variant="ghost" asChild>
            <a
              href="https://linkedin.com/in/hussainahmed2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin />
            </a>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}
