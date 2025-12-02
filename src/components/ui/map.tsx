"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon
const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// We need to fix the missing icon issue in Leaflet
// But since we can't easily import the images from node_modules in client component without config,
// we might need to use a CDN or local assets.
// For now, let's try to use the default one but we might need to override the prototype if it fails.
// Actually, a better way in Next.js is to just set the icon manually on the Marker.

export default function Map() {
    // Coordinates for Hoima/Kikuube region (approximate)
    const position: [number, number] = [1.43, 31.35];

    useEffect(() => {
        // Fix leaflet icon issue
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-lg z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    AICOD Headquarters <br /> Kikuube District
                </Popup>
            </Marker>
        </MapContainer>
    );
}
