
import { LatLngLiteral } from '@agm/core/services/google-maps-types';
import { MarkerLatLng } from './marker-latlng.model';
export interface LatLngLiteralList{
    position : LatLngLiteral,
    history? : MarkerLatLng[]
}