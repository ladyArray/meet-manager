import * as React from "react";
import getSectors from "../../services/SectorService";
import { ISectorData } from "../../models/ISectorData";

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
      {
        <div>
          {sectors.map((s) => {
            return (
              <div key={s.ID}>
                <div>{s.Denomination}</div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
}
export default IndexView;
