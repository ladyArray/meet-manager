import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/taxonomy";
//import { IMeetingFormProps } from "../components/IMeetingFormProps";
import { IItem, IItemAddResult, Item } from "@pnp/sp/items";

import { IGroupData } from "../models/IGroupData";
import { IAttachmentInfo } from "../models/IAttachmentInfo";
import { getTaxField, getMultiTaxField } from "../../../utils/taxFields";
import { ITermGroupInfo, ITermSetInfo } from "@pnp/sp/taxonomy";

const LIST_ID = "a66f450c-4326-43b8-9fdf-9bdf47e0b820";

const getAllGroups = async (): Promise<IGroupData[]> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.select("*", "TaxCatchAll/Term", "TaxCatchAll/ID")
    .expand("TaxCatchAll")();

  return result.map((item) => {
    return {
      ID: item.ID,
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
      Field: getMultiTaxField(item, "AmbitoGrupo"),
      Country: getTaxField(item, "PaisGrupo"),
      City: getTaxField(item, "CiudadGrupo"),
    };
  });
};

const getGroupInfo = (GroupID: number) => async (): Promise<any[]> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.select("*")
    .getById(GroupID)
    .expand()();
  return result;
};

const getAttachedFilesGroup =
  (GroupID: number) => async (): Promise<IAttachmentInfo[]> => {
    const result = await getSP()
      .web.lists.getById(LIST_ID)
      .items.getById(GroupID)
      // .attachmentFiles()
      .expand()();
    return result;
  };

const getTopic = async (): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("TematicaGrupo")
    .select("Choices")();

  return result;
};

const getGroupTypeOptions = async (): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("TipoGrupo")
    .select("Choices")();

  const auxChoices = [];
  for (const choice of result.Choices) {
    auxChoices.push({
      key: choice,
      text: choice,
    });
  }

  return auxChoices;
};

//Dudoso funcionamiento
async function createGroup(sysSubmitData: any) {
  console.log(sysSubmitData);

  const listAddResult: any = getSP().web.lists.getById(LIST_ID).items;

  console.log(listAddResult);

  const result = await listAddResult
    .add({
      // AmbitoGrupo: sysSubmitData.AmbitoGrupo,
      // CodigoGrupo: sysSubmitData.CodigoGrupo,
      // DenominacionGrupo: sysSubmitData.DenominacionGrupo,
      // DescripcionGrupo: sysSubmitData.DescripcionGrupo,
      // FechaCreacionGrupo: sysSubmitData.FechaCreacionGrupo,
      // FechaFinalizacionGrupo: sysSubmitData.FechaFinalizacionGrupo,
      // EstadoGrupo: sysSubmitData.EstadoGrupo,
      // TipoGrupo: sysSubmitData.TipoGrupo,
      // TematicaGrupo: sysSubmitData.TematicaGrupo,
    })
    .then(
      async function (value: any) {
        console.log(value);
        const insertData: any = await getSP()
          .web.lists.getById(LIST_ID)
          .items.getById(value.data.ID)
          .validateUpdateListItem(sysSubmitData);

        console.log(insertData, value.data.ID);
      },
      function (reason: any) {
        console.error(reason);
      }
    );
  console.log();

  return true;
}

const deleteGroup = async (Id: number) => {
  const groupToDelete: IItem = getSP()
    .web.lists.getById(LIST_ID)
    .items.getById(Id);

  const result = await groupToDelete.delete();
  return;
};

const getGroupById = async (groupId: number): Promise<IGroupData> => {
  console.log(groupId);
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .items.getById(groupId)
    .select("*", "TaxCatchAll/Term", "TaxCatchAll/ID")
    .expand("TaxCatchAll")();
  console.log(result);
  const groupById: IGroupData = {
    ID: result.IDGrupo,
    Code: result.CodigoGrupo,
    SectorAssociated: result.SectorAsociado,
    Denomination: result.DenominacionGrupo,
    Description: result.DescripcionGrupo,
    CreationDate: new Date(result.FechaCreacionGrupo).toLocaleDateString(
      "es-ES"
    ),
    CompletionDate: new Date(result.FechaFinalizacionGrupo).toLocaleDateString(
      "es-ES"
    ),
    State: result.EstadoGrupo,
    Type: result.TipoGrupo,
    Topic: result.TematicaGrupo,
    Field: getMultiTaxField(result, "AmbitoGrupo"),
    Country: getTaxField(result, "PaisGrupo"),
    City: getTaxField(result, "CiudadGrupo"),
  };

  return groupById;
};

async function updateGroup(GroupId: number, sysUpdateData: any) {
  console.log(sysUpdateData);
  const groupToUpdate: IItem = getSP()
    .web.lists.getById(LIST_ID)
    .items.getById(GroupId);

  const result = await groupToUpdate.validateUpdateListItem(sysUpdateData);

  const errors = result.filter(
    (field: { ErrorMessage: any }) => field.ErrorMessage !== null
  );

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
  return true;
}

// CompletionDate: new Date(item.FechaFinalizacionGrupo).toLocaleDateString(
//   "es-ES"
// ),
// State: item.EstadoGrupo,
// Type: item.TipoGrupo,
// Topic: item.TematicaGrupo,
// Field: getMultiTaxField(item, "AmbitoGrupo"),
// Country: getTaxField(item, "PaisGrupo"),
// City: getTaxField(item, "CiudadGrupo"),

const getCountryTaxOptions = async (): Promise<any> => {
  const result: ITermSetInfo = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("PaisGrupo")
    .select("Choices")();
  return result;
};

const getCityTaxOptions = async (): Promise<any> => {
  const result: ITermSetInfo = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("CiudadGrupo")
    .select("Choices")();
};

const getFieldMultiTaxOptions = async (): Promise<any> => {
  return true;
};

/**const getTopic = async (): Promise<any> => {
  const result = await getSP()
    .web.lists.getById(LIST_ID)
    .fields.getByInternalNameOrTitle("TematicaGrupo")
    .select("Choices")();

  return result;
}; */

export {
  getAllGroups,
  getGroupInfo,
  getGroupById,
  updateGroup,
  createGroup,
  getAttachedFilesGroup,
  getGroupTypeOptions,
  getTopic,
  deleteGroup,
};
