'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Calendar, ArrowRight, Loader2, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { publicService } from '@/lib/api/services/public.service';
import { DocumentItem } from '@/lib/api/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ResourcesPage() {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    useEffect(() => {
        async function fetchDocs() {
            try {
                const response = await publicService.getDocuments();
                if (response.success) {
                    setDocuments(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchDocs();
    }, []);

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'all' || doc.year.toString() === selectedYear;
        return matchesSearch && matchesYear;
    });

    const years = Array.from(new Set(documents.map(d => d.year.toString()))).sort((a, b) => b.localeCompare(a));

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <header className="bg-brand-green py-20 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Resources & Reports</h1>
                    <p className="text-green-50 max-w-2xl mx-auto text-lg">
                        Access our annual reports, research findings, and strategic documents to stay informed about our impact and operations.
                    </p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-16 max-w-6xl">

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search reports..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-full bg-white border-slate-200 focus:ring-brand-blue h-12 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="text-sm font-bold text-slate-500 whitespace-nowrap">Filter by Year:</span>
                        <Button
                            variant={selectedYear === 'all' ? 'default' : 'outline'}
                            onClick={() => setSelectedYear('all')}
                            className="rounded-full px-6 h-10 transition-all"
                        >
                            All Years
                        </Button>
                        {years.map(year => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? 'default' : 'outline'}
                                onClick={() => setSelectedYear(year)}
                                className={`rounded-full px-6 h-10 transition-all ${selectedYear === year ? 'bg-brand-blue hover:bg-brand-blue/90' : ''}`}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Documents Grid */}
                {filteredDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDocs.map((doc) => (
                            <Card key={doc.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white hover:-translate-y-2">
                                <CardContent className="p-0">
                                    <div className="bg-slate-100 h-40 flex items-center justify-center relative">
                                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-brand-blue shadow-sm">
                                            {doc.year}
                                        </div>
                                        <FileText className="w-16 h-16 text-brand-blue/20 group-hover:text-brand-blue/40 transition-colors" />
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-orange" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg text-brand-blue mb-2 line-clamp-2 min-h-[3.5rem] leading-tight group-hover:text-brand-orange transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                            {doc.description || "Official document released by AICOD to provide detailed insights into our activities and progress."}
                                        </p>
                                        <div className="flex gap-3">
                                            <Button asChild className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full">
                                                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                                    View PDF
                                                </a>
                                            </Button>
                                            <Button asChild variant="outline" className="rounded-full px-4 border-slate-200 text-slate-600 hover:bg-slate-50">
                                                <a href={doc.file_url} download>
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-slate-200">
                        <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-400">No documents found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search or filter settings.</p>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-20 p-8 rounded-3xl bg-brand-orange/10 border border-brand-orange/20 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-brand-orange flex items-center justify-center flex-shrink-0 shadow-lg rotate-3">
                        <Download className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-brand-blue mb-2">Need physical copies?</h3>
                        <p className="text-slate-600">
                            Our publications are also available at our main offices. For inquiries regarding specific archival records or data requests, please contact our transparency office.
                        </p>
                    </div>
                    <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full px-8 py-6 text-lg">
                        <a href="/contact">Contact Our Office</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
