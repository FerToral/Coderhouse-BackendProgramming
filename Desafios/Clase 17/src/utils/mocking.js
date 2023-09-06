// mocking.js
const generateMockProduct = (id) => {
    return {
      _id: id.toString(),
      title: `Product ${id}`,
      description: `This is a mock product with ID ${id}`,
      price: Math.random() * 100,
      stock: Math.floor(Math.random() * 100),
      thumbnails: ['https://www.paginaquenoexiste.com.ar/img/product','https://www.paginaquenoexiste.com.ar/img/product2'],
      status: true,
      code: 'CP12290',
      category: 'prueba',
    };
  };
  
  const generateMockProducts = (count) => {
    const products = [];
    for (let i = 1; i <= count; i++) {
      products.push(generateMockProduct(i));
    }
    return products;
  };
  
  export { generateMockProducts };
  