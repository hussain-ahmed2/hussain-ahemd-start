import { prisma } from "@/db";
import { createServerFn } from "@tanstack/react-start";

export const getStatsFn = createServerFn().handler(async () => {
    const [experiences, skills, projects, visitors, contacts] = await Promise.all([
		prisma.experience.findMany(),
		prisma.skill.findMany(),
		prisma.project.findMany(),
		prisma.visitor.findMany(),
		prisma.contact.findMany(),
	]);

    return {
        experiences,
        skills,
        projects,
        visitors,
        contacts
    }
})