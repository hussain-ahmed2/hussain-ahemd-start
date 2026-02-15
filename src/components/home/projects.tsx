import { ExternalLink } from 'lucide-react'
import { ScrollAnimate } from '../motion/scroll-animation'
import type { Project } from '@/generated/prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ProjectWithTags = Project & { tags?: Array<string> }

export function Projects({
  projects = [],
}: {
  projects: Array<ProjectWithTags>
}) {
  return (
    <section id="projects" className="py-12 px-4 max-w-6xl mx-auto">
      <ScrollAnimate
        variant="fadeUp"
        className="text-muted-foreground font-medium text-lg mb-2 text-center"
      >
        Selected Work
      </ScrollAnimate>

      <ScrollAnimate delay={0.2} variant="fadeUp">
        <h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center">
          Projects
        </h2>
      </ScrollAnimate>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ScrollAnimate key={i} variant="fadeUp" delay={0.3 + i * 0.1}>
            <Card className="h-full flex flex-col hover:shadow-md hover:bg-card/50 transition">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={project.thumbnail}
                    alt=""
                    width={800}
                    height={450}
                  />
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </CardHeader>

              <CardContent className="grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>

              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {(project as any).tags?.map((tag: string, j: number) => (
                    <Badge key={j} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  disabled={!project.link}
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href={project.link || '#'} target="_blank">
                    View Project
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </ScrollAnimate>
        ))}
      </div>

      <ScrollAnimate
        variant="fadeUp"
        delay={0.6}
        className="text-center mt-12 group"
      >
        <Button variant="outline" size="lg" asChild>
          <a
            className="flex items-center gap-1"
            href="https://github.com/hussain-ahmed2"
            target="_blank"
          >
            <span>View All Projects</span>
            <ExternalLink />
          </a>
        </Button>
      </ScrollAnimate>
    </section>
  )
}
