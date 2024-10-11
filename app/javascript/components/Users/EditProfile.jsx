import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ApiClient } from "../../services";
import { Alert, Box, Typography } from "@mui/material";
import Dropzone from "react-dropzone";

const EditProfile = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [inputFileError, setInputFileError] = useState(undefined);

  const { mutate } = useMutation(ApiClient.updateUser, {
    onSuccess: (data) => {
      console.log("Avatar updated successfully: data ->", data);

      localStorage.setItem("jwt", data.token);
      queryClient.invalidateQueries("USER_QUERY_KEY");
      setAvatarPreview(null);
    },
    onError: (error) => {
      console.error("File upload failed:", error);
    },
  });

  const handleUpload = async () => {
    if (file) {
      await mutate(file);
      setFile(null);

      setInputFileError(undefined);
    }
  };

  const handleDroppedFiles = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setInputFileError(fileRejections[0].errors[0].message);
    } else {
      setInputFileError(undefined);
      setFile(acceptedFiles[0]);
      setAvatarPreview(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Box className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <Typography id="modal-modal-title" variant="h6">
          Edit your profile
        </Typography>
        <Dropzone
          onDrop={handleDroppedFiles}
          maxFiles={1}
          accept={{ "image/*": [] }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="p-4 border-2 border-dashed rounded-md cursor-pointer flex flex-col items-center mt-4"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                Drag & drop an image, or click to select one
              </p>
            </div>
          )}
        </Dropzone>

        {avatarPreview && (
          <div className="flex justify-center mt-4">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col items-center mt-6 space-y-4">
          {file && (
            <Alert severity="success">{`Selected file: ${file.name}`}</Alert>
          )}
          {inputFileError && (
            <Alert
              severity="error"
              onClose={() => setInputFileError(undefined)}
            >
              {inputFileError}
            </Alert>
          )}
          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700"
            onClick={handleUpload}
            disabled={!file}
          >
            Save Changes
          </button>
        </div>
      </Box>
    </div>
  );
};

export default EditProfile;
