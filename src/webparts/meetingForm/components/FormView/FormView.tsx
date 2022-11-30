import * as React from "react";
import { IGroupData } from "../../models/IGroupData";
import {
  getGroupById,
  getGroupTypeOptions,
  getTopic,
  updateGroup,
  deleteGroup,
} from "../../services/GroupService";
import { getSP } from "../../../../pnpjsConfig";
import { ITaxField } from "../../../../utils/taxFields";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  MaskedTextField,
  ITextFieldStyles,
} from "@fluentui/react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { useConst } from "@fluentui/react-hooks";
import {
  SelectableOptionMenuItemType,
  DatePicker,
  DayOfWeek,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
  defaultDatePickerStrings,
  themeRulesStandardCreator,
} from "@fluentui/react";
import { SPContext } from "../MeetingForm";
import { toInteger } from "lodash";
import { TaxonomyPicker } from "@pnp/spfx-controls-react";
import { addDays } from "office-ui-fabric-react";
import { getSectorAssociated, getSectors } from "../../services/SectorService";
import { Field } from "@pnp/sp/fields";

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function FormView(): React.ReactElement {
  const { id: groupId } = useParams();
  console.log(groupId);

  const [groupSelected, setGroupSelected] = React.useState<IGroupData>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const [error, setError] = React.useState<string>("");

  //choice states
  const [sectorAssociatedOptions, setSectorAssociatedOptions] =
    React.useState<any>();
  const [sectorAssociated, setSectorAssociated] = React.useState<string>();
  const [description, setDescription] = React.useState<string>("");
  const [topic, setTopic] = React.useState<any>();
  const [denomination, setDenomination] = React.useState<string>("");
  const [groupType, setGroupType] = React.useState<any>();
  const [field, setField] = React.useState<any>();
  const [state, setState] = React.useState<boolean>();
  const [groupCountry, setGroupCountry] = React.useState<any>();
  const [groupCity, setGroupCity] = React.useState<any>();

  const [completionDate, setCompletionDate] = React.useState<Date | undefined>(
    new Date()
  );

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);

  const context = React.useContext(SPContext);

  React.useEffect(() => {
    const getGroup = async (): Promise<any> => {
      const groupToEdit: IGroupData = await getGroupById(toInteger(groupId));
      setGroupSelected(groupToEdit);
    };

    const getChoiceGroupType = async (): Promise<any> => {
      const choiceGroupType: IDropdownOption[] = await getGroupTypeOptions();
      setGroupType(choiceGroupType);
    };

    const getSectorAssociated = async () => {
      const sectorOptions: any = await getSectorAssociated();
      setSectorAssociated(sectorAssociated);
    };

    // const getSectorAssociatedOptions = async () => {
    //   const sectorOptions: any = await getSectorAssociated();
    //   setSectorAssociatedOptions(sectorOptions);
    // };

    const getChoiceTopic = async (): Promise<any> => {
      const choiceTopic: IDropdownOption[] = await getTopic();
      setTopic(choiceTopic);
    };

    getChoiceGroupType().catch(console.error);
    getSectorAssociated().catch(console.error);
    //getSectorAssociatedOptions().catch(console.error);
    getTopic().catch(console.error);

    getGroup()
      .catch((error) => {
        setError("Error trayendo los datos");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [groupId]);

  const optionsSectorAssociated: IDropdownOption<any>[] = [
    { key: "Aereo", text: "Aereo" },
    { key: "Maritimo", text: "Maritimo" },
    { key: "Terrestre", text: "Terrestre" },
  ];

  const optionsGroupType: IDropdownOption<any>[] = [
    { key: "Grupo Ocasional", text: "Grupo Ocasional" },
    { key: "Grupo Temporal", text: "Grupo Temporal" },
    { key: "Grupo Estable", text: "Grupo Estable" },
  ];

  const optionsTopic: any[] = [
    {
      key: "TeamBuilding",
      text: "TeamBuilding",
    },
    {
      key: "Informativa",
      text: "Informativa",
    },
    {
      key: "Ejecutiva",
      text: "Ejecutiva",
    },
  ];

  const onChooseSectorAssociated = (
    e: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    const sectorAssociated = item.text;
    console.log(sectorAssociated);
    setSectorAssociated(sectorAssociated);
  };

  const onChooseDenomination = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    //const newValue = e.target.value; //input
    setDenomination(newValue);
  };

  const onChooseDescription = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    //const newValue = e.target.value; //input
    setDescription(newValue);
  };

  const onSelectCompletionDate = (date: Date | null | undefined): void => {
    setCompletionDate(date);
  };

  const onChooseState = (
    e: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    setState(checked);
  };

  const onChooseType = (
    e: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    const groupType = item;
    setGroupType(groupType);
  };

  const onChooseTopic = (
    e: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    const topic = item;
    setTopic(topic);
  };

  //tax multiple
  //   const onChooseField = (
  // e: React.FormEvent<HTMLDivElement>, item?: IDropdownOption,// index?: number
  //   ): void => {
  //     const groupType = item.text;
  //     setGroupType(groupType);
  //   };

  //tax individual
  //   const onTaxCountryPickerChange= (
  // terms : IPickerTerms
  //   ): void => {
  //     const countryPicker = terms.text;
  //     setGroupType(countryPicker);
  //   };

  //   const onChooseCity = (
  // e: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number
  //   ): void => {
  //     const topic = item.text;
  //     setTopic(topic);
  //   };

  // async function handleDelete(e: React.FormEvent) {
  //   e.preventDefault();
  //   const deletingGroup = async () => {
  //     const option: boolean = window.confirm(
  //       "Seguro que quieres eliminar el Grupo?"
  //     );

  //     if (option === true) {
  //       //groupToDelete:any = getGroupById(toInteger(groupId));
  //       await deleteGroup(toInteger(groupId));
  //       try {
  //         alert(`El grupo ${groupId} ha sido borrado correctamente!`);
  //       } catch (error) {
  //         alert("Ha surgido un error al borrar el grupo");
  //       }
  //     } else {
  //       console.log("Borrado cancelado");
  //       alert("Se ha cancelado el borrado");
  //     }
  //   };
  // }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    console.log(sectorAssociated);
    const sysUpdateData = [
      /*   {
        FieldName: "SectorAsociado",
        FieldValue: sectorAssociated,
      },*/
      { FieldName: "DenominacionGrupo", FieldValue: denomination },
      { FieldName: "DescripcionGrupo", FieldValue: description },
      {
        FieldName: "FechaFinalizacionGrupo",
        FieldValue: completionDate.toLocaleDateString("es-ES"),
      },

      { FieldName: "TipoGrupo", FieldValue: groupType },
      // { FieldName: "TematicaGrupo", FieldValue: topic },
      // { FieldName: "AmbitoGrupo", FieldValue: field}

      { FieldName: "EstadoGrupo", FieldValue: (+state).toString() },
      //  { FieldName: "PaisGrupo", FieldValue: groupCountry },
      // { FieldName: "CiudadGrupo", FieldValue:  },
    ];

    await updateGroup(groupSelected.ID, sysUpdateData);

    return alert(`Elemento editado: ${groupId}`);
  }

  console.log(loading, groupSelected);
  if (loading) {
    return <>cargando</>;
  }
  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <section>
        <h2>Editar Grupo</h2>

        <form onSubmit={handleEdit}>
          <Stack horizontal horizontalAlign={"end"} {...columnProps}>
            <Link to="/">
              <PrimaryButton
                style={{ maxWidth: "100px" }}
                text="Volver al listado"
                allowDisabledFocus
              />
            </Link>
          </Stack>

          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <Dropdown
                //defaultValue={groupSelected.SectorAssociated}
                placeholder={groupSelected.SectorAssociated}
                label="Sector Asociado"
                options={optionsSectorAssociated}
                styles={dropdownStyles}
                onChange={onChooseSectorAssociated}
              />

              <TextField
                //value={groupSelected.Denomination}
                placeholder={groupSelected.Denomination}
                label="Denominación"
                onChange={onChooseDenomination}
              />

              <TextField
                //value={groupSelected.Description}
                placeholder={groupSelected.Description}
                label="Descripción"
                multiline
                rows={3}
                onChange={onChooseDescription}
              />

              <DatePicker
                placeholder={groupSelected.CompletionDate}
                defaultChecked={groupSelected.CompletionDate}
                label="Fecha de Finalización"
                firstDayOfWeek={firstDayOfWeek}
                ariaLabel="Select a date"
                strings={defaultDatePickerStrings}
                onSelectDate={onSelectCompletionDate}
              />
            </Stack>

            <Stack {...columnProps}>
              <Toggle
                label="Estado"
                defaultChecked
                onText="Abierto"
                offText="Cerrado"
                onChange={onChooseState}
              />

              <Dropdown
                //defaultValue={groupSelected.Type}
                placeholder={groupSelected.Type}
                label="Tipo de Grupo"
                options={optionsGroupType}
                styles={dropdownStyles}
                onChange={onChooseType}
              />

              <Dropdown
                //defaultValue={groupSelected.Topic}
                placeholder={groupSelected.Topic}
                label="Temática"
                options={optionsTopic}
                styles={dropdownStyles}
                onChange={onChooseTopic}
              />

              {/* <TaxonomyPicker
                allowMultipleSelections={true}
                // initialValues={null}
                termsetNameOrID="Ambito"
                panelTitle="Selecciona un ambito"
                label="Ambito"
                //onChange={onChooseField}
                context={context}
                isTermSetSelectable={false}
              />*/}

              {/*
              <TaxonomyPicker
                allowMultipleSelections={false}
                termsetNameOrID="PaisGrupo"
                panelTitle="Selecciona un país"
                label="Taxonomy Picker"
                //onChange={onTaxCountryPickerChange}
                context={context}
                isTermSetSelectable={false}
              />
              {/*
              <TaxonomyPicker
                allowMultipleSelections={false}
                termsetNameOrID="Ciudad"
                panelTitle="Selecciona una Ciudad"
                label="Ciudad"
                //onChange={onChooseCity}
                context={context}
                isTermSetSelectable={false}
              /> */}
              <PrimaryButton
                type="submit"
                style={{ maxWidth: "100px" }}
                text="Modificar Datos"
                allowDisabledFocus
              />
              {/* <DefaultButton
                style={{ maxWidth: "100px" }}
                text="Borrar Grupo"
                //onClick={() => handleDelete()}
                allowDisabledFocus
              /> */}
            </Stack>
          </Stack>
        </form>
      </section>
    </>
  );
}
export default FormView;
