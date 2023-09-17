// product.dto.js

export class ProductDTO {
    constructor(data) {
      this._id = data._id;
      this.title = data.title;
      this.description = data.description;
      this.price = data.price;
      this.stock = data.stock;
      this.thumbnails = data.thumbnails;
      this.status = data.status;
      this.code = data.code;
      this.category = data.category;
    }
  }
  