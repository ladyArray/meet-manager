import * as React from "react";
import { getSP } from "../../../pnpjsConfig";

import { ISectorData } from "../models/ISectorData";
import { IDropdownOption } from "@fluentui/react";
import { IGroupData } from "../models/IGroupData";

const LIST_ID = "8CA011CD-2FD3-4D7E-A425-084C3A2CC900";

const getSectors = async (): Promise<ISectorData[]> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
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

const getAllSectors = async (): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.select("ID", "DenominacionSector")();

  return result;
};

const getSectorAssociatedOptions = async (): Promise<IDropdownOption[]> => {
  const result: any = await getAllSectors();

  return result.map((item: any) => ({
    key: item.ID,
    text: item.DenominacionSector,
  }));
};

const getSectorAssociated = async (GroupId: number): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.getById(GroupId);
  console.log(result);

  // const sectorAssociated: ISectorData = {
  //   ID: result.IDSector,
  //   Denomination: result.DenominacionSector,
  // };

  return result;
};
/**


*/

export {
  getSectors,
  getSectorAssociatedOptions,
  getAllSectors,
  getSectorAssociated,
};
