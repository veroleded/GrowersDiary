import { Strain } from "@prisma/client";


export default class StrainDto {
  id;
  name;
  description;
  type;
  feminization;

  constructor(strain: Strain) {
    this.id = strain.id;
    this.name = strain.name;
    this.description = strain.description;
    this.type = strain.type;
    this.feminization = strain.feminization;
  }
}