import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Field } from "@pnp/sp/fields/types";
import { Fields } from "@pnp/sp/fields/types";
import { IMeetManagerProps } from "../IMeetManagerProps";
import { IItem, IItemAddResult, Item } from "@pnp/sp/items";
import { SPFI } from "@pnp/sp";
import { useState } from "react";
import { IGroupData } from "../models/IGroupData";
import { ISectorData } from "../models/ISectorData";
import { IAttachmentInfo } from "../models/IAttachmentInfo";

let context: WebPartContext;

const _sp: SPFI = getSP(context);

//const [groups, setGroups] = React.useState<IGroupData[]>([]);

const getAllGroups = async (): Promise<IGroupData[]> => {
  const result = await getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .items.select("*")
    .expand()();
  //console.log(groups);
  return result.map((item) => {
    return {
      ID: item.IDGrupo,
      Code: item.CodigoGrupo,
      SectorAssociated: item.SectorAsociado,
      Denomination: item.DenominacionGrupo,
      Description: item.DescripcionGrupo,
      CreationDate: new Date(item.FechaCreacionGrupo).toLocaleDateString(
        "es-ES"
      ),
      CompletionDate: new Date(item.FechaFinalizacionGrupo).toLocaleDateString(
        "es-ES"
      ),
      State: item.EstadoGrupo,
      Type: item.TipoGrupo,
      Topic: item.TematicaGrupo,
      Field: item.AmbitoGrupo,
      Country: item.PaisGrupo,
      City: item.CiudadGrupo,
      // Tax: getTaxFields(group, ["Field", "Country", "City"]?.label),
    };
  });
};
// const getTaxFields = (item: any, keys: string): string => {
//   try {
//     const taxonomy = item.TaxCatchAll.filter((item) => x.ID === Number(keys));

//     return taxonomy[0].Term;
//   } catch (error) {
//     return null;
//   }
// };
// };

const getGroupsInfo = async (): Promise<any[]> => {
  const result = await getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .items.select("*")
    .expand()();
  return result;
};

const getGroupInfo = (GroupID: number) => async (): Promise<any[]> => {
  const result = await getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .items.select("*")
    .getById(GroupID)
    .expand()();
  return result;
};

const getAttachedFilesGroup =
  (GroupID: number) => async (): Promise<IAttachmentInfo[]> => {
    const result = await getSP()
      .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
      .items.getById(GroupID)
      // .attachmentFiles()
      .expand()();
    return result;
  };

const getTopics = () => async (): Promise<any[]> => {
  const result = await getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .fields.getByInternalNameOrTitle("TematicaGrupo")
    .select("Choices")();

  return result;
};

const getGroupTypes = () => async (): Promise<any[]> => {
  const result = await getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .fields.getByInternalNameOrTitle("TipoGrupo")
    .select("Choices")();

  return result;
};

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

const createGroup = () => async (): Promise<IItemAddResult> => {
  const result = await getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .items.add({});
  return result;
};

const getGroupById = (GroupID: number) => (): IItem => {
  const result = getSP()
    .web.lists.getById("a66f450c-4326-43b8-9fdf-9bdf47e0b820")
    .items.getById(GroupID);
  return result;
};

const updateGroup =
  (Group: IGroupData, sysUpdateData: any) =>
  async (): Promise<IItemAddResult> => {
    const oListItem = getGroupById(Group.ID);
    const result = await oListItem.validateUpdateListItem(sysUpdateData);
    return result;
  };

export {
  getAllGroups,
  getGroupsInfo,
  getGroupInfo,
  getGroupById,
  updateGroup,
  createGroup,
  getSectors,
  getAttachedFilesGroup,
  getGroupTypes,
  getTopics,
};
