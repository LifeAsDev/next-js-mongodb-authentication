"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import UserIcon from "../components/userSVG";
import PhoneIcon from "../components/phoneSVG";
import UploadIcon from "../components/uploadSVG";
import DeleteIcon from "../components/deleteSVG";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [imgURL, setimgURL] = useState("");
  const [loadingImg, setLoadingImg] = useState(0);
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    } else {
      console.log("NOOOOOOOOOOOOOO");
    }
  };

  const remove_selected = (id_input: any) => {
    let fileInput = document.getElementById(id_input);

    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = "";
      fileInput.dispatchEvent(new Event("change"));
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    remove_selected("file");

    setSelectedImage(undefined);
  };
  const numberHandler = (e: any) => {
    const validatedValue = e.target.value.replace(/[^0-9]/g, "");
    setPhone(validatedValue);
  };

  const handleUpload = (e: { [x: string]: any; preventDefault: any }) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${session?.user?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingImg(progress);
        progress >= 99 ? console.log("ya") : null;
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (url: SetStateAction<string>) => {
            setimgURL(url);
          }
        );
      }
    );
  };
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-4">
      <h2 className="text-[2rem]	font-extrabold	">DASHBOARD</h2>
      {session ? (
        <div className="border w-full  md:w-[500px]  flex border-gray-300 items-center rounded-lg p-4 flex-col justify-center gap-4  mt-8 mg:mt-10">
          <div className="w-full pb-3 flex flex-row	gap-4 items-center 	border-b-[1px] border-gray-300 w-full">
            <UserIcon />
            <input
              className="bg-transparent"
              type="text"
              disabled
              value={session?.user?.name ?? ""}
            ></input>
          </div>
          <div className="w-full pb-3 flex flex-row	gap-4 items-center 	border-b-[1px] border-gray-300 w-full">
            <PhoneIcon />
            <input
              placeholder="Phone"
              className="bg-transparent outline-none grow"
              type="text"
              value={phone}
              onChange={numberHandler}
            ></input>
          </div>
          <form
            className="flex flex-col w-full h-[350px]"
            onSubmit={handleUpload}
          >
            {selectedImage ? (
              <div className="flex flex-col justify-center items-center border-dotted border-2 w-full h-[300px] ">
                <div className="relative h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Thumb"
                  />
                </div>
                <div className="relative w-full">
                  <div
                    onClick={removeSelectedImage}
                    className="cursor-pointer p-[.5rem] rounded-[50%] absolute flex justify-center items-center right-[15px] bottom-[15px] w-[3rem] h-[3rem] bg-red-500"
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            ) : (
              <label
                className={`flex flex-col justify-center items-center border-dotted border-2 w-full h-[300px] ${
                  selectedImage ? "" : "cursor-pointer"
                }`}
                htmlFor="file"
              >
                <UploadIcon />
                <p className="font-bold	text-gray-500">Click here to upload</p>
                <p className="font-[500]		 text-gray-500 text-[.9rem]">
                  PNG, JPG or GIF(MAX. 800x400px)
                </p>
              </label>
            )}
            <input
              onChange={imageChange}
              id="file"
              accept="image/*"
              className="inputfile"
              type="file"
            ></input>
            <button
              type="submit"
              disabled={false}
              className={`outline-none flex justify-center items-center shadow-e box-border mt-3 h-[52px] text-white rounded-[50px] bg-green p-[.5rem] ${
                false ? "saturate-50" : ""
              }`}
            >
              SAVE
            </button>
          </form>
        </div>
      ) : (
        <p>
          Not signed in <br />
        </p>
      )}
    </main>
  );
}
