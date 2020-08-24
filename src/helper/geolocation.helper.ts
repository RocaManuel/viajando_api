import { computeDestinationPoint, getBounds } from 'geolib';

export class GeolocationHelper {

  constructor () {}

  public async getBoundLocation(latitude: number, longitude: number, range: number) {
    const rangeInMeters = range * 1000;
    const a0   = await computeDestinationPoint( { latitude, longitude }, rangeInMeters, 0   );
    const b90  = await computeDestinationPoint( { latitude, longitude }, rangeInMeters, 90  );
    const c180 = await computeDestinationPoint( { latitude, longitude }, rangeInMeters, 180 );
    const d360 = await computeDestinationPoint( { latitude, longitude }, rangeInMeters, 360 );
    return getBounds([ a0, b90, c180, d360 ]);
  }

}