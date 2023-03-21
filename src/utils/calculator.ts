import { Coordinate } from "../components/InputAreaMapping/InputAreaMapper";
import { EExtraOptions, IExtraOptions } from "../forms/IFormInfo";


/*
    The number 6378137 is the approximate equatorial radius of the Earth, expressed in meters.
*/
export function calculateMarkedArea(coordinates: Coordinate[], options?: IExtraOptions) {
    /*
    given an array of coordinates of longitude and latitude, determine the size
    */
    let area = 0;
    if (coordinates.length > 2) {
      coordinates.forEach((coord, index) => {
        const nextIndex = index === coordinates.length - 1 ? 0 : index + 1;
        const nextCoord = coordinates[nextIndex];
        area += coord.latitude * nextCoord.longitude - coord.longitude * nextCoord.latitude;
      });
      area /= 2;
      area *= 6378137 * 6378137;
    }
    area = Math.abs(area)
    if (options && options["measureIn"]){
       switch (options["measureIn"]){
        case EExtraOptions.acre:
            area = area * 0.000247105
        break;
        default:
            break; 
       }
    }
    return Math.abs(area);
}