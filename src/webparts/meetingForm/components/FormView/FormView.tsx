import * as React from "react";
import { IGroupData } from "../../models/IGroupData";
import { getAllGroups } from "../../services/GroupService";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { updateGroup, createGroup } from "../../services/GroupService";

function FormView(): React.ReactElement {
  const [groups, setGroups] = React.useState<IGroupData[]>([]);

  //  React.useEffect(() => {
  //    groupService.getAll().then(setGroups).catch(console.error);
  //  }, []);

  return (
    <>
      <>
        <h2>Formulario de Creación de Grupos</h2>
      </>
    </>
  );
}
export default FormView;
