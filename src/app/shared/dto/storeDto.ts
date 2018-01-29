class StoreDto {
  name: string;
  coordinates: CoordinateDto;
  constructor(name: string, coordinate: CoordinateDto) {
    this.name = name;
    this.coordinates = coordinate;
  }
}
