export interface Section {
    title: string;
    description: string[];
    goals?: string[];
    mediaHint?: string;
    image?: string;
    subSections?: Section[];
}

export interface StoryContent {
    history: {
        title: string;
        content: string[];
    };
    vision: string;
    mission: string;
    programmes: Section[];
}

export const storyContent: StoryContent = {
    history: {
        title: "Our Story",
        content: [
            "Albertine Institute for Community Development (AICOD) was founded in 2013 in Kikuube district in response to the pressing challenges faced by host communities in Uganda’s Albertine region, which is rich in oil and gas resources. The discovery of commercially viable oil and gas deposits in 2006 led to significant development activities, impacting the livelihoods of host indegineous communities. Unfortunately, this progress came at a cost; mass land acquisitions, environmental degradation, and violations of Economic, Social, and Cultural rights.",
            "One notable example occurred in 2012, when 7,118 community members lost 29 square kilometers (29Km2) of land and their properties to facilitate the establishment of an oil refinery in Kabaale community, Hoima District. The affected individuals faced numerous challenges, including the loss of their livelihoods, disruptions to access social services, and a rise in Gender-Based Violence. Although the community received compensation from the government for their lost land, the process was faced with difficulties and did not adequately address their needs.",
            "In light of these unfairness, some of the affected community members who championed advocacy for the land rights of those affected by this land acquisitions formed AICOD. While we have made strides in achieving important outcomes such as compensation for the lost land, the restoration of livelihoods, and the re-establishment of social services we realized that merely addressing these symptoms would not resolve the root causes of the issues plaguing host communities. It became clear that empowering and equipping the younger generation to defend their communities’ rights is crucial for sustainable change.",
            "Initially, AICOD only worked as a grassroot Community Based Organisation with focus on advancing community land right over related issues in oil and gas developments within the Albertine Region.",
            "However, as developmental pressures mounted, we expanded our focus and introduced new programmes, including Biodiversity and Environment and Community & Livelihoods. Subsequently, we incorporated social enterprise models to address communities’ needs amidst the challenges brought by these developments",
            "The impacts of these developments extend beyond local communities and resonate globally.",
            "We believe through the social enterprise model, it is essential to create economically resilient communities, financially stable institution while together generating innovative ideas to achieve ceaseless solutions to local and global problems.",
            "Our hope is that the benefits of these initiatives and methodologies can be shared globally, fostering a more equitable and sustainable future for all."
        ]
    },
    vision: "A community with respected rights, improved livelihoods, and a safe, clean environment.",
    mission: "To advocate for the promotion and protection of the rights of disadvantaged communities, thereby safeguarding their livelihoods and environments and ensuring inclusive development.",
    programmes: [
        {
            title: "Biodiversity and Environment",
            description: [
                "The world faces a growing climate crisis, yet many global development projects compromises the environment. This pattern weakens the critical conservation efforts needed to protect global ecosystems and prevent further climate breakdown.",
                "A compelling example of this conflict is the rapid growth of oil and gas projects within the sensitive Albertine Rift region. These developments pose serious threats to fragile ecosystems, fundamentally altering the environment and increasing the region’s climate vulnerability. The resulting environmental changes have severe consequences for local grassroots communities whose survival depends entirely on ecological stability and biodiversity.",
                "Therefore, this programme aims to empower local grassroots communities by increasing their capacity, awareness, and ability to be resilient and informed about efforts to prevent, mitigate, and restore their environment.",
                "This is achieved by advocating for responsible policies and effectively using existing laws to promote environmental conservation while directly addressing the various environmental challenges facing these communities."
            ],
            goals: [
                "To empower community for the protection and participate in conservation efforts.",
                "To advocate for implementation of both indigenous and science backed approaches for conservation.",
                "To task duty bearrers to effectively manngagement of natural resurces for sustainable."
            ],
            mediaHint: "3 slow motion moving photos and 1 Minute video.",
            image: "/images/our-story/biodiversity.png",
            subSections: [
                {
                    title: "The Morther Earth Protection (MEP) Movement",
                    description: [
                        "The Mother Earth Protection (MEP) movement was founded to empower communities to fulfill their role as the \"original caretakers of Mother Earth.\" The MEP movement's strategy is built on four main components: Elder to Youth Knowledge Transfer, Protection of Reserve Areas, Innovative and Creative Solutions, and Community Training Programs.",
                        "Each of these strategies aims to nurture, train, and mentor young Native leaders. The goal is to provide them with the opportunity to integrate traditional knowledge with the latest western technologies to create a powerful Earth management system. This system will protect, manage, and restore Mother Earth, ultimately returning harmony and balance to all people."
                    ],
                    mediaHint: "Three Photos from CFM work in Kaseeta and a video/short 1 minute documentary from the same group.",
                    image: "/images/our-story/mep.png"
                }
            ]
        },
        {
            title: "Human Rights and Inclusive Development",
            description: [
                "The intersection of natural resource developments and human rights is a critical concern for host communities, particularly the native populations who often bear the burdens of large scale projects while facing violations of their rights. Recognizing these issues, our program promotes human rights and inclusive development by empowering communities, working with key community groups and building a system to protect their rights in the Albertine development areas."
            ],
            goals: [
                "To empower and build community members’ capacity: This is achived through providing training and building community’s capcity on relevant laws and regulations to land rights, Free Prior and Informed Consent ( FPIC).",
                "Create Platforms for Engagement: This is achived through provision of forum where communitys interact with duty bearers and stakehoders and foster dialogues among communitys with decision makers to address grievances while advocating for fair practices in resource developments.",
                "Strengthen Community Movements: This is achived through strong community mobilization to form associations, groups and empowered with capacities to obverse and lead the cause for their own developments."
            ],
            image: "/images/our-story/human-rights.png",
            subSections: [
                {
                    title: "Civic Development Agencies (CDA)",
                    description: [
                        "The host community in the Albertine development areas haven't been adequately involved in the development processes. This consistently violates their rights, breaking both national and international laws during development activities in the region.",
                        "To address this, AICOD established the Civic Development Agencies. This is a community-led movement which empowers communitity members to know, understand, and use the laws to demand, defend, and engage leaders, actors, and other relevant stakeholders for their interests and development agenda in these developments. These Agencies keep track of developments and set their own agendas, develop solutions, and bring the capacity, leadership, and resources to make those solutions a reality."
                    ],
                    mediaHint: "Three slow/sliding Photos of Boreholes constructed due to community’s demand (Rwamutonga Borehole Photos will be used here) and a video about impact on our work.",
                    image: "/images/our-story/civic.png"
                }
            ]
        },
        {
            title: "Community and Livelihoods",
            description: [
                "This Program aims to enhance the living standards of indigegous and host communities within the Albertine region, especially as it relates to the natural resource sector developments. This initiative focuses on sustainable practices that empower communities to thrive frugally while respecting their cultural and environmental settings."
            ],
            goals: [
                "To build community capacity on Sustainable Livelihoods: This is achived through offering training on sustainable agricultural practices, friendly environmentally and economic viable strategies, financial litracy training, market access and sustainlbe resource management.",
                "To inspire communities for sustainable Living standard: This is achived through implementing initiatives that directly improve access to basic needs, such as clean water, education, and healthcare, thereby enhancing overall community welfare.",
                "To empower community for increased participation in Natural Resource governance: Advocate for inclusive participation of community members in decision-making processes concerning natural resource management, ensuring their voices and concerns are heard and addressed."
            ],
            image: "/images/our-story/livelihoods.png",
            subSections: [
                {
                    title: "Innovative Livelihood skills Development",
                    description: [
                        "Empowering communities devastated by natural resource developments to restore and enrich their livelihoods. We achieve this by supporting native based approaches and creating movements capable of defending their rights, protecting their environment, and building an entrepreneurship culture.",
                        "Empowered and Built community member’s capacity in Financial and Resource Management. During the development phases, where community members affected by oil and gas received compensation for their lost land to major oil and gas projects. Due to limited capacity and support to community in management and use of the compensation monies, this has led to most of native members to lose such resources which has rendered them more vulnerable to poverty and associated challenges.",
                        "In response, AICOD carried out initiatives which aimed at strengthening their capacity in financial and resource management. These initiatives among included; training on financial literacy and management skills, business plan development, bookkeeping, technology integration among others."
                    ],
                    mediaHint: "Space for Three sliding/slow moving photos from Rwamutonga training with Sun Makers and a video with testimonies from the trained beneficiaries.",
                    image: "/images/our-story/skills.png"
                },
                {
                    title: "One Team",
                    description: [
                        "Our initiative is economic program designed to empower community members and build their capacity to generate their own economic resources. The goal is to address their livelihood needs directly.",
                        "A significant challenge for the community has been a lack of access to affordable financing, despite their abundant local resources. Our program helps them leverage these resources to create sustainable financial opportunities.",
                        "So far, this initiative has brought together over 100 households, who have collaborated to launch their own economic projects. This success has attracted support from various stakeholders, significantly improving the lives of community members."
                    ],
                    mediaHint: "space for three slow/sliding photos and a 1 Minute video.",
                    image: "/images/our-story/one-team.png"
                },
                {
                    title: "The Community Seed Bank",
                    description: [
                        "The community members have continually encountered significant impediments, primarily stemming from the lack of access to affordable and timely seeds, vulnerability to diseases and pests attributable to substandard seed quality, and climate induced stressors. Furthermore, financial constraints hindering the timely procurement of quality seeds invariably lead to delayed planting, among other consequential issues.",
                        "This initiative furnishes community members with access to affordable, timely, and climate-resilient seed varieties, including those capable of withstanding prolonged drought and diseases. By provisioning these hybrid seeds, the seed bank has demonstrably enhanced the community's food production and household incomes, thereby presenting a pragmatic solution to a global challenge."
                    ],
                    mediaHint: "Space for three sliding/slow motion moving photos and 1 Minute video.",
                    image: "/images/our-story/livelihoods.png" // Reusing livelihoods image as placeholder for now
                }
            ]
        }
    ]
};
