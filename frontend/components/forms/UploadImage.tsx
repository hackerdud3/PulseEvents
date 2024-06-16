import { Button, Card, CardFooter, Image, Input } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { UploadIcon } from '../../constants/UploadIcon';

type Props = {
  setImage: (image: File) => void;
};

const UploadImage = (props: Props) => {
  const { setImage } = props;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [resizedImageSrc, setResizedImageSrc] = useState<string | null>(null);

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          let width = img.width;
          let height = img.height;
          const maxSize = 800;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          // Calculate dimensions to fit within 800x800 while cropping to maintain aspect ratio
          const aspectRatio = 1; // 1:1 aspect ratio
          let targetWidth = width;
          let targetHeight = height;

          if (width / height > aspectRatio) {
            targetWidth = height * aspectRatio;
          } else {
            targetHeight = width / aspectRatio;
          }

          // Calculate positioning to center crop the image
          const xOffset = (width - targetWidth) / 2;
          const yOffset = (height - targetHeight) / 2;

          // Set canvas dimensions to 800x800
          canvas.width = 800;
          canvas.height = 800;

          // Draw image on canvas
          ctx.drawImage(
            img,
            xOffset,
            yOffset,
            targetWidth,
            targetHeight,
            0,
            0,
            800,
            800
          );

          // Convert canvas to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(resizedFile);
              } else {
                reject(new Error('Failed to resize image'));
              }
            },
            'image/jpeg',
            0.9 // Adjust quality here
          );
        };
        img.src = readerEvent.target!.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    console.log('event', event.target.files);
    if (files && files.length > 0) {
      const file = files[0];
      const resizedImage = await resizeImage(file);
      console.log('resized', resizedImage);
      setImage(resizedImage);

      const resizedImageSrc = URL.createObjectURL(resizedImage);
      setResizedImageSrc(resizedImageSrc);

      event.target.value = '';
    }
  };

  const handleImageClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none dark flex justify-end items-center shadow-lg"
      >
        <Image
          alt="Woman listening to music"
          className="object-cover"
          height={500}
          src={resizedImageSrc || 'https://nextui.org/images/hero-card.jpeg'}
          width={500}
        />
        <CardFooter className=" justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small mb-2 z-10">
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            endContent={<UploadIcon />}
            ariel-label="Upload Image"
            onClick={handleImageClick}
          >
            Upload Image
          </Button>
        </CardFooter>
      </Card>

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        placeholder="Upload Image"
      />
    </div>
  );
};

export default UploadImage;
