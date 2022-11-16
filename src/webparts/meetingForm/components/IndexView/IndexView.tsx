import * as React from "react";
import { ISectorData } from "../../models/ISectorData";
import getSectors from "../../services/SectorService";

function IndexView(): React.ReactElement {
  const [sectors, setSectors] = React.useState<ISectorData[]>([]);
  React.useEffect(() => {
    getSectors()
      .then((sectors) => {
        setSectors(sectors);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <header>
        Encabezado, redirecciones
        {sectors.map((sector) => (s: any) => (
          <div key={s.id}>
            <a href="`${s.URLGroupList.Url}`">{s.URLGroupList.Description}</a>
            <a href="{s.URLMeetingList}">{s.URLMeetingList.Description}</a>
          </div>
        ))}
      </header>
    </>
  );
}
export default IndexView;
