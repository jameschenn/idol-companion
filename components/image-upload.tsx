"use client"
import { useState, useEffect } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, disabled }) => {
  
    //Check if we finish server side rendering before going to client side rendering to prevent potential hydration issues from Cloudinary
    const [isMounted, setIsMounted] = useState(false);
    //only runs when we finish server side rendering and get to client side rendering
    useEffect(() => {
        setIsMounted(true);
    }, []);
    // in server side, will return false, so won't cause hydration errors 
    if (!isMounted) return false;
  
    return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
        <CldUploadButton
            onSuccess={(result: any) => onChange(result.info.secure_url)}
            options={{ maxFiles: 1 }}
            uploadPreset="jmm9kpbi"
        >
            <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
                <div className="relative h-40 w-40">
                    <Image
                        fill
                        alt='Upload'
                        src={value || "/placeholder.svg"}
                        priority={true}
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        </CldUploadButton>
    </div>
  )
}

export default ImageUpload
