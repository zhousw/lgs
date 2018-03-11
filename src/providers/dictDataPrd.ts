import { Headers ,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpUtil } from './utils/HttpUtil';

@Injectable()
export class DictDataPrd {
  constructor(public httpUtil: HttpUtil) { 
          }

  getSex() {
    return this.httpUtil.get('dictData/getSex.do');
  }

}
