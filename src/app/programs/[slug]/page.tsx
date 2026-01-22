import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
    let program;

    try {
        const response = await api.getProgram(params.slug);
        program = response.data;
    } catch (error) {
        console.error('Failed to load program:', error);
        notFound();
    }

    // Default beautiful image
    const programImage = 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=600&fit=crop&q=80';

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${programImage})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <div className="mb-4">
                        {program.category && (
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                                style={{ backgroundColor: program.category.color || '#3B82F6' }}
                            >
                                {program.category.name}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{program.title}</h1>
                    {program.description && (
                        <p className="text-xl max-w-3xl mx-auto drop-shadow-md">{program.description}</p>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Long Description */}
                    {program.long_description && (
                        <div
                            className="prose prose-lg max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: program.long_description }}
                        />
                    )}

                    {/* Objectives */}
                    {program.objectives && (
                        <div className="mb-12 bg-blue-50 p-8 rounded-lg">
                            <h2 className="text-3xl font-bold mb-6 text-blue-800">Program Goals</h2>
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: program.objectives }}
                            />
                        </div>
                    )}

                    {/* Program Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {program.target_beneficiaries && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Target Beneficiaries</h3>
                                <p className="text-3xl font-bold text-blue-600">{program.target_beneficiaries.toLocaleString()}</p>
                                <p className="text-gray-600 mt-2">People impacted</p>
                            </div>
                        )}

                        {program.status && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Status</h3>
                                <p className="text-2xl font-semibold capitalize text-green-600">{program.status}</p>
                            </div>
                        )}

                        {program.start_date && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Start Date</h3>
                                <p className="text-xl text-gray-700">{new Date(program.start_date).toLocaleDateString()}</p>
                            </div>
                        )}

                        {program.budget && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Budget</h3>
                                <p className="text-2xl font-bold text-green-600">${program.budget.toLocaleString()}</p>
                            </div>
                        )}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-lg">
                        <h3 className="text-3xl font-bold mb-4">Get Involved</h3>
                        <p className="text-xl mb-6 max-w-2xl mx-auto">
                            Join us in making a difference through the {program.title} program
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                                <Link href="/donations">Support This Program</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/programs"
                            className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-2"
                        >
                            ← Back to All Programs
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
