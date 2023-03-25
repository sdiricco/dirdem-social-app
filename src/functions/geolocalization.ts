import wkx from 'wkx';
import { Geolocation, Position } from '@capacitor/geolocation';

function getCurrentPositionFromBrowser(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation not supported!");
    }
  });
}
function getCurrentPositionFromCapacitor(): Promise<Position> {
  return Geolocation.getCurrentPosition();
}

export function getCurrentPosition(): Promise<GeolocationPosition | Position> {
  if (navigator.geolocation) {
    console.log("[Get position from browser]")
    return getCurrentPositionFromBrowser()
  }
  else{
    console.log("[Get position from capacitor]")
    return getCurrentPositionFromCapacitor();
  }
}

export function parseGeoPoint(geoPoint: string) {
  const { x: lng, y: lat } = wkx.Geometry.parse(Buffer.from(geoPoint, 'hex')) as any;
  return { lat, lng };
}