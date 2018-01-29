import {
  Injectable
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class AppService {
  data: any;
  constructor(private http: Http) {
  }

  getStores(): Observable < any > {
   return this.http.get('./assets/data/stores.json');
  }

}
