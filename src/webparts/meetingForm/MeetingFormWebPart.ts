import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "MeetingFormWebPartStrings";
import MeetingForm from "./components/MeetingForm";
import { IMeetingFormProps } from "./components/IMeetingFormProps";
import { getSP } from "../../pnpjsConfig";

export interface IMeetingFormWebPartProps {
  description: string;
  context: any;
}

export default class MeetingFormWebPart extends BaseClientSideWebPart<IMeetingFormWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IMeetingFormProps> = React.createElement(
      MeetingForm,
      {
        description: this.properties.description,
        context: this.properties.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
