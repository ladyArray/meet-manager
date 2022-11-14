import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ISectorData } from "../models/ISectorData";
import { IMeetManagerProps } from "../IMeetManagerProps";
import { Item } from "@pnp/sp/items";
import { SPFI } from "@pnp/sp";
import { useState } from "react";
import { IMeetingFormProps } from "../components/IMeetingFormProps";

const LIST_NAME = "Sectores";
// const _sp: SPFI = getSP(props.context);
//const [sectors, setSectors] = React.useState<ISectorData[]>([]);

const getSectors = async (): Promise<ISectorData[]> => {
  const result = await getSP()
    .web.lists.getById("8CA011CD-2FD3-4D7E-A425-084C3A2CC900")
    .items.select("*")
    .expand()();
  return result.map((item) => {
    return {
      ID: item.IDSector,
      Code: item.CodigoSector,
      Denomination: item.DenominacionSector,
      URLImageSector: item.URLImagenSector,
      URLGroupList: item.URLListaGrupos,
      URLMeetingList: item.URLListaReuniones,
      URLLibrary: item.URLBiblioteca,
      URLAdmGroupSector: item.URLGrupoAdmSector,
      URLUserGroupSector: item.URLGrupoUsuariosSector,
    };
  });
};

export default getSectors;
