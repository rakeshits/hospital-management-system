/**
 * Entity: Department
 * Maps to the `departments` table.
 */
export default class Department {
  constructor({
    departmentId  = null,
    name          = '',
    description   = '',
    headDoctorId  = null,
    floorNumber   = null,
    phone         = '',
    isActive      = true,
    createdAt     = null,
  } = {}) {
    this.departmentId = departmentId;
    this.name         = name;
    this.description  = description;
    this.headDoctorId = headDoctorId;
    this.floorNumber  = floorNumber;
    this.phone        = phone;
    this.isActive     = isActive;
    this.createdAt    = createdAt;
  }
}
