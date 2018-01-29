import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'sortingCompanies' })
export class ValuesPipe implements PipeTransform {

  transform(companies: number[], order: number): any[] {
    return companies.sort(function(obj1, obj2) {
      // Ascending: first age less than the previous
      return (obj1 > obj2 ? 1 : -1);
    });
  }

}
