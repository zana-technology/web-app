import {
  // fileIconDoc,
  fileIconPdf,
  // fileIconMp4,
  // fileIcon,
} from "@/assets";
import { useCallback, useEffect, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { FileWithPreview } from "@/types";
import { capitalizeFirstLetter } from "@/libs";
import { twMerge } from "tailwind-merge";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Button } from "../button";

type FileTypes = "doc" | "video" | "image";

interface DropzoneProps {
  label?: string;
  title?: string;
  subtitle?: string;
  info?: string;
  maxNumOfImages: number;
  files: FileWithPreview[];
  name?: string;
  setFiles: any;
  errorMessage?: string;
  maxSize?: number;
  isMultiple?: boolean;
  fileTypes?: FileTypes[];
  required?: boolean;
  fileListClassName?: string;
}

export const Dropzone = ({
  maxSize = 1,
  info,
  isMultiple = true,
  maxNumOfImages,
  files,
  setFiles,
  label,
  name,
  errorMessage,
  fileTypes,
  required,
  fileListClassName,
  title,
  subtitle,
}: DropzoneProps) => {
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      const updatedFiles = [...(files || []), ...filesWithPreview];

      setFiles(updatedFiles);

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  const FILE_TYPE_MAP = {
    image: ["image/*"],
    video: ["video/*"],
    doc: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ],
  };

  const getAcceptedTypes = (fileTypes: FileTypes[]) => {
    return fileTypes.reduce<Record<string, []>>((acc, type) => {
      const mimes = FILE_TYPE_MAP[type];
      if (mimes) {
        mimes.forEach((mime) => {
          acc[mime] = [];
        });
      }
      return acc;
    }, {});
  };

  const acceptedTypes = fileTypes && fileTypes?.length > 0 ? getAcceptedTypes(fileTypes) : [];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      ...(fileTypes && fileTypes?.length > 0 ? (acceptedTypes as Accept) : { "image/*": [] }),
    },
    maxSize: maxSize * 1024 * 1024,
    maxFiles: maxNumOfImages,
    onDrop,
    multiple: isMultiple,
  });

  const removeFile = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);

    setFiles(updatedFiles);
  };

  useEffect(() => {
    const removeRejected = () => {
      if (rejected.length > 0) {
        setTimeout(() => {
          setRejected([]);
        }, 5000);
      }
    };

    removeRejected();
  }, [rejected]);

  const getFileIcon = (type: string): string => {
    // console.log("type", type);
    if (type.startsWith("image/")) return "";
    if (type === "application/pdf") return fileIconPdf;
    if (type === "application/msword" || type.includes("word")) return fileIconPdf;
    if (type === "video/mp4" || type.startsWith("video/")) return fileIconPdf;
    return fileIconPdf;
  };

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={name} className="block mb-1.5 text-sm text-dark-700">
          {capitalizeFirstLetter(label)} {required && "*"}
        </label>
      ) : (
        ""
      )}
      {files.length > 0 ? (
        <div className={twMerge("w-full grid gap-4 mb-4", fileListClassName)}>
          {files.map((file) => (
            <div
              key={file.name}
              className="flex justify-between  border border-jGrey-700 p-4 rounded-md shrink items-center gap-1"
            >
              <div className="flex gap-3 text-sm w-full items-center">
                <img
                  src={
                    file.type.startsWith("image/")
                      ? (file.preview as string)
                      : getFileIcon(file.type)
                  }
                  alt="attachment icon"
                  className="h-10 w-auto"
                />
                <p className="text-wrap break-all">{file.name}</p>
              </div>
              <div
                onClick={() => {
                  removeFile(file.name);
                }}
              >
                <RiDeleteBin6Fill size={20} className="hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div
        className={`border border-dashed border-zana-grey-200 rounded-lg w-full py-5 px-4 flex flex-col justify-center cursor-pointer items-center h-[259px] bg-zana-grey-500 ${
          isDragActive ? "bg-slate-600 opacity-5" : ""
        }`}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} disabled={files.length === maxNumOfImages} />
          {isDragActive ? (
            <p className="text-slate-900">Drop the files here ...</p>
          ) : (
            <div className="flex gap-2.5 items-center flex-col text-center text-sm">
              <MdOutlineFileUpload size={24} />
              {title ? <p className="font-semibold text-xl">{title}</p> : ""}
              {subtitle ? <p className="text-dark-400 max-w-[308px]">{subtitle}</p> : ""}
              <Button title="Choose File" disabled={files.length === maxNumOfImages} />
              <p className="text-dark-400">{info}</p>
            </div>
          )}
        </div>

        <div>
          {rejected.map(({ file, errors }) => (
            <div key={file.name} className="">
              <p>{file.name} cannot be uploaded</p>
              {errors.map((error) => (
                <p key={error.code} className="">
                  {error.message}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : ""}
    </div>
  );
};

export default Dropzone;
