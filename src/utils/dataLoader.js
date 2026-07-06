// src/utils/dataLoader.js

export function getDynamicProducts(categoryKey, staticData = []) {
  const adminProducts = JSON.parse(localStorage.getItem("ispectre_products")) || [];
  const filteredAdminProducts = adminProducts.filter(p => p.category === categoryKey);
  
  const formattedAdminProducts = filteredAdminProducts.map(p => ({
    id: p.id,
    model: p.name,      
    name: p.name,        
    price: p.price,      
    img: p.img,          
    
    colors: [
      {
        name: "Standart",
        images: [{ url: p.img }],
        storage: [
          { size: "Default", price: p.price }
        ]
      }
    ]
  }));

  return [...staticData, ...formattedAdminProducts];
}