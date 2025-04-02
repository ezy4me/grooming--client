import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";

interface ImageCellProps {
  imageUrl: string;
  defaultImage?: string;
  altText?: string;
  size?: number;
}

const ImageCell: React.FC<ImageCellProps> = ({
  imageUrl,
  defaultImage = "/paws_1.png",
  altText = "Image",
  size = 50,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          const imageBlob = await response.blob();
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectUrl);
        } else {
          setImageSrc(defaultImage);
        }
      } catch (error: any) {
        setImageSrc(defaultImage);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageUrl, defaultImage]);

  if (loading) {
    return <CircularProgress sx={{ color: "#ff3881" }} />;
  }

  return imageSrc ? (
    <img
      src={imageSrc}
      alt={altText}
      style={{ width: size, height: size, borderRadius: "50%" }}
    />
  ) : (
    <Typography>-</Typography>
  );
};

export default ImageCell;
