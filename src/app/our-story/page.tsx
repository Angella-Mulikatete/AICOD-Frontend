"use client";

import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { storyContent } from './data';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function OurStoryPage() {
  const storyImage = getPlaceholderImage('our-story-main');
  const [isExpanded, setIsExpanded] = useState(false);

  // Split content into initial view and expanded view
  // Showing first 3 paragraphs initially
  const initialContent = storyContent.history.content.slice(0, 3);
  const hiddenContent = storyContent.history.content.slice(3);

  return (
    <div className="animate-enter">
      <header className="bg-brand-orange py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">{storyContent.history.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Empowering communities, protecting nature, and restoring dignity.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content - History */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-brand-green">
              {initialContent.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "lead" : ""}>{para}</p>
              ))}

              {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  {hiddenContent.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}

              <div className="not-prose mt-8">
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  {isExpanded ? (
                    <>See Less <ChevronUp className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>See More <ChevronDown className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </article>
          </div>

          {/* Sidebar - Vision & Mission */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-brand-blue/5 p-8 rounded-xl border-l-4 border-brand-blue sticky top-24">
              <h2 className="text-2xl font-bold text-brand-blue mb-4">Vision</h2>
              <p className="text-lg italic">"{storyContent.vision}"</p>
            </div>

            <div className="bg-brand-green/5 p-8 rounded-xl border-l-4 border-brand-green sticky top-64">
              <h2 className="text-2xl font-bold text-brand-green mb-4">Mission</h2>
              <p className="text-lg italic">"{storyContent.mission}"</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
