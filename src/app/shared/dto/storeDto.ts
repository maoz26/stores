class StoreDto {
  name: string;
  coordinates: CoordinateDto;
  distance: number;
  constructor(name: string, coordinate: CoordinateDto) {
    this.name = name;
    this.coordinates = coordinate;
  }
}
