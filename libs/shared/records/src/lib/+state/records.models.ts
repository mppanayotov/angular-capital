/**
 * Interface for the 'Records' data
 */
export interface RecordsEntity {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  salary: string;
}

/**
 * Class for the 'Records' data
 */
export class newRecordTemplate implements RecordsEntity {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  salary: string;

  constructor(
    id: number,
    inputData: {
      name: string;
      department: string;
      email: string;
      phone: string;
      address: string;
      salary: string;
    }
  ) {
    this.id = id;
    this.name = inputData.name;
    this.department = inputData.department;
    this.email = inputData.email;
    this.phone = inputData.phone;
    this.address = inputData.address;
    this.salary = inputData.salary;
  }
}
