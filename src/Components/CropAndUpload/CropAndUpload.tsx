import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { FC, useState, useRef } from "react";
import { storage } from "../../Config/firebase";
import getCroppedImg from "../../Utils/cropImage";
import { dataURLtoFile } from "../../Utils/dataURLtoFile";
import Cropper from "react-easy-crop";
import { v4 } from "uuid";
import S from "./CropAndUpload.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCloudUpload,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import whiteSpinner from "../../Assets/white_spinner.gif";

type IProp = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPic: React.Dispatch<React.SetStateAction<string | null>>;
};
const CropAndUpload: FC<IProp> = ({ setOpenModal, setPic }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null | undefined>(undefined);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // 1st
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e?.target?.files[0]);
      reader.addEventListener("load", () => {
        // @ts-ignore
        setImage(reader.result);
        setOpen(true);
      });
    }
  };

  // 2nd
  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  // 3rd
  const cropAndUpload = async () => {
    if (image && croppedArea) {
      const croppedString = await getCroppedImg(image, croppedArea);
      const file = dataURLtoFile(croppedString, "TalkShawkUserProfile");
      uploadFile(file);
    }
  };

  // 4th
  const uploadFile = async (img: File) => {
    if (img == null) return;

    setIsUploading(true);
    const imageRef = ref(storage, `profilephotos/${img.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, img);
    const url = await getDownloadURL(snapshot.ref);
    // console.log(url)
    setPic(url);
    setOpen(false);
    setOpenModal(false);
    setIsUploading(false);
  };
  return (
    <>
      <>
        <div className={S.container}>
          <div className={S.container_cropper}>
            {image && open ? (
              <>
                <div className={S.cropper}>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              </>
            ) : null}
          </div>
          <div className={S.container_btn}>
            <input
              ref={fileInputRef}
              className={S.file}
              type="file"
              onChange={onSelectFile}
            />
            <div>
              <motion.button
                disabled={isUploading}
                whileTap={{
                  scale: isUploading ? 1 : 0.95,
                }}
                transition={{ duration: "0.15" }}
                type="button"
                className={`${S.btn} ${S.btn_select} ${
                  isUploading && "disable"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image&nbsp;
                <FontAwesomeIcon icon={faImage} />
              </motion.button>
              {/*  */}
              <motion.button
                disabled={isUploading}
                whileTap={{
                  scale: isUploading ? 1 : 0.95,
                }}
                transition={{ duration: "0.15" }}
                type="button"
                onClick={cropAndUpload}
                className={`${S.btn} ${S.btn_done}`}
              >
                {isUploading ? (
                  <>
                    <span>Uploading&nbsp;</span>
                    <img
                      className={`${S.spinner_img}`}
                      src={whiteSpinner}
                      alt="spinning gif"
                    />
                  </>
                ) : (
                  <>
                    <span>Upload &nbsp;</span>
                    <FontAwesomeIcon icon={faCloudUpload} />
                  </>
                )}
              </motion.button>
            </div>
            <div>
              <motion.button
                disabled={isUploading}
                whileTap={{
                  scale: isUploading ? 1 : 0.95,
                }}
                transition={{ duration: "0.15" }}
                type="button"
                className={`${S.btn} ${S.btn_close} ${
                  isUploading && "disable"
                }`}
                onClick={() => setOpenModal(false)}
              >
                <FontAwesomeIcon icon={faClose} />
              </motion.button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CropAndUpload;
