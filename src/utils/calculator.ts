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
      const R = 6371e3; // radius of the Earth in meters
      
      // iterate over the coordinates
      for (let i = 0; i < coordinates.length; i++) {
      const lat_1 = coordinates[i].latitude * Math.PI / 180;
      const lon_1 = coordinates[i].longitude * Math.PI / 180;
        const lat_2 = coordinates[(i + 1) % coordinates.length].latitude * Math.PI / 180;
        const lon_2 = coordinates[(i + 1) % coordinates.length].longitude * Math.PI / 180;
    
        // calculate the area of the spherical triangle formed by the current coordinate pair and the north and south poles
        const a = Math.sin((lat_2 - lat_1) / 2) ** 2
          + Math.cos(lat_1) * Math.cos(lat_2) * Math.sin((lon_2 - lon_1) / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const sphericalTriangleArea = R ** 2 * c;
    
        // add the area of the spherical triangle to the total area
        area += sphericalTriangleArea;
      }
      
      // return the absolute value of the total area divided by 2 (since we double-counted each triangle)
      area =  Math.abs(area / 2);
    }
   
    if (options && options["measureIn"]){
       switch (options["measureIn"]){
        case EExtraOptions.acre:
            area = area / 4046.85642
        break;
        default:
            break; 
       }
    }
    return area;
}