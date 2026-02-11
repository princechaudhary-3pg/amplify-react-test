import { StorageImage } from "@aws-amplify/ui-react-storage";
import { DriverType } from "./Drivers";
import { NavLink } from "react-router";


export default function Driver(props: {driver: DriverType}) {

  function renderPhotos() {
    const rows: React.JSX.Element[] = []
    props.driver.thumbs?.forEach((photo, index) => {
      if (photo) {
        /**
         * Files can be also handled with the aws-amplify/storage package:
         * https://docs.amplify.aws/angular/build-a-backend/storage/download-files/
         */
        rows.push(<StorageImage path={photo} alt={photo} key={index} />)
      }
    })
    return rows;
  }

  return <div className="driver">
    <h2>{props.driver.name}</h2>
    <NavLink to={'/drivers/' + props.driver.id}>{props.driver.name}</NavLink>
    <p>{props.driver.team}</p>
    {renderPhotos()}
  </div>



}