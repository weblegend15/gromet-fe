import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

interface FileInputProps {
  updateFullImages: (images: string) => void; // Prop to receive the update function
}

const FileInputComponent: React.FC<FileInputProps> = ({ updateFullImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) {
      setFiles(fileList);
    }
  };

  useEffect(() => {
    let fullimages = "";
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          const fileName = file.name.split('.').slice(0, -1).join('.');
          fullimages += fileName + ",";
        }
      }
      updateFullImages(fullimages); // Update full images state in ShopView
    }
  }, [files, updateFullImages]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="fileInput" style={{ marginRight: "20px", alignItems: 'center', textAlign: 'center' }}>Product Images:</label>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png, .webp, .bmp"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button onClick={handleButtonClick}>Upload</button>
      </div>
    </div>
  );
};

export default FileInputComponent;
