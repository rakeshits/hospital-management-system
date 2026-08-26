/**
 * Entity: Medicine
 * Maps to the `medicines` table.
 */
export default class Medicine {
  constructor({
    medicineId   = null,
    name         = '',
    genericName  = '',
    category     = '',    // 'tablet'|'syrup'|'injection'|'capsule'|'ointment'
    manufacturer = '',
    unitPrice    = 0,
    stockQty     = 0,
    reorderLevel = 10,
    expiryDate   = null,
    isActive     = true,
    createdAt    = null,
  } = {}) {
    this.medicineId   = medicineId;
    this.name         = name;
    this.genericName  = genericName;
    this.category     = category;
    this.manufacturer = manufacturer;
    this.unitPrice    = unitPrice;
    this.stockQty     = stockQty;
    this.reorderLevel = reorderLevel;
    this.expiryDate   = expiryDate;
    this.isActive     = isActive;
    this.createdAt    = createdAt;
  }

  get isLowStock() {
    return this.stockQty <= this.reorderLevel;
  }
}
