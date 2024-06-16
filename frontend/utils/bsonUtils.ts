import { Binary } from 'bson';

export const convertToBinary = (file: File): Promise<Binary> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const binaryData = new Binary(Buffer.from(arrayBuffer));
      resolve(binaryData);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
