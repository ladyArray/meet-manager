import * as React from "react";
import styles from "./MeetingForm.module.scss";
import { IMeetingFormProps } from "./IMeetingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import IndexView from "./IndexView/IndexView";
import getSectors from "../services/SectorService";
import { ISectorData } from "../models/ISectorData";
import GroupsView from "./GroupsView/GroupsView";
import { Link } from "office-ui-fabric-react";
import FormView from "./FormView/FormView";

export default function MeetingForm(props: IMeetingFormProps): JSX.Element {
  const { description } = props;

  return (
    <>
      <IndexView />
      <GroupsView />
      <FormView />
    </>
  );
}
