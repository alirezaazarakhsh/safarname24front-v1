'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type Data = {
  latitude: string;
  longitude: string;
};

type ApiResponse = {
  data: Data;
};

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// ---------------------------------

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 17);
  }, [lat, lng, map]);

  return null;
}

// ---------------------------------

export function ContactUsMap() {
  const { data, isSuccess } = useQuery<ApiResponse>({
    queryKey: ['config-location'],
    queryFn: () => generalInstance('/config/location'),
  });

  const latitude = data?.data.latitude;
  const longitude = data?.data.longitude;

  const lat = latitude ? Number(latitude) : null;
  const lng = longitude ? Number(longitude) : null;

  return (
    <>
      <MapContainer
        center={[0, 0]}
        scrollWheelZoom={true}
        className="full-size z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isSuccess && lat !== null && lng !== null && (
          <>
            <Marker position={[lat, lng]} />
            <RecenterMap lat={lat} lng={lng} />
          </>
        )}
      </MapContainer>
    </>
  );
}
