const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/user/Desktop/PORTFOLIO FINAL  WEBSITE/vite-project/src/data';

function transformFile(filename, arrayName, transformFn, imports = '') {
  const filePath = path.join(srcDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Create temporary CommonJS file
  let tempContent = content;
  // Remove ESM imports
  tempContent = tempContent.replace(/import\s+[\s\S]*?;\s*/g, '');
  // Replace export default
  tempContent = tempContent.replace(new RegExp('export\\s+default\\s+' + arrayName + ';?', 'i'), '');
  
  // Find where const arrayName is declared
  const declarationIndex = tempContent.indexOf('const ' + arrayName);
  if (declarationIndex === -1) {
    // try lowercase / uppercase pattern
    console.error('Could not find declaration of', arrayName, 'in', filename);
    return;
  }
  
  tempContent = tempContent.replace(new RegExp('const\\s+' + arrayName + '\\s*=', 'i'), 'module.exports =');

  const tempPath = path.join(srcDir, 'temp_' + filename);
  fs.writeFileSync(tempPath, tempContent);
  
  // require it
  let data;
  try {
    data = require(tempPath);
  } catch (err) {
    console.error('Failed to load temp file for ' + filename, err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    return;
  }
  
  // Transform
  const transformedData = transformFn(data);
  
  // Clean up temp file
  if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  
  // delete require cache
  delete require.cache[require.resolve(tempPath)];

  // Serialize back to JS
  const serialized = JSON.stringify(transformedData, null, 2);
  const finalContent = imports + '\nconst ' + arrayName + ' = ' + serialized + ';\n\nexport default ' + arrayName + ';\n';
  fs.writeFileSync(filePath, finalContent);
  console.log('Successfully standardized ' + filename);
}

// Helper to ensure colors have at least 3-4 images
function getImagesArray(item, color) {
  // If images already exists (like in Macbook), use it
  if (color.images && Array.isArray(color.images)) {
    // Ensure labels are present
    const labels = ["Front", "Side", "Back", "Detail"];
    let mapped = color.images.map((img, idx) => ({
      url: img.url,
      label: img.label || labels[idx] || "General"
    }));
    // Check if at least 3 images, otherwise pad with the first one
    if (mapped.length < 3) {
      const firstImg = mapped[0] || { url: '', label: 'Front' };
      while (mapped.length < 4) {
        mapped.push({ url: firstImg.url, label: labels[mapped.length] || "General" });
      }
    }
    return mapped;
  }
  
  // If it's a single image/img/url property
  const imgUrl = color.img || color.image || color.url || '';
  return [
    { url: imgUrl, label: "Front" },
    { url: imgUrl, label: "Side" },
    { url: imgUrl, label: "Back" },
    { url: imgUrl, label: "Detail" }
  ];
}

// 1. MACBOOK
transformFile('macbook.js', 'macbooks', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      chip: item.chip,
      RAM: item.RAM,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.variants || color.storage || []).map(v => ({
            size: v.SSD ? (v.displaySize + ' / ' + v.SSD) : (v.display || v.size || ''),
            price: Number(v.price)
          }))
        };
      })
    };
  });
}, 'import { X } from "lucide-react";');

// 2. IPAD
transformFile('ipad.js', 'iPad', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      chip: item.chip,
      ram: item.ram,
      camera: item.camera,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.variants || color.storage || []).map(v => ({
            size: v.display && v.storage ? (v.display + ' / ' + v.storage) : (v.size || v.storage || ''),
            price: Number(v.price)
          }))
        };
      })
    };
  });
});

// 3. WATCH
transformFile('watch.js', 'Watches', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      chip: item.chip,
      display: item.display,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.storage || []).map(v => ({
            size: v.size,
            price: Number(v.price)
          }))
        };
      })
    };
  });
});

// 4. AIRPODS
transformFile('airpods.js', 'Airpods', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.storage || []).map(v => ({
            size: v.size,
            price: Number(v.price)
          }))
        };
      })
    };
  });
});

// 5. ACCESSORIES
transformFile('accessories.js', 'Accessories', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.storage || []).map(v => ({
            size: v.size,
            price: Number(v.price)
          }))
        };
      })
    };
  });
});

// 6. DISPLAY
transformFile('display.js', 'Display', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.storage || []).map(v => ({
            size: v.size,
            price: Number(v.price)
          }))
        };
      })
    };
  });
});

// 7. VISION
transformFile('vision.js', 'Vision', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      chip: item.chip,
      camera: item.camera,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.storage || []).map(v => ({
            size: v.size,
            price: Number(v.price)
          }))
        };
      })
    };
  });
});

// 8. APPLETV
transformFile('appletv.js', 'AppleTv', (data) => {
  return data.map(item => {
    return {
      id: item.id,
      model: item.model,
      chip: item.chip,
      camera: item.camera,
      colors: item.colors.map(color => {
        return {
          name: color.name,
          images: getImagesArray(item, color),
          storage: (color.storage || []).map(v => ({
            size: v.size,
            price: Number(v.price)
          }))
        };
      })
    };
  });
});
