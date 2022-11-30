import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { ISectorData } from "../../models/ISectorData";
import { getSectors } from "../../services/SectorService";

function IndexView(): React.ReactElement {
  const [sectors, setSectors] = React.useState<ISectorData[]>([]);

  React.useEffect(() => {
    getSectors()
      .then((sectors) => {
        setSectors(sectors);

        console.log(sectors);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <header>
        Header y enlaces de sectors
        {sectors.map((s) => (
          <div key={s.ID}>
            {console.log(s)}
            <a href={s.URLGroupList?.Url}>{s.URLGroupList?.Description}</a>
            <a href={s.URLMeetingList?.Url}>{s.URLMeetingList?.Description}</a>
          </div>
        ))}
        <Link to="/createGroup/">Crear nuevo grupo</Link>
      </header>
      <Outlet />
    </>
  );
}
export default IndexView;

/**
 *       <header>
        Encabezado, redirecciones
        {sectors.map((sector) => (s: any) => (
          <div key={s.id}>
            <a href="`${s.URLGroupList.Url}`">{s.URLGroupList.Description}</a>
            <a href="{s.URLMeetingList}">{s.URLMeetingList.Description}</a>
          </div>
        ))}
      </header>
 */

// const AlphabetCharsList = ({ alphabetChars }) => {
//   return (
//     <div>
//       {alphabetChars.map((char) => (
//         <div key={char.romaji}>
//           <Link href={"/contacts/" + char.romaji}>
//             {char.hiragana}/{char.romaji}
//           </Link>
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// };
