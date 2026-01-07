import { tool } from 'ai'
import { z } from 'zod'
import { navLinks, type NavLink } from './nav-links'

export const getSitemapTool = tool({
    description: 'Returns the current sitemap of all available pages and sections on the website.',
    parameters: z.object({}),
    execute: async (): Promise<NavigationResult> => {
        // Flatten navLinks for easier AI consumption
        const sitemap: { title: string; url: string; description?: string }[] = []

        const flatten = (links: NavLink[]) => {
            links.forEach(link => {
                sitemap.push({
                    title: link.title,
                    url: link.href,
                    description: link.description
                })
                if (link.subLinks) flatten(link.subLinks)
            })
        }

        flatten(navLinks)
        return {
            success: true,
            sitemap
        }
    }
} as any)

type NavigationResult = {
    success: boolean;
    navigationLinks?: { title: string; url: string; description: string | undefined; isInternal: boolean; }[];
    uiData?: { text: string; navigationLinks: { title: string; url: string; description: string | undefined; isInternal: boolean; }[]; };
    message?: string;
    sitemap?: { title: string; url: string; description?: string }[];
}

const navigateToPageParameters = z.object({
    query: z.string().describe('The name or description of the page the user wants to go to')
})

export const navigateToPageTool = tool({
    description: 'Helps users navigate to a specific page based on their request. Returns navigation metadata.',
    parameters: navigateToPageParameters,
    execute: async (args: z.infer<typeof navigateToPageParameters>): Promise<NavigationResult> => {
        const { query } = args
        const sitemap: { title: string; url: string; description?: string }[] = []
        const flatten = (links: NavLink[]) => {
            links.forEach(link => {
                sitemap.push({ title: link.title, url: link.href, description: link.description })
                if (link.subLinks) flatten(link.subLinks)
            })
        }
        flatten(navLinks)

        const lowerQuery = query.toLowerCase()
        const matches = sitemap.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            (item.description && item.description.toLowerCase().includes(lowerQuery))
        )

        if (matches.length > 0) {
            const navigationLinks = matches.map(m => ({
                title: m.title,
                url: m.url,
                description: m.description,
                isInternal: true
            }))

            return {
                success: true,
                navigationLinks,
                uiData: {
                    text: `I've found ${matches.length === 1 ? 'the page' : 'some pages'} you're looking for:`,
                    navigationLinks
                }
            }
        }

        return {
            success: false,
            message: `I couldn't find a page matching "${query}". Here is the general menu:`,
            sitemap: sitemap.slice(0, 5)
        }
    }
} as any)
