"use client";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), {
    ssr: false,
    loading: () => <div className="h-[450px] w-full bg-muted animate-pulse rounded-lg" />
});

export default function MapWrapper() {
    return <Map />;
}
