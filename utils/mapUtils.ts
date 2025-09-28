import { AnimatedRegion } from "react-native-maps";

// Calculate bearing between two coordinates
export const getBearing = (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number }
) => {
  const lat1 = (start.latitude * Math.PI) / 180;
  const lon1 = (start.longitude * Math.PI) / 180;
  const lat2 = (end.latitude * Math.PI) / 180;
  const lon2 = (end.longitude * Math.PI) / 180;

  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const brng = Math.atan2(y, x);
  return ((brng * 180) / Math.PI + 360) % 360; // degrees
};

// Generate fake riders
export const generateRiders = (baseLocation: {
  latitude: number;
  longitude: number;
}) => {
  return Array.from({ length: 5 }).map((_, idx) => {
    const offsetLat = (Math.random() - 0.5) * 0.02;
    const offsetLng = (Math.random() - 0.5) * 0.02;
    const lat = baseLocation.latitude + offsetLat;
    const lng = baseLocation.longitude + offsetLng;

    return {
      id: idx,
      coordinate: new AnimatedRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }),
      lastPosition: { latitude: lat, longitude: lng },
      heading: 0,
    };
  });
};

// Move riders smoothly
export const moveRiders = (riders: any[], getBearingFn = getBearing) => {
  return riders.map((rider) => {
    const current = rider.coordinate.__getValue();
    const moveLat = (Math.random() - 0.5) * 0.001;
    const moveLng = (Math.random() - 0.5) * 0.001;
    const newPos = {
      latitude: current.latitude + moveLat,
      longitude: current.longitude + moveLng,
    };

    const heading = getBearingFn(current, newPos);
    rider.heading = heading;
    rider.lastPosition = newPos;

    rider.coordinate
      .timing({
        ...newPos,
        duration: 2000,
        useNativeDriver: false,
      })
      .start();

    return { ...rider };
  });
};

// Fake fare calculation
export const calculateFare = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate API
  const distanceKm = Math.random() * 10 + 2;
  const fare = 500 + distanceKm * 100;
  return Math.round(fare);
};
