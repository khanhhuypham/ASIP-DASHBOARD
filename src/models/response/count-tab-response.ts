export class CountTabResponse {

  total: number = 0;
  active: number = 0;
  inactive: number = 0;

  constructor(data?: Partial<CountTabResponse>) {
    Object.assign(this, data);
  }
}
