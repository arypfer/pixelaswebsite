"use client";

import { useState, useEffect, useRef } from "react";
import { allProducts, categories } from "@/lib/products";
import { Star, Globe, Zap, Plus, Trash2, Edit3, Save, X, GripVertical, Upload, Image as ImageIcon } from "lucide-react";

const ADMIN_PASSWORD = "040620";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>(allProducts);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedProductForUpload, setSelectedProductForUpload] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dragOverIndex = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    loadUploadedImages();
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('admin-products', JSON.stringify(products));
  }, [products]);

  const loadUploadedImages = async () => {
    try {
      const response = await fetch('/api/upload');
      const data = await response.json();
      setUploadedImages(data.images || []);
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-authenticated', 'true');
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-authenticated');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await loadUploadedImages();
        alert('Images uploaded successfully!');
      } else {
        const error = await response.json();
        alert('Upload failed: ' + error.message);
      }
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const uploadImageForProduct = async (file: File, type: 'card' | 'modal') => {
    setUploading(true);
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Generate filename (API returns array of uploaded filenames)
        const result = await response.json();
        if (result.files && result.files.length > 0) {
          const filename = result.files[0];
          const imagePath = `/images/products/${filename}`;

          // Update the editing product with the new image path
          if (type === 'card') {
            updateEditingProduct('image', imagePath);
          } else {
            updateEditingProduct('detailedImage', imagePath);
          }

          await loadUploadedImages();
        }
      } else {
        const error = await response.json();
        alert('Upload failed: ' + error.message);
      }
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct({ ...product });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingProduct.id !== undefined) {
      // Update existing product
      setProducts(products.map(p => p.title === editingProduct.id ? editingProduct : p));
    } else {
      // Add new product
      setProducts([...products, editingProduct]);
    }
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleDelete = (productTitle: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.title !== productTitle));
    }
  };

  const handleAddNew = () => {
    setEditingProduct({
      title: '',
      subtitle: '',
      description: '',
      featured: false,
      link: '',
      image: '',
      category: 'Standalone Apps',
      detailedDescription: '',
      features: [],
      detailedImage: '',
      icon: 'Star',
      downloadButtons: [
        { text: '', url: '' },
        { text: '', url: '' }
      ]
    });
    setIsEditing(true);
  };

  const updateEditingProduct = (field: string, value: any) => {
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    dragOverIndex.current = index;
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    dragOverIndex.current = null;
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newProducts = [...products];
    const draggedItem = newProducts[draggedIndex];

    // Remove dragged item
    newProducts.splice(draggedIndex, 1);

    // Insert at new position
    newProducts.splice(dropIndex, 0, draggedItem);

    setProducts(newProducts);
    setDraggedIndex(null);
    dragOverIndex.current = null;
  };

  // If not authenticated, show password form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-white/60 text-sm">Enter password to access the admin panel</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/25"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => window.history.back()}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                ← Back to website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Website Content Editor</h1>
            <p className="text-gray-400 text-sm mt-1">Drag products to reorder them • Upload images directly</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Logout
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              disabled={uploading}
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
            <button
              onClick={handleAddNew}
              className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Uploaded Images Gallery */}
        {uploadedImages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Uploaded Images ({uploadedImages.length})
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={`/images/products/${image}`}
                    alt={image}
                    className="w-full h-20 object-cover rounded-lg border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                    onClick={() => {
                      if (editingProduct) {
                        updateEditingProduct('image', `/images/products/${image}`);
                      } else {
                        navigator.clipboard.writeText(`/images/products/${image}`);
                        alert('Image path copied to clipboard!');
                      }
                    }}
                    title="Click to use this image (or copy path)"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-xs text-white text-center px-2">
                      {editingProduct ? 'Use Image' : 'Copy Path'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className={`bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-200 ${
                draggedIndex === index ? 'opacity-50 scale-95' : ''
              } ${
                dragOverIndex.current === index ? 'border-blue-500 bg-blue-500/10' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/10 rounded transition-colors">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </div>
                  {getIcon(product.icon)}
                  {product.featured && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Featured</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit({ ...product, id: product.title })}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.title)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{product.subtitle}</p>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>

              <div className="flex justify-between items-center text-sm">
                <span className="bg-white/10 px-2 py-1 rounded-full">{product.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditing && editingProduct && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingProduct.title}
                      onChange={(e) => updateEditingProduct('title', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingProduct.subtitle}
                      onChange={(e) => updateEditingProduct('subtitle', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => updateEditingProduct('description', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Detailed Description</label>
                  <textarea
                    value={editingProduct.detailedDescription}
                    onChange={(e) => updateEditingProduct('detailedDescription', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                {/* Images and Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Image <span className="text-gray-400">(600×450px)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={editingProduct.image}
                        onChange={(e) => updateEditingProduct('image', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="https://... or /images/products/..."
                      />
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              await uploadImageForProduct(file, 'card');
                            }
                          };
                          input.click();
                        }}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
                        title="Upload card image"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Upload to <code className="bg-gray-800 px-1 rounded">/public/images/products/</code> and use <code className="bg-gray-800 px-1 rounded">/images/products/filename.jpg</code>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Modal Image <span className="text-gray-400">(1200×900px)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={editingProduct.detailedImage}
                        onChange={(e) => updateEditingProduct('detailedImage', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="https://... or /images/products/..."
                      />
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              await uploadImageForProduct(file, 'modal');
                            }
                          };
                          input.click();
                        }}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
                        title="Upload modal image"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Higher resolution for modal view
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Download Link</label>
                  <input
                    type="url"
                    value={editingProduct.link}
                    onChange={(e) => updateEditingProduct('link', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="https://..."
                  />
                </div>

                {/* Category and Icon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => updateEditingProduct('category', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon</label>
                    <select
                      value={editingProduct.icon}
                      onChange={(e) => updateEditingProduct('icon', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="Star">Star</option>
                      <option value="Globe">Globe</option>
                      <option value="Zap">Zap</option>
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                  <textarea
                    value={editingProduct.features.join('\n')}
                    onChange={(e) => updateEditingProduct('features', e.target.value.split('\n').filter(f => f.trim()))}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                {/* Download Buttons */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Download Buttons</h3>
                  
                  {/* Button 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Button 1 Text</label>
                      <input
                        type="text"
                        value={editingProduct.downloadButtons?.[0]?.text || ''}
                        onChange={(e) => {
                          const newButtons = [...(editingProduct.downloadButtons || [{ text: '', url: '' }, { text: '', url: '' }])];
                          newButtons[0] = { ...newButtons[0], text: e.target.value };
                          updateEditingProduct('downloadButtons', newButtons);
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="e.g. Download Windows"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Button 1 URL</label>
                      <input
                        type="url"
                        value={editingProduct.downloadButtons?.[0]?.url || ''}
                        onChange={(e) => {
                          const newButtons = [...(editingProduct.downloadButtons || [{ text: '', url: '' }, { text: '', url: '' }])];
                          newButtons[0] = { ...newButtons[0], url: e.target.value };
                          updateEditingProduct('downloadButtons', newButtons);
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Button 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Button 2 Text</label>
                      <input
                        type="text"
                        value={editingProduct.downloadButtons?.[1]?.text || ''}
                        onChange={(e) => {
                          const newButtons = [...(editingProduct.downloadButtons || [{ text: '', url: '' }, { text: '', url: '' }])];
                          newButtons[1] = { ...newButtons[1], text: e.target.value };
                          updateEditingProduct('downloadButtons', newButtons);
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="e.g. Download Mac"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Button 2 URL</label>
                      <input
                        type="url"
                        value={editingProduct.downloadButtons?.[1]?.url || ''}
                        onChange={(e) => {
                          const newButtons = [...(editingProduct.downloadButtons || [{ text: '', url: '' }, { text: '', url: '' }])];
                          newButtons[1] = { ...newButtons[1], url: e.target.value };
                          updateEditingProduct('downloadButtons', newButtons);
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
