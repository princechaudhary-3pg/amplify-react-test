import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { SyntheticEvent, useEffect, useState } from "react";
import { checkLoginAndGetName } from "../utils/AuthUtils";
import { NavLink, useNavigate } from "react-router";
import { uploadData } from "aws-amplify/storage";

export type CustomEvent = {
  target: HTMLInputElement
}

export function AddDriver() {
  const navigate = useNavigate();
  const driversClient = generateClient<Schema>().models.drivers;
  const [userName, setUserName] = useState<string | undefined>();
  const [driverName, setDriverName] = useState<string>('');
  const [driverTeam, setDriverTeam] = useState<string>('');
  const [driverPhotos, setDriverPhotos] = useState<File[]>([]);

  useEffect(() => {
    const handleData = async () => {
      const name = await checkLoginAndGetName();
      if (name) {
        setUserName(name)
      }
    }
    handleData();
  }, [])

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (driverName && driverTeam) {
      let driverPhotosUrls: string[] = [];
      let driverPhotosThumbsUrls: string[] = [];
      if (driverPhotos) {
        const uploadResult = await uploadPhotos(driverPhotos)
        driverPhotosUrls = uploadResult.urls;
        driverPhotosThumbsUrls = uploadResult.thumbs;
      }

      const driver = await driversClient.create({
        name: driverName,
        team: driverTeam,
        photos: driverPhotosUrls,
        thumbs: driverPhotosThumbsUrls
      })
      console.log(driver)
      alert(`Driver with id ${driver.data?.id} created`)
      clearFields();
    }
    navigate('/drivers');
  }

  function clearFields() {
    setDriverName('');
    setDriverTeam('');
    setDriverPhotos([]);
  }

  async function uploadPhotos(files: File[]): Promise<{
    urls: string[]
    thumbs: string[]
  }> {
    const urls: string[] = [];
    const thumbs: string[] = []
    for (const file of files) {
      console.log(`uploading file ${file.name}`)
      const result = await uploadData({
        data: file,
        path: `originals/${file.name}`
      }).result
      urls.push(result.path);
      thumbs.push(`thumbs/${file.name}`)
    }
    return {
      urls,
      thumbs
    };
  }

  function previewPhotos(event: CustomEvent) {
    if (event.target.files) {
      const eventPhotos = Array.from(event.target.files);
      const newFiles = driverPhotos.concat(eventPhotos)
      setDriverPhotos(newFiles);
    }
  }

  function renderPhotos() {
    const photosElements: JSX.Element[] = [];
    driverPhotos.forEach((photo: File) => {
      photosElements.push(
        <img key={photo.name} src={URL.createObjectURL(photo)} alt={photo.name} height={120} />
      );
    });
    return photosElements;
  }

  function renderAddDriverForm() {
    if (userName) {
      return (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="driverName">Driver name:</label><br />
          <input value={driverName} onChange={(e) => setDriverName(e.target.value)} /><br />
          <label htmlFor="driverTeam">Current team:</label><br />
          <input value={driverTeam} onChange={(e) => setDriverTeam(e.target.value)} /><br />
          <label htmlFor="driverPhotos">Driver photos:</label><br />
          <input name="driverPhotos" type="file" multiple onChange={(e) => previewPhotos(e)} /><br />
          {renderPhotos()}<br />
          <input type="submit" value='Add driver' />
        </form>
      )
    } else {
      return <div>
        <h2>Login to add drivers:</h2>
        <NavLink to={"/auth"}>Login</NavLink>
      </div>
    }
  }

  return <main>
    {renderAddDriverForm()}
  </main>
}