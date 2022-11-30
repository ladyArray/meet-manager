import * as React from "react";
import { IGroupData } from "../../models/IGroupData";
import {
  createGroup,
  getGroupTypeOptions,
  getTopic,
} from "../../services/GroupService";

import { ITaxField } from "../../../../utils/taxFields";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Link, useParams } from "react-router-dom";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { useConst } from "@fluentui/react-hooks";
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  defaultDatePickerStrings,
  SelectionMode,
} from "@fluentui/react";
import { SPContext } from "../MeetingForm";
import { toInteger } from "lodash";
import {
  IPickerTerm,
  IViewField,
  ListView,
  TaxonomyPicker,
} from "@pnp/spfx-controls-react";
import { addDays } from "office-ui-fabric-react";
import { getSectorAssociated } from "../../services/SectorService";
import { Field } from "@pnp/sp/fields";
import { Terms } from "@pnp/sp/taxonomy";

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function CreateGroupView(): React.ReactElement {
  const { id: groupId } = useParams();
  const LIST_ID = "a66f450c-4326-43b8-9fdf-9bdf47e0b820";

  const today = useConst(new Date(Date.now()));

  const [loading, setLoading] = React.useState<boolean>(true);

  const [error, setError] = React.useState<string>("");

  //choice states
  const [groupSelected, setGroupSelected] = React.useState<IGroupData>();
  const [sectorAssociated, setSectorAssociated] = React.useState<string>();
  const [sectorAssociatedOptions, setSectorAssociatedOptions] =
    React.useState<any[]>();
  const [description, setDescription] = React.useState<string>("");
  const [topic, setTopic] = React.useState<string>();
  const [denomination, setDenomination] = React.useState<string>("");
  const [groupType, setGroupType] = React.useState<string>();

  const [field, setField] = React.useState<string>();
  const [state, setState] = React.useState<boolean>();
  const [groupCountry, setGroupCountry] = React.useState<any>();
  const [groupCity, setGroupCity] = React.useState<string>();

  const [groupTypeOptions, setGroupTypeOptions] = React.useState<any[]>();
  const [topicOptions, setTopicOptions] = React.useState<any[]>();

  const [completionDate, setCompletionDate] = React.useState<Date | undefined>(
    new Date()
  );

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);

  const context = React.useContext(SPContext);

  React.useEffect(() => {
    const getGroupTypeOptions = async (): Promise<void> => {
      const groupTypeOptions: any = await getGroupTypeOptions();

      setGroupTypeOptions(groupTypeOptions);
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
      const choiceTopic: any = await getTopic();
      setTopic(choiceTopic);
    };

    getGroupTypeOptions().catch(console.error);
    getSectorAssociated().catch(console.error);
    //getSectorAssociatedOptions().catch(console.error);
    getChoiceTopic().catch(console.error);
  }, [groupId]);

  const optionsGroup: IDropdownOption<any>[] = [
    { key: "Grupo Ocasional", text: "Grupo Ocasional" },
    { key: "Grupo Temporal", text: "Grupo Temporal" },
    { key: "Grupo Estable", text: "Grupo Estable" },
  ];

  const countryViewFields: IViewField[] = [
    {
      name: "Espana",
      displayName: "Espana",
      sorting: true,
      minWidth: 250,
    },
    {
      name: "Portugal",
      displayName: "Portugal",
      sorting: true,
      minWidth: 150,
    },
    {
      name: "Alemania",
      displayName: "Alemania",
      sorting: true,
      minWidth: 250,
    },
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
    //index?: number
  ): void => {
    const sectorAssociated = item.text;
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
    item?: IDropdownOption // index?: number
  ): void => {
    const groupType = item.text;
    setGroupType(groupType);
  };
  8;

  const onChooseTopic = (
    e: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    const topic = item.text;
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
  const onChooseCountry = (term: IPickerTerm): void => {
    const groupCountry = term;

    // setGroupCountry(groupCountry);
  };

  //   const onChooseCity = (
  // e: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number
  //   ): void => {
  //     const topic = item.text;
  //     setTopic(topic);
  //   };

  function parseDate(date: Date) {
    return (
      date.getMonth() + 1 + "/" + (date.getDay() + 1) + "/" + date.getFullYear()
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    console.log(completionDate);

    const sysSubmitData = [
      { FieldName: "CodigoGrupo", FieldValue: denomination },
      /* {
        FieldName: "SectorAsociado",
        FieldValue: sectorAssociated,
      }*/
      { FieldName: "DenominacionGrupo", FieldValue: denomination },
      { FieldName: "DescripcionGrupo", FieldValue: description },
      {
        FieldName: "FechaCreacionGrupo",
        FieldValue: today.toLocaleDateString("es-ES"),
      },

      {
        FieldName: "FechaFinalizacionGrupo",
        FieldValue: completionDate.toLocaleDateString("es-ES"),
      },

      { FieldName: "TipoGrupo", FieldValue: groupType },
      { FieldName: "TematicaGrupo", FieldValue: topic },

      // { FieldName: "AmbitoGrupo", FieldValue: field}

      //{ FieldName: "EstadoGrupo", FieldValue: (+state).toString() },
      //  { FieldName: "PaisGrupo", FieldValue: groupCountry },
      // { FieldName: "CiudadGrupo", FieldValue:  },
    ];

    console.log(sysSubmitData);
    await createGroup(sysSubmitData);

    return alert(`Elemento creado`);
  }

  return (
    <>
      <section>
        <h2>Crear Grupo</h2>

        <form onSubmit={handleCreate}>
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
                placeholder="Inserta Sector Asociado"
                label="Sector Asociado"
                options={sectorAssociatedOptions}
                styles={dropdownStyles}
                onChange={onChooseSectorAssociated}
              />
              <p>{/*groupSelected.SectorAssociated*/}</p>

              <TextField
                //value={groupSelected.SectorAssociated}
                placeholder="Inserta Denominacion"
                label="Denominación"
                onChange={onChooseDenomination}
              />

              <TextField
                //value={groupSelected.Description}
                placeholder="Inserta Descripcion"
                label="Descripción"
                multiline
                rows={3}
                onChange={onChooseDescription}
              />

              <DatePicker
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
                placeholder="Inserta Tipo"
                label="Tipo de Grupo"
                options={optionsGroup}
                styles={dropdownStyles}
                onChange={onChooseType}
              />

              <Dropdown
                placeholder="Inserta Tematica"
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
                termsetNameOrID="Pais"
                panelTitle="Selecciona un país"
                label="Pais Picker"
                // onChange={onChooseCountry}
                context={context}
                isTermSetSelectable={false}
              />
              <div>
                {groupCountry && groupCountry.length > 0 ? (
                  <div>
                    <ListView
                      items={groupCountry}
                      viewFields={countryViewFields}
                      compact={true}
                      selectionMode={SelectionMode.none}
                      showFilter={false}
                      stickyHeader={true}
                    />
                  </div>
                ) : null}
              </div> */}

              {/* <TaxonomyPicker
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
                text="Crear Grupo"
                allowDisabledFocus
              />
            </Stack>
          </Stack>
        </form>
      </section>
    </>
  );
}
export default CreateGroupView;
