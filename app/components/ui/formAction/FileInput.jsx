"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function FileInput({
  image_url = "",
  gallery_images = [],
  id = "file_input",
  label = "",
  name = "",
  required = false,
  multiple = false,
  accept = "image/*",
  className = "",
  error = "",
  ...rest
}) {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:8000";
  
  const [previews, setPreviews] = useState([]);
  const [hasNewImage, setHasNewImage] = useState(false);

  // Debug logs
  useEffect(() => {
    console.log('FileInput Props:', {
      image_url,
      gallery_images,
      multiple,
      storageUrl
    });
  }, [image_url, gallery_images, multiple]);

  // Helper function to build proper image URL
  const buildImageUrl = (path) => {
    if (!path) {
      console.log('Empty path provided');
      return "";
    }
    
    // If already has http/https, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      console.log('Full URL:', path);
      return path;
    }
    
    // Remove leading slash from path if exists
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Remove trailing slash from storageUrl if exists
    const cleanStorageUrl = storageUrl.endsWith('/') 
      ? storageUrl.slice(0, -1) 
      : storageUrl;
    
    const fullUrl = `${cleanStorageUrl}/${cleanPath}`;
    console.log('Built URL:', fullUrl);
    return fullUrl;
  };

  // Memoize existing images to prevent re-calculation
  const existingImageUrls = useMemo(() => {
    console.log('Computing existingImageUrls...', {
      multiple,
      gallery_images_length: gallery_images.length,
      image_url
    });

    if (multiple && gallery_images.length > 0) {
      console.log('Processing gallery images:', gallery_images);
      
      const urls = gallery_images.map((img, index) => {
        console.log(`Gallery image ${index}:`, img);
        
        // Handle different formats
        if (typeof img === 'string') {
          return buildImageUrl(img);
        }
        
        // If it's an object with image_url property
        if (img && img.image_url) {
          return buildImageUrl(img.image_url);
        }
        
        // If it's an object with url property
        if (img && img.url) {
          return buildImageUrl(img.url);
        }
        
        console.warn('Unknown image format:', img);
        return '';
      }).filter(Boolean);
      
      console.log('Gallery URLs:', urls);
      return urls;
    } else if (!multiple && image_url) {
      const url = buildImageUrl(image_url);
      console.log('Single image URL:', url);
      return [url];
    }
    
    console.log('No images to display');
    return [];
  }, [image_url, gallery_images, multiple, storageUrl]);

  // Load existing images only once
  useEffect(() => {
    console.log('useEffect check:', {
      hasNewImage,
      existingImageUrls_length: existingImageUrls.length,
      previews_length: previews.length
    });

    if (!hasNewImage && existingImageUrls.length > 0 && previews.length === 0) {
      console.log('Setting previews with existing images:', existingImageUrls);
      setPreviews(existingImageUrls);
    }
  }, [existingImageUrls]);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log('New files selected:', fileArray);
      setPreviews(fileArray);
      setHasNewImage(true);
      
      if (rest.onChange) {
        if (multiple) {
          rest.onChange(Array.from(files));
        } else {
          rest.onChange(files[0]);
        }
      }
    }
  };

  const handleRemove = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    
    if (newPreviews.length === 0) {
      setHasNewImage(false);
      const input = document.getElementById(id);
      if (input) input.value = '';
    }
  };

  return (
    <div className={`my-4 w-full ${className}`}>
      {label && (
        <div className="my-2">
          <label
            htmlFor={id}
            className="mx-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      )}

      <input
        {...rest}
        type="file"
        id={id}
        name={name}
        required={required && !image_url && gallery_images.length === 0}
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className={`py-4 px-5 outline-none border border-[0.5px] border-gray-200 rounded-xl w-full cursor-pointer
          bg-gray-50 text-gray-900 text-sm
          focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
      />

      {error && <p className="text-red-500 text-xs mt-1 mx-2">{error}</p>}
      
      {/* Debug info */}
      <div className="mt-2 text-xs text-gray-500">
        <p>Has new image: {hasNewImage ? 'Yes' : 'No'}</p>
        <p>Previews count: {previews.length}</p>
        <p>Existing images count: {existingImageUrls.length}</p>
      </div>

      {previews.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-2">
            {hasNewImage ? "New Image(s):" : "Current Image(s):"}
          </p>
          <div className="flex flex-wrap gap-3">
            {previews.map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  onLoad={() => console.log('Image loaded successfully:', src)}
                  onError={(e) => {
                    console.error('Image load error:', src);
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    if (parent && !parent.querySelector('.image-error')) {
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'image-error w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg border border-red-300';
                      errorDiv.innerHTML = `<span class="text-xs text-red-500 p-1 text-center">Image Error</span>`;
                      parent.appendChild(errorDiv);
                    }
                  }}
                />
                {hasNewImage && (
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}