import * as React from "react";
import styles from "./MeetingForm.module.scss";
import { IMeetingFormProps } from "./IMeetingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import IndexView from "./IndexView/IndexView";

export default class MeetingForm extends React.Component<
  IMeetingFormProps,
  {}
> {
  public render(): React.ReactElement<IMeetingFormProps> {
    const { description } = this.props;

    return (
      <>
        <IndexView />
      </>
    );
  }
}
