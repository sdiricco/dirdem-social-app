import wkx from 'wkx';

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation not supported!");
    }
  });
}

export function parseGeoPoint(geoPoint: string) {
  const { x: lng, y: lat } = wkx.Geometry.parse(Buffer.from(geoPoint, 'hex')) as any;
  return { lat, lng };
}