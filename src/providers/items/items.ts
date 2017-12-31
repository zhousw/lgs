import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { HttpUtil } from '../utils/HttpUtil';

@Injectable()
export class Items {

  constructor(public httpUtil: HttpUtil) { }

  query(params?: any) {
    return this.httpUtil.get('/items.do?'+params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
